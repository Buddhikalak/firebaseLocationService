var express = require('express');
var cors = require('cors')
var compression = require('compression');
var helmet = require('helmet');
var router = express.Router();
var logger = require('../Controller/LogController');
var configService = require('../Service/ConfigService');
var driverLocationControler = require('../Controller/DriverLocationController');

router.use(compression())
router.use(helmet());

router.get('/', cors(), function (req, res) {
    try {
        let serverStatics = {
            state: "Active",
            up_time: Math.floor(process.uptime())
        };
        var ResponseObject = { 'error': false, code: 200, message: "Server is active", data: serverStatics };
        var ResponseObjectJSON = JSON.parse(JSON.stringify(ResponseObject));
        res.status(200).send(ResponseObjectJSON);
    } catch (err) {
        logger.error(error);
        var ResponseObject = { 'error': true, code: 500, message: "Error", data: err };
        var ResponseObjectJSON = JSON.parse(JSON.stringify(ResponseObject));
        res.status(500).send(ResponseObjectJSON);
    }
});
router.post('/drivers/locations/store', cors(), function (req, res) {
    configService.getHostDetails().then(hostInfo => {
        logger.generateLog().then(log => {
            let logger = log.getLogger('locationService');
            var serverDetailsJSON = JSON.parse(hostInfo);
            //if (serverDetailsJSON.server_details['log_enable'] == true) {
                //logger.info(`routes POST: /driver/location`);
          //  }
            let driverLocationDetails = JSON.parse(JSON.stringify(req.body));
            driverLocationControler.storeLocationDetails_firebase(driverLocationDetails).then(data => {
                var ResponseObject = { 'error': false, code: 200, message: "Data Saved Successfully", data: data };
                var ResponseObjectJSON = JSON.parse(JSON.stringify(ResponseObject));
                res.status(200).send(ResponseObjectJSON);
            }).catch(error => {
                logger.error(error);
                var ResponseObject = { 'error': true, code: 500, message: "Error", data: error };
                var ResponseObjectJSON = JSON.parse(JSON.stringify(ResponseObject));
                res.status(500).send(ResponseObjectJSON);
            })



        })
    })
})
router.get('/drivers/locations/:id', cors(), function (req, res) {
    configService.getHostDetails().then(hostInfo => {
        logger.generateLog().then(log => {
            let logger = log.getLogger('locationService');
            var serverDetailsJSON = JSON.parse(hostInfo);
            let driverLocationDetails = JSON.parse(JSON.stringify(req.body));
            driverLocationControler.DriversAllLocations(req.params.id).then(data => {
                var ResponseObject = { 'error': false, code: 200, message: "drivers found", data: data };
                var ResponseObjectJSON = JSON.parse(JSON.stringify(ResponseObject));
                res.status(200).send(ResponseObjectJSON);
            }).catch(error => {
                logger.error(error);
                var ResponseObject = { 'error': true, code: 500, message: "Error", data: error };
                var ResponseObjectJSON = JSON.parse(JSON.stringify(ResponseObject));
                res.status(500).send(ResponseObjectJSON);
            })
        })
    })
})


router.get('/drivers/locations', cors(), function (req, res) {
    configService.getHostDetails().then(hostInfo => {
        logger.generateLog().then(log => {
            let logger = log.getLogger('locationService');
            var serverDetailsJSON = JSON.parse(hostInfo);
            let driverLocationDetails = JSON.parse(JSON.stringify(req.body));
            driverLocationControler.DriversAllLocations(-1).then(data => {
                var ResponseObject = { 'error': false, code: 200, message: "drivers found", data: data };
                var ResponseObjectJSON = JSON.parse(JSON.stringify(ResponseObject));
                res.status(200).send(ResponseObjectJSON);
            }).catch(error => {
                logger.error(error);
                var ResponseObject = { 'error': true, code: 500, message: "Error", data: error };
                var ResponseObjectJSON = JSON.parse(JSON.stringify(ResponseObject));
                res.status(500).send(ResponseObjectJSON);
            })
        })
    })
})

module.exports = router;