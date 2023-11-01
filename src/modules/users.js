const fs = require('fs');
const path = require('path');

const getUsers = ()=>{
    const filepath = path.join(__dirname, '../data/users.json')
    return fs.readFileSync(filepath);
}
module.exports = getUsers;