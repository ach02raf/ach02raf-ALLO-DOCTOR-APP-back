let  express =require('express');
let mongoose= require('mongoose');
let jwt= require('jsonwebtoken');
let  router = express.Router();
let Doctor=mongoose.model('Doctor');
let {jwtkey}=require('../backend/keys');


router.post('/inscriDoctor', async (req,res)=>{
    console.log('Post connect');
    let  {password,nom,prenom,sexe,adresse,photo,assurance,paiement,timeplan,formation,contact,specialite,ville,gov,experience,latitude,longtitude,rdvdoc}=req.body;

    console.log(password,nom,prenom,sexe,adresse,photo,assurance,paiement,timeplan,formation,contact,specialite,ville,gov,experience,latitude,longtitude,rdvdoc);
    try {
        let doctor;

        doctor = new Doctor({password,nom,prenom,sexe,adresse,photo,assurance,paiement,timeplan,formation,contact,specialite,ville,gov,experience,latitude,longtitude,rdvdoc});
        await doctor.save();
        let token =jwt.sign({userId:doctor._id},jwtkey);
        res.send({token});

        console.log(' inscri doctor posted');
    }
    catch(err){
        console.log(' inscri failed');

        return  res.send({error:'failed'});
    }
});





router.post('/cnxDoctor',async (req,res)=>{
    const {nom,password}=req.body;
    if(!nom || !password){
        console.log(" user not found !!  ");
        return res.status(422).send({error:" user not found !!  "});
    }
    const doctor=await Doctor.findOne({nom});
    if(!doctor){
        console.log("email not found !! ");
        return res.status(422).send({error:"email not found !! "});
    }
    try{
        await doctor.comparePassword(password);
        let token =jwt.sign({userId:doctor._id},jwtkey);
        res.send({token});
    }
    catch(err){
        console.log("password not found !! ");
        return res.status(422).send({error:"password not found !! "});
    }
    console.log('connected');
});


module.exports=router;
