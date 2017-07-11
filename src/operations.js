const operations = (conversation, operand1, operand2) =>  {
  var operationsResult = parseInt(operand1) + parseInt(operand2)
  conversation.setMemory({
    'previous-result': {
      'value': operationsResult
    }
  })
  return Promise.resolve(
    { type: 'text', content: "Ca fait " + (operationsResult).toString() }
  )
}

module.exports = operations
