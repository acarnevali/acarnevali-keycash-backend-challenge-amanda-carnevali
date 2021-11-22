const express = require('express')
const router = express.Router()
const Building = require('../models/building')

router.get('/', async (req, res) => {
    try{
        const buildings = await Building.find()
        res.json(buildings)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

})

router.get('/:id', getBuilding, (req, res)=> {
    res.json(res.building)
})

router.post('/new', async (req, res) => {
    const building = new Building({
        street: req.body.street,
        addressNumber: req.body.addressNumber,
        district: req.body.district,
        city: req.body.city,
        zipCode: req.body.zipCode
    })

    try{
        const newBuilding = await building.save()
        res.status(201).json(Building)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.patch('/edit/:id', getBuilding, async (req, res)=> {
    if(req.body.street != null){
        res.building.street = req.body.street
    }
    if(req.body.addressNumber != null) {
        res.building.addressNumber = req.body.addressNumber
    }
    try{
        const updateBuilding = await res.building.save()
        res.json(updateBuilding)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.delete('/delete/:id', getBuilding, async (req, res) => {
    try {
        await res.building.remove()
        re.json({message: 'Building was deleted'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

async function getBuilding(req, res, next) {
    try {
        building = await Building.findById(req.params.id)
        if(building == null){
            return res.status(404).json({message:'Building not found'})
        } 
    } catch (error) {
        return res.status(500).json({message: error.message})
    } 

    res.building = building
    next()
}

module.exports = router