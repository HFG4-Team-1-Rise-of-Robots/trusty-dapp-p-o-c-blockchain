const TrustyCommunity = artifacts.require('./TrustyCommunity.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('TrustyCommunity', ([deployer, seller, buyer]) => {
    let trustyCommunity

    before(async () => {
        trustyCommunity = await TrustyCommunity.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await trustyCommunity.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            const name = await trustyCommunity.name()
            assert.equal(name, 'Trusty Community')
        })

    })


    describe('trustyPosts', async () => {
        let result, postCount
        before(async () => {
            //(string memory _title,string memory _content,string memory _url)
            result = await trustyCommunity.createTrustyPost('Covid Cases Rising a lot',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tellus neque, condimentum ut tempus et, blandit vel lacus. Mauris dignissim tristique ipsum, vitae iaculis mauris consectetur eget. Donec a elit aliquam, ultricies turpis eu, iaculis orci. Nulla eget lacus sit amet mauris consectetur pharetra non sed nibh. Nulla lobortis, enim sed dictum lacinia, tortor felis pulvinar diam, non congue magna augue id augue. Curabitur sodales lectus non urna imperdiet commodo. Quisque finibus sodales arcu sit amet aliquam. Praesent tortor augue, facilisis sed pretium a, cursus id ante. In metus lacus, mattis id luctus et, semper id quam. Praesent consectetur neque vel libero vehicula, a lobortis urna ornare. Suspendisse accumsan turpis sed nisi elementum, nec ultrices lacus mattis. Curabitur vulputate ante a elit venenatis, eu malesuada urna consequat. Duis ac imperdiet lacus, quis lobortis sapien.\n' +
                '\n' +
                'Integer bibendum faucibus tortor non commodo. Cras imperdiet risus et sodales posuere. Pellentesque condimentum luctus elit, id varius velit rhoncus ut. Morbi blandit magna ac libero dapibus auctor. Nulla consectetur sapien velit, non ullamcorper elit aliquam quis. Integer facilisis iaculis mauris vel tincidunt. Aliquam ac turpis nisi.\n' +
                '\n' +
                'Vestibulum semper lorem sit amet arcu dictum, nec tincidunt lacus pulvinar. Mauris at ullamcorper tortor. Aenean vestibulum erat sed metus venenatis bibendum eu at ligula. Morbi tempor lacinia vehicula. Suspendisse congue tellus ex, quis interdum nibh cursus tempus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse rhoncus hendrerit malesuada. Maecenas lacinia congue facilisis. Vivamus non justo vel dui imperdiet facilisis. Ut nec orci nisi. Maecenas quis quam libero. Aliquam tempus mauris aliquet ex fermentum pellentesque. Integer tristique molestie lobortis.\n' +
                '\n' +
                'Fusce ut elit bibendum, imperdiet purus quis, porta diam. In aliquet aliquam aliquam. Maecenas at nisl nec metus suscipit lobortis consequat non magna. Donec dapibus eros ultrices, ultricies diam vel, eleifend est. Morbi vestibulum dapibus leo sit amet egestas. Quisque convallis mauris a semper faucibus. Proin at auctor mauris.\n' +
                '\n' +
                'Mauris volutpat risus vitae diam bibendum tincidunt. Phasellus in consectetur nibh. Aenean vehicula enim leo, at vestibulum orci consequat vitae. Suspendisse eget ornare diam, tincidunt fringilla est. Proin cursus porttitor sagittis. Nunc facilisis tempor justo et vehicula. Curabitur fermentum lacus a congue rutrum. Mauris euismod lorem a sem dignissim, eget posuere nunc commodo.',
                'https://example.com',
                { from: seller })
            postCount = await trustyCommunity.trustyPostCount()
        })

        it('creates posts', async () => {
            // SUCCESS
            assert.equal(postCount, 1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(event.title, 'Covid Cases Rising a lot', 'title is correct')
            assert.equal(event.content,
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tellus neque, condimentum ut tempus et, blandit vel lacus. Mauris dignissim tristique ipsum, vitae iaculis mauris consectetur eget. Donec a elit aliquam, ultricies turpis eu, iaculis orci. Nulla eget lacus sit amet mauris consectetur pharetra non sed nibh. Nulla lobortis, enim sed dictum lacinia, tortor felis pulvinar diam, non congue magna augue id augue. Curabitur sodales lectus non urna imperdiet commodo. Quisque finibus sodales arcu sit amet aliquam. Praesent tortor augue, facilisis sed pretium a, cursus id ante. In metus lacus, mattis id luctus et, semper id quam. Praesent consectetur neque vel libero vehicula, a lobortis urna ornare. Suspendisse accumsan turpis sed nisi elementum, nec ultrices lacus mattis. Curabitur vulputate ante a elit venenatis, eu malesuada urna consequat. Duis ac imperdiet lacus, quis lobortis sapien.\n' +
                '\n' +
                'Integer bibendum faucibus tortor non commodo. Cras imperdiet risus et sodales posuere. Pellentesque condimentum luctus elit, id varius velit rhoncus ut. Morbi blandit magna ac libero dapibus auctor. Nulla consectetur sapien velit, non ullamcorper elit aliquam quis. Integer facilisis iaculis mauris vel tincidunt. Aliquam ac turpis nisi.\n' +
                '\n' +
                'Vestibulum semper lorem sit amet arcu dictum, nec tincidunt lacus pulvinar. Mauris at ullamcorper tortor. Aenean vestibulum erat sed metus venenatis bibendum eu at ligula. Morbi tempor lacinia vehicula. Suspendisse congue tellus ex, quis interdum nibh cursus tempus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse rhoncus hendrerit malesuada. Maecenas lacinia congue facilisis. Vivamus non justo vel dui imperdiet facilisis. Ut nec orci nisi. Maecenas quis quam libero. Aliquam tempus mauris aliquet ex fermentum pellentesque. Integer tristique molestie lobortis.\n' +
                '\n' +
                'Fusce ut elit bibendum, imperdiet purus quis, porta diam. In aliquet aliquam aliquam. Maecenas at nisl nec metus suscipit lobortis consequat non magna. Donec dapibus eros ultrices, ultricies diam vel, eleifend est. Morbi vestibulum dapibus leo sit amet egestas. Quisque convallis mauris a semper faucibus. Proin at auctor mauris.\n' +
                '\n' +
                'Mauris volutpat risus vitae diam bibendum tincidunt. Phasellus in consectetur nibh. Aenean vehicula enim leo, at vestibulum orci consequat vitae. Suspendisse eget ornare diam, tincidunt fringilla est. Proin cursus porttitor sagittis. Nunc facilisis tempor justo et vehicula. Curabitur fermentum lacus a congue rutrum. Mauris euismod lorem a sem dignissim, eget posuere nunc commodo.', 'content is correct')
            assert.equal(event.url, 'https://example.com', 'url is correct')
            assert.equal(event.owner, seller, 'owner is correct')
            assert.equal(event.verified, false, 'verified is correct')
            assert.equal(event.verified_rating, '', 'verified_rating is correct')

            // FAILURE: some random data
            await await trustyCommunity.createTrustyPost('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
            // FAILURE: some random data
            await await trustyCommunity.createTrustyPost('iPhone X', 0, { from: seller }).should.be.rejected;
        })
    })
})
