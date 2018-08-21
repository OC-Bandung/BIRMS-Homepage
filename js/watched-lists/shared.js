
function genUniqueListCode() {
  return new Date().valueOf();
}

function getOCLocalStorage(){
  if(localStorage && localStorage.getItem('ocds-birms-watchlist')){
    return JSON.parse(localStorage.getItem('ocds-birms-watchlist'));
  }
}

function getListByListCode(data, param) {
    return data.filter(
        function(data) { return data.listCode == param }
    );
}

function getListByListName(data, param) {
    return data.filter(
        function(data) { return data.listName == param }
    );
}

function addToLocalStorage(listCode, listName) {

  var myList =
      [{
        "listCode": listCode,
        "listName": listName,
        "listItems":[
        ]
      }];


  if(localStorage && localStorage.getItem('ocds-birms-watchlist')) {
     var watchList = JSON.parse(localStorage.getItem('ocds-birms-watchlist'));
     if (getListByListName(watchList, listName).length > 0) {
       $("div#watch-list-input-container div.alert").removeClass("d-none");
       $("#watch-list-input").val("");
     } else {
       watchList.push(myList[0]);
       localStorage.setItem("ocds-birms-watchlist" , JSON.stringify(watchList) );
     }
  }


    if(localStorage && !localStorage.getItem('ocds-birms-watchlist')) {
      localStorage.setItem("ocds-birms-watchlist" , JSON.stringify(myList) );
    }

}
