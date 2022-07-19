'use strict';
let str = "";
let fs = require('fs');
/* ---------- Create dummy data ---------- */

for (let tang = 1; tang <= 3; tang++) {
    for(let day = 1; day <= 5; day++) {
        for(let gia = 1; gia <= 20; gia++) {    
            for(let ngan = 1; ngan <= 6; ngan++) {         
                str += `T${tang}D${day}G${gia}N${ngan},Tang ${tang}-Day ${day}-Gia ${gia}-Ngan ${ngan}\n`;        
            }
        }
    }
}
// console.log(str);

/* ---------- Write to text file ---------- */
fs.writeFile(`${process.cwd()}/vitri.txt`, str, function(err) { 
    if(err) 
        return console.log(err); 
    else console.log('Export file successfully !');
});
