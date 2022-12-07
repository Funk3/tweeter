// Load jquery to index
$(document).ready(function() {

  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = [{
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }];

  const createTweetElement = function(object) {
    return $(`<article class="tweet">
  <div class="head">
    <div class="left">
      <div class="icon"><img src=${object.user.avatars}></div>
      <div class="name">${object.user.name}</div>
    </div>
    <div class="right">
      <div class="handle">${object.user.handle}</div>
    </div>
  </div>
  <content>${object.content.text}</content>
  <footer>
    <div class="datepost">
      ${object.created_at}
    </div>
    <div class="bottomright">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`);
  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweet-container").append($tweet);
    }
  };

  renderTweets(tweetData);
  // SUBMIT

  $("form").submit(function(event) {
    event.preventDefault()
    $.ajax({
      type: "POST",
      url: "/tweets/",
      data: $(this).serialize($("textarea")),
    })
  });
});
