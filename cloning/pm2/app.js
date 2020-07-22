const http = require("http");

// const options = [
//     "Go for it !",
//     "Maybe sleep on it",
//     "Do some more research",
//     "I don't know",
//     "I wouldn't"
// ];

const options = [
    "Do it",
    "Don;t DO it"
];

const server = http.createServer((req, res) => {
    const randomIndex = Math.floor(Math.random() * options.length);
    const payload = JSON.stringify({
        port: 3000,
        processID: process.pid,
        advice: options[randomIndex]
    });

    console.log("advice from process with pid:", process.pid);
    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    res.end(payload);

});

server.listen(3000);
console.log("advice running on port" + 3000);

