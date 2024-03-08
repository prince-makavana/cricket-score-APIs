const scoreModel = require('../models/score.model')

const createScoreService = async (scoreDetails) => {
  try {
    const score = new scoreModel(scoreDetails)
    return await score.save()
  } catch (error) {
    throw error
  }
}

const fetchUsersScore = async (userId) => {
  try {
    return await scoreModel.aggregate([
      {
        $match: {
          userId,
          createdAt: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      }
    ])
  } catch (error) {
    throw error
  }
}

const findAllUsersTotalScore = async (userId) => {
  try {
    return await scoreModel.aggregate([
      {
        $group: {
          _id: "$userId",
          totalScore: {
            $sum: "$score",
          },
        }
      },
      {
        $sort: {
          totalScore: -1
        }
      },
    ])
  } catch (error) {
    throw error
  }
}

const findUserTotalScoreByWeek = async () => {
  try {
    return await scoreModel.aggregate([
      {
        $addFields: {
          dayOfWeek: { $subtract: [ { $dayOfWeek: "$createdAt" }, 1 ] }
        }
      },
      {
        $addFields: {
          weekStart: {
            $cond: {
              if: { $lt: ["$dayOfWeek", 5] },
              then: { $subtract: ["$createdAt", { $multiply: ["$dayOfWeek", 24 * 60 * 60 * 1000] }] },
              else: { $subtract: ["$createdAt", { $multiply: [{ $subtract: ["$dayOfWeek", 4] }, 24 * 60 * 60 * 1000] }] } // Adjust to Friday
            }
          }
        }
      },
      {
        $addFields: {
          weekEnd: { $add: ["$weekStart", 6 * 24 * 60 * 60 * 1000] }
        }
      },
      {
        $group: {
          _id: {
            week: { $isoWeek: "$weekStart" },
            user: "$userId"
          },
          totalScore: { $sum: "$score" }
        }
      },
      {
        $sort: {
          totalScore: -1,
        },
      },
      {
        $group: {
          _id: "$_id.week",
          data: { $push: { userId: "$_id.user", score: "$totalScore" } }
        }
      },
      {
        $project: {
          week: "$_id",
          data: 1,
          _id: 0
        }
      }
    ])
  } catch (error) {
    throw error
  }
}

module.exports = {
  createScoreService,
  fetchUsersScore,
  findAllUsersTotalScore,
  findUserTotalScoreByWeek
}