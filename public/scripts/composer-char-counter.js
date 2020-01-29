$(document).ready(function() {
  $("#tweet").keydown(function(e) {
    let numberOfChar = $(this).val().length;
    let counter = 140;
    let result = counter - numberOfChar;
    $(".counter").text(result);
    if (result < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "#545149");
    }
  });
});
