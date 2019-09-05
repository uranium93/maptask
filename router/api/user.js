const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../../Models/User')
const Locations = require('../../Models/Locations')


router.post('/singup', async (req, res) => {
    try {
        const { userName, password, email } = req.body
        // Fetch the user by email to check if exist
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).send('')
        }

        // Create a new user instance
        user = new User({ email, password, userName })

        // Encrypt the Password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        // Save the user to database
        await user.save()
        return res.send('')
    } catch (err) {
        return res.status(403).send('')
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).send('')
        }
        const verifiedPass = await bcrypt.compare(password, user.password)
        if (verifiedPass !== true) {
            return res.status(404).send('')
        }
        const userToSend = {
            _id: user._id,
            userName: user.userName,
            email: user.email,
            date: user.date
        }
        // Generate JWT
        const payloadJWT = {
            id: user.id
        }
        const token = await jwt.sign(payloadJWT, config.get('jwtSecret'), { expiresIn: 7200 })
        const locations = await Locations.find({ user_id: user._id })
        return res.json({ user: userToSend, token, locations })
    } catch (err) {
        console.log(err)
        return res.status(404).send('')
    }
})

router.post('/tokenLogin', async (req, res) => {
    try {

        const decoded = await jwt.verify(req.body.token, config.get('jwtSecret'))
        const user = await User.findById(decoded.id)

        const userToSend = {
            email: user.email,
            date: user.date,
            _id: user._id,
            userName: user.userName
        }
        const payloadJWT = {
            id: user.id
        }
        const token = await jwt.sign(payloadJWT, config.get('jwtSecret'), { expiresIn: 7200 })
        const locations = await Locations.find({ user_id: user._id })
        return res.json({ token, user: userToSend, locations })
    } catch (err) {
        console.log(err)
        return res.status(403).send('')
    }
})
module.exports = router