// Load jquery to index
$(document).ready(function () {
  $(".error").hide();

  // Insures tweets cannot inject code
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (object) {
    return $(`
    <article class="tweet">
      <div class="head">
        <div class="left">
          <div class="icon"><img id="icon" src=${object.user.avatars}></div>
          <div class="name">${object.user.name}</div>
        </div>
        <div class="right">
          <div class="handle">${object.user.handle}</div>
        </div>
      </div>
      <content>${escape(object.content.text)}</content>
      <footer>
        <div class="datepost">
          ${timeago.format(object.created_at)}
        </div>
        <div class="bottomright">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
    `);
  };

  // loops through tweets and adds them on to page in descending order
  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $(".tweet-section").prepend($tweet);
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

  //posts tweets when submit clicked unless errors are made
  $("form").submit(function (event) {
    event.preventDefault();
    if ($("textarea").val().length === 0) {
      $(".error-area").text("Tweets can't be empty.");
      return $(".error").show("slow");
    } else if ($("textarea").val().length > 140) {
      $(".error-area").text("Can't post over 140 characters.");
      return $(".error").show("slow");
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets/",
        data: $(this).serialize(),
      });
    }
    location.reload(true);
  });

  loadTweets();
});
