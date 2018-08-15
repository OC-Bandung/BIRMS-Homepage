function load_tender(data) {

    $("#tender-section").removeClass("d-none");

    if (data.tender.title) {
      $("#page-title").text(data.tender.title);
      $("#planning-budget-project-name-container").removeClass('d-none');
    }

   $("#tender-mainProcurementCategory").text(data.tender.mainProcurementCategory);
   $("#tender-procurementMethod").text(data.tender.procurementMethod);
   $("#tender-numberOfTenderers").text(data.tender.numberOfTenderers);

   $("#tender-tenderPeriod-startDate").text(moment(data.tender.tenderPeriod.startDate).format('ll'));

   $("#tender-tenderPeriod-endDate").text(moment(data.tender.tenderPeriod.endDate).format('ll'));

   $("#tender-contractPeriod-startDate").text(moment(data.tender.tenderPeriod.startDate).format('ll'));
   $("#tender-contractPeriod-endDate").text(moment(data.tender.tenderPeriod.endDate).format('ll'));


   var budget = data.planning.budget.amount.amount;
   var tender = data.tender.value.amount;

   var highest = Math.max(budget, tender);

   var max = $("#vertical-chart").height();

   $("#expected").css('height', (budget/highest)*max);
   $("#actual").css('height', (tender/highest)*max);


   $("li#expected").append(budget/1000000);
   $("li#actual").append(tender/1000000);


   if (data.tender.tenderers) {
     //pagination and tenderers
     $(function() {
       (function(name) {
         var container = $('#' + name);
         var navcontainer = $("#navcontainer");
         var sources = function () {
           var result = [];
           //only show specific values, not whole array that includes things like contact phone and email
           for (i=0; i< data.tender.tenderers.length; i++) {
             tenderers_fields =  [ (i+1),   data.tender.tenderers[i].id  ,  data.tender.tenderers[i].name  , data.tender.tenderers[i].address.streetAddress ];
             result.push(tenderers_fields);
           }
           return result;
         }();
         var options = {
           dataSource: sources,
           pageSize: 5,
           callback: function (response, pagination) {
             var dataHtml = '';
             $.each(response, function (index, item) {
               dataHtml += '<tr>';
               for (i=0; i< item.length; i++) {
                 dataHtml += '<td>' + item[i] + '</td>';
               }
                dataHtml += '</tr>';
             });
             navcontainer.prev().html(dataHtml);
           }
         };
         navcontainer.pagination(options);
       })('tender-tenderers-list');

     })
   } else {
     $("#tender-tenderers-tab").addClass("d-none");
   }






   // for (i=0; i < tender.milestones.length ; i++ ) {
   //    html = "<div class='col-12'><div class='card border-0'><div class='card-body '><div class='h6 text-muted'>" +  tender.milestones[i].title.replace( "_", " ") +  "</div></div></div></div>";
   //    $("#tender-milestones-cards").append (html);
   //     console.log(tender.milestones[i].title);
   // }

    //     html= '<div class="col-12><div class="card"><div class="card-body"><div class="float-right text-muted"></div><h6 class="text-muted">' + tender.milestones[i].title.replace( "_", " ") + '</h6> </div></div> </div</div>';

    // $("#tender-title").text(tender.title);
    // $("#tender-status").text(tender.status);
    // if(tender.hasOwnProperty('value')) {
    //     $("#tender-amount-value").text(tender.value.amount);
    //     $("#stage-amount").text(tender.value.amount/1000000);
    // }
    //
    //  $(".tender-stage").removeClass("hidden");
    //  $("#stage-status").text(tender.status);
    //
    //
    // if(tender.hasOwnProperty('items') && tender.items.length>0) {
    //     deliveryAddress = tender.items[0].deliveryAddress.streetAddress;
    //     $("#tender-deliveryAddress").text(deliveryAddress).attr('deliveryAddress', deliveryAddress);
    // }
    //
    //
    //
    // $("#tender-awardCriteria").text(tender.awardCriteriaDetails);
    //
		// if (tender.additionalProcurementCategories) {
		// 	$("#tender-mainProcurementCategory").text(tender.mainProcurementCategory + " (" + tender.additionalProcurementCategories + ")");
		// }
		// else {
		// 		$("#tender-mainProcurementCategory").text(tender.mainProcurementCategory);
		// }
    //
		// if ( tender.procurementMethodDetails ) {
		// 	$("#tender-procurementMethod").text(tender.procurementMethod + " (" + tender.procurementMethodDetails + ")");
    //
		// } else {
		// 	$("#tender-procurementMethod").text(tender.procurementMethod);
    //
		// }
    //
    //
    //
    // $("#tender-numberOfTenderers").text(tender.numberOfTenderers);
    //
    //
    // $("#tender-tenderPeriod-startDate").text(moment(tender.tenderPeriod.startDate).format('ll'));
    // $("#tender-tenderPeriod-endDate").text(moment(tender.tenderPeriod.endDate).format('ll'));
    //
    // $("#tender-contractPeriod-startDate").text(moment(tender.contractPeriod.startDate).format('ll'));
    // $("#tender-contractPeriod-endDate").text(moment(tender.contractPeriod.endDate).format('ll'));
    //
    //
    //
    // var html = "";
    // for (i = 0; i < tender.milestones.length; i++) {
    //
    //     html = "<li>";
    //     html += "<span class='mdc-typography--body2 border-right padding-right-small'>" + tender.milestones[i].dueDate.substring(0, 10) + "</span>";
    //     html += "<span class='mdc-typography--body2 padding-left-small'>" + tender.milestones[i].title + "</span>";
    //     html += "</li>";
    //
    //     $("ul#tender-milestones").append(html);
    //
    // }



}
