// const http = require("http");

// let requests = 0;

// const server = http.createServer((req, res) => {
//     if (req.url === "/") {
//         requests++;
//         console.log(`${process.pid}: ${requests}`);
//         res.end(JSON.stringify(requests));
//     }
// }); 

// server.listen(3000);
// console.log("counting requests");

/**
 * The above code would be handled my a single process
 * will just increment the requests count  for each http request
 * we can see that we saving the requests in memory on line 3
 * our app will work until we have several instances of our application running 
 * let;s do this by running pm2 start app.js -i 3
 * so with this we are running three instances of our applciation
 * and when we hit this endpoint with 2000 request concurently using loadtest (loadtest -n 2000 -c 10 http://localhost:3000),
 * each process is saving their requests value in memory    
 * 
 * we can fix this problem by adding a database, and to exemplify this we are giong to be using a light weight database, a file database called (localstorage)
 * npm install node-localstorage, with this we can save our requests variable in a file database., so our processes can be synchronized
 */

const http = require("http");
const { LocalStorage  } = require("node-localstorage");

/**
 * insteading of incrementing like this in memory
 */
// let requests = 0;
/**
 * we use a file database (in this case it saves to the data folder)
 */
const db = new LocalStorage("data");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        
        // requests++;
        let requests = db.getItem("requests");
        db.setItem("requests", ++requests);

        console.log(`${process.pid}: ${requests}`);
        res.end(JSON.stringify(requests));
    }
}); 

server.listen(3000);
console.log("counting requests");

/**
 * now even though all of this processes are running they are still using a single source of truth 
 * for our requests count
 */
