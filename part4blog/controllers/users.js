const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

    res.status(200).json(users)
})

usersRouter.post('/' , async (req, res) => {
    const { username, name, password } = req.body

    const saltRound = 10
    const passwordHash = await bcrypt.hash(password, saltRound)

    const user = new User({
        username,
        name,
        passwordHash,
        blogs: []
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = usersRouter