import React, { Component } from 'react';

import './App.css';
import Web3 from 'web3'
import Navbar from './Navbar'
import Main from './Main'
import TrustyCommunity from '../abis/TrustyCommunity.json'


class App extends Component {
  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="content mr-auto ml-auto">

              <h1>Trusty</h1>
              <p>
                A community built by trust
              </p>

            </div>
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                  ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                  : <Main createTrustyPost={this.createTrustyPost}
                          trustyPosts={this.state.trustyPosts}

                  />
              }
            </main>

          </div>
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      trustyPostCount: 0,
      trustyPosts: [],
      loading: true
    }
    this.createTrustyPost = this.createTrustyPost.bind(this)

  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = TrustyCommunity.networks[networkId]
    if(networkData) {
      const trustyCommunity = web3.eth.Contract(TrustyCommunity.abi, networkData.address)
      this.setState({ trustyCommunity })
      const trustyPostCount = await trustyCommunity.methods.trustyPostCount().call()
      this.setState({ trustyPostCount })
      // Load posts
      for (var i = 1; i <= trustyPostCount; i++) {
        const trustyPost = await trustyCommunity.methods.trustyPosts(i).call()
        this.setState({
          trustyPosts: [...this.state.trustyPosts, trustyPost]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  createTrustyPost(title, content, url) {
    this.setState({ loading: true })
    this.state.trustyCommunity.methods.createTrustyPost(title,content, url).send({ from: this.state.account })
        .once('receipt', (receipt) => {
          this.setState({ loading: false })
        })
  }

  async loadWeb3() {
    if (window.ethereum) {

      window.web3 = new Web3(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
}

export default App;
