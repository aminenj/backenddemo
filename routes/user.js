const express = require('express');

const router = express.Router();

const User = require('../models/user');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


router.post('/register' , async (req, res)=>{

    data = req.body;

    usr = new User(data);
    

    salt = bcrypt.genSaltSync(10);
    cryptedPass = await bcrypt.hashSync( data.password , salt);
    
    usr.password = cryptedPass;

    usr.save()
       .then(
        (saved)=>{
            res.status(200).send(saved)
        }
        )
       .catch(
        (err)=>{
            res.status(400).send(err);
        }
       )
})




router.post('/login' , async (req, res)=>{

    data = req.body;

    user = await User.findOne({ email: data.email})

    if(!user){
        res.status(404).send(' email or password invalid !');
    }
    else{

        validPass = bcrypt.compareSync(data.password , user.password)

        if(!validPass){
            res.status(401).send(' email or password invalid !')
        }
        else{
            payload = {
                _id: user._id,
                email: user.email,
                name: user.name
            }
            token = jwt.sign( payload , '1234567')

            res.status(200).send({ mytoken: token})
        }
    }
})

//khedama hadi
router.get('/all', async(req, res)=>{

    try{
        users = await User.find();
        res.status(200).send(users);
    }
    catch (error) {
        res.status(400).send(error)
    }
})

//update khedama
router.put('/updte/:id', async(req, res)=>{
    try {
        id = req.params.id;
        newData = req.body;
        updated = await User.findByIdAndUpdate({ _id: id }, newData);

        res.status(200).send(updated);
    }
    catch(error) {
        res.status(400).send(error)
    }
})



module.exports = router;