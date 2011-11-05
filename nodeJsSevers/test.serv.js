var http = require('http');

var s = http.createServer(function(req,res){
          var mes = 'serial1;'+((Math.random() * 100) % 30)+';serial2;'+((Math.random() * 100) % 30)+';';
	console.log(mes);
	res.end(mes);
    });

s.listen(8000);
