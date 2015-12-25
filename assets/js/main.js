// scroll to item-result-list
$(".checkResults").click(function(e) {
  e.preventDefault();
  goToByScroll("results");
});

// scroll to top
$(".checkTop").click(function(e) {
  e.preventDefault();
  goToByScroll("page-top");
});

/* ====================================================================== */

function goToByScroll(id) {
  // Remove "link" from the ID
  id = id.replace("link", "");
  // Scroll
  $('html,body').animate({
      scrollTop: $("#" + id).offset().top
    },
    'slow');
}
