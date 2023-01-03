const express = require("express");
const router = express.Router();
const {
  register, employeeLogin
} = require("../controller/user");
const { member, allMember, deleteMemberById } = require("../controller/members");
const { isAdmin, auth } = require("../middleware/auth");
const deshboard = require('../dummyData/deshboard')
const billing = require('../dummyData/billing')
const logger = require('../loggers')



router.post('/signup', register)
router.post('/login', employeeLogin)

// Members APIs
router.post('/member/add', auth, isAdmin, member)
router.get('/member', auth, isAdmin, allMember)
router.delete('/member/delete/:id', auth, isAdmin, deleteMemberById)


// Deshboard Billing API
router.get('/deshbord', auth, (req, res) => {
  logger.info(`Deshboard Page!:${JSON.stringify(deshboard)}`)
  res.json({
    message: 'Deshboard Page!',
    deshboardData: deshboard
  })

})


router.get('/billing', auth, isAdmin, (req, res) => {

  logger.info(`Billing Page!:${JSON.stringify(billing)}`)
  res.json({
    message: 'Billing Page!',
    billingData: billing
  })

})




module.exports = router;
