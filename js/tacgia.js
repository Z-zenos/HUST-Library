'use strict';

let faker = require('faker');
let fs = require('fs');
let str = "";


faker.locale = 'vi';
const otherLang = ['ja', 'fr', 'ru', 'ko', 'cz', 'de', 'it', 'ne', 'zh_CN'];

/* ---------- Create dummy data ---------- */

for (let i = 1; i <= 20000; i++) {
    if(i >= 8000 && i < 18000) faker.locale = 'en';
    else if(i >= 18000 && i <= 20000) {
        faker.locale = otherLang[Math.trunc(Math.random() * otherLang.length)];
    }

    let lastName = faker.name.lastName(),
        firstName = faker.name.firstName(),
        id;
    
    if(i < 10)  id = 'TG0000' + i;
    else if(i >= 10 && i < 100)   id = 'TG000' + i;
    else if(i >= 100 && i < 1000)   id = 'TG00' + i;
    else if(i >= 1000 && i < 10000)   id = 'TG0' + i;
    else id = 'TG' + i;

    str += `${id},${lastName} ${firstName}\n`;
}
// console.log(str);

/* ---------- Write to text file ---------- */

fs.writeFile(`${process.cwd()}/tacgia.txt`, str, function(err) { 
    if(err) 
        return console.log(err); 
    else console.log('Export file successfully !');
});
