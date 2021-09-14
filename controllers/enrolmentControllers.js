const Enrolment = require('../models/EnrolmentModel');
const AppError = require('../utils/appError');

exports.getAllEnrolments = async (req, res, next) => {
  try {
    const enrolments = await Enrolment.findAll();
    res.status(200).json({ count: enrolments.length, enrolments });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.createEnrolment = async (req, res, next) => {
  try {
    const {
      facultyId,
      firstTimeUnderGrads,
      totalUnderGrads,
      postGradsToMasters,
      masters,
      doctors,
      totalPostGrads,
      occasionalStudents,
    } = req.body;

    if (
      !(facultyId >= 0) ||
      !(firstTimeUnderGrads >= 0) ||
      !(totalUnderGrads >= 0) ||
      !(postGradsToMasters >= 0) ||
      !(masters >= 0) ||
      !(doctors >= 0) ||
      !(totalPostGrads >= 0) ||
      !(occasionalStudents >= 0)
    ) {
      console.log(req.body);
      return next(
        new AppError(
          `Please provide {facultyId,firstTimeUnderGrads,totalUnderGrads,postGradsToMasters,masters,doctors,totalPostGrads,occasionalStudents}`,
          400
        )
      );
    }

    const newEnrolment = await Enrolment.create({
      facultyId,
      firstTimeUnderGrads,
      totalUnderGrads,
      postGradsToMasters,
      masters,
      doctors,
      totalPostGrads,
      occasionalStudents,
    });

    res.status(201).json({ success: true, newEnrolment });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.getEnrolmentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const enrolment = await Enrolment.findByPk(id);

    if (!enrolment) {
      return next(new AppError(`Enrolment with id ${id} was not found`, 404));
    }

    res.status(200).json({ success: true, enrolment });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.updateEnrolmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      facultyId,
      firstTimeUnderGrads,
      totalUnderGrads,
      postGradsToMasters,
      masters,
      doctors,
      totalPostGrads,
      occasionalStudents,
    } = req.body;

    if (
      !facultyId ||
      !firstTimeUnderGrads ||
      !totalUnderGrads ||
      !postGradsToMasters ||
      !masters ||
      !doctors ||
      !totalPostGrads ||
      !occasionalStudents
    ) {
      return next(
        new AppError(
          `Please provide { 
              facultyId,
              firstTimeUnderGrads,  
              totalUnderGrads, 
              postGradsToMasters, 
              masters, 
              doctors, 
              totalPostGrads, 
              occasionalStudents
            }`,
          400
        )
      );
    }

    const enrolment = await Enrolment.findByPk(id);

    if (!enrolment) {
      return next(`Faculty with id ${id} was not found`, 404);
    }

    const updatedEnrolment = await Enrolment.update(
      {
        facultyId,
        firstTimeUnderGrads,
        totalUnderGrads,
        postGradsToMasters,
        masters,
        doctors,
        totalPostGrads,
        occasionalStudents,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(201).json({ success: true, updatedEnrolment });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.deleteEnrolmentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const enrolment = await Enrolment.findByPk(id);

    if (!enrolment) {
      return next(new AppError(`Faculty with id ${id} was not found`));
    }

    await Enrolment.destroy({
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
