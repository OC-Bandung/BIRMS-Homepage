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
             $("div#" + listCode + ' ul.watch-list-ocid').append('<li class="list-group-item">' + ocid + '</li>');
        }

    }
  }
}
$(document).ready(function() {
    DisplayList();


    url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/birms-cvrbm/service/query-birms/incoming_webhook/find-releases?secret=6WkBFKh6SS4ibE2O0Fm5UHGEQWv8hQbj&q=';
    trending_url = url + '{"tender.numberOfTenderers":{"$gt":20}}&limit=5';

  var jqxhr = $.getJSON(trending_url, function(data) {
          load_trending(data);
      })
      .done(function() {
          console.log("done");
      })
      .fail(function() {
          console.log("fail");
      })
      .always(function() {
          console.log("always");
      });
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

function load_trending(data) {
  el = document.getElementById("trending-tender-sample");

  for ( item in data ) {
    console.log("x");

   tender = data[item];
   console.log(tender.tender.title);
   tender_id =  data[item].tender.id

   var el_copy = el.cloneNode(true);
   el_copy.id = "trending-tender-id-" + tender_id;


   myUI = [
     {
       "name": "tender.title",
       "ui_element": "div#trending-tender-id-" + tender_id +  " div.trending-tender-title",
        "ui_container": "div#trending-tender-id-" + tender_id +  " div.trending-tender-title-container"
     },
     {
       "name": "tender.status",
       "ui_element": "div#trending-tender-id-" + tender_id +  " div.trending-tender-status",
       "ui_container": "div#trending-tender-id-" + tender_id +  " div.trending-tender-status-container"
     },
     {
       "name": "tender.mainProcurementCategory",
       "ui_element": "div#trending-tender-id-" + tender_id +  " div.trending-tender-mainProcurementCategory",
       "ui_container": "div#trending-tender-id-" + tender_id +  " div.trending-tender-mainProcurementCategory-container"
     },
     {
       "name": "tender.numberOfTenderers",
       "ui_element": "div#trending-tender-id-" + tender_id +  " div.trending-tender-numberOfTenderers",
       "ui_container": "div#trending-tender-id-" + tender_id +  " div.trending-tender-numberOfTenderers-container"
     },
     {
       "name": "tender.value.amount",
       "ui_element": "div#trending-tender-id-" + tender_id +  " div.trending-tender-amount-value",
       "ui_container": "div#trending-tender-id-" + tender_id +  " div.trending-tender-amount-value-container"
     },
     {
       "name": "tender.tenderPeriod.endDate",
       "ui_element": "div#trending-tender-id-" + tender_id +  " div.trending-tender-tenderPeriod-endDate",
       "ui_container": "div#trending-tender-id-" + tender_id +  " div.trending-tender-tenderPeriod-endDate-container"
     }
   ];

   $("#trending-tender-container").append(el_copy);

   displayJsonInUI(myUI, tender);

   // clone

   // change id //


   // title = tender.title;
   // status = tender.status;
   // mainProcurementCategory = tender.mainProcurementCategory;
   // numberOfTenderers = tender.numberOfTenderers;
   // procurementMethod = tender.procurementMethod;
   // procuringEntity = tender.procuringEntity.name;
   // console.log(title);
  }



}
