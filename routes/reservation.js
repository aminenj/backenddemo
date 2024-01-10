const express = require('express');
const router = express.Router();
const Rsv = require('../models/reservation');
const jwt = require('jsonwebtoken');

const moment = require('moment');


//créer reservation
router.post('/addrev' , (req, res)=>{

    data = req.body;

    rsvs = new Rsv(data);
    
    rsvs.save()
       .then(
            (savedRsv)=>{
                res.send(savedRsv)
            }
       )
       .catch(
            (err)=>{
                res.send(err)
            }
       )
})


router.post('/addres' , async(req, res)=>{

    try {
        data = req.body;
        rsvs = new Rsv(data);

        savedRsv = await rsvs.save();

        res.send(savedRsv)
    }
    catch(error) {
        res.send(error)
    }
})  


//update khedama 
router.put('/upres/:id', async(req, res)=>{
    try {
        id = req.params.id;
        newData = req.body;
        updated = await Rsv.findByIdAndUpdate({ _id: id }, newData);

        res.status(200).send(updated);
    }
    catch(error) {
        res.status(400).send(error)
    }
})

//get all khedama
router.get('/all' , async(req, res)=>{
    
    try  {
        rsvs =  await Rsv.find();
        res.status(200).send(rsvs);
    }
    catch (error) {
        res.status(400).send(error)
    }
})

//delete khedama
router.delete('/delres/:id', async(req, res)=>{
    try {
        id = req.params.id;
        newData = req.body;
        deleted = await Rsv.findByIdAndDelete({ _id: id }, newData);

        res.status(200).send(deleted);
    }
    catch(error) {
        res.status(400).send(error)
    }
})


// condition directeur
router.put('/updir/:id', async (req, res) => {
  try {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, 'votre_clé_secrète');

    if (decoded.role !== 'directeur') {
      return res.status(403).send('Accès refusé. Seul le directeur peut modifier les réservations.');
    }
    const id = req.params.id;
    const newData = req.body;
    const updated = await Rsv.findByIdAndUpdate({ _id: id }, newData);

    res.status(200).send(updated);
  } catch (error) {
    res.status(400).send(error);
  }
});



module.exports = router;