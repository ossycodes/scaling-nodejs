const { fork } = require("child_process");

/**
 * Because Nodejs is single threaded we run into the need to scale our applications much sooner
 * this is not a problem and it's actually a benefit of Nodejs
 * 
 * Nodejs is designed to clone your application and then run it using multi instances simultaneously, this process is called FORKING
 */

 /**
 * with these we have created 3 node instances, they each have
 * their own memory and they each have their own processID
 */

 const process = [
    fork("./app.js", ["3001"] ),
    fork("./app.js", ["3002"]),
    fork("./app.js", ["3003"])
];

console.log("forked process", process.length);

/**
 * there is another module that we can use to fork our application into a pool of
 * processes which is the cluster module.
 */

 