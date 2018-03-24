var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyAtJX20dE4SkGB_oPVr-zfqsVgPIlg-yps",
    authDomain: "metropolitano-workshop.firebaseapp.com",
    databaseURL: "https://metropolitano-workshop.firebaseio.com",
    projectId: "metropolitano-workshop",
    storageBucket: "metropolitano-workshop.appspot.com",
    messagingSenderId: "812540184747"
  };

firebase.initializeApp(config);


var loadStations = (id) => {
    let url = '/stations/';
    url += (id != undefined) ? id : '';
    return firebase.database().ref(url).once('value').then(function(snapshot) {
    return snapshot.val();
    });
};

var loadServices = (origen, destination) => {
    let url = "/services/";
    
    return firebase.database().ref(url).once('value').then(function(snapshot) {
        return snapshot.val();
    })

    .then (function (snapshot) {
         // validacion para pasar solo algunos servicios
    

         let arrayServices = snapshot;
         
                 var foundOrigen= false;
                 var foundDestination = false;
         
                 let filterServices = arrayServices.filter(function(serv) {

                     var arrayStations = serv.stations;
                     console.log("X");
                     console.log(serv.stations);
                     console.log("X");
                     
                     arrayStations.forEach( function (station) {
                         if (station.id === origen) {
                             foundOrigen = true;
                         }
                     });
                     arrayStations.forEach( function (station) {
                         if (station.id === destination) {
                             foundDestination = true;
                         }
                     });
                     return foundOrigen && foundDestination;
                 });
                 return filterServices;
    })
       
};

// var loadCategories = (id) => {
//     let url = '/categories/';
//     url += (id != undefined) ? id : '';
//     return firebase.database().ref(url).once('value').then(function(snapshot) {
//         return snapshot.val();
//     });
// };

module.exports = {
    stations : loadStations,
    services: loadServices
};