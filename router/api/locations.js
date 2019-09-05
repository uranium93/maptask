const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const Locations = require('../../Models/Locations')

router.post('/add', async (req, res) => {
    try {
        const { name, discription, lngLat } = req.body
        const decoded = await jwt.verify(req.body.token, config.get('jwtSecret'))
        const location = new Locations({
            user_id: decoded.id,
            name,
            discription,
            location: [lngLat.lng, lngLat.lat]
        })

        await location.save()

        const payloadJWT = {
            id: location.user_id
        }
        const token = await jwt.sign(payloadJWT, config.get('jwtSecret'), { expiresIn: 7200 })
        return res.json({ token, location })
    } catch (err) {
        console.log(err)
        return res.status(403).send('')
    }
})

module.exports = router