const movieData = require('./movies')
const categoryData = require('./categories')

let movies = []
let Movies = function () {
    this.fetchAll = async function () {
        return movieData
    }
    this.firstOrDefault = function (filter) {
        return movieData.find(filter) || null
    }
    this.saveChanges = function (movie) {
        movies.push(movie)
    }
}
let Categories = function () {
    this.fetchAll = async function () {
        return categoryData
    }
    this.firstOrDefault = function (filter) {
        return categoryData.find(filter) || null
    }
}

module.exports = {
    movies: new Movies(),
    categories: new Categories(),
}