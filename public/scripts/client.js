/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     user: {
//       name: "Newton",
//       avatars: "https://i.imgur.com/73hZDYK.png",
//       handle: "@SirIsaac"
//     },
//     content: {
//       text:
//         "If I have seen further it is by standing on the shoulders of giants"
//     },
//     created_at: 1580152151552
//   },
//   {
//     user: {
//       name: "Descartes",
//       avatars: "https://i.imgur.com/nlhLi3I.png",
//       handle: "@rd"
//     },
//     content: {
//       text: "Je pense , donc je suis"
//     },
//     created_at: 1580254875421
//   }
// ];

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
  <p class="tweet-content">${tweet.content.text}
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
      console.log("Button clicked, performing ajax call...");
      console.log($tweet);
      if ($tweet === 0) {
        alert("Cannot post blank Tweet");
      } else if ($tweet > 140) {
        alert("Tweet too long.. control your thoughts");
      } else {
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
    $(".new-tweet").css("display", "block");
  });
});
