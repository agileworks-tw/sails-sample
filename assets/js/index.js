//
var myApp = new Framework7({
  modalTitle: 'Framework7',
  animateNavBackIcon: true,
  template7Pages: true,
  pushState: true,
  swipeBackPage: false,
  init: false,
});

// Expose Internal DOM library
var $$ = Framework7.$;

// Add main view
var mainView = myApp.addView('.view-main', {
  // Enable Dynamic Navbar for this view
  dynamicNavbar: true,
});

$$(document).on('pageInit', '.page[data-page="hobbyPage"]', function(e) {
  console.log("!!!!!!!!");
  var storedData = myApp.formToJSON('#hobbySelect');
  myApp.formStoreData('hobbySelect', storedData);
  $$("#nextSetp").attr("data-context", JSON.stringify(storedData));
  console.log($$("#nextSetp").attr("data-context"));
  if (storedData.hobby.length > 0) {
    $$('#nextSetp').removeAttr("disabled");
  } else {
    $$('#nextSetp').attr("disabled", true);
  }

  $$('.hobbyitem').click(function() {
    if ($$(this).find('input').prop("checked")) {
      $$(this).find('.checked').hide();
      $$(this).find('input').prop("checked", false);
    } else {
      $$(this).find('.checked').show();
      $$(this).find('input').prop("checked", true);
    }

    storedData = myApp.formToJSON('#hobbySelect');
    myApp.formStoreData('hobbySelect', storedData);
    $$("#nextSetp").attr("data-context", JSON.stringify(storedData));
    if (storedData.hobby.length > 0) {
      $$('#nextSetp').removeAttr("disabled");
    } else {
      $$('#nextSetp').attr("disabled", true);
    }
  });
});

$$(document).on('pageInit', '.page[data-page="finish"]', function(e) {

  var hobby = myApp.formGetData('hobbySelect').hobby[0];
  console.log(hobby);
  if (!hobby) {
    mainView.router.loadPage('#')
  }
  var emailInput = $$('input[name="email"]');
  var submitBtn = $$('input[name="submit"]');
  submitBtn.prop("disabled", true)
  emailInput.on('input', function() {
    if ($$(this).val() != "")
      submitBtn.removeAttr("disabled");
    else
      submitBtn.attr("disabled", true);
  });

  $$('#singUp-form').on('submitted', function(e) {
    if (e.detail.data == 'ok') {
      location.href = '/'
    }
  });

  $$('#singUp-form').on('submitError', function(e) {
    console.log(e);
    myApp.alert('Your email address has already been used.', 'Error');
  });

});


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


$$(document).on('pageInit', '.page[data-page="storyCategory"]', function(e) {
  $$('.hobbyitem').click(function() {
    if ($$(this).find('input').prop("checked"))
      $$(this).find('input').prop("checked", false);
    else
      $$(this).find('input').prop("checked", true);

    var storedData = myApp.formToJSON('#storyCategoryChoose');
    myApp.formStoreData('storyCategoryChoose', storedData);

    var id = $$(this).find('input').val();
    mainView.router.loadPage('/storyDetail/' + id)
    console.log(storedData);
    // if(storedData.hobby != "" && storedData.hasOwnProperty('hobby') ) {
    //   $$('#nextSetp2').removeAttr("disabled");
    // }else{
    //   $$('#nextSetp2').attr("disabled",true);
    // }
  });
});


$$(document).on('pageInit', '.page[data-page="storyDetail"]', function(e) {

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
    console.log(storedData);
    myApp.formStoreData('storyDetailChoose', storedData);

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
    // $("body").delegate(".uploadBtn", "change", function() {
    console.log("!!!" + $(this).val());
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

    var formMode = myApp.formGetData('storyModeChoose');
    var formHobby = myApp.formGetData('storyCategoryChoose');
    var detail = myApp.formGetData('storyDetailChoose');

    var data = {};
    data.mode = formMode.mode;
    data.hobby = formHobby.hobby;
    data.detail = detail;

    if (!data.mode) {
      myApp.hideIndicator();
      myApp.alert("", "Please try again due to Internet issues :(");
      mainView.router.loadPage('/story');
      return false;
    }

    if (!data.hobby) {
      myApp.hideIndicator();
      myApp.alert("", "Please try again due to Internet issues :(");
      mainView.router.loadPage('/storyCategory');
      return false;
    }

    if (!data.detail || data.detail.title == "") {
      myApp.hideIndicator();
      myApp.alert("Don't forget to enter a nice title :)", "Error");
      return false;
    }

    // By default give today to startDate if use hasn't selsect period.
    if (!data.detail.startDate) {
      var now = new Date();
      data.detail.startDate = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
    }

    // re-assembling date period field.
    data.detail.startDate = $("#calendar-postPeriod").val().split(" - ")[0];
    data.detail.endDate = $("#calendar-postPeriod").val().split(" - ")[1];

    if (!data.detail.price || data.detail.price == "") {
      myApp.hideIndicator();
      myApp.alert("Please give your item/service a nice price :)", "Error")
      return false;
    }

    var location = {};
    navigator.geolocation.getCurrentPosition(GetLocationAndSubmit, GetNoGPSOrGetErr);

    function GetLocationAndSubmit(loc) {
      console.log(loc);
      location = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        accuracy: loc.coords.accuracy
      }
      data.location = location;

      console.log(JSON.stringify(data));

      var imageCount = $("input.uploadBtn").get(0).files.length;
      if ((imageCount != null) && (imageCount > 0)) {
        saveImagesAndPost(data);
      } else {
        savePost(data);
      }
    } // end GetLocationAndSubmit

    function GetNoGPSOrGetErr() {
      myApp.hideIndicator();
      myApp.alert('Due to internet connection issues, please try again later or check you GPS status. thank you.', 'Error');

    } // end GetNoGPS

  }); // end finishStep-click

}); // end storyDetail-pageInit


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
      myApp.hideIndicator();
      data.images = result[0].src;
      savePost(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      myApp.hideIndicator();
      myApp.alert('due to internet issues, upload image failed.', 'Error');
      console.log(xhr.status);
      console.log(thrownError);
    }
  }); // end ajax
}; // end saveImages


// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function(e) {
  myApp.showIndicator();
});
$$(document).on('ajaxComplete', function() {
  myApp.hideIndicator();
});


/* ===== Change statusbar bg when panel opened/closed ===== */
$$('.panel-left').on('open', function() {
  $$('.statusbar-overlay').addClass('with-panel-left');
});
$$('.panel-right').on('open', function() {
  $$('.statusbar-overlay').addClass('with-panel-right');
});
$$('.panel-left, .panel-right').on('close', function() {
  $$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});

myApp.init();
