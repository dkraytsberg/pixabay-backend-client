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
    return axios(createSearchUrl('yellow+flowers'))
        .then(function (response) {
          return response.data
        });
}

const fetchSingleImage = () => {
    return axios(createSingleImageUrl(2295434))
    .then(function (response) {
      return response.data
    });
}   

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/search', (req, res) => {
    fetchSearchedImages().then(data => res.json(data))
    
})

app.get('/image', (req, res) => {
    fetchSingleImage().then(data => res.json(data))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

