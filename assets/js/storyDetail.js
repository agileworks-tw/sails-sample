$(function() {

  // fileUpload
  $("body").delegate(".uploadBtn", "change", function() {
    $(".fileUpload > span").text("Upload photos(" + $("input.upload").get(0).files.length + ")");
  }); // end fileUpload

  // var myInput = document.getElementById('imgUpload');
  // function sendPic() {
  //   var file = myInput.files[0];
  //
  //   // Send file here either by adding it to a `FormData` object
  //   // and sending that via XHR, or by simply passing the file into
  //   // the `send` method of an XHR instance.
  // }
  // myInput.addEventListener('change', sendPic, false);

});
