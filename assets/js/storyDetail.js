// post's image-fileinput
$(function() {

  // using delegate to support multi-fileinput
  $("body").delegate("input.uploadBtn", "change", function() {
    // shows count
    $("div.fileUpload-btn > span").text("Upload photos(" + $(this).get(0).files.length + ")");

    // preview selected pic.
    var reader = new FileReader();
    reader.onload = function(e) {
      // console.log("e.target.result=>", e.target.result);
      $('img.preview').show('slow', function() {
          $('img.preview').attr('src', e.target.result);
      });

    }
    reader.readAsDataURL($(this).get(0).files[0]);

    // upload photo that just taken by camera
    $(this).addEventListener('change', sendPic(($this)), false);
  }); // end fileUpload

  function sendPic(fileinput) {
    var file = fileinput.files[0];

    // Send file here either by adding it to a `FormData` object
    // and sending that via XHR, or by simply passing the file into
    // the `send` method of an XHR instance.
  }

});
