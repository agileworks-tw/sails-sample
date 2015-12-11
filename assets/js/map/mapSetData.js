var _latitude = 51.541216;
var _longitude = -0.095678;
var jsonPath = '../../json/real-estate.json.txt';
// Load JSON data and create Google Maps
$.getJSON(jsonPath)
  .done(function(json) {
    createHomepageGoogleMap(_latitude,_longitude,json);
  })
  .fail(function( jqxhr, textStatus, error ) {
    console.log(error);
  });
// Set if language is RTL and load Owl Carousel
$(window).load(function(){
  var rtl = false; // Use RTL
  initializeOwl(rtl);
});
autoComplete();
