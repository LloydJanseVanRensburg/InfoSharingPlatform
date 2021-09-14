const Faculty = require('../models/FacultyModel');
const AppError = require('../utils/appError');

exports.getAllFaculties = async (req, res, next) => {
  try {
    const faculties = await Faculty.findAll();
    res.status(200).json({ count: faculties.length, faculties });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.createFaculty = async (req, res, next) => {
  try {
    const { displayName } = req.body;

    if (!displayName) {
      return next(new AppError('Please provide display name', 400));
    }

    const newFaculty = await Faculty.create({ displayName });

    res.status(201).json({ success: true, newFaculty });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.getFacultyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findByPk(id);

    if (!faculty) {
      return next(new AppError(`Faculty with id ${id} was not found`, 404));
    }

    res.status(200).json({ success: true, faculty });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.updateFacultyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { displayName } = req.body;

    if (!displayName) {
      return next(new AppError('Please provide display name', 400));
    }

    const faculty = await Faculty.findByPk(id);

    if (!faculty) {
      return next(`Faculty with id ${id} was not found`, 404);
    }

    const updatedFaculty = await Faculty.update(
      { displayName },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(201).json({ success: true, updatedFaculty });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.deleteFacultyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findByPk(id);

    if (!faculty) {
      return next(new AppError(`Faculty with id ${id} was not found`));
    }

    await Faculty.destroy({
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
