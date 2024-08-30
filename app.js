const sqlite3 = require('better-sqlite3')
const db = sqlite3('./sql/studietid.db', {verbose: console.log})

let result = addUser('roenoe', '', 1, 1, 'roe@admin.com')

function addUser(firstName, lastName, idRole, isAdmin, email)
 {

    let sql = db.prepare("INSERT INTO user (firstName, lastName, idRole, isAdmin, email) " + 
                         " values (?, ?, ?, ?, ?)")
    const info = sql.run(firstName, lastName, idRole, isAdmin, email)
    
    sql = db.prepare('SELECT user.id as userid, firstname, lastname, role.name  as role FROM user inner join role on user.idrole = role.id   WHERE user.id  = ?');
    let rows = sql.all(info.lastInsertRowid)
    console.log("rows.length",rows.length)

    return rows[0]
}
