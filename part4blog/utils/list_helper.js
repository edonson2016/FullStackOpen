const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    sum = blogs.reduce((currVal, newBlog) => newBlog.likes+currVal, 0)
    return sum
}
 
const favoriteBlog = (blogs) => {
    favorite = {
        title: "",
        author: "",
        likes: -1,
    }

    for (let i = 0; i < blogs.length; i++) {
        if (favorite.likes < blogs[i].likes) {
            favorite = blogs[i]
        }
    }
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes,
    }
}

const mostBlogs = (blogs) => {
    let map = {}

    for (let i = 0; i < blogs.length; i++) {
        if (map[blogs[i].author]) {
            map[blogs[i].author] = map[blogs[i].author] + 1
        } else {
            map[blogs[i].author] = 1
        }
    }

    largest = {
        author: '',
        blogs: -1
    }
    for (let key in map) {
        if (map[key] > largest.blogs) {
            largest = {
                author: key,
                blogs: map[key]
            }
        }
    }

    return largest
}

const mostLikes = (blogs) => {
    let map = {}

    for (let i = 0; i < blogs.length; i++) {
        if (map[blogs[i].author]) {
            map[blogs[i].author] = map[blogs[i].author] + blogs[i].likes
        } else {
            map[blogs[i].author] = blogs[i].likes
        }
    }

    largest = {
        author: '',
        likes: -1
    }
    for (let key in map) {
        if (map[key] > largest.likes) {
            largest = {
                author: key,
                likes: map[key]
            }
        }
    }

    return largest
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
  }