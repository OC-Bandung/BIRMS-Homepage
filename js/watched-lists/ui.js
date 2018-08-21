function DisplayList() {
  var myList = getOCLocalStorage();
  $("#watch-list-container").html("");

  if(myList) {
    for ( item in myList) {
      var listCode = myList[item].listCode;
      var eln = document.getElementById("watch-list-sample").cloneNode(true);
      eln.id =  listCode;
      $("#watch-list-container").append(eln);
      $("div#" + listCode + " div.watch-list-header").html(myList[item].listName);
      $("div#" + listCode).removeClass("d-none");
        for (itm in myList[item]["listItems"]) {
          ocid = (myList[item]["listItems"][itm].ocid);
             console.log(ocid);
             $("div#" + listCode + ' ul.watch-list-ocid').append('<li class="list-group-item">' + ocid + '</li>');
        }

    }
  }
}
$(document).ready(function() {
  DisplayList();
});

$("a#watch-list-create").click(function(e) {
    e.preventDefault();
    $("#watch-list-input").val("");
    $("#watch-list-input-container").removeClass("d-none");
});

$("#watch-list-input-submit").click(function(e) {
    e.preventDefault();
    myListCode = "watch-list-" + genUniqueListCode();
    myListName = $("#watch-list-input").val();
    addToLocalStorage(myListCode, myListName);
    DisplayList();
    $("#watch-list-input-container").addClass("d-none");
});

$(document).on('click', '[id^="watch-list-"]', function(e) {
  e.preventDefault();
  $(this).children('.watch-list-content').removeClass("d-none");
});
