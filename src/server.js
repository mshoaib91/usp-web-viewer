/**
 * File server
 * Author: Shoaib Khan
 * Date: 7.5.2018
 */

const http = require('http');
const URL = require('url');
const fs = require('fs');
const path = require('path');

/**
 * Http request handler
 * @param {Object} req - http.ClientRequest
 * @param {Object} res - http.ServerResponse
 */
let requestHandler = (req, res) => {
    const {headers, method, url} = req;
  
    let contentPath = url.pathname;  
    
    var uri = URL.parse(req.url).pathname;
    uri = uri.replace('/', '').length === 0 ? '/index.html' : uri;
    var filename = path.join(process.cwd(), uri);
    
    // Handle get requests
    if (method === 'GET') {
        fs.readFile(filename, (err, data)=>{
          if(err) {
            //throw err;
            res.writeHead(400);
            res.end('400');
          }
          res.writeHead(200);
          res.end(data, 'utf-8');
        })
    }
};

// Start a server
http.createServer(requestHandler).listen(process.env.PORT || 8080);