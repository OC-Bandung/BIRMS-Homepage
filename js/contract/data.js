function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getPartyByID(data, id) {
    return data.filter(
        function(data) { return data.id == id }
    );
}

function load_parties( party) {

    for (i = 0; i < party.length -1; i++) {

        for (j = 0; j < party[i].roles.length  ; j++) {

            if (party[i].roles[j] == "procuringEntity") {
              $("#parties-name-procuringEntity").append(party[i].name);

            }

            if (party[i].roles[j] == "buyer") {
              $("#parties-name-buyer").text(party[i].name);

            }

        }
    }

}

function custom_sort(a, b) {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
}


var url="https://birms.bandung.go.id/beta/api/newcontract/"+getParameterByName("ocid");
var callback_url=url+"?callback=?";

  $("a#oc-json").attr("href", url);


var jqxhr = $.getJSON(callback_url, function(data) {
        load_data(data);
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

function load_data(data) {

    var stage;
    var parties;
    release = data;
    planning = release.planning;
    tender = release.tender;
    awards = release.awards;
    contracts = release.contracts;



    // order is important
    if (release.hasOwnProperty('planning')) {
        stage = "planning";
        load_planning(release.planning);
        buildTimeline(planning, stage);

    }

    if (release.hasOwnProperty('tender')) {
        stage = "tender"
        load_planning(release.planning);
        load_tender(release.tender);

        buildTimeline(tender, stage);

    }

    if (release.hasOwnProperty('awards') && release.awards.length > 0 ) {
        stage = "award"
        load_planning(release.planning);
        load_tender(release.tender);
        load_awards(release.awards);

      
        buildTimeline(awards, stage);

    }

    if (release.hasOwnProperty('contracts')) {
        stage = "contract";
        if (release.contracts[0].hasOwnProperty('implementation')) {
            stage = "implementation";
        }
    }


    if(release.hasOwnProperty('contracts' && release.contracts>0)) {
        stage = "contract";
        load_planning(release.planning);
        load_tender(release.tender);
        load_awards(release.awards);
        load_contracts(release.contracts);
        load_implementation(release.contracts[0].implementation);

        buildTimeline(planning, stage);
        buildTimeline(tender, stage);
        buildTimeline(awards, stage);
        buildTimeline(contracts[0], stage);
    }

    load_parties(release.parties);


    $("#ocid").text('Id: ' + release.ocid);

    $("#stage").text(stage);

    $('.contracting-stage').text(stage);
}
