exports.getAllStudentStatuses = async (req, res, next) => {
  res.send('Finding All StudentStatuses Route');
};

exports.createStudentStatus = async (req, res, next) => {
  res.send('Creating New StudentStatus Route');
};

exports.getStudentStatusById = async (req, res, next) => {
  res.send('Finding StudentStatus by Id Route');
};

exports.updateStudentStatusById = async (req, res, next) => {
  res.send('Updating StudentStatus by Id Route');
};

exports.deleteStudentStatusById = async (req, res, next) => {
  res.send('Deleting StudentStatus by Id Route');
};
