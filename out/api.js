"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const superagent = require("superagent");
exports.remote_get = function (url) {
    const promise = new Promise(function (resolve, reject) {
        superagent.get(url)
            .end(function (err, res) {
            if (!err) {
                resolve(res);
            }
            else {
                console.log(err);
                reject(err);
            }
        });
    });
    return promise;
};
