function load_planning(data) {

    planning = data.planning;


    $("#ocdate").text(moment(data.date).format(("ll")));

    $("#parties-buyer-name").text(data.buyer.name);

    // if there is a buyer id in data.buyer, then go to parties and lookup the information to show
    // sometimes data.id doesn't exist but the role of buyer is still there, so in the else statement, try to loop and see if there is a buyer.

    if ( data.buyer.id ) {
      $("#parties-buyer-address").text(getPartyByID(data.parties, data.buyer.id)[0].address.streetAddress);
    } else {
        found = findPartyByRole(data.parties, "buyer");
        if (found.address) {
            $("#parties-buyer-address").text(found.address.streetAddress);
        }
    }


    if (planning.hasOwnProperty('budget')) {
        $("#page-title").text(planning.budget.project);

        $("#planning-budget-project-name").text(planning.budget.project);

        $("#planning-budget-amount-amount").text(planning.budget.amount.amount/1000000);

        $("#planning-budget-description").text(planning.budget.description);

        $("#planning-budget-project-name-container").hide();
    }

}
