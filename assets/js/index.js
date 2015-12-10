//
var myApp = new Framework7({
    modalTitle: 'Framework7',
    animateNavBackIcon: true,
    template7Pages: true,
    pushState: true,
    swipeBackPage: false,
    init: false
});

// Expose Internal DOM library
var $$ = Framework7.$;

// Add main view
var mainView = myApp.addView('.view-main', {
    // Enable Dynamic Navbar for this view
    dynamicNavbar: true,
});



$$(document).on('pageInit', '.page[data-page="hobby"]', function (e) {
  $$('.item').click(function(){
    if($$(this).find('input').prop("checked"))
      $$(this).find('input').prop("checked", false);
    else
      $$(this).find('input').prop("checked", true);
    var storedData = myApp.formToJSON('#hobbySelect');
    $$("#nextSetp").attr("data-context",JSON.stringify(storedData));
    if(storedData.hobby.length > 0) {
      $$('#nextSetp').removeAttr("disabled");
    }else{
      $$('#nextSetp').attr("disabled",true);
    }
  });
});

$$(document).on('pageInit', '.page[data-page="finish"]', function (e) {
  var emailInput = $$('input[name="email"]');
  var submitBtn = $$('input[name="submit"]');
  submitBtn.prop("disabled",true)
  emailInput.on('input', function(){
    if($$(this).val() != "" )
      submitBtn.removeAttr("disabled");
    else
      submitBtn.attr("disabled",true);
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
