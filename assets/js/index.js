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

$$(document).on('pageInit', '.page[data-page="hobbyPage"]', function (e) {
  console.log("!!!!!!!!");
  var storedData = myApp.formToJSON('#hobbySelect');
  myApp.formStoreData('hobbySelect',storedData);
  $$("#nextSetp").attr("data-context",JSON.stringify(storedData));
  console.log($$("#nextSetp").attr("data-context"));
  if(storedData.hobby.length > 0) {
    $$('#nextSetp').removeAttr("disabled");
  }else{
    $$('#nextSetp').attr("disabled",true);
  }

  $$('.hobbyitem').click(function(){
    if($$(this).find('input').prop("checked")){
      $$(this).find('.checked').hide();
      $$(this).find('input').prop("checked", false);
    }else{
      $$(this).find('.checked').show();
      $$(this).find('input').prop("checked", true);
    }

    storedData = myApp.formToJSON('#hobbySelect');
    myApp.formStoreData('hobbySelect',storedData);
    $$("#nextSetp").attr("data-context",JSON.stringify(storedData));
    if(storedData.hobby.length > 0) {
      $$('#nextSetp').removeAttr("disabled");
    }else{
      $$('#nextSetp').attr("disabled",true);
    }
  });
});

$$(document).on('pageInit', '.page[data-page="finish"]', function (e) {

  var hobby =  myApp.formGetData('hobbySelect').hobby[0];
  console.log(hobby);
  if( !hobby ){
    mainView.router.loadPage('#')
  }
  var emailInput = $$('input[name="email"]');
  var submitBtn = $$('input[name="submit"]');
  submitBtn.prop("disabled",true)
  emailInput.on('input', function(){
    if($$(this).val() != "" )
      submitBtn.removeAttr("disabled");
    else
      submitBtn.attr("disabled",true);
  });

  $$('#singUp-form').on('submitted', function (e) {
    if(e.detail.data == 'ok'){
      location.href = '/'
    }
  });

  $$('#singUp-form').on('submitError', function (e) {
    console.log(e);
    myApp.alert('Your email address has already been used.','Error');
  });

});


$$(document).on('pageInit', '.page[data-page="storyMode"]', function (e) {
  $$('.selectMode').click(function(){
    if($$(this).find('input').prop("checked")){
      $$(this).find('input').prop("checked", false);
    }else{
      $$(this).find('input').prop("checked", true);
    }


    var storedData = myApp.formToJSON('#storyModeChoose');
    myApp.formStoreData('storyModeChoose',storedData);

    mainView.router.loadPage('/storyCategory')
    // if(storedData.mode != ""  && storedData.hasOwnProperty('mode')) {
    //   $$('#nextSetp').removeAttr("disabled");
    // }else{
    //   $$('#nextSetp').attr("disabled",true);
    // }
  });
});


$$(document).on('pageInit', '.page[data-page="storyCategory"]', function (e) {
  $$('.hobbyitem').click(function(){
    if($$(this).find('input').prop("checked"))
      $$(this).find('input').prop("checked", false);
    else
      $$(this).find('input').prop("checked", true);

    var storedData = myApp.formToJSON('#storyCategoryChoose');
    myApp.formStoreData('storyCategoryChoose',storedData);

    var id = $$(this).find('input').val();
    mainView.router.loadPage('/storyDetail/'+id)
    console.log(storedData);
    // if(storedData.hobby != "" && storedData.hasOwnProperty('hobby') ) {
    //   $$('#nextSetp2').removeAttr("disabled");
    // }else{
    //   $$('#nextSetp2').attr("disabled",true);
    // }
  });
});


$$(document).on('pageInit', '.page[data-page="storyDetail"]', function (e) {

  $$('.radioItem').click(function(){
    $$('.checked').hide();
    $$("input[name='item']").val("");
    if($$(this).find('input').prop("checked")){
      $$(this).find('.checked').hide();
      $$(this).find('input').prop("checked", false);
    }else{
      $$(this).find('.checked').show();
      $$(this).find('input').prop("checked", true);
    }

    console.log(storedData);
    var storedData = myApp.formToJSON('#storyDetailChoose');
    myApp.formStoreData('storyDetailChoose',storedData);

  });

  $$("input[name='item']").on('input', function(){
    var radioItem = $$("input[name='radioItem']");
    radioItem.prop("checked", false);
    $$('.checked').hide();
    var storedData = myApp.formToJSON('#storyDetailChoose');
    myApp.formStoreData('storyDetailChoose',storedData);

  });

  $$("input[name='title']").on('input', function(){
    var storedData = myApp.formToJSON('#storyDetailChoose');
    myApp.formStoreData('storyDetailChoose',storedData);
  });

  $$('#finishStep').click(function(){
    // {"mode":"give","hobby":"1","detail":{"title":"123","radioItem":"2","item":""},
    // "location":{"latitude":24.148657699999998,"longitude":120.67413979999999,"accuracy":30}}
    myApp.showIndicator();

    var mode =  myApp.formGetData('storyModeChoose').mode;
    var hobby =  myApp.formGetData('storyCategoryChoose').hobby;
    var detail =  myApp.formGetData('storyDetailChoose');

    var data = {
      mode,
      hobby,
      detail
    };

    if(!data.mode){
      myApp.alert("","Error")
      location.href = '/story'
      return false;
    }

    if(!data.hobby){
      myApp.alert("","Error")
      location.href = '/story'
      return false;
    }
    if(data.detail.title == ""){
      myApp.alert("Please enter a title","Error")
      return false;
    }

    var location = {};
    navigator.geolocation.getCurrentPosition(GetLocationAndSubmit);

    function GetLocationAndSubmit(loc) {
      console.log(loc);
      location = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        accuracy: loc.coords.accuracy
      }
      data.location = location;
      console.log(JSON.stringify(data));

      $$.ajax({
        url: "/postStory",
        type:"POST",
        data : data,
        success: function(result){
          console.log(result);
          window.location.href = '/';
          myApp.hideIndicator();
        },
        error:function(xhr, ajaxOptions, thrownError){
          myApp.alert('Due to internet connection issues, please try again later or check you GPS status. thank you.','Error');
          console.log(xhr.status);
          console.log(thrownError);
        }
      });
    }
  });
});


// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function (e) {
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    myApp.hideIndicator();
});


/* ===== Change statusbar bg when panel opened/closed ===== */
$$('.panel-left').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-left');
});
$$('.panel-right').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-right');
});
$$('.panel-left, .panel-right').on('close', function () {
    $$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});

myApp.init();
