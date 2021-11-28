pragma solidity ^0.5.0;

contract TrustyCommunity {
    string public name;
    mapping(uint => TrustyPost) public trustyPosts;
    uint public trustyPostCount = 0;

    constructor() public {
        name = "Trusty Community";
    }

    struct TrustyPost {
        uint id;
        string title;
        string content;
        string url;
        address owner;
        bool verified;
        string verified_rating;
    }

    event TrustyPostCreated(
        uint id,
        string title,
        string content,
        string url,
        address owner,
        bool verified,
        string verified_rating
    );

    function createTrustyPost(string memory _title,string  memory _content,string  memory _url) public {
        // Require a valid name
        require(bytes(_title).length > 0);
        require(bytes(_content).length > 0);
        require(bytes(_url).length > 0);//https://

        // Increment post count
        trustyPostCount ++;
        // Create the post
        trustyPosts[trustyPostCount] = TrustyPost(trustyPostCount, _title,_content,_url, msg.sender, false,'');
        // Trigger an event
        //verified content will be added later via python API.
        emit TrustyPostCreated(trustyPostCount, _title,_content,_url, msg.sender, false,'');
    }


}
