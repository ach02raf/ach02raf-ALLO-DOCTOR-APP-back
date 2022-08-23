let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
const userSchema=new mongoose.Schema({


    password:{
       type: String,

    },
    nom:{
        type:String,

    },
    prenom:{
        type:String,

    },
    tel:{
        type:String,
        unique:true,

    },
    sexe:{
        type:String,

    },
    notification:{
        colorbacks:[],
        pressed:[],
        list:[],
        contunue:String

    },
    message:{
       colorbacks:[],
        pressed:[],
        list:[],
    },
    mydoctor:[],
    adresse:{
    type:String,

},
    ville:{
    type:String,

},
    cin:{
    type:String,

},
    photo:{
       type:String,
    },rvd:[],
});


userSchema.pre('save',function (next) {
const user=this;
if(!user.isModified('password')){
    return next();
}
bcrypt.genSalt(10,(err,salt)=>{
    if(err){
        return next(err);
    }
    bcrypt.hash(user.password,salt,(err,hash)=>{
        if(err){
            return next(err);
        }
        user.password=hash;
        next();
    })
})

});

userSchema.methods.comparePassword = function(candidatePassword){
    const user= this;
    return new Promise((resolve,reject)=>{

        bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{

            if (err){
                return reject(err);
            }
            if(!isMatch){
                return reject(err);
            }
            resolve(true);
        })
    })

};
let collectionName = 'users';
mongoose.model('User',userSchema,collectionName);
