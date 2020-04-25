const router = require('express').Router()
const User = require('../model/User')
const Joi = require('@hapi/joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation')


router.post('/register', async (req, res) => {

    //Data validation
    const { error } = registerValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    //Check Email exist
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) {
        return res.status(400).send('Email already exist')
    }

    //Encrypt password
    const salt = await bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const saveUser = await user.save()
        res.send({ user: saveUser.id })
    } catch (err) {
        res.status(400).send(err)
    }
})

//LOGIN

router.post('/login', async (req, res) => {

    //Data validation
    const { error } = loginValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    //Check Email exist
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send('Email is not found')
    }
    //Validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
        return res.status(400).send('Password incorrect')
    }
    //Create user toke
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('Authorization', token).send(token)


})

module.exports = router