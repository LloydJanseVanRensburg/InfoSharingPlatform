const HistoricPerformanceData = require('../models/HistoricPerformanceDataModel');
const AppError = require('../utils/appError');

exports.getAllHistoricPerformanceData = async (req, res, next) => {
  try {
    const historicPerformanceData = await HistoricPerformanceData.findAll();
    res
      .status(200)
      .json({ count: historicPerformanceData.length, historicPerformanceData });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.createHistoricPerformanceData = async (req, res, next) => {
  try {
    const { facultyId } = req.body;
    const { path } = req.file;

    if (!facultyId || !path) {
      return next(new AppError('Please provide {facultyId,file}', 400));
    }

    const newHistoricPerformanceData = await HistoricPerformanceData.create({
      facultyId,
      pdfUrl: path,
    });

    res.status(201).json({ success: true, newHistoricPerformanceData });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.getHistoricPerformanceDataById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const historicPerformanceData = await HistoricPerformanceData.findByPk(id);

    if (!historicPerformanceData) {
      return next(
        new AppError(`HistoricPerformanceData with id ${id} was not found`, 404)
      );
    }

    res.status(200).json({ success: true, historicPerformanceData });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.updateHistoricPerformanceDataById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { facultyId } = req.body;
    const { path } = req.file;

    if (!facultyId || !path) {
      return next(new AppError('Please provide {facultyId,file}', 400));
    }

    const historicPerformanceData = await HistoricPerformanceData.findByPk(id);

    if (!historicPerformanceData) {
      return next(`HistoricPerformanceData with id ${id} was not found`, 404);
    }

    const updatedHistoricPerformanceData = await HistoricPerformanceData.update(
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

    res.status(201).json({ success: true, updatedHistoricPerformanceData });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};

exports.deleteHistoricPerformanceDataById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const historicPerformanceData = await HistoricPerformanceData.findByPk(id);

    if (!historicPerformanceData) {
      return next(
        new AppError(`HistoricPerformanceData with id ${id} was not found`)
      );
    }

    await HistoricPerformanceData.destroy({
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

exports.getAllFacultyHistoricPerformance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const historicPerformanceData = await HistoricPerformanceData.findAll({
      where: {
        facultyId: id,
      },
    });

    res.status(200).json({ success: true, historicPerformanceData });
  } catch (error) {
    next(new AppError('Server Error - Check Logs', 500));
    console.error(error);
  }
};
