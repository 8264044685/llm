const { sendQuery, getConversationHistory, getConversationDetails } = require('../services/conversationService');

const queryModel = async (req, res, next) => {
    try {
        const { model, query } = req.body;
        const response = await sendQuery(model, query);
        res.json(response);
    } catch (error) {
        next(error);
    }
};

const listHistory = async (req, res, next) => {
    try {
        const history = await getConversationHistory();
        res.json(history);
    } catch (error) {
        next(error);
    }
};

const conversationDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const details = await getConversationDetails(id);
        res.json(details);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    queryModel,
    listHistory,
    conversationDetails,
};
