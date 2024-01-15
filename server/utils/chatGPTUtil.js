const { request } = require("express");
require("dotenv").config();
const axios = require("axios");
const yup = require("yup");
const { json } = require("body-parser");


//Define CONSTANTS
const CHATGPT_END_POINT = "https://api.openai.com/v1/chat/completions";
const CHATGPT_MODEL = "gpt-3.5-turbo";

//Set configs for axios request
// const config = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer `+
// }

//Function to build conversations array
const buildConversation = (contextMessage, conversation)=>{
    return [contextMessage].concat(conversation);
}

const conversationSchema = yup.object().shape({
    role: yup.string().required(),
    content: yup.string().required()
});
//Define yup validation schema for request object
const requestSchema = yup.object().shape({
    context: yup.string().notRequired(),
    message: yup.string().required(),
    conversation: yup.array().of(conversationSchema).notRequired()
});

//Function to validate request object using yup schema
const isValidRequest = (request)=>{
    try{
        requestSchema.validateSync(request);
        return true;
    } catch(err){
        return false;
    }    
};

//Function to create the message
const createMessage = (message,role) =>{
    return {
        content: message,
        role: role
    };
};

const addMessageToConversation = (message, conversation, role) =>{
    conversation.push(createMessage(message,role));
};

// call chatGPT API
const postChatGPTMessage = async (contextMessage,conversation) =>{
    const messages = buildConversation(contextMessage,conversation);
    const chatGPTData = {
        model: CHATGPT_MODEL,
        messages: messages
    };
    try{
        const resp = await axios.post(CHATGPT_END_POINT,chatGPTData,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ process.env.CHATGPT_API_KEY
            },
        });
        const data = resp.data;
        const message = data?.choices[0]?.message;
        return message;

    }catch(err){
        console.log("Error with ChatGPT API");
        console.log(err);
    }
};

module.exports = {
    isValidRequest,
    createMessage,
    addMessageToConversation,
    postChatGPTMessage,
};