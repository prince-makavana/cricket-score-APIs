const express = require('express');
const scoreController = require('../controllers/score.controller');
const { scoreSchema } = require('../middlewares/middleware');

const scoreRoute = express.Router()

scoreRoute.post('/score', scoreSchema, scoreController.createScore)
scoreRoute.get('/score/:id/all', scoreController.fetchAllScore)
scoreRoute.get('/score/:id/week', scoreController.fetchScoreByWeek)

module.exports = scoreRoute;
