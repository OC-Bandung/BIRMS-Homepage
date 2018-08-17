function load_awards(awards) {

    $(".tender-stage").removeClass("hidden");
    $(".awards-stage").removeClass("hidden");

    $("#stage-status").text(awards[0].status);
    $("#stage-amount").text(awards[0].value.amount/1000000);

    $("#awards-supplier-name").text(awards[0].suppliers[0].name);
    $("#awards-value-amount").text(awards[0].value.amount);


    winningSupplier = getPartyByID(release.parties, awards[0].suppliers[0].id);

    $("#awards-supplier-taxid").text(winningSupplier[0].taxid);
    $("#awards-supplier-address").text(winningSupplier[0].address.streetAddress);



    html = "";
    delete winningSupplier[0].roles;
    var details = JSON.stringify(winningSupplier[0], null, 4);
    details = details.replace(/["'{]/g, "");
    details = details.replace(/[},]/g, "<br>");
    html += "<br>";
    html += details;

    $("#awards-winner-info").html(html);

    // if (data.tender.tenderers) {
    //   //pagination and tenderers
    //   $(function() {
    //     (function(name) {
    //       var container = $('#' + name);
    //       var navcontainer = $("#navcontainer");
    //       var sources = function () {
    //         var result = [];
    //         //only show specific values, not whole array that includes things like contact phone and email
    //         for (i=0; i< data.tender.tenderers.length; i++) {
    //           tenderers_fields =  [ (i+1),   data.tender.tenderers[i].id  ,  data.tender.tenderers[i].name  , data.tender.tenderers[i].address.streetAddress ];
    //           result.push(tenderers_fields);
    //         }
    //         return result;
    //       }();
    //       var options = {
    //         dataSource: sources,
    //         pageSize: 5,
    //         callback: function (response, pagination) {
    //           var dataHtml = '';
    //           $.each(response, function (index, item) {
    //             dataHtml += '<tr>';
    //             for (i=0; i< item.length; i++) {
    //               dataHtml += '<td>' + item[i] + '</td>';
    //             }
    //              dataHtml += '</tr>';
    //           });
    //           navcontainer.prev().html(dataHtml);
    //         }
    //       };
    //       navcontainer.pagination(options);
    //     })('tender-tenderers-list');
    //
    //   })
    // } else {
    //   $("#tender-tenderers-tab").addClass("d-none");
    // }
    //


    if (tender.tenderers) {
      var html = "";
      for (i = 0; i < tender.tenderers.length; i++) {

          html = "<div class='mdc-layout-grid__cell mdc-layout-grid__cell--span-4 first'>";
          supplierDetails = getPartyByID(parties, tender.tenderers[i].id);

          for (j = 0; j < supplierDetails.length; j++) {

              delete supplierDetails[j].roles;
              delete supplierDetails[j].address;

              for (var key in supplierDetails[j]) {
                if (supplierDetails[j].hasOwnProperty(key)) {
                  html+= "<strong>" + key + "</strong> : " + supplierDetails[j][key] + "<br>";
                }
              }


          }



          html += "</div>";


          $("div#awards-bidders-info").append(html);

      }
    }




}
