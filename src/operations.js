const operations = (operand1, operand2) =>  {
  return Promise.resolve(
    { type: 'text', content: "Ca fait " + (parseInt(operand1) + parseInt(operand2)).toString() }
  )
}

module.exports = operations
