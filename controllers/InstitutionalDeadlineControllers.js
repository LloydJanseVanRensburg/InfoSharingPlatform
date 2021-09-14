const InstitutionalDeadline = require('../models/InstitutionalDeadlineModel');
const AppError = require('../utils/appError');

exports.getAllInstitutionalDeadlines = async (req, res, next) => {
  try {
    const institutionalDeadlines = await InstitutionalDeadline.findAll();
    res
      .status(200)
      .json({ count: institutionalDeadlines.length, institutionalDeadlines });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.createInstitutionalDeadline = async (req, res, next) => {
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

    const newInstitutionalDeadline = await InstitutionalDeadline.create({
      facultyId,
      deadlineDate,
      description,
    });

    res.status(201).json({ success: true, newInstitutionalDeadline });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.getInstitutionalDeadlineById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const institutionalDeadline = await InstitutionalDeadline.findByPk(id);

    if (!institutionalDeadline) {
      return next(
        new AppError(`InstitutionalDeadline with id ${id} was not found`, 404)
      );
    }

    res.status(200).json({ success: true, institutionalDeadline });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.updateInstitutionalDeadlineById = async (req, res, next) => {
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

    const institutionalDeadline = await InstitutionalDeadline.findByPk(id);

    if (!institutionalDeadline) {
      return next(`InstitutionalDeadline with id ${id} was not found`, 404);
    }

    const updatedInstitutionalDeadline = await InstitutionalDeadline.update(
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

    res.status(201).json({ success: true, updatedInstitutionalDeadline });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.deleteInstitutionalDeadlineById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const institutionalDeadline = await InstitutionalDeadline.findByPk(id);

    if (!institutionalDeadline) {
      return next(
        new AppError(`InstitutionalDeadline with id ${id} was not found`)
      );
    }

    await InstitutionalDeadline.destroy({
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
