const StudentStatus = require('../models/StudentStatusModel');
const AppError = require('../utils/appError');

exports.getAllStudentStatuses = async (req, res, next) => {
  try {
    const studentStatuses = await StudentStatus.findAll();
    res.status(200).json({ count: studentStatuses.length, studentStatuses });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.createStudentStatus = async (req, res, next) => {
  try {
    const {
      facultyId,
      acceptedStudents,
      bursaryStudents,
      highAPSStudents,
      hostelAcceptanceStudents,
    } = req.body;

    console.log(req.body);

    if (
      !facultyId ||
      !(acceptedStudents >= 0) ||
      !(bursaryStudents >= 0) ||
      !(highAPSStudents >= 0) ||
      !(hostelAcceptanceStudents >= 0)
    ) {
      return next(
        new AppError(
          'Please provide {facultyId,acceptedStudents, bursaryStudents, highAPSStudents, hostelAcceptanceStudents}',
          400
        )
      );
    }

    const newStudentStatus = await StudentStatus.create({
      facultyId,
      acceptedStudents,
      bursaryStudents,
      highAPSStudents,
      hostelAcceptanceStudents,
    });

    res.status(201).json({ success: true, newStudentStatus });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.getStudentStatusById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const studentStatus = await StudentStatus.findByPk(id);

    if (!studentStatus) {
      return next(
        new AppError(`StudentStatus with id ${id} was not found`, 404)
      );
    }

    res.status(200).json({ success: true, studentStatus });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.updateStudentStatusById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      facultyId,
      acceptedStudents,
      bursaryStudents,
      highAPSStudents,
      hostelAcceptanceStudents,
    } = req.body;

    if (
      !facultyId ||
      !(acceptedStudents >= 0) ||
      !(bursaryStudents >= 0) ||
      !(highAPSStudents >= 0) ||
      !(hostelAcceptanceStudents >= 0)
    ) {
      return next(
        new AppError(
          'Please provide {facultyId,acceptedStudents, bursaryStudents, highAPSStudents, hostelAcceptanceStudents}',
          400
        )
      );
    }

    const studentStatus = await StudentStatus.findByPk(id);

    if (!studentStatus) {
      return next(`StudentStatus with id ${id} was not found`, 404);
    }

    const updatedStudentStatus = await StudentStatus.update(
      {
        facultyId,
        acceptedStudents,
        bursaryStudents,
        highAPSStudents,
        hostelAcceptanceStudents,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(201).json({ success: true, updatedStudentStatus });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.deleteStudentStatusById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const studentStatus = await StudentStatus.findByPk(id);

    if (!studentStatus) {
      return next(new AppError(`StudentStatus with id ${id} was not found`));
    }

    await StudentStatus.destroy({
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

exports.getAllFacultyStudentStatuses = async (req, res, next) => {
  try {
    const { id } = req.params;
    const studentStatuses = await StudentStatus.findAll({
      where: {
        facultyId: id,
      },
    });

    res.status(200).json({ success: true, studentStatuses });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};
