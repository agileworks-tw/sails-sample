// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //finish - getuseragent Browser Language
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$$(document).on('pageInit', '.page[data-page="finish"]', function(e) {

  var hobby = myApp.formGetData('hobbySelect').hobby;
  console.log("selected hobbys=>", hobby);

  if (!hobby || !hobby[0]) {
    window.location.replace(window.location.pathname + window.location.search);
  }

  checkRegion();

  window.mainView.hideNavbar();
  window.mainView.hideToolbar();

  $$(document).click("#submit", function(e) {
    e.preventDefault();
    var email = $$('input[name="email"]').val();
    if (email) {
      if (email.length == 0) {
        myApp.alert('Enter your EMAIL please :)', 'Woops!');
        return false;
      }
    }
    var region = $$("#regionSelect").val();
    if ($("#regionSelect option:selected").index()!=0) {
      addressToLatLng(region);
    } else {
      //   getGeoIpLocation();
      myApp.alert('We need to know where are you to provide the best user experience :)', 'Woops!');
      return false;
    }
  }); // end click

  function checkRegion() {
    var list;

    if (getRegion() == "zh-TW") {
      list = [
        "請選擇地區", "基隆市", "台北市", "新北市", "宜蘭縣", "新竹市", "新竹縣", "桃園市",
        "苗栗縣", "台中市", "彰化縣", "南投縣", "嘉義市", "嘉義縣", "雲林縣",
        "台南市", "高雄市", "屏東縣", "台東縣", "花蓮縣", "金門縣", "連江縣", "澎湖縣"
      ];
    } else if (getRegion() == "en-us") {
      list = [
        "Where are you?", "Bath", "Birmingham", "Bradford", "Brighton & Hove", "Bristol", "Cambridge",
        "Canterbury", "Carlisle", "Chester", "Chichester", "Coventry", "Derby",
        "Durham", "Ely", "Exeter", "Gloucester", "Hereford", "Kingston upon Hull",
        "Lancaster", "Leeds", "Leicester", "Lichfield", "Lincoln", "Liverpool",
        "City of London", "Manchester", "Newcastle upon Tyne", "Norwich", "Nottingham", "Oxford",
        "Peterborough", "Plymouth", "Portsmouth", "Preston", "Ripon", "Salford",
        "Salisbury", "Sheffield", "Southampton", "St Albans", "Stoke-on-Trent", "Sunderland",
        "Truro", "Wakefield", "Wells", "Westminster", "Winchester", "Wolverhampton",
        "Worcester", "York", "Armagh", "Belfast", "Londonderry", "Lisburn",
        "Newry", "Aberdeen", "Dundee", "Edinburgh", "Glasgow", "Inverness",
        "Stirling", "Perth", "Bangor", "Cardiff", "Newport", "St. David's",
        "Swansea",
      ];
    }
    setOption(list);
  }

  function getRegion() {
    var region = navigator.language;
    return region;
  }

  function setOption(list) {
    $.each(list, function(i, value) {
      $('#regionSelect').append("<option value='" + value + "'>" + value + "</option>");
      $("#regionSelect").trigger('change');
    });
  }

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
            // } else {
            //   // if no result than use geoip
            //   getGeoIpLocation();
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

    jQuery.ajax({
      url: '/updateHobbyAndMail',
      type: 'POST',
      data: data,
      success: function(data) {
        // if (data == "ok") {
        $$("#submit").attr("disabled", true);
        $$("#submit").css("background-color", "gray");
        $$("#submit").css("border-color", "white");
        $$("#submit").css("color", "darkgrey");
        window.location.href = 'main';
        // mainView.router.loadPage('/main');
        // }
      },
      error: function(err) {
        console.log(err);
        var msg = 'Your email address has already been used.(' + err + ")";
        window.myApp.alert(msg, 'OH-NO!');
      }
    }); // end ajax
  }; // end submitSingUpForm

}); // end page-finish
