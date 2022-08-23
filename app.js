let express=require('express');
let app = express();
let mongoose=require('mongoose');
let bodyParser = require('body-parser');
let bcrypt = require('bcrypt');


const mongoUri="mongodb+srv://User:achrafbenfredj123456789@cluster0-xy71q.mongodb.net/test?retryWrites=true&w=majority";



require('./backend/User');
require('./backend/Doctor');
let requireToken=require('./backend/requireToken');
let requireToken2=require('./backend/requireToken2');
let authRoutes= require('./routes/authRoutes');
let authRoutes1= require('./routes/authRoutes1');
app.use(bodyParser.json());

app.use(authRoutes);
app.use(authRoutes1);

mongoose.connect(mongoUri,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on("connected",()=>{
  console.log("mongo connect");
});

mongoose.connection.on("error",(err)=>{
  console.log(" mongo erreur ",err);
});

app.get('/message',requireToken,(req,res)=>{

  res.send(req.user.message);
  console.log('Get connect');
});


app.get('/doctor',requireToken,(req,res)=>{

  res.send({mydoctor:req.user.mydoctor});
  console.log('Get connect');
});


app.get('/notification',requireToken,(req,res)=>{

  res.send(req.user.notification);
  console.log('Get connect');
});




app.get('/iduser',requireToken,(req,res)=>{

  res.send({id:req.user._id});
  console.log('Get c id user');
});


app.get('/getrvd',requireToken2,(req,res)=>{

    res.send({rdvdoc:req.doctor.rdvdoc,id:req.doctor._id,photo:req.doctor.photo,nom:req.doctor.nom,prenom:req.doctor.prenom});
    console.log('Get rvddoc');
});

app.get('/gettimeplan',requireToken2,(req,res)=>{

    res.send({timeplan:req.doctor.timeplan,id:req.doctor._id});
    console.log('Get gettimeplan');
});


app.get('/parametreuser',requireToken,(req,res)=>{

    res.send({id:req.user._id,rvd:req.user.rvd});
    console.log('Get c id user');
});
app.get('/',requireToken,(req,res)=>{

  res.send(req.user);
  console.log('Get connect');
});




let User=mongoose.model('User');

let Doctor=mongoose.model('Doctor');



app.post('/findonedoctor', (req,res)=>{
    Doctor.findById(req.body.id, function (err, user) { res.send(user); } );
    console.log('achraf')


});
app.post('/findoneUser', (req,res)=>{

    User.findById(req.body.id, function (err, user) { res.send(user.rvd);  } );
    console.log('achraf')


});
app.post('/findoneUserNotif', (req,res)=>{

    User.findById(req.body.id, function (err, user) { res.send(user.notification);  } );
    console.log('achraf')


});
app.get('/getmydoctor',requireToken,(req,res)=>{

    res.send(req.user.mydoctor);
    console.log('Get connect');
});

app.post('/updatemydoctor', (req,res)=>{
console.log(req.body.mydoctor);
    User.findByIdAndUpdate(req.body.id,{
        mydoctor: req.body.mydoctor

    }).then(()=> {
        res.send({"accepte":"update doctor fav"});

        console.log('update doc fav');
    })
        .catch(err=>{
            console.log(err);
        })
});


app.post('/updatemyplan', (req,res)=>{

    Doctor.findByIdAndUpdate(req.body.id,{
        timeplan: req.body.timeplan

    }).then(()=> {
        res.send({"accepte":"update "});

        console.log('update ');
    })
        .catch(err=>{
            console.log(err);
        })
});




app.post('/updatervduser', (req,res)=>{

    User.findByIdAndUpdate(req.body.id,{
        rvd: req.body.rvd,


    }).then(()=> {
        res.send({"accepte":"update user rvd"});

        console.log('update user rvd');
    })
        .catch(err=>{
            console.log(err);
        })
});


app.post('/updatervddoctor', (req,res)=>{
    Doctor.findByIdAndUpdate(req.body.id,{
        timeplan: {
            jours: req.body.jours,
            plan:req.body.plan,
        },


    }).then(()=> {
        res.send({"accepte":"update doctor rvd "});
        console.log('update doctor rvd');

    })
        .catch(err=>{
            console.log(err);
        })
});
app.post('/updatervddoctor2', (req,res)=>{
    Doctor.findByIdAndUpdate(req.body.id,{
        rdvdoc:req.body.rvd,

    }).then(()=> {
        res.send({"accepte":"update doctor rvd2 "});
        console.log('update doctor rvd2');

    })
        .catch(err=>{
            console.log(err);
        })
});
app.post('/updatervddoctor2', (req,res)=>{
    Doctor.findByIdAndUpdate(req.body.id,{
        rdvdoc:req.body.rvd,

    }).then(()=> {
        res.send({"accepte":"update doctor rvd 2"});
        console.log('update doctor rvd 2');

    })

        .catch(err=>{
            console.log(err);
        })
});

app.get('/finddoctor', (req,res)=>{
    Doctor.find({}).then((data)=> {
        res.send(data);
    })
        .catch(err=>{
            console.log(err);
        })
});




app.post('/delete',(req,res)=>{
   User.findByIdAndRemove(req.body.id)
   .then(data=>{
     console.log(data);
     res.send("deleted");
     console.log("deleted");
  })
       .catch(err=>{
         console.log(err);
       })
});



app.post('/update', (req,res)=>{
User.findByIdAndUpdate(req.body.id,{
    nom:req.body.nom,
    prenom:req.body.prenom,
    ville:req.body.ville,
    adresse:req.body.adresse,
}).then(()=> {
  console.log('update ! ');
    res.send({"accepte":"update user ! "});
})
    .catch(err=>{
      console.log(err);
    })
});


app.post('/updatenotifacation', (req,res)=>{

  User.findByIdAndUpdate(req.body.id,{
notification: {
  list:req.body.list,
  colorbacks:req.body.colorbacks,
  pressed: req.body.pressed,
  contunue:req.body.contunue,
}

  }).then((data)=> {
    res.send({"accepte":"update notif"});

      console.log(data);
    console.log('update notification');
  })
      .catch(err=>{
        console.log(err);
      })
});
app.post('/updatemessage', (req,res)=>{
  User.findByIdAndUpdate(req.body.id,{
    message: {
      list:req.body.list,
      colorbacks:req.body.colorbacks,
      pressed: req.body.pressed,
    }

  }).then((data)=> {
    res.send({"accepte":"update message"});
console.log(data);
    console.log('update message');
  })
      .catch(err=>{
        console.log(err);
      })
});

app.post('/comparepassword',async (req,res)=>{
    const {tel,password}=req.body;

    const user=await User.findOne({tel});
    try{
        await user.comparePassword(password);
        res.send({res:true});
    }
    catch(err){
        return res.status(422).send({res:false});
    }
});
app.post('/updatemotdepass', (req,res)=>{
    User.findByIdAndUpdate(req.body.id,{
       password:bcrypt.hashSync(req.body.password,10),

        }
    ).then((data)=> {
        res.send({"accepte":"update message"});
        console.log(data);
        console.log('update message');
    })
        .catch(err=>{
            console.log(err);
        })
});



app.get('/verification',(req,res)=>{

  let TeleSignSDK = require('telesignsdk');

  const customerId = "0AD28598-2313-40E7-9CCC-5743DD4913C3";
  const apiKey = "Ilfv0JjZHBbmv77uyg1+rbCf+3rljub8QKH1BcRwNG1zi/XxL2BNWCQbiup3ZpRhi9dbi17fCmV8WfdtzAPJKA==";
  const rest_endpoint = "https://rest-api.telesign.com";
  const timeout = 10*1000; // 10 secs

  const client = new TeleSignSDK( customerId,
      apiKey,
      rest_endpoint,
      timeout // optional
      // userAgent
  );
  const code ="5454";
  const phoneNumber = "21694622592";
  const message = " votre code de confirmation[Allo_Doctor] est "+code;

  const messageType = "ARN";

  console.log("## MessagingClient.message ##");

  function messageCallback(error, responseBody) {
    if (error === null) {
      console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
          ` => code: ${responseBody['status']['code']}` +
          `, description: ${responseBody['status']['description']}`);
    } else {
      console.error("Unable to send message. " + error);
    }
  }
  client.sms.message(messageCallback, phoneNumber, message, messageType);

  res.send({code:code});

});


const geolib = require('geolib');
console.log(" e "+

  geolib.convertDistance(
      geolib.getDistance(
          { latitude: 34.7231273, longitude: 10.3358789 },
          { latitude: 35.7398724, longitude: 10.7988397 }
          ,1000),'km'
  )

+" e "+geolib.convertDistance(
        geolib.getDistance(
            { latitude: 34.7231273, longitude: 10.3358789 },
            { latitude: 33.4662476, longitude: 10.9343099 }
            ,1000),'km'
    ));




app.listen(3001,()=>{
  console.log("server run:3001");
});

