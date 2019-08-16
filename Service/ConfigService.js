var fs = require('fs');

var Service = function () {
    this.getHostDetails = function () {
        return new Promise((resolve, reject) => {
            fs.readFile('public/config.json', 'utf8', function (err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })
    }
}

module.exports = new Service();