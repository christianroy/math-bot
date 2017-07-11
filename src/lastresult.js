const lastResult = (conversation) =>  {
  if (conversation.getMemory('previous-result').value) {
    return Promise.resolve(
      { type: 'text', content: conversation.getMemory('previous-result').value.toString() }
    )
  } else {
    return Promise.resolve(
      { type: 'text', content: "Je ne me souviens pas."}
    )
  }
}

module.exports = lastResult
