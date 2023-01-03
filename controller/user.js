const user = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const logger = require('../loggers')
exports.register = ((req, res) => {

    bcrypt.hash(req.body.password, 10, (err, haspass) => {
        if (err) {
            console.log(err);
            return res.json({ message: err })
        }

        const newEmployee = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            role: req.body.role,
            password: haspass,

        }

        const insertData = user.insertMany([newEmployee])
            .then((insertData) => {
                logger.info(`You are signup Successful!:${JSON.stringify(insertData)}`)

                res.status(201).send({
                    message: 'You are signup Successful',
                    insertData
                })
            }).catch((err) => {
                logger.error(`Email already exits!: ${newEmployee}`)
                console.log(err);
                res.send({
                    status: 404,
                    message: 'Email already exits!',
                    // error:err

                })
            })


    })
})




exports.employeeLogin = (req, res) => {
    var email = req.body.email
    var password = req.body.password
    if (!email || !password) {
        return res.send({
            status: 401,
            success: false,
            message: 'Missing Fields, All Fields Required!'
        })
    }
    user.findOne({ email: email })
        .then((userData) => {
            bcrypt.compare(password, userData.password, (err, result) => {

                if (err) {
                    res.send({ error: 'Invalid Password or Email' })
                } else {
                    if (result) {
                        let token = jwt.sign({ id: userData._id }, 'uyegefuGF783F4IGU', { expiresIn: '6h' })
                        res.cookie("user", token)
                        // loogers
                        logger.info(`Login Successful! :${JSON.stringify(userData)}`)
                        res.json({
                            message: 'Login Successful!',
                            userDetails: userData,
                            Token: token
                        })
                    } else {
                        logger.error(`Invalid Password or Email!`)
                        res.json({
                            message: 'Invalid Password or Email'
                        })
                    }
                }

            })

        }).catch((err) => {
            logger.error(`Login failed User Not Found!`)
            res.json({
                status: 404,
                seccess: false,
                message: 'Login failed User Not Found!'
            })
        })


}








