exports.getAllEnrolmentStrategies = async (req, res, next) => {
  res.send('Finding All Faculties Route');
};

exports.createEnrolmentStrategy = async (req, res, next) => {
  res.send('Creating New EnrolmentStrategy Route');
};

exports.getEnrolmentStrategyById = async (req, res, next) => {
  res.send('Finding EnrolmentStrategy by Id Route');
};

exports.updateEnrolmentStrategyById = async (req, res, next) => {
  res.send('Updating EnrolmentStrategy by Id Route');
};

exports.deleteEnrolmentStrategyById = async (req, res, next) => {
  res.send('Deleting EnrolmentStrategy by Id Route');
};
