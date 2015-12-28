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

$("#formSearch").on('submit', function(e) {
  var keyword = $(".searchbar-input > input").val();
  if (keyword) {
    e.preventDefault();
    goSearch(keyword);
  } else {
    alert("Don't forget to type something!")
  }
}); // end on


// search button
$("#search-btn").click(function(e) {
  var keyword = $(".searchbar-input > input").val();
  if (keyword) {
    e.preventDefault();
    goSearch(keyword);
  } else {
    alert("Don't forget to type something!")
  }
}); // end click

/* ====================================================================== */

function goToByScroll(id) {
  // Remove "link" from the ID
  id = id.replace("link", "");
  // Scroll
  $('html,body').animate({
      scrollTop: $("#" + id).offset().top
    },
    'slow');
}; // end goToByScroll


function goSearch(keyword) {
  $.ajax({
    url: "/search/" + keyword,
    type: "GET",
    success: function(result) {
      console.log(result);
      showSearchResult(result);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("xhr.status,thrownError=>", xhr.status, thrownError);
      if (xhr.status == 403) {
        // to-do print it out
      }
    }
  }); // end ajax
}; // end goSearch
