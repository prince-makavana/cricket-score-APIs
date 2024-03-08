const { ObjectId } = require('mongodb');
const { fetchUsersScore } = require('../dao/score.dao');
const scoreService = require('../services/score.service');
const { validationResult } = require('express-validator')

const createScore = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId } = req.body
    const id = new ObjectId(userId)
    const scoreCount = await fetchUsersScore(id)
    if (scoreCount.length >= 3) {
      return res.status(409).json({ error: 'You can add score max 3 times a day' })
    }
    const createScore = await scoreService.createScore(req.body);
    res.json({ success: true, data: createScore });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const fetchAllScore = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params
    const userId = new ObjectId(id)
    const response = await scoreService.findTotalScoreOfUser(userId, id);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const fetchScoreByWeek = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params
    const userId = new ObjectId(id)
    const response = await scoreService.findTotalScoreOfUserByWeek(id);
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createScore,
  fetchAllScore,
  fetchScoreByWeek
}
