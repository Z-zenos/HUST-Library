'use strict';

const mysql = require('mysql');
const faker = require('faker');
const fs = require('fs');
let str = "";

let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@nhTu@n12o1',
    database: 'HUSTLIBRARY'
});

const formatDate = function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if(month.length < 2) 
        month = '0' + month;
    if(day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}

const rand = function(length) {
    return Math.trunc(Math.random() * length);
} 

function getNumberDigits(number) {
    return number.toString().length;
}

const getID = function(type, number, max) {
    let n = getNumberDigits(max) - getNumberDigits(number),
    zero = '';
    for(let i = 0; i < n; i++)
    zero += '0';
    return `${type}${zero}${number}`;
}

const getNT = function(nm) {
    // return faker.date.between(nm, `${formatDate(nm) < `${nm.getFullYear()}-07-01` ? `${nm.getFullYear()}-08-01` : `${nm.getFullYear() + 1}-03-01`}`);
    return faker.date.between(nm, `${nm.getFullYear() + 1 }-03-01`);
}

con.connect(function(err) {
    if(err) throw err;
    const NS = [];
    let query = `SELECT COUNT(*) AS NS FROM STUDENT GROUP BY YEAR(NGAYSINH)`;
    con.query(query, function(err, res) {
        if(err) throw err;
        res = JSON.parse(JSON.stringify(res));
        res.forEach(e => NS.push(e.NS));
        for(let i = 1; i <= 50000; i++) {
            let year = 2015 + rand(7),
            manv = getID('NV0', 1 + rand(29), 30),
            mssv = getID(`${year}`, 1 + rand(NS[year - 2015]), 999999),
            randYear = year < 2017 ?  4 : 2021 - year,
            nm = faker.date.between(`${year}-10-01`, `${year + randYear}-12-31`),
            nBookBorrowed = 1 + rand(3);
            for(let j = 1; j <= nBookBorrowed; j++) {
                let BID = getID('B', 1 + rand(100000), 100000);
                let nt = getNT(nm);
                str += `${manv},${mssv},${BID},${formatDate(nm)},${formatDate(nt)}\n`;

            }
        }
                
        fs.writeFile(`${process.cwd()}/muontra.txt`, str, function(err) { 
            if(err) 
            return console.log(err); 
            else console.log('Export file successfully !');
        });
    });   
});
        
        
        
        