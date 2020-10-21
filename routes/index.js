const express = require('express')
const fs = require('fs')
const { parse } = require('fast-csv')
const router = express.Router()

router.get('/', (req, res) =>  res.send("Welcome to the Rx API Suite"))

router.post('/nearest-pharmacy', (req, res) => {
    const lat = req.body.latitude
    const lon = req.body.longitude
    if (!lat || !lon || -90 > lat || lat > 90 || -180 > lon || lon > 180) {
        res.sendStatus(400) // Bad Request
        return
    }

    let distance = null
    let closestLocation = null
    let earthRadius = 3957.5 // miles, as an average of Equatorial and Polar radii
    fs.createReadStream('pharmacies.csv')
        .pipe(parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', (row) => {
            let dLat = degreesToRadians(row.latitude - lat)
            let dLon = degreesToRadians(row.longitude - lon)

            // Haversine Formula
            let a = Math.sin(dLat/2) * Math.sin(dLat/2) 
                + Math.cos(degreesToRadians(lat)) * Math.cos(degreesToRadians(row.latitude)) 
                * Math.sin(dLon/2) * Math.sin(dLon/2)
            let b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
            let rowDistance = earthRadius * b

            if (distance === null || rowDistance < distance) {
                distance = rowDistance
                closestLocation = row
            }
        })
        .on('end', (count) => res.send({ 
            "location": closestLocation, 
            "distance": distance
        }))
})

function degreesToRadians(degrees) {
    return degrees * (Math.PI/180)
}

module.exports = router
