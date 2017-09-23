function MovieEntry (entryObj) {
  this.availableDate = entryObj.availableDate
  this.categories = entryObj.categories
  this.contents = entryObj.contents
  this.credits = entryObj.credits
  this.description = entryObj.description
  this.id = entryObj.id
  this.images = entryObj.images
  this.metadata = entryObj.metadata
  this.parentalRatings = entryObj.parentalRatings
  this.publishedDate = entryObj.publishedDate
  this.title = entryObj.title
  this.type = entryObj.type
}

MovieEntry.prototype.getCoverImage = function () {
  let imageObj = {}
  this.images.forEach(image => {
    if (image.type === 'cover') {
      imageObj = image
    }
  })
  return imageObj
}

export { MovieEntry }
