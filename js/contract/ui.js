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

$(document).on('click', '[id^="watch-list-"]', function(e) {
  e.preventDefault();
  ocid = $("#ocid").text();
  var clickedList = $(this).attr("id");
    if(localStorage && localStorage.getItem('ocds-birms-watchlist')){
        var watchList = JSON.parse(localStorage.getItem('ocds-birms-watchlist'));
        var myList = getListByListCode(watchList, clickedList);
        console.log(myList);
        listItems = watchList[0]["listItems"];
        newdata = [{ "ocid": ocid}];
        listItems.push(newdata[0]);
        myList.push(listItems[0]);
        localStorage.setItem("ocds-birms-watchlist" , JSON.stringify(watchList) );
        console.log(watchList);
    }
});

$("li#notificationListAddNew").click(function(e) {
  e.preventDefault();
  if(localStorage && localStorage.getItem('ocds-birms-watchlist')){
    var myList = JSON.parse(localStorage.getItem('ocds-birms-watchlist'));
  }
});

$("#add-to-watchlist").click(function(e) {
    e.preventDefault();
    $("#notificationList").removeClass("d-none");

});


$(document).ready(function() {

    let myList = getOCLocalStorage();
    console.log(myList);
    if(myList) {
      for ( item in myList) {
        var eln = document.getElementById("list-group-item-sample").cloneNode(true);
        eln.id =  myList[item].listCode;
        $("ul#notificationList").append(eln);
        $("ul#notificationList li#" + myList[item].listCode ).text(myList[item].listName);
      }
    }
});
