var logger = require('../Controller/LogController');
var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");
var firebase = require("firebase-admin");
var gfire = require("geofire");
var app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://muve-driver-location-service.firebaseio.com"
});
var firebaseRef = firebase.database().ref("drivers/").push();
var geofire = new gfire.GeoFire(firebaseRef);
var geoQuery;
var db = firebase.database();
var DriverLocationController = function () {
    this.storeLocationDetails_firebase = (body) => {
        return new Promise((resolve, reject) => {
            logger.generateLog().then(log => {
                let loggerFile = log.getLogger('locationService');
                try {
                    var driverid = null;
                    var longitude = null;
                    var latitude = null;
                    var bookingid = null;
                    var language = null;
                    var is_notification_sent = 0;
                    var paid_toll_ids = 0;
                    var vehicle_type = null;
                    var is_online = null;
                    var current_duty_status = null;
                    var onduty = null;


                    var ref = db.ref("drivers/" + body.driverid);
                    ref.once("value")
                        .then(function (snapshot) {
                            if (snapshot.exists()) {
                                if (body.driverid != undefined && (body.driverid != null && body.driverid != "")) {
                                    var driversRef = db.ref("drivers");
                                    driverid = body.driverid;
                                    driversRef.orderByChild("driverId").equalTo(parseInt(driverid)).on("child_added", function (snapshot) {
                                        let object_container = JSON.parse(JSON.stringify(snapshot.val()));

                                        driverid = object_container.driverId;
                                        longitude = object_container.longitude;
                                        latitude = object_container.latitude;
                                        bookingid = object_container.bookingId;
                                        language = object_container.language;
                                        is_notification_sent = object_container.is_notification_sent;
                                        paid_toll_ids = object_container.paid_toll_ids;
                                        vehicle_type = object_container.vehicle_type;
                                        is_online = object_container.is_online;
                                        current_duty_status = object_container.current_duty_status;
                                        onduty = object_container.onduty;

                                        if (body.longitude != undefined && (body.longitude != null && body.longitude != "")) {
                                            longitude = body.longitude;
                                        }
                                        if (body.latitude != undefined && (body.latitude != null && body.latitude != "")) {
                                            latitude = body.latitude;
                                        }
                                        if (body.bookingid != undefined && (body.bookingid != null && body.bookingid != "")) {
                                            bookingid = body.bookingid;
                                        }
                                        if (body.language != undefined && (body.language != null && body.language != "")) {
                                            language = body.language;
                                        }
                                        if (body.paid_toll_ids != undefined && (body.paid_toll_ids != null && body.paid_toll_ids != "")) {
                                            paid_toll_ids = body.paid_toll_ids;
                                        }
                                        if (body.is_notification_sent != undefined && (body.is_notification_sent != null && body.is_notification_sent != "")) {
                                            is_notification_sent = body.is_notification_sent;
                                        }
                                        if (body.vehicle_type != undefined && (body.vehicle_type != null && body.vehicle_type != "")) {
                                            vehicle_type = body.vehicle_type;
                                        }
                                        if (body.is_online != undefined && (body.is_online != null && body.is_online != "")) {
                                            is_online = body.is_online;
                                        }
                                        if (body.current_duty_status != undefined && (body.current_duty_status != null && body.current_duty_status != "")) {
                                            current_duty_status = body.current_duty_status;
                                        }
                                        if (body.onduty != undefined && (body.onduty != null && body.onduty != "")) {
                                            onduty = body.onduty;
                                        }
                                        var updatedTimestamp = Date.now();
                                        driverid = parseInt(driverid);
                                        bookingid = parseInt(bookingid);
                                        language = parseInt(language);
                                        is_notification_sent = parseInt(is_notification_sent);
                                        vehicle_type = parseInt(vehicle_type);

                                        writeUserData(driverid, longitude, latitude, bookingid, updatedTimestamp, language, paid_toll_ids, is_notification_sent, vehicle_type, is_online, current_duty_status, onduty).then(response => {

                                            var resObj = {
                                                Longitude: longitude,
                                                Latitude: latitude,
                                                Bookingid: bookingid,
                                                Driverid: driverid,
                                                language: language,
                                                paid_toll_ids: paid_toll_ids,
                                                is_notification_sent: is_notification_sent,
                                                vehicle_type: vehicle_type,
                                                is_online: is_online,
                                                current_duty_status: current_duty_status,
                                                onduty: onduty
                                            };
                                            console.log("-----------------Updated-----------------");
                                            console.log(resObj);
                                            console.log("***************************************");
                                            resolve(resObj)

                                        }).catch(err => {
                                            loggerFile.error(err);
                                            reject(err);
                                        });
                                    });
                                } else {
                                    reject('driver id is null');
                                }
                            } else {

                                if (body.driverid != undefined && (body.driverid != null && body.driverid != "")) {
                                    driverid = body.driverid;
                                }
                                if (body.longitude != undefined && (body.longitude != null && body.longitude != "")) {
                                    longitude = body.longitude;
                                }
                                if (body.latitude != undefined && (body.latitude != null && body.latitude != "")) {
                                    latitude = body.latitude;
                                }
                                if (body.bookingid != undefined && (body.bookingid != null && body.bookingid != "")) {
                                    bookingid = body.bookingid;
                                }
                                if (body.language != undefined && (body.language != null && body.language != "")) {
                                    language = body.language;
                                }
                                if (body.paid_toll_ids != undefined && (body.paid_toll_ids != null && body.paid_toll_ids != "")) {
                                    paid_toll_ids = body.paid_toll_ids;
                                }
                                if (body.is_notification_sent != undefined && (body.is_notification_sent != null && body.is_notification_sent != "")) {
                                    is_notification_sent = body.is_notification_sent;
                                }
                                if (body.vehicle_type != undefined && (body.vehicle_type != null && body.vehicle_type != "")) {
                                    vehicle_type = body.vehicle_type;
                                }
                                if (body.is_online != undefined && (body.is_online != null && body.is_online != "")) {
                                    is_online = body.is_online;
                                }
                                if (body.current_duty_status != undefined && (body.current_duty_status != null && body.current_duty_status != "")) {
                                    current_duty_status = body.current_duty_status;
                                }
                                if (body.onduty != undefined && (body.onduty != null && body.onduty != "")) {
                                    onduty = body.onduty;
                                }
                                var updatedTimestamp = Date.now();
                                driverid = parseInt(driverid);
                                bookingid = parseInt(bookingid);
                                language = parseInt(language);
                                is_notification_sent = parseInt(is_notification_sent);
                                writeUserData(driverid, longitude, latitude, bookingid, updatedTimestamp, language, paid_toll_ids, is_notification_sent, vehicle_type, is_online, current_duty_status, onduty).then(response => {

                                    var resObj = {
                                        Longitude: longitude,
                                        Latitude: latitude,
                                        Bookingid: bookingid,
                                        Driverid: driverid,
                                        language: language,
                                        paid_toll_ids: paid_toll_ids,
                                        is_notification_sent: is_notification_sent,
                                        vehicle_type: vehicle_type,
                                        is_online: is_online,
                                        current_duty_status: current_duty_status,
                                        onduty: onduty
                                    };
                                    console.log("-----------------Saved New One-----------------");
                                    console.log(resObj);
                                    console.log("***************************************");
                                    resolve(resObj)
                                }).catch(err => {
                                    loggerFile.error(err);
                                    reject(err);
                                });
                            }
                        });





                } catch (err) {
                    loggerFile.error(err);
                    reject(err);
                }
            }).catch(err => {
                console.log(err);
                reject(err);
            })

        })
    }

    this.DriversAllLocations = (id) => {
        return new Promise((resolve, reject) => {
            logger.generateLog().then(log => {
                let loggerFile = log.getLogger('locationService');
                try {
                    if (id > 0) {
                        var ref = db.ref("drivers/" + id);
                        ref.once("value")
                            .then(function (snapshot) {
                                if (snapshot.exists()) {
                                    var driversRef = db.ref("drivers");
                                    driversRef.orderByChild("driverId").equalTo(parseInt(id)).on("child_added", function (snapshot) {
                                        let object_container = JSON.parse(JSON.stringify(snapshot.val()));
                                        resolve(object_container);
                                    });
                                } else {
                                    reject("invalid driver id");
                                }
                            });




                    } else {
                        var driversRef = db.ref("drivers");
                        var final_result = [];
                        driversRef.on("value", function (snapshot) {
                            let object_container = null;
                            if (snapshot.val() != null) {
                                object_container = Object.entries(JSON.parse(JSON.stringify(snapshot.val())));
                                resolve(object_container);
                            } else {
                                resolve('no data found');
                            }

                        }, function (errorObject) {
                            loggerFile.error("The read failed: " + errorObject.code);
                            reject(err);
                        });
                    }



                } catch (err) {
                    loggerFile.error(err);
                    reject(err);
                }
            }).catch(err => {
                console.log(err);
                reject(err);
            })
        })
    }
}
function writeUserData(cur_driverId, cur_longitude, lcur_latitude, cur_bookingId, updatedTimestamp, language, paid_toll_ids, is_notification_sent, vehicle_type, is_online, current_duty_status, onduty) {
    return new Promise((resolve, reject) => {
        logger.generateLog().then(log => {
            let loggerFile = log.getLogger('locationService');
            db.ref('drivers/' + cur_driverId).set({
                longitude: cur_longitude,
                latitude: lcur_latitude,
                bookingId: cur_bookingId,
                driverId: cur_driverId,
                last_updated: updatedTimestamp,
                language: language,
                paid_toll_ids: paid_toll_ids,
                is_notification_sent: is_notification_sent,
                vehicle_type: vehicle_type,
                is_online: is_online,
                current_duty_status: current_duty_status,
                onduty: onduty
            }).then(() => {
                resolve();
            }).catch(error => {
                loggerFile.error(error);
                reject(error)
            });
        }).catch(error => {
            console.log(error);
            reject(error)
        })
    })
}

module.exports = new DriverLocationController();