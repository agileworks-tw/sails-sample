
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// main page - searchView
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$$("#formSearch").on('submit', function(e) {
  e.preventDefault();
  var keyword = $(".searchbar-input > input").val();
  if (keyword) {
    goSearch(keyword);
  } else {
    window.myApp.alert("Don't forget to type something!");
  }
}); // end submit

// $$("#search-btn").click(function(e) {
//   e.preventDefault();
//   // window.myApp.showIndicator();
//   var keyword = $(".searchbar-input > input").val();
//   if (keyword) {
//     goSearch(keyword);
//   } else {
//     // window.myApp.alert("Don't forget to type something!")
//   }
// }); // end click

function goSearch(keyword) {
  $$.ajax({
    url: "/search/" + keyword,
    type: "GET",
    success: function(result) {
      var data = JSON.parse(result);
      console.log(data[0]);
      showSearchResult(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("xhr.status,thrownError=>", xhr.status, thrownError);
      if (xhr.status == 403) {
        // to-do print it out
      }
    }
  }); // end ajax
}; // end goSearch

function showSearchResult(data) {
  console.log("f7 showSearchResult");
  var searchResultTemplate = $$('script#searchResult').html();
  var compiledSearchResultTemplate = Template7.compile(searchResultTemplate);
  window.myApp.template7Data.searchResult = data;
  $$('#search-result').html(compiledSearchResultTemplate(data));
}; // end search-result
