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


$$(document).on('pageInit pageReInit', '.page[data-page="postDetailF7"]', function(e) {
  // var id = $$("input#itemId").val();
  // $$("iframe#item").src = "/postDetail/" + id;
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.5&appId=915539495181624";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
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

  $$('.hobbyItem').click(function() {
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
  }); // end click

}); // end hobbyPage

//
// $$(document).on('pageInit', '.page[data-page="finish"]', function(e) {
//
//   var hobby = myApp.formGetData('hobbySelect').hobby;
//   console.log("selected hobbys=>", hobby);
//
//   if (!hobby || !hobby[0]) {
//     window.location.replace(window.location.pathname + window.location.search);
//   }
//
//   checkRegion();
//
//   window.mainView.hideNavbar();
//   window.mainView.hideToolbar();
//
//   $$(document).click("#submit", function(e) {
//     e.preventDefault();
//     var email = $$('input[name="email"]').val();
//     if (email) {
//       if (email.length == 0) {
//         myApp.alert('Enter your EMAIL please :)', 'Woops!');
//         return false;
//       }
//     }
//     var region = $$("#regionSelect").val();
//     if (region != "請選擇地區" || region != "Where are you?") {
//       addressToLatLng(region);
//     } else {
//       //   getGeoIpLocation();
//       myApp.alert('We need to know where are you to provide the best user experience :)', 'Woops!');
//       return false;
//     }
//   }); // end click
//
//   function checkRegion() {
//     var list;
//
//     if (getRegion() == "zh-TW") {
//       list = [
//         "請選擇地區", "基隆市", "台北市", "新北市", "宜蘭縣", "新竹市", "新竹縣", "桃園市",
//         "苗栗縣", "台中市", "彰化縣", "南投縣", "嘉義市", "嘉義縣", "雲林縣",
//         "台南市", "高雄市", "屏東縣", "台東縣", "花蓮縣", "金門縣", "連江縣", "澎湖縣"
//       ];
//     } else if (getRegion() == "en-us") {
//       list = [
//         "Where are you?", "Bath", "Birmingham", "Bradford", "Brighton & Hove", "Bristol", "Cambridge",
//         "Canterbury", "Carlisle", "Chester", "Chichester", "Coventry", "Derby",
//         "Durham", "Ely", "Exeter", "Gloucester", "Hereford", "Kingston upon Hull",
//         "Lancaster", "Leeds", "Leicester", "Lichfield", "Lincoln", "Liverpool",
//         "City of London", "Manchester", "Newcastle upon Tyne", "Norwich", "Nottingham", "Oxford",
//         "Peterborough", "Plymouth", "Portsmouth", "Preston", "Ripon", "Salford",
//         "Salisbury", "Sheffield", "Southampton", "St Albans", "Stoke-on-Trent", "Sunderland",
//         "Truro", "Wakefield", "Wells", "Westminster", "Winchester", "Wolverhampton",
//         "Worcester", "York", "Armagh", "Belfast", "Londonderry", "Lisburn",
//         "Newry", "Aberdeen", "Dundee", "Edinburgh", "Glasgow", "Inverness",
//         "Stirling", "Perth", "Bangor", "Cardiff", "Newport", "St. David's",
//         "Swansea",
//       ];
//     }
//     setOption(list);
//   }
//
//   function getRegion() {
//     var region = navigator.language;
//     return region;
//   }
//
//   function setOption(list) {
//     $.each(list, function(i, value) {
//       $('#regionSelect').append("<option value='" + value + "'>" + value + "</option>");
//       $("#regionSelect").trigger('change');
//     });
//   }
//
//   function addressToLatLng(addr) {
//     var jsUrl = "http://maps.google.com/maps/api/js?libraries=places";
//     $.getScript(jsUrl)
//       .done(function(script, textStatus) {
//         var geocoder = new google.maps.Geocoder();
//         geocoder.geocode({
//           "address": addr
//         }, function(results, status) {
//           if (status == google.maps.GeocoderStatus.OK) {
//             var latitude = results[0].geometry.location.lat();
//             var longitude = results[0].geometry.location.lng();
//             var location = {
//               latitude: latitude,
//               longitude: longitude
//             };
//             submitSingUpForm(location);
//           // } else {
//           //   // if no result than use geoip
//           //   getGeoIpLocation();
//           }
//         });
//       }); // end getscript
//   }; // end addressToLatLng
//
//   function getGeoIpLocation() {
//     $$.ajax({
//       url: 'http://ip-api.com/json/',
//       type: 'POST',
//       dataType: 'jsonp',
//       success: function(loc) {
//         var geoLoc = JSON.parse(loc);
//         var latitude = geoLoc.lat;
//         var longitude = geoLoc.lon;
//         var location = {
//           latitude: latitude,
//           longitude: longitude
//         };
//         submitSingUpForm(location);
//       }
//     }); // end ajax
//   }; // end getGeoIpLocation
//
//   function submitSingUpForm(location) {
//     console.log("location=>", location);
//     var email = $("input[name='email']").val();
//     var hobby = $("input[name='hobby']").val();
//     var data = {
//       hobby: hobby,
//       location: location
//     };
//     if (email) {
//       data.email = email;
//     }
//     console.log("regForm data=>", data);
//
//     jQuery.ajax({
//       url: '/updateHobbyAndMail',
//       type: 'POST',
//       data: data,
//       success: function(data) {
//         // if (data == "ok") {
//         window.location.href = 'main';
//         // }
//       },
//       error: function(err) {
//         console.log(err);
//         window.myApp.alert('Your email address has already been used.', 'OH-NO!');
//       }
//     }); // end ajax
//   }; // end submitSingUpForm
//
// }); // end page-finish


$$(document).on('pageInit', '.page[data-page="storyCategory"]', function(e) {
  $$('.hobbyItem').click(function() {
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
  // $$(".page-content").css("padding-bottom", "72px");

  $$(".favoriteView").click(function() {
    $("#favoriteView").load("/favorites");
  });

  $$("a.searchView.tab-link").click(function() {
    $$("#searchView > .page-content").addClass("active");
  });

  $$("a.favoriteView.tab-link").click(function() {
    $$("#favoriteView > .page-content").addClass("active");
    $$("#searchView > .page-content").removeClass("active");
    $$("#profileView > .page-content").removeClass("active");
  });

  $$("a.profileView.tab-link").click(function() {
    $$("#profileView > .page-content").addClass("active");
    $$("#searchView > .page-content").removeClass("active");
    $$("#favoritetView > .page-content").removeClass("active");
  });

});


$$(document).on('click', '.link.like', function() {
  var fav = $$(this);
  var id = fav.attr("data-id");
  console.log("favboxa id=>", id);
  $$.ajax({
    url: "/addUserFavorite/" + id,
    type: "POST",
    success: function(result) {
      console.log(result);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("xhr.status,thrownError=>", xhr.status, thrownError);
      mainView.router.loadPage('/story');
    }
  }); // end ajax
});


$$(document).on('click', '.item-link', function(e) {
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


/*hobby page back to top */

// fade in #back-top
$(".page-content.active").scroll(function() {
  if ($(this).scrollTop() > 100) {
    $('#back-top').fadeIn();
  } else {
    $('#back-top').fadeOut();
  }
});

// scroll body to 0px on click
$('#back-top').click(function() {
  $(".page-content.active").animate({
    scrollTop: 0
  }, 400);
  return false;
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
