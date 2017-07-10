const getNumber = (numberType) =>  {
  var number = parseInt(Math.random() * 100);
  if (numberType == 'premier') {
    number = [1, 2, 3, 5, 7, 13, 17, 19, 23, 29][number % 9]
  }
  if (numberType == 'pair') {
    number = number * 2
  }

  return Promise.resolve(
    { type: 'text', content: "Disons " + (number).toString() + ", ça irait?"}
  )
}

module.exports = getNumber
