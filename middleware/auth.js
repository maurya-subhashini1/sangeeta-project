var jwt = require('jsonwebtoken')
const cookies=require('cookie-parser')
// const user = require('../model/user')
const user = require('../model/user')
module.exports.auth = (req, res, next) => {
    // console.log(req.cookies.user);
    try {
        var token = req.cookies.user

        var decode = jwt.verify(token, 'uyegefuGF783F4IGU')
        req.userData = decode
    

        next()
    } catch (error) {
        console.log(error);
        res.status(440 ).json({
            message: 'You are not logged '
        })
    }

}

module.exports.isAdmin=async(req,res,next)=>{
    userData=await user.findOne({_id:req.userData.id})
    // console.log(userData);
    if(userData.role!=='admin'){
        return res.json({
            status:401,
            message:'Access denied, you must be an admin'
        })
    }
    next()
}