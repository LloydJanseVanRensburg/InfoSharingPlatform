exports.getAllInternalDeadlines = async (req, res, next) => {
  res.send('Finding All InternalDeadlines Route');
};

exports.createInternalDeadline = async (req, res, next) => {
  res.send('Creating New InternalDeadline Route');
};

exports.getInternalDeadlineById = async (req, res, next) => {
  res.send('Finding InternalDeadline by Id Route');
};

exports.updateInternalDeadlineById = async (req, res, next) => {
  res.send('Updating InternalDeadline by Id Route');
};

exports.deleteInternalDeadlineById = async (req, res, next) => {
  res.send('Deleting InternalDeadline by Id Route');
};
