const IndustryData = require('../models/IndustryDataModel');
const AppError = require('../utils/appError');

exports.getAllIndustryData = async (req, res, next) => {
  try {
    const industryData = await IndustryData.findAll();
    res.status(200).json({ count: industryData.length, industryData });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.createIndustryData = async (req, res, next) => {
  try {
    const { facultyId } = req.body;
    const { path } = req.file;

    if (!facultyId || !path) {
      return next(new AppError('Please provide {facultyId,file}', 400));
    }

    const newIndustryData = await IndustryData.create({
      facultyId,
      pdfUrl: path,
    });

    res.status(201).json({ success: true, newIndustryData });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.getIndustryDataById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const industryData = await IndustryData.findByPk(id);

    if (!industryData) {
      return next(
        new AppError(`IndustryData with id ${id} was not found`, 404)
      );
    }

    res.status(200).json({ success: true, industryData });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.updateIndustryDataById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { facultyId } = req.body;
    const { path } = req.file;

    if (!facultyId || !path) {
      return next(new AppError('Please provide {facultyId,file}', 400));
    }

    const industryData = await IndustryData.findByPk(id);

    if (!industryData) {
      return next(`IndustryData with id ${id} was not found`, 404);
    }

    const updatedIndustryData = await IndustryData.update(
      {
        facultyId,
        pdfUrl: path,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(201).json({ success: true, updatedIndustryData });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.deleteIndustryDataById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const industryData = await IndustryData.findByPk(id);

    if (!industryData) {
      return next(new AppError(`IndustryData with id ${id} was not found`));
    }

    await IndustryData.destroy({
      where: {
        id: id,
      },
    });

    res.status(203).json({ success: true });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};
