
$("body").delegate(".favboxa", "click", function() {
  var fav = $(this);
  var id = fav.attr("data-id");
  console.log("favboxa id=>",id);
  $.ajax({
    url: "/addUserFavorite/" + id,
    type: "POST",
    success: function(result) {
      console.log(result);
      fav.children().css("color","red");
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("xhr.status,thrownError=>",xhr.status,thrownError);
      fav.children().css("color","white");
      if(xhr.status==403){
        alert("if you like this item, login please :)");
        window.location.assign("/auth/facebook");
      }
    }
  }); // end ajax
}); // end click
