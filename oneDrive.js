
var fs = require('fs');
var mime = require('mime');
var request = require('request');

var file = 'c:/Exports/box.zip'; // Filename you want to upload on your local PC
var onedrive_folder = 'samplefolder'; // Folder name on OneDrive
var onedrive_filename = 'box.zip'; // Filename on OneDrive

request.post({
    url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    form: {
        redirect_uri: 'http://localhost/dashboard',
        client_id: "56cafd9a-c769-4f98-8757-bfb60275f69b",
        client_secret: onedrive_client_secret,
        refresh_token: onedrive_refresh_token,
        grant_type: 'refresh_token'
    },
}, function (error, response, body) {
    fs.readFile(file, function read(e, f) {
        request.put({
            url: 'https://graph.microsoft.com/v1.0/drive/root:/' + onedrive_folder + '/' + onedrive_filename + ':/content',
            headers: {
                'Authorization': "Bearer " + JSON.parse(body).access_token,
                'Content-Type': mime.lookup(file),
            },
            body: f,
        }, function (er, re, bo) {
            console.log(bo);
        });
    });
});


// const xhr = require("xmlhttprequest").XMLHttpRequest;

// var createCORSRequest = function (method, url) {
//     var request = new xhr();
//     // if ("withCredentials" in xhr) {
//     //     // Most browsers.
//         request.open(method, url, true);
//     // } else if (typeof XDomainRequest != "undefined") {
//     //     // IE8 & IE9
//     //     request = new XDomainRequest();
//     //     request.open(method, url);
//     // } else {
//     //     // CORS not supported.
//     //     request = null;
//     // }
//     return request;
// };

// var url = 'https://graph.microsoft.com/v1.0/me/drive/root/children';
// var method = 'GET';
// var request = createCORSRequest(method, url);

// request.onload = function () {
//     console.log(request.responseText);
// };

// request.onerror = function () {
//     console.log("err");
// };

// request.onreadystatechange = function () {

// }

// request.setRequestHeader('Authorization', 'Bearer access_token_value');
// request.send();