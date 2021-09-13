exports.getAllFaculties = async (req, res, next) => {
  res.send('Finding All Faculties Route');
};

exports.createFaculty = async (req, res, next) => {
  res.send('Creating New Faculty Route');
};

exports.getFacultyById = async (req, res, next) => {
  res.send('Finding Faculty by Id Route');
};

exports.updateFacultyById = async (req, res, next) => {
  res.send('Updating Faculty by Id Route');
};

exports.deleteFacultyById = async (req, res, next) => {
  res.send('Deleting Faculty by Id Route');
};
