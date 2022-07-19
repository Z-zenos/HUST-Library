'use strict';

let faker = require('faker');
let fs = require('fs');
let str = "";


faker.locale = 'vi';

const khoa = [
    ['EM4', 'EM5', 'EM-E13', 'EM-E14', 'FL1', 'FL2', 'ME-NUT', 'ME-GU', 'ME-LUH', 'ET-LUH', 'TROY-BA', 'TROY-IT', 'EE-E18', 'ET-E16', 'EV2', 'PH3'],
    ['EE-EP', 'CH1', 'CH2', 'CH3', 'CH-E11', 'BF1', 'BF2', 'BF-E12', 'EV1', 'TX1', 'ED2', 'PH1', 'PH2', 'EM1', 'EM2', 'EM3'],
    ['MI1', 'MI2', 'EE1', 'EE2', 'EE-E8', 'IT-E15'],
    ['ET-E9', 'IT1', 'IT2', 'IT-E10', 'IT-E6', 'IT-E7', 'IT-EP'], 
    ['HE1', 'MS1', 'MS-E3', 'ET1', 'ET-E4', 'ET-E5'],
    ['TE3', 'ME-E1', 'TE-E2', 'TE-EP'], 
    ['ME1', 'ME2', 'TE1', 'TE2']
];

const weights = [15, 20, 25, 30, 35, 40, 45];

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

/* ---------- Weighted Random ---------- */
              
const weightedRandom = function(items, weights) {
    if(items.length !== weights.length) 
        throw new Error('Items and weights must be of the same size');

    if(!items.length) 
        throw new Error('Items must not be empty');

    const cumulativeWeights = [];
    for(let i = 0; i < weights.length; i += 1) 
        cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);

    const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
    const randomNumber = maxCumulativeWeight * Math.random();
    
    for(let itemIndex = 0; itemIndex < items.length; itemIndex += 1)
        if(cumulativeWeights[itemIndex] >= randomNumber) 
            return itemIndex;
}

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
    return `${firstName.substr(idx + 1)}.${lastName[0] + firstName[0]}${id.substr(2)}@sis.hust.edu.vn`;
}
// console.log('Ð'.charCodeAt(0), 'Đ'.charCodeAt(0));

/* ----------  ~10000000 Sinh vien ---------- */

for(let year = 2015; year <= 2021; year++) {
    let numberStudentPerYear = 180000 + Math.trunc(Math.random() * 40000);
    for(let i = 1; i <= numberStudentPerYear; i++) {
        let lastName = faker.name.lastName(),
            firstName = faker.name.firstName(),
            birthday = formatDate(faker.date.between(`${year - 18}-01-01`, `${year - 18}-12-31`)),
            idxWeight = weightedRandom(khoa, weights),
            maKhoa = khoa[idxWeight][Math.trunc(Math.random() * khoa[idxWeight].length)],
            id = getID(year, i, numberStudentPerYear);

        let email = createEmail(firstName, lastName, id);
        str += `${id},${lastName} ${firstName},${birthday},${maKhoa},${email}\n`;
    }
}
// console.log(str);


/* ---------- Write to text file ---------- */

fs.writeFile(`${process.cwd()}/sinhvien.txt`, str, function(err) { 
    if(err) 
        return console.log(err); 
    else console.log('Export file successfully !');
});
