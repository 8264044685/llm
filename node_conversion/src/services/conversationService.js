const axios = require('axios');

const serverUrl = process.env.BACKEND_API_URL || 'http://localhost:8000/api';

const sendQuery = async (model, query) => {
    try {
        const response = await axios.post(`${serverUrl}/chat/`, { selected_model: model, user_prompt: query });
        return response.data;
    } catch (error) {
        console.error('Error sending query:', error);
        throw new Error('Failed to send query to the model');
    }
};

const getConversationHistory = async () => {
    try {
        const response = await axios.get(`${serverUrl}/chat/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching conversation history:', error);
        throw new Error('Failed to fetch conversation history');
    }

};

const getConversationDetails = async (id) => {
    try {
        const response = await axios.get(`${serverUrl}/chat/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching conversation details:', error);
        throw new Error('Failed to fetch conversation details');
    }
};

module.exports = {
    sendQuery,
    getConversationHistory,
    getConversationDetails
};
