var http = require('http');

var s = http.createServer(function(req,res){
          res.end('serial1:'+((Math.random() * 100) % 30)+';');
    });

s.listen(8000);
