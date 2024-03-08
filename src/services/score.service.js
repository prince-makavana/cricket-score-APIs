const scoreDao = require('../dao/score.dao');

const createScore = async (userData) => {
  try {
    return await scoreDao.createScoreService(userData);
  } catch (error) {
    throw error;
  }
};

const findTotalScoreOfUser = async (userId, id) => {
  try {
    const userScore = await scoreDao.findAllUsersTotalScore(userId);
    const index = userScore.findIndex(val => val._id == id)
    const rank = index + 1
    const totalScore = userScore[index].totalScore
    return {
      rank, totalScore
    }
  } catch (error) {
    throw error;
  }
};

const findTotalScoreOfUserByWeek = async (id) => {
  try {
    let userDetails = await scoreDao.findUserTotalScoreByWeek()
    userDetails = userDetails.map(val => {
      const index = val.data.findIndex(value => value.userId == id)
      if(index !== -1) {
        const rank = index + 1
        const totalScore = val.data[index].score
        return {
          week: val.week,
          rank,
          totalScore
        }
      } else {
        return {
          week: val.week,
          rank: 0,
          totalScore: 0
        }
      }
    })
    userDetails.sort((a,b) => a.week-b.week)
    return userDetails
  } catch (error) {

  }
}

module.exports = {
  createScore,
  findTotalScoreOfUser,
  findTotalScoreOfUserByWeek
};