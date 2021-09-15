const InternalDeadline = require('../models/InternalDeadlineModel');
const AppError = require('../utils/appError');

exports.getAllInternalDeadlines = async (req, res, next) => {
  try {
    const internalDeadlines = await InternalDeadline.findAll();
    res
      .status(200)
      .json({ count: internalDeadlines.length, internalDeadlines });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.createInternalDeadline = async (req, res, next) => {
  try {
    const { facultyId, deadlineDate, description } = req.body;

    if (!facultyId || !deadlineDate || !description) {
      return next(
        new AppError(
          'Please provide {facultyId,deadlineDate,hostelAcceptanceStudents}',
          400
        )
      );
    }

    const newInternalDeadline = await InternalDeadline.create({
      facultyId,
      deadlineDate,
      description,
    });

    res.status(201).json({ success: true, newInternalDeadline });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.getInternalDeadlineById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const internalDeadline = await InternalDeadline.findByPk(id);

    if (!internalDeadline) {
      return next(
        new AppError(`InternalDeadline with id ${id} was not found`, 404)
      );
    }

    res.status(200).json({ success: true, internalDeadline });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.updateInternalDeadlineById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { facultyId, deadlineDate, description } = req.body;

    if (!facultyId || !deadlineDate || !description) {
      return next(
        new AppError(
          'Please provide {facultyId,deadlineDate, description}',
          400
        )
      );
    }

    const internalDeadline = await InternalDeadline.findByPk(id);

    if (!internalDeadline) {
      return next(`InternalDeadline with id ${id} was not found`, 404);
    }

    const updatedInternalDeadline = await InternalDeadline.update(
      {
        facultyId,
        deadlineDate,
        description,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(201).json({ success: true, updatedInternalDeadline });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.deleteInternalDeadlineById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const internalDeadline = await InternalDeadline.findByPk(id);

    if (!internalDeadline) {
      return next(new AppError(`InternalDeadline with id ${id} was not found`));
    }

    await InternalDeadline.destroy({
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

exports.getAllFacultyInternalDeadlines = async (req, res, next) => {
  try {
    const { id } = req.params;
    const internalDeadlines = await InternalDeadline.findAll({
      where: {
        facultyId: id,
      },
    });

    res.status(200).json({ success: true, internalDeadlines });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};
