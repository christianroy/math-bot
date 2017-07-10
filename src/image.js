const getImage = () =>  {
  return Promise.resolve(
    {
      type: 'picture',
      content: 'http://lorempixel.com/400/200/cats/'
    }
  )
}

module.exports = getImage
