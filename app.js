const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

const defaultPageSize = 5
const imageConfigUrl = "&image_type=photo&pretty=true"

const apiKey = "38336770-addfa6e1da7b4665e57a07057"
const baseUrl = "https://pixabay.com/api"
const createSearchUrl = (searchQuery, page = 1, perPage = defaultPageSize) => `${baseUrl}?key=${apiKey}&q=${searchQuery}&page=${page}&per_page=${perPage}${imageConfigUrl}`
const createSingleImageUrl = (imageId) => `${baseUrl}?key=${apiKey}&id=${imageId}${imageConfigUrl}`

const fetchSearchedImages = () => {
    // TODO: take search and pagination params
    return axios(createSearchUrl('yellow+flowers'))
        .then(function (response) {
            // TODO: return trimmed data
            return response.data
        });
}

const fetchSingleImage = () => {
    // TODO: take image id param
    return axios(createSingleImageUrl(2295434))
        .then(function (response) {
            // TODO: return trimmed data
            return response.data
        });
}


app.get('/search', (req, res) => {
    // TODO: add search term, pagination
    fetchSearchedImages().then(data => res.json(data))

})

app.get('/image', (req, res) => {
    // TODO: image id route
    fetchSingleImage().then(data => res.json(data))
})

app.listen(port, () => {
    console.log(`Pixelbay client running on port ${port}`)
})

