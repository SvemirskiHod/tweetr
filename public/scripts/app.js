/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 "use strict";

const createTweetElement = function (tweetData) { //Returns HTML in string that is the body of the tweet

  let userName = tweetData.user.name;
  let handle = tweetData.user.handle;
  let tweetMessage = tweetData.content.text;
  let image = tweetData.user.avatars.regular;
  let date = new Date(tweetData["created_at"]).toLocaleString();
  let $tweet =
      `<article class="tweet">
        <header>
          <img src="${image}" alt="image">
            <strong class="name">${userName}</strong>
            <span class="handle"> ${handle}</span>
        </header>
        <div class="tweetMessage">${tweetMessage}</div>
        <footer>
          <span class="timeStamp">
            ${date}
          </span>
          <span class="iconRow">
            <i class="fa fa-flag"></i>
            <i class="fa fa-retweet"></i>
            <i class="fa fa-heart"></i>
          </span>
        </footer>
      </article>`;
  return $tweet;
}

const renderTweet = function (tweetData) { // Uses the returned String from previous function and publishes it as a tweet
  tweetData.sort(function (a, b){
    if (a["created_at"] < b["created_at"]){
      return 1;
    }
    if (a["created_at"] > b["created_at"]){
      return -1;
    }
  });
  tweetData.forEach(function(tweet){
    $('#tweetContainer').append(createTweetElement(tweet));
  });
}

 var loadTweets = function () {
    $.ajax({
        url: '/tweets/',
        method: 'GET',
        success: function (tweetData) {
        $("#tweetContainer").empty();
        renderTweet(tweetData);
        }
      });
  };

$("document").ready(function (){ // Code to be executed on page render

  $('#tweetForm').submit(function(event){ // Modifying behaviour of form submission
    event.preventDefault();
    let submission = $(this).serialize();
    //console.log(submission.length);
    if (submission.slice(5).length > 140){
      alert("Please ensure your tweet does not exceed 140 characters.")
    }
    else if(submission.slice(5) === ""){
      alert("Please ensure your tweet is not left blank.")
    }
    else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: submission,
        success: function(){
          loadTweets();
          $("#tweetForm textarea").val("");
          $("#tweetForm .counter").text("140");
        }
      });

    }
  })
  $("#composeButton").click(function(){
    $(".new-tweet").slideToggle(350);
      setTimeout( function(){$(".new-tweet textarea").focus()}, 350);
  });
  loadTweets();
});



