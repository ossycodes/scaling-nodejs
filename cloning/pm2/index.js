/**
 * so far we have built our own cluster, In the real world there are already many tools
 * we can use to manage clusters in production eg PM2
 * 
 * PM2 is a Node.js process manager, it will allow you to manage zero downtime clusters in production
 */

 /**
 * pm2 runs in the background, to start it run pm2 start app.js -i 3 (run 3 process/ fork 3 processes | clusters)
 * when you use -i -1, pm2 automatically select the number of instances to run for your processor.
 * pm2 list : shows us a list of the application currently running
 * pm2 stop app (name of app) : stops the application
 * pm2 delete app (name of app) : to remove our app from pm2 
 * pm2 logs will show us all the logs from all of the processes
 * pm2 monit : this brings up a monitor to see logs happen in real time.,
 * 
 * so let;s say you go to the code and change something, what we can do is simply call 
 * pm2 reload app : and what pm2 does is it automatically restarts the cluster one by one and diverts traffic 
 * to clusters that aren;t been restarted 
 * (THis is how pm2 achieves ZERO DOWNTIME)
 * 
 * 
 * we can then use loadtest to see how our application spreads the requests amongst the forked worker processes
 * loadtest -n 3000 http://localhost:3000
 */