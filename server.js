var neurosky = require('./lib')
var net = require('net');

var client = neurosky.createClient({
	appName:'NodeNeuroSky',
	appKey:'0fc4141b4b45c675cc8d3a765b8d71c5bde9390'
})

client.connect()

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
	console.log("connection established")
  	client.on('data',function(data){
		console.log(data);
		ws.send(JSON.stringify(data));
	}); 
});