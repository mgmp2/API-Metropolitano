var express = require("express");
var api = require("./api");
const app = express();



app.get('/api/stations/:stations_id?', function (req, res) {
    let stations = api.stations(req.params.stations_id);

    stations.then( (result) => {
        res.status(200).json(result);
    });
});

app.get('/api/searchServices/:originalId/:destinationId/', function (req, res) {
    let origen = req.params.originalId;
    let destino = req.params.destinationId;


    if (!origen) {
        return res.json("NECESITO la estación de origen")
        
    }
    if (!destino) { 
        return res.json("NECESITO la estacion de destino")
    }

    let services = api.services(origen, destino);

    services.then( (result) => {
        return res.status(200).json(result);
    });
});


app.use('/', express.static('public'));


app.listen(process.env.PORT || 5000, () => {
    console.log("Iniciando en puerto 5000");
});