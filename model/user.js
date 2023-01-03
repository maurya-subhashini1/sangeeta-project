
const mongoose=require('mongoose');
const validator=require('validator')
require('dotenv').config()

mongoose.set('strictQuery', false);



const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/accessSystem'
// mongoose.connect(MONGO_URL)
// const MONGO_URL = 'mongodb://127.0.0.1:27017/accessSystem'
mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,

    
})
.then(()=>{
    console.log('DB Connection...');
}).catch((err)=>{
    console.log(err); 
})

  
const User=mongoose.Schema({
    firstName:{
        type:String,
        required:true

    },
    lastName:{
        type:String,
        required:true

    },
   
    phoneNumber: {
        type: String,
        required: [true, "User phone number required"],
        sparse: true,

        validate: {
          validator: function (v) {
            return /^\d{10}$/.test(v);
          },
          message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
    email:{
        type:String,
        required:true,
        unique:[true,'Email id already exits'],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Email is invalid!')
            }
        }
    },

    role:{
        type:String,
        required:true,
    },  
    password:{
        type:String,
        required:true,
        minlength:[8,'Your password be bhi 8 characters']
    },  

   
   

})

const user= mongoose.model('User',User)


module.exports=user
