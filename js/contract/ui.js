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
