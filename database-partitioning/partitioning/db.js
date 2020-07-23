// const { LocalStorage } = require("node-localstorage");
// const db = new LocalStorage("data");

// const loadCats = () => JSON.parse(db.getItem("cats") || "[]");

// const hasCat = name => loadCats()
//     .map(cat => cat.name)
//     .includes(name);

// module.exports = {
//     addCat(newCat) {
//         if (!hasCat(newCat.name)) {
//             let cats = loadCats();
//             cats.push(newCat);
//             db.setItem("cats", JSON.stringify(cats, null, 2));
//         }
//     },

//     findCatByName(name) {
//         let cats = loadCats();
//         return cats.find(cat => cat.name === name);
//     },

//     findCatsByColor(color) {
//         let cats = loadCats();
//         return cats.filter(cat => cat.color === color);
//     }
// }

/**
 * so what happens when we have so many cats that they cannot be
 * handled by a single database (in our a case a single file) ?
 * the ANSWER is to create shards and horizontally partition our
 * cat data.
 * so we gonnna make this change here in db file, because we don;t
 * want to change the way the users (client) use the database we just
 * wanna change the way the data is stored in the database , that means
 * our index.js file won;t change, it;s just the db.js file that would 
 * handle the partitoning, so lets go add this changes !!
 * 
 */

// const { LocalStorage } = require("node-localstorage");
// /**
//  * all cats that begin with letter a-m will be saved in this
//  * partiton
//  */
// const dbA = new LocalStorage("data-a-m");
// /**
//  * all cats that begin with letter m-z will be saved in this
//  * partiton
//  */
// const dbB = new LocalStorage("data-m-z");

// /**
//  * so now I have created 2 database instances, now what I need is a 
//  * sharding function (a function which will tell us which database to use)
//  *  
//  */
// const whichDb = name => {
//      name.match(/^[A-M]|^[a-m]/) ?  dbA : dbB;
// }

// const loadCats = (db) => JSON.parse(db.getItem("cats") || "[]");

// const hasCat = name => loadCats(whichDb(name))
//     .map(cat => cat.name)
//     .includes(name);

// module.exports = {
//     addCat(newCat) {
//         /**
//          * specify which db to add cats to by name
//          */
        
//         if (!hasCat(newCat.name)) {
//             let db = whichDb(newCat.name);
//             let cats = loadCats(db);
//             cats.push(newCat);
//             db.setItem("cats", JSON.stringify(cats, null, 2));
//         }
//     },

//     findCatByName(name) {
//         /**
//          * specify which db to find cat by name from based on the cat name
//          */
//         let db = whichDb(newCat.name);
//         let cats = loadCats(db);
//         return cats.find(cat => cat.name === name);
//     },

//     findCatsByColor(color) {
//         return [
//             ...loadCats(dbA).filter(cat => cat.color === color),
//             ...loadCats(dbB).filter(cat => cat.color === color)
//         ]
//     }
// }
const { LocalStorage } = require('node-localstorage')

const dbA = new LocalStorage('data-a-m')
const dbB = new LocalStorage('data-m-z')

const whichDB = name => name.match(/^[A-M]|^[a-m]/) ?
  dbA : dbB

const loadCats = db => JSON.parse(db.getItem("cats") || '[]')

const hasCat = name => loadCats(whichDB(name))
    .map(cat => cat.name)
    .includes(name)

module.exports = {

    addCat(newCat) {
        if (!hasCat(newCat.name)) {
            let db = whichDB(newCat.name)
            let cats = loadCats(db)
            cats.push(newCat)
            db.setItem("cats", JSON.stringify(cats, null, 2))
        }
    },

    findCatByName(name) {
        let db = whichDB(name)
        let cats = loadCats(db)
        return cats.find(cat => cat.name === name)
    },

    findCatsByColor(color) {
        return [
          ...loadCats(dbA).filter(cat => cat.color === color),
          ...loadCats(dbB).filter(cat => cat.color === color),
        ]
    }

}
