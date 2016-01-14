////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//finish - getuseragent Browser Language
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$$(document).on('pageInit', '.page[data-page="finish"]', function(e) {

  var list;

  if (getRegion() == "zh-TW") {
    list = [
    "請選擇地區", "基隆市", "台北市", "新北市", "宜蘭縣", "新竹市", "新竹縣", "桃園市",
    "苗栗縣", "台中市", "彰化縣", "南投縣", "嘉義市", "嘉義縣", "雲林縣",
    "台南市", "高雄市", "屏東縣", "台東縣", "花蓮縣", "金門縣", "連江縣", "澎湖縣"
    ];
  } else if (getRegion() == "en-us") {
    list = [
      "Choice your living area", "Bath", "Birmingham", "Bradford", "Brighton & Hove", "Bristol", "Cambridge",
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
});

  function getRegion() {
    var region = navigator.language;
    return region;
  }

  function setOption(list) {
    $.each(list,function(i,value){
      $('#regionSelect').append("<option value='" + value + "'>" + value + "</option>");
      $("#regionSelect").trigger('change');
    });
  }











// 1.GET language of Browser
// 2.en-US or tw
// 3.country list TW/England
// 4.jquery 動態產生 select 與 options
// 5.依據瀏覽器語言動態生城市清單


// <script type="text/javascript">
//   var d = new Date()
//   var gmtHours = d.getTimezoneOffset()/60
//   document.write("The local time zone is: GMT " + gmtHours)
//   return gmtHours;
// </script>
// <script language="javascript">
//         function getTimezoneName() {
//             timezone = jstz.determine()
//             return timezone.name();
//         }
// </script>
