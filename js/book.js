'use strict';

const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();
const xlsx = require('xlsx');
const faker = require('faker');
const fs = require('fs');
const workBook = xlsx.readFile('book.xlsx');
const ws = workBook.Sheets['Worksheet'];
const book = xlsx.utils.sheet_to_json(ws);
let str = "";

faker.locale = 'en';

const NXB = ['NXB01', 'NXB02', 'NXB03', 'NXB04', 'NXB05', 'NXB06', 'NXB07', 'NXB08', 'NXB09', 'NXB10', 'NXB11', 'NXB12', 'NXB13', 'NXB14', 'NXB15', 'NXB16', 'NXB17', 'NXB18', 'NXB19', 'NXB20', 'NXB21', 'NXB22', 'NXB23', 'NXB24', 'NXB25', 'NXB26', 'NXB27', 'NXB28', 'NXB29', 'NXB30', 'NXB31', 'NXB32', 'NXB33', 'NXB34', 'NXB35', 'NXB36', 'NXB37', 'NXB38', 'NXB39', 'NXB40', 'NXB41', 'NXB42', 'NXB43', 'NXB44', 'NXB45', 'NXB46', 'NXB47', 'NXB48'];

const rand = function(length) {
    return Math.trunc(Math.random() * length);
} 

/* ---------- Create dummy data ---------- */

for(let i = 1; i <= book.length; i++){
    let manxb = NXB[rand(NXB.length)],
        page = 100 + rand(1901),
        sl = 1 + rand(10000),
        gia = parseInt(`${50 + rand(451)}000`),
        namxb = faker.date.between('2005-01-01', '2018-12-31').getFullYear(),
        lang = lngDetector.detect(`${book[i - 1].bname}`, 1)[0] !== undefined ? lngDetector.detect(`${book[i - 1].bname}`, 1)[0][0] : 'english',
        mavt = `T${rand(3) + 1}D${rand(5) + 1}G${rand(20) + 1}N${rand(6) + 1}`,
        id;
    
    if(i < 10)  id = `B00000${i}`;
    else if(i >= 10 && i < 100)   id = `B0000${i}`;
    else if(i >= 100 & i < 1000)    id = `B000${i}`;
    else if(i >= 1000 && i < 10000) id = `B00${i}`;
    else if(i >= 10000 && i < 100000) id = `B0${i}`;
    else id = `B${i}`;

    str += `${manxb},${book[i - 1].cn},${mavt},${page},${lang},${namxb},${gia},${sl},${id},"${book[i - 1].bname}"\n`;
}

/* ---------- Write to text file ---------- */

fs.writeFile(`${process.cwd()}/book.txt`, str, function(err) { 
    if(err) 
        return console.log(err); 
    else console.log('Export file successfully !');
});
