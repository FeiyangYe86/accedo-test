# accedo-test

> Demo project for Accedo FE test

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Implemented Features
### Mandatory Features
* Load and display movie entries in a carousel with cover image and title. Active / focused item would be highlighted with yellow background.
* User could play the video in full screen via clicking the item. Exiting full screen or ending the video would reidrect user to home page with watched history pushed.
* Previous watched items displayed in carousel as well.
* Video could be selected through both keyboard arraows and mouse.
* Layout would change from horizontal to vertical when screen size is smaller or equal to 768px.

### Optional Features
* Change carousel to portrait view on smaller screen size.
* Content list reload button (make a new request to api)
* Watched movies history stored in localStorage.
* Unit testing
* Create custom Error prototype to indicate different types of error for centralised error handling.

## Un-implemented Features
* Image caching.
* Styling files haven't been centralised yet.

## Known Bugs
* Since cover images of movie entries haven't been cached, the application seems always to request for the images from these url. However since the mock api returns different images every time, the cover images of watched history and those of movie list would look different...
