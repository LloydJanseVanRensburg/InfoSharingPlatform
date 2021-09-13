exports.getAllEnrolments = async (req, res, next) => {
  res.send('Finding All Enrolments Route');
};

exports.createEnrolment = async (req, res, next) => {
  res.send('Creating New Enrolment Route');
};

exports.getEnrolmentById = async (req, res, next) => {
  res.send('Finding Enrolment by Id Route');
};

exports.updateEnrolmentById = async (req, res, next) => {
  res.send('Updating Enrolment by Id Route');
};

exports.deleteEnrolmentById = async (req, res, next) => {
  res.send('Deleting Enrolment by Id Route');
};
