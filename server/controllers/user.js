const User = require('../models/user'),
      ctr = {};

ctr.create = () => async (req, res, next) => {
  const {
    name,
    studentId,
    mail,
    gender,
    careerProgram,
    semester,
    isTec21,
    schoolProgram,
    numRSVPs
  } = req.body;

  const user = new User({
    name,
    studentId,
    mail,
    gender,
    careerProgram,
    semester,
    isTec21,
    schoolProgram,
    numRSVPs
  });

  await user.save();

  return res.status(200).json({user});
}

ctr.edit = () => async (req, res, next) => {
  console.log("--------------Arrived hereeeeeeeeeee--------------")

  const {studentId} = req.params;
  const {
    name,
    mail,
    gender,
    careerProgram,
    semester,
    isTec21,
    schoolProgram,
    numRSVPs
  } = req.body;

  const user = new User.updateUser({
    name,
    mail,
    gender,
    careerProgram,
    semester,
    isTec21,
    schoolProgram,
    numRSVPs
  });

  return res.status(200).json({user})
}

ctr.delete = () => async (req, res, next) => {
  const {studentId} = req.params;

  const user = await User.deleteUser(studentId);

  return res.status(200).json({user});
}

ctr.getAll = () => async(req, res, next) => {

  // page & page size for pagination
  let {page, pageSize} = req.query;

  // Check for nonintegers
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;

  // Check non positive
  page = page > 1 ? page: 1;
  pageSize = pageSize > 0 ? pageSize : 10;

  // starts on 0
  currentPage = page - 1;

  const data = await User.getAll(currentPage, pageSize);

  return res.status(200).json(data);
}

ctr.getOne = () => async (req, res, next) => {
  const {studentId} = req.params;
  const user = await User.getOne(studentId);

  return res.status(200).json({user});
}

module.exports = ctr;
