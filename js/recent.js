var jqxhr = $.getJSON("api/v1/recent/planning.json", function(data) {

        load_data(data);

    })
    .done(function() {

    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {

    });

function load_data(data) {
  console.log(data);
  html = "";

  for (i=0; i < data.length; i++) {

    json = data[i];

    html += '<section class="mdc-card__primary">';
        html += '<h1 class="mdc-card__title mdc-card__title--large f300">';
        html += json.title;
        html += '</h1>';
        html += '<h2 class="mdc-card__subtitle">';
        html += '';
        html += '</h2>';
        html += '<h3 class="mdc-card__subtitle dark-gray">';
        html += 'SirupID: # ';
        html += '</h3>'
    html += '</section>';
    html += '<section class="mdc-card__supporting-text ">';
    html += '<div class="procurement-card-container flex">';
    html += '<div class="procurement-card-details padding-small text-center">';
    html += '<img class="icon-large" src="img/icon-money.png">';
    html += '<div class="mdc-typography--subheading1"> Pagu </div>';
    html += '<div> <span class="mdc-typography--title f300"> 2.8 </span> M</div>';
    html += '</div>';
    html += '<div class="procurement-card-details padding-small text-center">';
    html += '<img class="icon-large" src="img/icon-gov.png">';
    html += ' <div class="mdc-typography--subheading1"> Budget </div>';
    html += ' <div class="mdc-typography--title f300"> BLUD </div>';
    html += '</div>';
    html += '<div class="procurement-card-details padding-small text-center">';
    html += ' <img class="icon-large" src="img/icon-tender-start.png">';
    html += ' <div class="mdc-typography--subheading1"> Tender start </div>';
    html += '<div class="mdc-typography--title f300"> 01-Feb-2017 </div>';
    html += '</div>';
    html += '<div class="procurement-card-details padding-small text-center">';
    html += '<img class="icon-large" src="img/icon-tender-end.png">';
    html += ' <div class="mdc-typography--subheading1"> Tender end</div>';
    html += '<div class="mdc-typography--title f300"> 01-Feb-2018 </div>';
    html += ' </div>';
    html += ' <div class="procurement-card-details padding-small text-center ">';
    html += '<img class="icon-large" src="img/icon-contract-start.png">';
    html += '<div class="mdc-typography--subheading1">Contract start</div>';
    html += '<div class="mdc-typography--title f300">02 March 1978</div>';
    html += '</div>';
    html += ' <div class="procurement-card-details padding-small text-center">';
    html += '<img class="icon-large" src="img/icon-contract-end.png">';
    html += '<div class="mdc-typography--subheading1">Contract end</div>';
    html += ' <div class="mdc-typography--title f300">02 March 1978</div>';
    html += '</div>';
    html += ' </div>';
    html += ' <div>';
    html += '<p>This contract is for <i> <u> Goods and Services</u></i> and will procured as <i> <u>Seleksi Sederhana</u></i>. You have <span class="mdc-typography--subheading1"> 10 days </span> to submit a bid. </p>';
    html += ' </div>';
    html += '</section>';
    html += '<section class="mdc-card__actions pull-right">';
    html += ' <button class="mdc-button mdc-button--compact mdc-card__action"> Apply in Sirup </button>';
    html += '<button class="mdc-button mdc-button--compact mdc-card__action"> Download </button>';
    html += ' <button class="mdc-button mdc-button--compact mdc-card__action">Email</button>';
    html += '</section>';
   




  }

  $("#recent-from-api").append(html);
 
}

