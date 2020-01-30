const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let user of tweets) {
    const $tweet = createTweetElement(user);
    $(".tweet-container").prepend($tweet);
  }
};

const createTweetElement = function(tweet) {
  // ...
  let $tweet = `
  <article class="oldTweet">
  <header>
  <section class="user">
  <img class="tweet-avatar" src=${tweet.user.avatars}>
  <p class="username">${tweet.user.name}</p>
  <p class="userid">${tweet.user.handle}</p>
  </section>
  <p class="tweet-content">${escape(tweet.content.text)}
  </p>
  </header>
  <footer class="footer-user">
 <p class="days">Posted ${moment(tweet.created_at).fromNow()}</p>
  <div class="likes">
  <i class="fas fa-flag likes-icon"></i>
  <i class='fas fa-retweet likes-icon'></i>
  <i class="fas fa-heart likes-icon"></i>
  </div>
  </footer>
  </article>
  `;
  return $tweet;
};

$(document).ready(function() {
  const loadTweets = function() {
    $.ajax({
      type: "GET",
      url: " http://localhost:8080/tweets",
      data: "data",
      datatype: "json",
      success: function(data) {
        $(".tweet-container").empty();
        renderTweets(data);
      }
    });
  };
  loadTweets();

  $(function() {
    const $tweetPost = $("#post-tweet");
    $tweetPost.on("click", function(event) {
      event.preventDefault();
      let $tweet = $("#tweet").val().length;
      if ($tweet === 0) {
        $(".warning").css("display", "inline-block");
      } else if ($tweet > 140) {
        // $(".validation").css("display", "block");
        // $(".warning").css("display", "none");
      } else {
        $(".warning").css("display", "none");
        $(".validation").css("display", "none");
        $.ajax({
          type: "POST",
          url: "/tweets",
          data: $("#tweet").serialize()
        }).then(result => {
          loadTweets();
        });
      }
    });
  });

  $(".down-arrow").click(function(e) {
    e.preventDefault();
    $(".new-tweet").slideToggle("slow");
  });
});
