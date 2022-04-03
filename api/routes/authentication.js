const router = require("express").Router()
const jwt    = require("jsonwebtoken")
const User   = require("../models/User")

const hashingFunctions = require("../functions/hash")

// REGISTER
router.post("/register", async(req, res) => {

    if (! req.body.username) {
        res.status(500).json("error: Incorrect Username - " + req.body.username)
    }
    else if (!req.body.email) {
        res.status(500).json("error: Incorrect Email")
    }
    else if (!req.body.password) {
        res.status(500).json("error: Incorrect password")
    }
    else{
        const newUser = new User({
            username: req.body.username,
            email   : req.body.email,
            password: hashingFunctions.hashPassword(req.body.password),
        })

        
        try{
            const savedUser = await newUser.save()
            res.status(200).json(savedUser)
        }
        catch(error){
            res.status(500).json(error)
        }
    }
})


// LOGIN

router.post("/login", async (req, res) => {
    try {

        const user = await User.findOne(
            {
                userName: req.body.username
            }
        )

        !user && res.status(401).json("Wrong User Name")

        const hashedPassword = hashingFunctions.hashPassword(req.body.password)
        

        hashedPassword != user.password &&
            res.status(401).json("Wrong Password");

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        const { password, ...userInfo } = user._doc;
        res.status(200).json({ ...userInfo, accessToken });

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router