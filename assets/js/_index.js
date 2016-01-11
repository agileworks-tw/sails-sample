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
window.myApp = myApp;

// Expose Internal DOM library
window.$$ = Framework7.$;

// Add main view
var mainView = myApp.addView('.view-main', {
  // Enable Dynamic Navbar for this view
  dynamicNavbar: true,
});
window.mainView = mainView;


// $$(document).on('pageInit pageReInit', '.page[data-page="postDetailF7"]', function(e) {
//   var id = $$("input#itemId").val();
//   $$("iframe#item").src = "/postDetail/" + id;
// });


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
        var longitude = geoLoc.lon;
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
        window.myApp.alert('Your email address has already been used.', 'OH-NO!');
      }
    }); // end ajax
  }; // end submitSingUpForm

}); // end page-finish


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


$$(document).on('pageInit', '.page[data-page="home"]', function(e) {
  // hotfix for page home's page-content class.
  // this can overrides f7's setting.
  $$(".page-content").css("padding-bottom","72px");

  $$(".favoriteView").click(function() {
    $("#favoriteView").load("/favorites");
  });

});


$$(document).on('click','.link.like',function(){
  var fav = $$(this);
  var id = fav.attr("data-id");
  console.log("favboxa id=>",id);
  $$.ajax({
    url: "/addUserFavorite/" + id,
    type: "POST",
    success: function(result) {
      console.log(result);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("xhr.status,thrownError=>",xhr.status,thrownError);
      mainView.router.loadPage('/story');
    }
  }); // end ajax
});


$$(document).on('click', '.item-link', function(e){
  console.log("item clicked");
  $$("iframe#mapView").src = $$(this).attr("data-url");
});


// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function(e) {
  window.myApp.showIndicator();
});
$$(document).on('ajaxComplete', function() {
  window.setTimeout(function() {
    window.myApp.hideIndicator();
  }, 500);
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
