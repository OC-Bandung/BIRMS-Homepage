function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var url="https://birms.bandung.go.id/beta/api/newcontract/"+getParameterByName("ocid");
var callback_url=url+"?callback=?";

$("#add-to-csv-text").attr("href",url);

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



function custom_sort(a, b) {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
}




function load_data(data) {

    var stage;
    release = data;
    planning = release.planning;
    tender = release.tender;
    parties = release.parties;
    awards = release.awards;
    contracts = release.contracts;



    if (release.hasOwnProperty('contracts')) {
        stage = "Contract";
        if (release.contracts[0].hasOwnProperty('implementation')) {
            stage = "Implementation";
        }
    } else if (release.hasOwnProperty('awards')) {
        stage = "Award"
    } else if (release.hasOwnProperty('tender')) {
        stage = "Tender"
    } else if (release.hasOwnProperty('planning')) {
        stage = "Planning";
    }


    parties = release.parties;
    //loop in parties, get the role

    $("#ocid").text(release.ocid);
    $("#stage").text(stage);


    load_planning(release.planning);
    load_tender(release.tender);



    if(release.hasOwnProperty('awards') ) {
          load_awards(release.awards);
          console.log("xxx");
    }

    if(release.hasOwnProperty('contracts' && release.contracts>0)) {
        load_contracts(release.contracts);
        load_implementation(release.contracts[0].implementation);
        buildTimeline(contracts[0], stage);
    }

    buildTimeline(planning, stage);
    buildTimeline(tender, stage);
}



function buildTimeline(timeline_stage, stage) {

    html = $("ul#main-timeline").html();

    if(!timeline_stage.hasOwnProperty('milestones')) {
        return;
    }

    var timeline_stage = timeline_stage.milestones.filter(function(x) { return x.code == "timeline"; });
    timeline_stage.sort(custom_sort);

    for (i = 0; i < timeline_stage.length; i++) {

        var dueDate = new Date(timeline_stage[i].dueDate);
        var oneDay = 24 * 60 * 60 * 1000;
        var diffDays;

        if (timeline_stage[i].status == "met") {
            var dateMet = new Date(timeline_stage[i].dateMet);





            diffDays = Math.round(((dateMet.getTime() - dueDate.getTime()) / (oneDay)));

            if (diffDays == "0") {
                timing_code = "on-time";
                timing_title = "On Time";
                timing_icon = "check_circle";
                timing_color = "#a8da71";
            } else if (diffDays < 0) {
                timing_code = "on-time";
                timing_title = "Early";
                timing_icon = "check_circle";
                timing_color = "#a8da71";
            } else if (diffDays > 0) {
                timing_code = "late";
                timing_title = "Late";
                timing_icon = "assignment_late";
                timing_color = "#b13a3a";
            }
        } else {
            diffDays = Math.round(((Math.floor(Date.now()) - dueDate.getTime()) / (oneDay)));
            timing_code = "scheduled";
            timing_title = "Plan";
            timing_icon = "date_range";
            timing_color = "transparent";

        }




        html += '<li class="li ' + timeline_stage[i].status + '">';
        html += '<div class="timestamp">';
        html += '<span>' + timeline_stage[i].title + '</span>';
        html += '</div>';
        html += '<div class="status ' + timing_code + ' tooltip-wrapper">';
        html += '<div class="tooltip">';
        html += '<div class="mdc-typography--body2">' + moment(dateMet).format('ll') + '</div>';
        html += '<div>';
        html += '<button class="timeline-status mdc-button mdc-button--compact mdc-button--unelevated" style="background-color:' + timing_color + '">';
        html += ' <i class="material-icons mdc-button__icon">' + timing_icon + '</i>';
        html += timing_title;
        html += '</button> ';
        if (diffDays != 0) {
            html += ' <button class="mdc-button mdc-button--stroked mdc-button--compact" > ' + diffDays + ' days </button>';

        }
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += ' </li>';
    }

    $("ul#main-timeline").html(html);

}
