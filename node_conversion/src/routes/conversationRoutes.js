const { Router } = require('express');
const { queryModel, listHistory, conversationDetails } = require('./../controller/conversationController');

const router = Router();

router.post('/query', queryModel);
router.get('/history', listHistory);
router.get('/history/:id', conversationDetails);

module.exports = router;
