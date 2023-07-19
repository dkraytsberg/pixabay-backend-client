# pixabay-backend-client

## Expressjs service to search pixabay images

### Routes

`GET /search/:searchTerm?page=1&per_page=5`

Response
```
{
  searchTerm: the search parameter used to query images,
  totalResults: total results returned by pixabay api,
  page: current page number of results. default 1,
  resultsPerPage: number of reuslts per page. default 5,
  resultsCount: total of paginated results returned,
  results: [{
    id: image id,
    url: preview image url,
    imageLink: url for this service used to display details about a single image
  }]
}
```

`GET /image/:id`

Response
```
{
  id: image id,
  url: image url from pixabay,
  user: original poster of image,
  tags: [string array of tags belonging to the image]
}
```
