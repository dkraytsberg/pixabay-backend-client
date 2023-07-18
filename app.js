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

const fetchSingleImage = (id) => {
    return axios(createSingleImageUrl(id))
        .then(function (response) {
            const { id, webformatURL: url, user, tags = "" } = response.data.hits[0]

            return { id, url, user, tags: tags.split(',').map(s => s.trim()) }
        })
}


app.get('/search', (req, res) => {
    // TODO: add search term, pagination
    fetchSearchedImages().then(data => res.json(data))

})

app.get('/image/:id', (req, res) => {
    fetchSingleImage(req.params.id)
        .then(data => res.json(data))
        .catch(e => res.status(500).json({"message": `Unable to find image with id "${req.params.id}"`}))
})

app.listen(port, () => {
    console.log(`Pixelbay client running on port ${port}`)
})

