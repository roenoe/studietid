const sqlite3 = require('better-sqlite3')
const path = require('path')
const db = sqlite3('./sql/studietid.db', {verbose: console.log})
const express = require('express')
const app = express()
const staticPath = path.join(__dirname, 'public')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/'), (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'))
}

app.post('/adduser/', (req, res) => {
    const { firstName, lastName, idRole, isAdmin, email } = req.body

    req = req.body
    console.log(req)

    console.log(firstName, lastName, idRole, isAdmin, email)
    let user = addUser(req.firstName, req.lastName, req.idRole, req.isAdmin, req.email)

    if (!user) {
        return res.json({error: 'Failed to register user'})
    }

    return res.json({ message: 'User registered', user: user })
})

function addUser(firstName, lastName, idRole, isAdmin, email)
 {
    let check = checkEmail(email)
    if (check) {
        return check
    }

    let sql = db.prepare("INSERT INTO user (firstName, lastName, idRole, isAdmin, email) " + 
                         " values (?, ?, ?, ?, ?)")
    const info = sql.run(firstName, lastName, idRole, isAdmin, email)
    
    sql = db.prepare('SELECT user.id as userid, firstname, lastname, role.name  as role FROM user inner join role on user.idrole = role.id   WHERE user.id  = ?');
    let rows = sql.all(info.lastInsertRowid)
    console.log("rows.length",rows.length)

    return rows[0]
}

function checkEmail(email) {
    var at = 0
    var dot = 0
    let sql = db.prepare('SELECT * FROM user WHERE email = ?')
    let rows = sql.all(email)
    for (var i = 0; i < email.length; i++) {
        if (email[i] == "@") {
            at += 1
        }
        if (at > 0 && email[i] == ".") {
            dot += 1
        }
        if (email[i] == " ") {
            return {error: 'Invalid email'}
        }
    }
    if (at != 1 || dot < 1) {
        return {error: 'Invalid email'}
    }
    if (rows.length > 0) {
        return {error: 'Email already exists'}
    }
    return false
}

function getIdByEmail(email) { 
    let sql = db.prepare('SELECT id FROM user WHERE email = ?')
    let rows = sql.all(email)
    return rows[0].id
}

function delUser(id) {
    let sql = db.prepare('DELETE FROM user WHERE id = ?')
    sql.run(id)
}

function registerActivity(idUser, idSubject, idRoom, idStatus, duration) {
    let date = new Date()
    let sqlDate = date.toISOString().slice(0, 19).replace('T', ' ')
    let startTime = sqlDate

    let check = checkActivity(idUser, startTime)
    let sql = db.prepare("INSERT INTO activity (idUser, startTime, idSubject, idRoom, idStatus, duration) " + 
                         " values (?, ?, ?, ?, ?, ?)")
    sql.run(idUser, sqlDate, idSubject, idRoom, idStatus, duration)
}

function checkActivity(idUser, startTime) {
    let sql = db.prepare('SELECT * FROM activity WHERE idUser = ? AND startTime = ?')
    let rows = sql.all(idUser, startTime)
    if (rows.length > 0) {
        return {error: 'Activity already exists'}
    }
    return false
}

app.get('/getusers/', (req, res) => { 
    console.log('/getUsers/')

    const sql = db.prepare('SELECT user.id as userid, firstname, lastname, email, role.name  as role ' + 
        'FROM user inner join role on user.idrole = role.id ');
    let users = sql.all()   
    console.log("users.length", users.length)
    
    res.send(users)
})

app.get('/getactivities/', (req, res) => { 
//    console.log('/getactivities/')
    const sqltext = 'select activity.id as activityid, firstname as firstname, lastname as lastname, email, subject.name as subjectname, startTime as starttime, duration, room.name as roomname, status.name as status ' + 
        'FROM activity inner join user on activity.idUser = user.id ' + ' inner join room on activity.idRoom = room.id ' + ' inner join subject on activity.idSubject = subject.id ' + ' inner join status on activity.idStatus = status.id '
//        console.log(sqltext)
    const sql = db.prepare(sqltext);

        let activities = sql.all()   
//    console.log("activities.length", activities.length)
    res.send(activities)
})

app.post('/updateactivity/', (req, res) => {
    console.log('/updateactivity/')
    const { activityid, idStatus } = req.body

    console.log(req.body)

    console.log("activityid", activityid)
    console.log("idStatus", idStatus)
    let sql = db.prepare('UPDATE activity SET idStatus = ? WHERE id = ?')
    sql.run(idStatus, activityid)
    res.send('Activity updated')
})

app.use(express.static(staticPath)) // Serve static files
app.listen(21570, () => console.log('Server running on http://localhost:21570/')) 
