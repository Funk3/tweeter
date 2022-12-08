// Load jquery to index
$(document).ready(function () {
  const createTweetElement = function (object) {
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
    <div class="timeago" datetime="2016-06-30 09:20:00"></div>
      ${timeago.format(object.created_at)}
    </div>
    <div class="bottomright">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`);
  };

  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweet-container").append($tweet);
    }
  };

  const loadTweets = function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/tweets",
      success: renderTweets,
      dataType: "json",
    });
  };

  $("form").submit(function (event) {
    event.preventDefault();
    console.log($("textarea").val().length);
    if ($("textarea").val().length === 0) {
      alert("You need to enter something to make a tweet");
    } else if ($("textarea").val().length > 140) {
      alert(
        "You have too many characters, please submit when it is 140 or less!"
      );
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets/",
        data: $(this).serialize(),
      });
    }
  });

  loadTweets();
});
