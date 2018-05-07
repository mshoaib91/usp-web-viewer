/**
 * Main script that starts the server and serve the urls
 * Author: Shoaib Khan
 * Date: 27/12/2017
 */

const http = require('http');
const URL = require('url');
const querystring = require('querystring');
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
    
    var uri = URL.parse(req.url).pathname
    , filename = path.join(process.cwd(), uri);

    console.log(filename);
    
    // Handle get requests
    if (method === 'GET') {
        fs.readFile(filename, (err, data)=>{
          if(err) {
            //throw err;
            res.end('400');
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data, 'utf-8');
        })
    }
};

// Start a server
http.createServer(requestHandler).listen(process.env.PORT || 8080);