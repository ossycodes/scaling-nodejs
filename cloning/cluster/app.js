const http = require("http");
const process = require("process");
const port = parseInt(process.argv[2] || "3000");

const options = [
    "Go for it !",
    "Maybe sleep on it",
    "Do some more research",
    "I don't know",
    "I wouldn't"
];


const server = http.createServer((req, res) => {
    const randomIndex = Math.floor(Math.random() * options.length);
    const payload = JSON.stringify({
        port,
        processID: process.pid,
        advice: options[randomIndex]
    });

    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    res.end(payload);

});

server.listen(port);
console.log("advice running on port" + port);

/***
 * The above is great, because we have only one instance of one process
 * running, we are only giong to be able to handle not so much traffic
 * THE SOLUTION is to fork this process
 *
 */