function load_tender(data) {

  //ocds-afzrfb-s-2016-6124079

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

   $("#tender-contractPeriod-startDate").text(moment(data.tender.contractPeriod.startDate).format('ll'));
   $("#tender-contractPeriod-endDate").text(moment(data.tender.contractPeriod.endDate).format('ll'));




   $("#tender-tender-days-diff").text(
     moment(data.tender.tenderPeriod.endDate).diff( moment(data.tender.tenderPeriod.startDate), 'days') + " days"
   );

   $("#tender-contract-days-diff").text(
     moment(data.tender.contractPeriod.endDate).diff( moment(data.tender.contractPeriod.startDate), 'days') + " days"
   );

   var budget = data.planning.budget.amount.amount;
   var tender = data.tender.value.amount;
   var diff_tb = tender - budget;
   var diff_tb_perc = (tender/budget * 100).toFixed(2) - 100;

   if (diff_tb <= 0 ) {
     $("#tender-amount-flag").html('<span class="badge badge-pill badge-success">Tender is less than budget</span>');
   } else {
     $("#tender-amount-flag").html('<span class="badge badge-pill badge-danger">Tender is more than budget</span>');

   }

   $("#tender-budget-amount").text(budget/1000000);
   $("#tender-value-amount").text(tender/1000000);
   $("#tender-value-diff").text( diff_tb /1000000);
   if (diff_tb_perc <= 0 ) {
     $("#tender-value-diff-percentage").append("<div class='text-success'><i class='material-icons'>arrow_downward</i>" + diff_tb_perc + " % </div>");
   } else {

   }

   var highest = Math.max(budget, tender);

   var max = $("#vertical-chart").height();

   $("#expected").css('height', (budget/highest)*max);
   $("#actual").css('height', (tender/highest)*max);


   $("li#expected").append('<span class="chart-label mt-5 h6 bg-dark text-white p-2" style="margin-left:-120px;"> Budget: ' + budget/1000000 + ' M<span>');
   $("li#actual").append( '<span class="chart-label mt-5 ml-5 h6 bg-dark text-white p-2"> Tender: ' + tender/1000000 + ' M<span>');


   var numberMilestones = data.tender.milestones.length ;

   $("sup#tender-milestone-count").text("(" + numberMilestones + ")");
   $("sup#tender-registered-bidders-counter").text("(" + data.tender.tenderers.length + ")");

   if (data.tender.tenderers) {
     //pagination and tenderers
     $(function() {
       (function(name) {
         var container = $('#' + name );
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
           pageSize: 10,
           callback: function (response, pagination) {
             var dataHtml = '';
             $.each(response, function (index, item) {
               dataHtml += '<tr>';
               for (i=0; i< item.length; i++) {
                 dataHtml += '<td class="h6">' + item[i] + '</td>';
               }
                dataHtml += '</tr>';
             });
             navcontainer.prev().find('tbody').html(dataHtml);
           }
         };
         navcontainer.pagination(options);
       })('tender-tenderers-list');

     })
   } else {
     $("#tender-tenderers-tab").addClass("d-none");
   }


   for (i=0; i < data.tender.milestones.length  ; i++ ) {

      diff_milestone = moment(data.tender.milestones[i].dateMet).diff( moment(data.tender.milestones[i].dueDate), 'days') ;
       html = '<div class="col-6 mt-2">';
          html +='<div class="card  shadow">';
           html +='<div class="card-body">';
           html+= '<div class="tender-timeline-counter text-center float-right">' + (i+1) + '</div>';
              html +='<h5 class="card-title">' +   data.tender.milestones[i].title +   '</h5>';
                html += '<div class="row">';
                html += '<div class="col-6">';
                    html+= '<div class="h6">Due Date: ' + moment(data.tender.milestones[i].dueDate).format('ll')  + '</div>';
                    html+=  '<div class="h6">Date Met: ' + moment(data.tender.milestones[i].dateMet).format('ll')  + '</div>';
                html += '</div>';
                if (diff_milestone <=0) {
                  html += '<div class="col-6 h6 pt-3 text-success float-right">' +  diff_milestone +  '<small> days before deadline</small></div>';
                } else {
                  html += '<div class="col-6 h6 pt-3 text-danger float-right"> ' +  diff_milestone +  '<small> days after deadline</small> </div>';
                }

              html+= '</div>';
             html +='<div><button class="btn btn-sm btn-outline-secondary float-right" type="button" data-target="#t_details" data-toggle="collapse">Add to Calendar ▼</button>';
             html +='<div class="collapse bl-3px-black" id="t_details">';
               html +='<div class="p-2 small text-monospace">';
                 html +='<div><a href="#">add to Google Calendar</a></div>';
                html += '<div><a href="#">add to Outlook</a></div>';
                 html +='<div><a href="#">send by email</a></div>';
              html += '</div>';
           html +='</div>';
          html += '</div></div>';
         html +='</div>';
      html +=' </div>';

    $("#tender-milestones-cards").append(html);

   }
}
