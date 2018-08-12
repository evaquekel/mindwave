var neurosky = require('./lib')
var net = require('net');
var clients = [];

var client = neurosky.createClient({
	appName:'NodeNeuroSky',
	appKey:'0fc4141b4b45c675cc8d3a765b8d71c5bde9390'
})

client.connect();

client.on('data',function(data){
	console.log(data);
	//ws.send(JSON.stringify(data));
	clients.forEach(element => {
		element.send(JSON.stringify(data));
	});
});

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
	clients.push(ws);
	ws.on('close', function(code, message) {
		var i = clients.indexOf(ws);
		clients.splice(i, 1);
	});
	console.log("connection established");
});