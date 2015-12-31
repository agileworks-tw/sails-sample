//
var myApp = new Framework7({
  modalTitle: 'Framework7',
  animateNavBackIcon: true,
  template7Pages: true,
  pushState: true,
  swipeBackPage: false,
  init: false,
  imagesLazyLoadSequential: true,
  imagesLazyLoadThreshold: 50
});

// Expose Internal DOM library
var $$ = Framework7.$;

// Add main view
var mainView = myApp.addView('.view-main', {
  // Enable Dynamic Navbar for this view
  dynamicNavbar: true,
});


$$(document).on('pageInit', '.page[data-page="hobbyPage"]', function(e) {
  console.log("hobbyPage!!!!!!!!");
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

}); // end hobbyPage


$$(document).on('pageInit', '.page[data-page="finish"]', function(e) {

  var hobby = myApp.formGetData('hobbySelect').hobby;
  console.log("selected hobbys=>", hobby);

  if (!hobby || !hobby[0]) {
    window.location.replace(window.location.pathname + window.location.search);
  }

  $("body").delegate("#singUp-form", "submit", function(e) {
    e.preventDefault();
    var addr = $("input[name='addr']").val();
    addressToLatLng(addr);
  }); // end on-submit

  $("body").delegate("input[name='submit']", "click", function(e) {
    e.preventDefault();
    var email = $$('input[name="email"]').val();
    console.log("email=>", email);
    if (!email || email.length == 0) {
      myApp.alert('Enter your EMAIL please :)', 'Woops!');
      return false;
    } else {
      var addr = $("input[name='addr']").val();
      if (addr) {
        addressToLatLng(addr);
      } else {
        getGeoIpLocation();
      }
    }
  });

  function addressToLatLng(addr) {
    var jsUrl = "http://maps.google.com/maps/api/js?libraries=places";
    $.getScript(jsUrl)
      .done(function(script, textStatus) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          "address": addr
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            var location = {
              latitude: latitude,
              longitude: longitude
            };
            submitSingUpForm(location);
          } else {
            // if no result than use geoip
            getGeoIpLocation();
          }
        });
      }); // end getscript
  }; // end addressToLatLng

  function getGeoIpLocation() {
    $$.ajax({
      url: 'http://ip-api.com/json/',
      type: 'POST',
      dataType: 'jsonp',
      success: function(loc) {
        var geoLoc = JSON.parse(loc);
        var latitude = geoLoc.lat;
        var longitude =  geoLoc.lon;
        var location = {
          latitude: latitude,
          longitude: longitude
        };
        submitSingUpForm(location);
      }
    }); // end ajax
  }; // end getGeoIpLocation

  function submitSingUpForm(location) {
    var email = $("input[name='email']").val();
    var hobby = $("input[name='hobby']").val();
    var data = {
      hobby: hobby,
      location: location
    };
    if (email) {
      data.email = email;
    }
    console.log("regForm data=>", data);

    jQuery.ajax({
      url: '/updateHobbyAndMail',
      type: 'POST',
      data: data,
      success: function(data) {
        // if (data == "ok") {
        window.location.href = 'main';
        // }
      },
      error: function(err) {
        console.log(err);
        myApp.alert('Your email address has already been used.', 'OH-NO!');
      }
    }); // end ajax
  }; // end submitSingUpForm

}); // end page-finish


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
    if (!data.detail.startDate || data.detail.startDate == undefined) {
      var now = new Date();
      data.detail.startDate = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
    } else {
      // re-assembling date period field.
      data.detail.startDate = $("#calendar-postPeriod").val().split(" - ")[0];
      data.detail.endDate = $("#calendar-postPeriod").val().split(" - ")[1];
    }

    if (!data.detail.price || data.detail.price == "") {
      myApp.hideIndicator();
      myApp.alert("Please give your item/service a nice price :)", "Error")
      return false;
    }

    var location = {};
    navigator.geolocation.getCurrentPosition(
      success,
      error,
      options);

    var options = {
      enableHighAccuracy: true,
      timeout: 2500,
      maximumAge: 2500
    };

    function success(loc) {
      console.log("html5 location=>", loc);
      location = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        accuracy: loc.coords.accuracy
      }
      data.location = location;
      submit();
    } // end GetLocationAndSubmit

    function error(err) {
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
          location = {
            latitude: 51.541216,
            longitude: -0.095678,
            accuracy: 5000
          }
          data.location = location;
          submit();
        }
      }); // end ajax
    } // end GetNoGPS

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
}); // end storyDetail-pageInit


// search-result
function showSearchResult(data) {
  console.log("f7 showSearchResult");
  var searchResultTemplate = $$('script#searchResult').html();
  var compiledSearchResultTemplate = Template7.compile(searchResultTemplate);
  myApp.template7Data.searchResult = data;
  $$('#search-result').html(compiledSearchResultTemplate(data));
}; // end search-result


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
