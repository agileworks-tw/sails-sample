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
    if($$(this).find('input').prop("checked"))
      $$(this).find('input').prop("checked", false);
    else
      $$(this).find('input').prop("checked", true);

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
  console.log("!!!!!!!!");
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


$$(document).on('pageInit', '.page[data-page="stroryHobby"]', function (e) {
  var storedData = myApp.formToJSON('#stroryHobbyChoose');
  myApp.formStoreData('stroryHobbyChoose',storedData);
  $$("#nextSetp").attr("data-context",JSON.stringify(storedData));
  console.log($$("#nextSetp").attr("data-context"));
  if(storedData.hobby.length > 0) {
    $$('#nextSetp').removeAttr("disabled");
  }else{
    $$('#nextSetp').attr("disabled",true);
  }

  $$('.hobbyitem').click(function(){
    if($$(this).find('input').prop("checked"))
      $$(this).find('input').prop("checked", false);
    else
      $$(this).find('input').prop("checked", true);

    storedData = myApp.formToJSON('#stroryHobbyChoose');
    myApp.formStoreData('stroryHobbyChoose',storedData);
    $$("#nextSetp").attr("data-context",JSON.stringify(storedData));
    if(storedData.hobby.length > 0) {
      $$('#nextSetp').removeAttr("disabled");
    }else{
      $$('#nextSetp').attr("disabled",true);
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
