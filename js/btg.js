'use strict';

const fs = require('fs');
let str = "";

const rand = function(length) {
    return Math.trunc(Math.random() * length);
} 

const getBID = function(BID) {
    let id;
    if(BID < 10)  id = `B00000${BID}`;
    else if(BID >= 10 && BID < 100)   id = `B0000${BID}`;
    else if(BID >= 100 & BID < 1000)    id = `B000${BID}`;
    else if(BID >= 1000 && BID < 10000) id = `B00${BID}`;
    else if(BID >= 10000 && BID < 100000) id = `B0${BID}`;
    else id = `B${BID}`;
    return id;
}

const getMATG = function(MATG) {
    let id;
    if(MATG < 10)  id = `TG0000${MATG}`;
    else if(MATG >= 10 && MATG < 100)   id = `TG000${MATG}`;
    else if(MATG >= 100 & MATG < 1000)    id = `TG00${MATG}`;
    else if(MATG >= 1000 && MATG < 10000) id = `TG0${MATG}`;
    else id = `TG${MATG}`;
    return id;
}

/* ---------- Create dummy data ---------- */
const tgArr = [];

// Random mã tác giả cho mã sách
for(let i = 1; i <= 100000; i++){
    let numTG = rand(3) + 1;
    for(let j = 1; j <= numTG; j++) {
        let matg = getMATG(rand(20000) + 1);
        if(!tgArr.includes(matg))
            tgArr.unshift(`${matg}`);
        str += `${getBID(i)},${matg}\n`;
    }
}

// Chọn các tác giả còn thiếu từ 1 -> 20000 để bổ sung mã sách vào
if(tgArr.length !== 20000) {
    for(let i = 1; i <= 20000; i++) {
        let matg = getMATG(i);
        if(!tgArr.includes(matg)) {
            let BID = getBID(rand(100000) + 1);
            str += `${getBID(i)},${matg}\n`;
        }
    }
}

// console.log(str);

/* ---------- Write to text file ---------- */

fs.writeFile(`${process.cwd()}/btg.txt`, str, function(err) { 
    if(err) 
        return console.log(err); 
    else console.log('Export file successfully !');
});
