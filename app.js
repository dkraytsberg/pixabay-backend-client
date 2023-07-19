const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

const defaultPageSize = 5
const imageConfigUrl = "&image_type=photo"

const apiKey = "38336770-addfa6e1da7b4665e57a07057"
const baseUrl = "https://pixabay.com/api"
const createSearchUrl = (searchQuery, page = 1, resultsPerPage = defaultPageSize) => `${baseUrl}?key=${apiKey}&q=${searchQuery}&page=${page}&per_page=${resultsPerPage}${imageConfigUrl}`
const createSingleImageUrl = (imageId) => `${baseUrl}?key=${apiKey}&id=${imageId}${imageConfigUrl}`

const fetchSearchedImages = (searchTerm, page, resultsPerPage) => {
    return axios(createSearchUrl(searchTerm, page, resultsPerPage))
        .then(function (response) {
            data = response.data

            results = data.hits.map(({ id, previewURL}) => ({
                id,
                url: previewURL,
                imageLink: `/image/${id}`
            }))

            return {
                searchTerm: searchTerm,
                totalResults: data.totalHits,
                page,
                resultsPerPage,
                resultsCount: results.length,
                results: results
            }
        });
}

const fetchSingleImage = (id) => {
    return axios(createSingleImageUrl(id))
        .then(function (response) {
            const { id, webformatURL: url, user, tags = "" } = response.data.hits[0]

            return { id, url, user, tags: tags.split(',').map(s => s.trim()) }
        })
}


app.get('/search/:searchTerm', (req, res) => {
    const { page = 1, per_page: resultsPerPage = defaultPageSize } = req.query
    fetchSearchedImages(req.params.searchTerm, page, resultsPerPage)
            .then(data => res.json(data))
            .catch(e => {
                res.status(e.response.status).json({ message: e.response.data, _args: { searchTerm: req.params.searchTerm, page, per_page: resultsPerPage }})
            })

})

app.get('/image/:id', (req, res) => {
    fetchSingleImage(req.params.id)
        .then(data => res.json(data))
        .catch(e => {
            res.status(e.response.status).json({ message: e.response.data, _args: { imageId: req.params.id } })
        })
})

app.listen(port, () => {
    console.log(`Pixelbay client running on port ${port}`)
})

