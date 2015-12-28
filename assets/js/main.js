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
  // validation code here
  // if (!valid) {
  e.preventDefault();
  // }
  var keyword = $(".searchbar-input > input").val();
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
        alert("if you like this item, login please :)");
        window.location.assign("/auth/facebook");
      }
    }
  }); // end ajax
}); // end on


// search button
$("#search-btn").click(function(e) {
  var keyword = $(".searchbar-input > input").val();
  console.log("search keyword is=>", keyword);
  $.ajax({
    url: "/search/" + keyword,
    type: "GET",
    success: function(result) {
      console.log(result);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("xhr.status,thrownError=>", xhr.status, thrownError);
      if (xhr.status == 403) {
        alert("if you like this item, login please :)");
        window.location.assign("/auth/facebook");
      }
    }
  }); // end ajax
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
}
