'use strict';

let faker = require('faker');
let fs = require('fs');
let str = "";


faker.locale = 'vi';

/* ---------- Format Date ---------- */

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
 
/* ---------- Remove accents in vietnamese name ---------- */
const removeAccents = function(s) {
    let lowerName = s.toLowerCase();
    
    lowerName = lowerName.replace(/[áàảãạâấầẩẫậăắằẳẵặ]/ig, 'a');
    lowerName = lowerName.replace(/[éèẻẽẹêếềểễệ]/ig, 'e');
    lowerName = lowerName.replace(/[íìỉĩị]/ig, 'i');
    lowerName = lowerName.replace(/[óòỏõọôốồổỗộơớờởỡợ]/ig, 'o');
    lowerName = lowerName.replace(/[úùủũụưứừửữự]/ig, 'u');
    lowerName = lowerName.replace(/[ýỳỷỹỵ]/ig, 'y');
    lowerName = lowerName.replace(/[Ðđ]/ig, 'd');
    return lowerName;
};
// console.log(removeAccents('áàảãạâấầẩẫậăắằẳẵặ\néèẻẽẹêếềểễệ\níìỉĩị\nóòỏõọôốồổỗộơớờởỡợ\núùủũụưứừửữự\nýỳỷỹỵ'));

/* ---------- Create email ---------- */
const createEmail = function(firstName, lastName, id) {
    firstName = removeAccents(firstName);
    lastName = removeAccents(lastName);
    let idx = firstName.lastIndexOf(' ');
    return `${firstName.substr(idx + 1)}.${lastName + firstName.substr(0, idx).replace(' ', '')}${id.substr(2)}@hust.edu.vn`;
}

// console.log('Ð'.charCodeAt(0), 'Đ'.charCodeAt(0));

/* ---------- Create dummy data ---------- */

for (let i = 1; i <= 5; i++) {
    let lastName = faker.name.lastName(),
        firstName = faker.name.firstName(),
        birthday = formatDate(faker.date.between('1970-01-01', '1989-12-31')),
        phone = faker.phone.phoneNumber('0#########'),
        id;
    
    if(i < 10)  id = 'NV00' + i;
    else if(i >= 10 && i < 100)   id = 'NV0' + i;
    else id = 'NV' + i;

    let email = createEmail(firstName, lastName, id);
    str += `${id},${lastName} ${firstName},${birthday},${email},${phone}\n`;
}
console.log(str);

/* ---------- Write to text file ---------- */

// fs.writeFile(`${process.cwd()}/nhanvien.txt`, str, function(err) { 
//     if(err) 
//         return console.log(err); 
//     else console.log('Export file successfully !');
// });
