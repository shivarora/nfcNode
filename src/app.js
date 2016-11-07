/**
 * app
 */

"use strict";

import restify from "restify";
import fs from "fs";
var nfc = require("explorenfc");
nfc.init("/usr/bin/explorenfc-basic");
var Cryptr = require('cryptr'),
cryptr = new Cryptr('Cr0mwellTools');


process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

var server = restify.createServer({
    name: 'Firesheet NFC Write',
    version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/write/:id', function (req, res, next) {
    var textToWrite = req.params.id;

    var textToWrite = cryptr.encrypt(textToWrite);
    console.log(">>>This is the text to write " + textToWrite);
    res.send(textToWrite);
    return next();
});

server.listen(7002, function () {
    console.log('%s listening at %s', server.name, server.url);
});