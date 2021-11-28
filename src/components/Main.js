import React, { Component } from 'react';

class Main extends Component {

    render() {
        return (
            <div id="content">
                <h1>Add Trusty Post</h1>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    //title, content, url
                    const title = this.postTitle.value
                    const content = this.postContent.value
                    const url = this.postUrl.value

                    this.props.createTrustyPost(title,content, url)
                }}>
                    <div className="form-group mr-sm-2">
                        <input
                            id="postTitle"
                            type="text"
                            ref={(input) => { this.postTitle = input }}
                            className="form-control"
                            placeholder="Post title"
                            required />
                    </div>

       <div className="form-group mr-sm-2">
                        <textarea
                            id="postContent"
                            type="text"
                            ref={(input) => { this.postContent = input }}
                            className="form-control"
                            placeholder="Post Content"
                            required />
                    </div>
                    <div className="form-group mr-sm-2">
                        <input
                            id="postUrl"
                            type="text"
                            ref={(input) => { this.postUrl = input }}
                            className="form-control"
                            placeholder="url"
                            required />
                    </div>

                    <button type="submit" className="btn btn-primary">Add Post</button>
                </form>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Content</th>
                        <th scope="col">Url</th>
                        <th scope="col">Owner</th>

                    </tr>
                    </thead>
                    <tbody id="trustyPostList">
                    { this.props.trustyPosts.map((trustyPost, key) => {
                        return(
                            <tr key={key}>
                                <th scope="row">{trustyPost.id.toString()}</th>
                                <td>{trustyPost.title}</td>
                                <td>{trustyPost.content}</td>
                                <td>{trustyPost.url}</td>
                                <td>{trustyPost.owner}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

            </div>
        );
    }
}

export default Main;
