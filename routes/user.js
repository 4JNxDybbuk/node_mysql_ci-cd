const router = require('express').Router()
const { append } = require('express/lib/response')
const connectDB = require('../db/conn')


// fetch all data from My SQL Database 
router.get('/', (req, res) => {
    connectDB.query('SELECT * FROM usertbl WHERE status = "active" ', (err, rows) => {
        if (!err)
            res.render('home', { rows })
        else
            console.log("My SQL Error => " + err)
    })
})


// Find user by name.
router.post('/', (req, res) => {
    var serachTerm = req.body.search

    connectDB.query('SELECT * FROM usertbl WHERE first_name LIKE ? OR last_name LIKE ? ',
        ['%' + serachTerm + '%', '%' + serachTerm + '%'], (err, rows) => {
            if (!err)
                res.render('home', { rows })
            else
                console.log("My SQL Error => " + err)
        })
})


// get new user form.
router.get('/adduser', (req, res) => {
    res.render('add-user')
})


// Add new User to the database.
router.post('/adduser', (req, res) => {

    const { first_name, last_name, email, phone, comments } = req.body

    connectDB.query('INSERT INTO usertbl SET first_name= ? , last_name= ? , email= ? , phone= ?, comments= ? ',
        [first_name, last_name, email, phone, comments], (err, rows) => {
            if (!err)
                res.render('add-user', { alert: 'User Addes Successfully' })
            else
                console.log("My SQL Error => " + err)
            // console.log("New User Inserted => ", rows)
        })
})


// get edit user form 
router.get('/edituser/:id', (req, res) => {
    connectDB.query('SELECT * FROM usertbl WHERE userID = ?', [req.params.id], (err, rows) => {
        if (!err)
            res.render('edit-user', { rows })
        else
            console.log("My SQL Error => " + err)
        // console.log(rows)
    })
})


// Upfate user by id
router.post('/edituser/:id', (req, res) => {

    const { first_name, last_name, email, phone, comments } = req.body

    connectDB.query('UPDATE usertbl SET first_name= ? , last_name= ? , email= ? , phone= ?, comments= ? WHERE userID= ? ',
        [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {
            if (!err) {
                //   res.render('edit-user', { alert: 'User Update Successfully' })
                if (!err) {
                    // User the connection
                    connectDB.query('SELECT * FROM usertbl WHERE userID = ?', [req.params.id], (err, rows) => {
                        // When done with the connection, release it

                        if (!err) {
                            res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
                        } else {
                            console.log(err);
                        }
                    });
                } else {
                    console.log(err);
                }
            }
            else
                console.log("My SQL Error => " + err)
            // console.log("New User Inserted => ", rows)
        })

})


//Delete user records
router.get('/deleteuser/:id', (req, res) => {
    connectDB.query('DELETE FROM usertbl WHERE userID= ?', [req.params.id], (err, rows) => {
        if (!err) {
            res.redirect('/')
        } else
            console.log("Error => " + err)
    })
})


// get single user record by id
router.get('/viewuser/:id', (req, res) => {
    connectDB.query('SELECT *  FROM usertbl WHERE userID= ?', [req.params.id], (err, rows) => {
        if (!err)
            res.render('view-user', { rows })
        else
            console.log("Error => " + err)
    })
})

module.exports = router
