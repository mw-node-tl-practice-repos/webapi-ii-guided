const express = require('express');

const router = express.Router();

const Hubs = require('./hubs-model');

router.get('/', (req, res) => {
    Hubs.find(req.query)
    .then(hubs => {
        res.status(200).json(hubs);
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "Error retrieving the hubs", error})
    })
})

router.get('/:id', (req, res) => {
    Hubs.findById(req.params.id)
    .then(hub => {
        if (hub) {
            res.status(200).json(hub);
        } else {
            res.status(404).json({message: "Hub not found!"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error retrieving the hub", err})
    })
})

router.post('/', (req, res) => {
    Hubs.add(req.body)
    .then(hub => {
        res.status(201).json(hub)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Error retrieving the hub", err
        })
    })
})

router.put('/:id', (req, res) => {
    const changes = req.body
    Hubs.update(req.params.id, changes)
    .then(hub => {
        if (hub) {
            res.status(200).json(hub)
        } else {
            res.status(404).json({message: "This hub could not be found"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error updating the hub"})
    })
})

router.delete('/:id', (req, res) => {
    Hubs.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: "The hub has been deleted"})
        } else {
            res.status(404).json({message: "This hub could not be found!"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Error removing the hub"
        })
    })
})

module.exports = router;