const user = require('../model/user')
const bcrypt = require('bcrypt')
// const jwt=require('jsonwebtoken')
const logger = require('../loggers')
exports.member = ((req, res) => {
    console.log(req.cookies);

    bcrypt.hash(req.body.password, 10, (err, haspass) => {
        if (err) {
            console.log(err);
            return res.json({ message: err })
        }

        const members = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            role: 'member',
            password: haspass,

        }

        const insertData = user.insertMany([members])
            .then((insertData) => {
                logger.info(`New Member Added!:${JSON.stringify(insertData)}`)
                res.status(201).send({
                    message: 'New Member Added!',
                    insertData
                })
            }).catch((err) => {
                logger.error(`Email already exits!: ${members}`)
                console.log(err);
                res.send({
                    status: 404,
                    message: 'Email already exits!',
                    // error:err

                })
            })


    })
})




exports.allMember = async (req, res, next) => {

    const memberData = await user.find({})
    if (memberData.length === 0) {
        logger.error(`Data Not Found!: ${memberData}`)

        res.json({
            status: 404,
            message: "Not Found!",
            memberData

        });
    }

    logger.info(`See all members!: ${JSON.stringify(memberData)}`)

    res.json({
        status: 200,
        success: true,
        message: "All Members!",
        memberData
    });
}


//delete member
exports.deleteMemberById = async (req, res, next) => {
    const memberData = await user.findByIdAndDelete({ _id: req.params.id });

    if (!memberData) {
        // console.log(logger);
        logger.error(`Data Not Found!: ${memberData}`)
        return res.send({
            status: 404,
            message: "Data Not Found!",
        });

    }
    logger.info(`Member Deleted Successfully!: ${JSON.stringify(memberData)}`)

    res.json({
        status: 200,
        success: true,
        message: "Member Deleted Successfully!",
        memberData
    });

}
