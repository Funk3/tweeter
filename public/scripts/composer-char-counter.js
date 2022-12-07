$(document).ready(function() {
  console.log("works!");

  $("#tweet-text").on("input", function() {
    let thisContent = $(this).val();
    $(".counter").val(140 - thisContent.length);
    if (thisContent.length > 140) {
      $(".counter").css("color", "red");
    }
  });
});

