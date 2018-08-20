$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$("#bdg-feedback-form").click(function() {
  var lnk = "https://docs.google.com/forms/d/e/1FAIpQLScs-1715tHTn60Ncj85_1zW7TQg8vzTWjwajCJCEdBGEmSfJw/viewform?usp=pp_url";
  lnk += "&entry.1755301375=" + $("#ocid").text();
  lnk += "&entry.788440630=" +   $("#page-title").text() ;
  lnk += "&entry.1796765524= ";
  lnk += "&entry.439080160= ";
  lnk += "&entry.831032170= ";
  $(this).attr("href", lnk);
});


$("#add-to-watchlist").click(function(e) {

  e.preventDefault();

var watchlist =  [
      {
        "list": "a",
        "watching": [
          {"ocid": "123"},
          {"ocid": "345"},
          {"ocid": "678"}
        ]
      },
      {
        "list": "b",
        "watching": [
          {"ocid": "x"},
          {"ocid": "y"},
          {"ocid": "z"}
        ]
      }
  ];

  localStorage.setItem("ocds-birms-watchlist" , JSON.stringify(watchlist) );

  console.log("local storage set");
});

$("#get-watchlist").click(function(e) {
    e.preventDefault();

  if(localStorage && localStorage.getItem('ocds-birms-watchlist')){
    var myList = JSON.parse(localStorage.getItem('ocds-birms-watchlist'));
    for ( item in myList) {
      console.log(myList[item].list);
      console.log(myList[item].watching);
    }
  }



});
