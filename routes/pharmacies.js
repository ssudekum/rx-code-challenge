const express = require('express')
const fs = require('fs')
const fcsv = require('fast-csv')
const router = express.Router()

router.get('/', (req, res) => {
    const rows = [];
    fs.createReadStream('pharmacies.csv')
        .pipe(fcsv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', (row) => rows.push(row))
        .on('end', () => res.send(rows))
})

module.exports = router
