function getPartyByID(data, id) {
    return data.filter(
        function(data) { return data.id == id }
    );
}
