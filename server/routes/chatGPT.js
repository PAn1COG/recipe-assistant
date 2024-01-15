// ROUTES

const express = require("express");
const { isValidRequest, createMessage, addMessageToConversation, postChatGPTMessage } = require("../utils/chatGPTUtil");
const { USER_TYPES } = require("../constants/chatGPTRoles");

//Create a new router instance

const router = express.Router();

//Create a post Request

router.post("/",async(req,res) =>{
    //TODO Validate the body
    if(!isValidRequest(req.body)){
        return res.status(400).json({error:"Invalid request"});
    }
    //TODO Extract the message and conversation from the req body
    const {message, context, conversation = []} = req.body;
    // console.log(req.body);
    //TODO Create context message
    const contextMessage = createMessage(context, USER_TYPES.SYSTEM);

    console.log(contextMessage);
    //TODO Add user message to conversation
    addMessageToConversation(message, conversation, USER_TYPES.USER);
    // console.log(conversation);
    //TODO Call the function to get response from ChatGPT API
    console.log("Generating Response...\n");
    const chatGPTResponse = await postChatGPTMessage(
        contextMessage,
        conversation
    );
    //TODO Check error
    if(!chatGPTResponse){
        return res.status(500).json({error: "Error with ChatGPT"});
    }
    //TODO extract content from ChatGPT response
    const {content} = chatGPTResponse;
    //TODO add content to conversation
    addMessageToConversation(content,conversation,USER_TYPES.ASSISTANT);
    // console.log(conversation);
    //TODO Return the conversation as JSON 
    return res.status(200).json({response: conversation});
})

module.exports = router;