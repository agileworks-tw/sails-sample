$(document).ready(function() {

  // fileUpload
  $("body").delegate(".uploadBtn", "change", function() {
    $(".fileUpload > span").text("Upload photos("+$("input.upload").get(0).files.length+")");
  }); // end fileUpload

});
