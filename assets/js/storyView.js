
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// story page - storyView
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// give/take mode select
$$(document).on('pageInit', '.page[data-page="storyMode"]', function(e) {
  $$('.selectMode').click(function() {
    if ($$(this).find('input').prop("checked")) {
      $$(this).find('input').prop("checked", false);
    } else {
      $$(this).find('input').prop("checked", true);
    }
    var storedData = myApp.formToJSON('#storyModeChoose');
    myApp.formStoreData('storyModeChoose', storedData);

    mainView.router.loadPage('/storyCategory')
      // if(storedData.mode != ""  && storedData.hasOwnProperty('mode')) {
      //   $$('#nextSetp').removeAttr("disabled");
      // }else{
      //   $$('#nextSetp').attr("disabled",true);
      // }
  });
});


$$(document).on('pageInit', '.page[data-page="storyDetail"]', function(e) {

  // if no hobby...
  var category = myApp.formGetData('storyCategoryChoose');
  if (!category.hobby) {
    mainView.router.loadPage('/storyCategory');
    return false;
  }
  console.log("category=>", category);

  // if no mode
  var postMode = myApp.formGetData('storyModeChoose');
  if (!postMode.mode) {
    mainView.router.loadPage('/story');
    return false;
  }
  console.log("postMode=>", postMode);

  // init f7-calendar
  var now = new Date();
  // set a range time picker
  var calendarStartDate = myApp.calendar({
    input: '#calendar-postPeriod',
    rangePicker: true,
    disabled: function(date) {
      // enable today
      if (date.getFullYear() == now.getFullYear() &&
        date.getMonth() == now.getMonth() &&
        date.getDate() == now.getDate()) {
        return false;
      }
      // only enable future time
      if (date.getTime() < now.getTime()) {
        return true;
      } else {
        return false;
      }
    },
  });

  // category selects
  $$('.radioItem').click(function() {
    $$('.checked').hide();
    $$("input[name='item']").val("");
    if ($$(this).find('input').prop("checked")) {
      $$(this).find('.checked').hide();
      $$(this).find('input').prop("checked", false);
    } else {
      $$(this).find('.checked').show();
      $$(this).find('input').prop("checked", true);
    }

    var storedData = myApp.formToJSON('#storyDetailChoose');
    myApp.formStoreData('storyDetailChoose', storedData);
    console.log("storedData=>", storedData);
  });

  $$("input[name='item']").on('input', function() {
    var radioItem = $$("input[name='radioItem']");
    radioItem.prop("checked", false);
    $$('.checked').hide();
    var storedData = myApp.formToJSON('#storyDetailChoose');
    myApp.formStoreData('storyDetailChoose', storedData);
  });

  $$("input[name='title']").on('input', function() {
    var storedData = myApp.formToJSON('#storyDetailChoose');
    myApp.formStoreData('storyDetailChoose', storedData);
  });

  $$("textarea[name='content']").on('input', function() {
    var storedData = myApp.formToJSON('#storyDetailChoose');
    myApp.formStoreData('storyDetailChoose', storedData);
  });

  $$("input[name='postPeriod']").on('change', function() {
    var storedData = myApp.formToJSON('#storyDetailChoose');
    myApp.formStoreData('storyDetailChoose', storedData);
    console.log("period=>", $(this).val());
  });

  $$("input[name='image']").on('change', function() {
    var storedData = myApp.formToJSON('#storyDetailChoose');
    myApp.formStoreData('storyDetailChoose', storedData);
  });

  $$("input[name='price']").on('input', function() {
    var storedData = myApp.formToJSON('#storyDetailChoose');
    myApp.formStoreData('storyDetailChoose', storedData);
  });

  $$('#finishStep').click(function() {
    // {"mode":"give","hobby":"1","detail":{"title":"123","radioItem":"2","item":""},
    // "location":{"latitude":24.148657699999998,"longitude":120.67413979999999,"accuracy":30}}
    myApp.showIndicator();

    var postMode = myApp.formGetData('storyModeChoose');
    var category = myApp.formGetData('storyCategoryChoose');
    var detail = myApp.formGetData('storyDetailChoose');

    var data = {};
    data.mode = postMode.mode;
    data.hobby = category.hobby;
    data.detail = detail;

    // post title
    if (!data.detail.title || data.detail.title == "") {
      myApp.hideIndicator();
      myApp.alert("Don't forget to enter a nice title :)", "Oops!");
      return false;
    }

    // post price
    if (!data.detail.price || data.detail.price == "") {
      myApp.hideIndicator();
      myApp.alert("Please give your item/service a nice price :)", "Oops!")
      return false;
    }

    // post category
    if (!data.detail.radioItem) {
      myApp.hideIndicator();
      myApp.alert("Please select a category :)", "Oops!");
      return false;
    }

    // post date period
    // By default give today to startDate if use hasn't selsect period.
    if (!data.detail.startDate || data.detail.startDate == undefined) {
      var now = new Date();
      data.detail.startDate = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
    } else {
      // re-assembling date period field.
      data.detail.startDate = $("#calendar-postPeriod").val().split(" - ")[0];
      data.detail.endDate = $("#calendar-postPeriod").val().split(" - ")[1];
    }

    /*---------------------- get user location ----------------------*/
    var location = {};
    navigator.geolocation.getCurrentPosition(
      getLocSuccess,
      getLocError,
      options);

    var options = {
      enableHighAccuracy: true,
      timeout: 2500,
      maximumAge: 2500
    };

    // if html5 geo api works then submit.
    function getLocSuccess(loc) {
      console.log("html5 location=>", loc);
      location = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        accuracy: loc.coords.accuracy
      }
      data.location = location;
      submit();
    } // end GetLocationAndSubmit

    // if html5 geo api failed then use geoIp for instead.
    function getLocError(err) {
      $$.ajax({
        url: 'http://ip-api.com/json/',
        type: 'POST',
        dataType: 'jsonp',
        success: function(loc) {
          console.log("geoip location=>", loc);
          location = {
            latitude: loc.lat,
            longitude: loc.lon,
            accuracy: 5000
          }
          data.location = location;
          submit();
        },
        error: function(err) {
          // to-do
          // if get geoip's data failed then give a default loaciotn from user setting.
        }
      }); // end ajax
    } // end error

    // submit depends on image upload.
    function submit() {
      console.log("data before submit=>", (data));
      var imageCount = $("input.uploadBtn").get(0).files.length;
      if ((imageCount != null) && (imageCount > 0)) {
        saveImagesAndPost(data);
      } else {
        savePost(data);
      }
    }; // end submit

    function savePost(data) {
      // save post
      $$.ajax({
        url: "/postStory",
        type: "POST",
        data: data,
        success: function(result) {
          console.log(result);
          myApp.formDeleteData('storyModeChoose');
          myApp.formDeleteData('storyCategoryChoose');
          myApp.formDeleteData('storyDetailChoose');
          window.location.href = '/main';
          myApp.hideIndicator();
        },
        error: function(xhr, ajaxOptions, thrownError) {
          myApp.hideIndicator();
          myApp.alert('Due to internet connection issues, please try again later or check you GPS status. thank you.', 'Error');
          console.log(xhr.status);
          console.log(thrownError);
        }
      }); // end ajax
    }; // end savePost

    function saveImagesAndPost(data) {
      // submit to upload post image.
      var formData = new FormData($('form')[1]);
      console.log("formData", formData);
      $$.ajax({
        url: "/api/uploadImage",
        type: "POST",
        data: formData,
        cache: false,
        dataType: "json",
        contentType: false,
        processData: false,
        success: function(result) {
          data.images = result[0].src;
          savePost(data);
        },
        error: function(xhr, ajaxOptions, thrownError) {
          myApp.hideIndicator();
          myApp.alert('due to internet issues, upload image failed. please try it again.', 'Error');
          console.log(xhr.status);
          console.log(thrownError);
        }
      }); // end ajax
    }; // end saveImages
  }); // end finishStep-click


}); // end pageInit-storyDetail


// post's image-fileinput
$(function() {

  // using delegate to support multi-fileinput
  $("body").delegate("input[name='image']", "change", function() {

    var input = $(this);
    console.log(input);

    // shows count
    $("div.fileUpload-btn > span").text("Upload photos(" + input.get(0).files.length + ")");

    // preview selected pic.
    var reader = new FileReader();
    reader.onload = function(e) {
      // console.log("e.target.result=>", e.target.result);
      // $('img.preview').show('fast', function() {
      $('img.preview').attr('src', e.target.result);
      // });
    }
    reader.readAsDataURL(input.get(0).files[0]);

  }); // end fileUpload

});
