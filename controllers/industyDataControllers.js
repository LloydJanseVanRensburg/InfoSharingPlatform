exports.getAllIndustryData = async (req, res, next) => {
  res.send('Finding All IndustryData Route');
};

exports.createIndustryData = async (req, res, next) => {
  res.send('Creating New IndustryData Route');
};

exports.getIndustryDataById = async (req, res, next) => {
  res.send('Finding IndustryData by Id Route');
};

exports.updateIndustryDataById = async (req, res, next) => {
  res.send('Updating IndustryData by Id Route');
};

exports.deleteIndustryDataById = async (req, res, next) => {
  res.send('Deleting IndustryData by Id Route');
};
