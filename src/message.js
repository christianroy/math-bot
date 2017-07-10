/*
 * message.js
 * This file contains your bot code
 */

const recastai = require('recastai')

const operations = require('./operations')
const getNumber = require('./getnumber')
const help = require('./help')
const getImage = require('./image')


// This function is the core of the bot behaviour
const replyMessage = (message) => {

  const sendOut = (result) => {
    console.log("Trying to send ", result)
    message.addReply(result)
    message.reply().then(() => {
      console.log("Done.")
    })
  }

  // Instantiate Recast.AI SDK, just for request service
  const request = new recastai.request(process.env.REQUEST_TOKEN, process.env.LANGUAGE)
  // Get text from message received
  const text = message.content

  console.log('I receive: ', text)

  // Get senderId to catch unique conversation_token
  const senderId = message.senderId

  // Call Recast.AI SDK, through /converse route
  request.converseText(text, { conversationToken: senderId })
  .then(result => {
    /*
    * YOUR OWN CODE
    * Here, you can add your own process.
    * Ex: You can call any external API
    * Or: Update your mongo DB
    * etc...
    */
    if (result.action) {
      console.log('The conversation action is: ', result.action.slug)
    }

    // If there is not any message return by Recast.AI for this current conversation
    if (!result.replies.length) {
      console.log("There are no replies")
      message.addReply({ type: 'text', content: 'I don\'t have the reply to this yet :)' })
    } else {
      // Add each reply received from API to replies stack
      console.log("There are replies: ", result.replies.length)
      result.replies.forEach(replyContent => message.addReply({ type: 'text', content: replyContent }))
    }

    // Send all replies
    message.reply()
    .then(() => {
      if (result.action && result.action.done) {
        console.log("Will process the action...")
        switch (result.action.slug) {
          case 'summing-numbers':
            operations(result.getMemory('operand1').raw, result.getMemory('operand2').raw).then(res => sendOut(res))
            break
          case 'getting-a-number':
            getNumber(result.getMemory('number-type').raw).then(res => sendOut(res))
            break
          case 'getting-an-image':
            getImage().then(res => sendOut(res))
            break
          case 'aide':
            help().then(res => sendOut(res))
            break
        }
      }
    })
    .catch(err => {
      console.error('Error while sending message to channel', err)
    })
  })
  .catch(err => {
    console.error('Error while sending message to Recast.AI', err)
  })
}

module.exports = replyMessage
