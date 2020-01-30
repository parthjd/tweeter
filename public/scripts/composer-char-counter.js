$(document).ready(function() {
  $("#tweet").keydown(function(e) {
    let numberOfChar = $(this).val().length;
    let counter = 140;
    let result = counter - numberOfChar;
    $(".counter").text(result);
    if (result < 0) {
      $(".counter").css("color", "red");
      $(".validation").css("display", "inline-block");
      $(".warning").css("display", "none");
      $("textarea").css("border", "2px solid red");
    } else {
      $(".counter").css("color", "#545149");
      $(".validation").css("display", "none");
      $(".warning").css("display", "none");
      $("textarea").css("border", "1px solid blue");
      $("textarea").css("border-bottom", "4px solid black");
    }
  });
});
