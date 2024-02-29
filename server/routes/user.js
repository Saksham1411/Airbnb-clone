const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');

router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).send('fill all the fields');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ fullName, email, password: hashedPassword });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        return res.cookie("token", token, { sameSite: 'none', secure: true }).status(201).json({ user });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error.message);
        // console.log(error);
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(StatusCodes.BAD_REQUEST).send('fill all the fields');

    const user = await User.findOne({ email });
    if (!user) {
        return res.send("user not found");
    }
    const isMatched = bcrypt.compareSync(password, user.password);
    if (!isMatched) {
        return res.send("password not match");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return res.cookie("token", token, { sameSite: 'none', secure: true }).status(201).json({ user });

})

router.get('/profile', async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(500).send('token not find');

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: payload.userId });
    delete user.password;
    res.status(StatusCodes.OK).send(user);
})

router.post('/logout', async (req, res) => {
    res.clearCookie("token").status(200).send('logout');
})

module.exports = router;