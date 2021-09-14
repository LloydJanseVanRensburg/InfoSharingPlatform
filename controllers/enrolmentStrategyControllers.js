const EnrolmentStrategy = require('../models/EnrolmentStrategyModel');
const AppError = require('../utils/appError');

exports.getAllEnrolmentStrategies = async (req, res, next) => {
  try {
    const enrolmentStrategies = await EnrolmentStrategy.findAll();
    res
      .status(200)
      .json({ count: enrolmentStrategies.length, enrolmentStrategies });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.createEnrolmentStrategy = async (req, res, next) => {
  try {
    const { facultyId } = req.body;
    const { path } = req.file;

    if (!facultyId || !path) {
      return next(new AppError('Please provide {facultyId,file}', 400));
    }

    const newEnrolmentStrategy = await EnrolmentStrategy.create({
      facultyId,
      pdfUrl: path,
    });

    res.status(201).json({ success: true, newEnrolmentStrategy });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.getEnrolmentStrategyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const enrolmentStrategy = await EnrolmentStrategy.findByPk(id);

    if (!enrolmentStrategy) {
      return next(
        new AppError(`EnrolmentStrategy with id ${id} was not found`, 404)
      );
    }

    res.status(200).json({ success: true, enrolmentStrategy });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.updateEnrolmentStrategyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { facultyId } = req.body;
    const { path } = req.file;

    if (!facultyId || !path) {
      return next(new AppError('Please provide {facultyId,file}', 400));
    }

    const enrolmentStrategy = await EnrolmentStrategy.findByPk(id);

    if (!enrolmentStrategy) {
      return next(`EnrolmentStrategy with id ${id} was not found`, 404);
    }

    const updatedEnrolmentStrategy = await EnrolmentStrategy.update(
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

    res.status(201).json({ success: true, updatedEnrolmentStrategy });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.deleteEnrolmentStrategyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const enrolmentStrategy = await EnrolmentStrategy.findByPk(id);

    if (!enrolmentStrategy) {
      return next(
        new AppError(`EnrolmentStrategy with id ${id} was not found`)
      );
    }

    await EnrolmentStrategy.destroy({
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
