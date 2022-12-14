$(document).ready(function () {
  // Changes counter to red or black on length of characters in input field

  $("#tweet-text").on("input", function () {
    let thisContent = $(this).val();
    $(".counter").val(140 - thisContent.length);
    if (thisContent.length > 140) {
      $(".counter").css("color", "red");
    }
    if (thisContent.length <= 140) {
      $(".counter").css("color", "black");
    }
  });
});
