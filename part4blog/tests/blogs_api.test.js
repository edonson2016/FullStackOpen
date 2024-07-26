const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('api test', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
    
        const blogObjects = helper.initialBlogs
          .map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    after(async () => {
        await mongoose.connection.close()
    })

    test('all blogs are return as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('get all blogs', async () => {
        const response = await api.get('/api/blogs')
    
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
        
    })

    test('get id', async () => {
        const blogObjects = helper.initialBlogs
        const blogID = blogObjects[0].id

        const response = await api.get(`/api/blogs/${blogID}`)
    
        assert.strictEqual(response.body.id, blogID)    
    })

    test('add blog', async () => {
        const newBlog = {
            
                title: "New Blog",
                author: "Edward Don",
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5,
        }  

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        newBlogObjects = await helper.getAllBlogs()
        newBlogObjectsCont = newBlogObjects.map(blog => blog.title)

        assert.strictEqual(helper.initialBlogs.length+1, newBlogObjects.length)
        assert.strictEqual(newBlogObjectsCont.includes("New Blog"), true)
        
    })

    test('delete blog', async () => {
        const deleteID = "5a422a851b54a676234d17f7"

        await api
            .delete(`/api/blogs/${deleteID}`)
            .expect(204)

        newBlogObjects = await helper.getAllBlogs()
        newBlogObjectsCont = newBlogObjects.map(blog => blog.title)
        assert.strictEqual(helper.initialBlogs.length-1, newBlogObjects.length)
        assert.strictEqual(newBlogObjectsCont.includes("React patterns"), false)
        
    })

    test('update blog', async () => {
        const deleteID = "5a422a851b54a676234d17f7"

        const newBlog = {
            title: "Updated Blog",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
        }

        await api
            .put(`/api/blogs/${deleteID}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        newBlogObjects = await helper.getAllBlogs()
        newBlogObjectsCont = newBlogObjects.map(blog => blog.title)
        assert.strictEqual(helper.initialBlogs.length, newBlogObjects.length)
        assert.strictEqual(newBlogObjectsCont.includes("Updated Blog"), true)
        
    })
})