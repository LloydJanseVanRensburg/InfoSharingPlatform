import { useState, useEffect, useReducer } from 'react';
import * as actionTypes from './faculty-types';
import FacultyContext from './facultyContext';
import facultyReducer from './facultyReducer';
import axios from 'axios';
import e from 'cors';

const BASE_URL = 'http://localhost:3001/api/v1';

const FacultyState = ({ children }) => {
  const [facultyDirectory, setFacultyDirectory] = useState(0);

  const initState = {
    faculties: [],
    selectedFaculty: null,
    loading: true,
    error: null,
    enrolments: [],
    studentStatuses: [],
    industryData: [],
    internalDeadlines: [],
    institutionalDeadlines: [],
    historicPerformanceData: [],
    enrolmentStrategies: [],
  };

  const [state, dispatch] = useReducer(facultyReducer, initState);

  useEffect(() => {
    if (!state.selectedFaculty) {
      return;
    }

    switch (facultyDirectory) {
      case 0:
        loadEnrolments(state.selectedFaculty.id);
        break;
      case 1:
        loadStudentStatuses(state.selectedFaculty.id);
        break;
      case 2:
        loadIndustryData(state.selectedFaculty.id);
        break;
      case 3:
        loadInternalDeadlines(state.selectedFaculty.id);
        break;
      case 4:
        loadInstitutionalDeadlines();
        break;
      case 5:
        loadHistoricPerformanceData(state.selectedFaculty.id);
        break;
      case 6:
        loadEnrolmentStrategies(state.selectedFaculty.id);
        break;
      default:
        return;
    }
  }, [facultyDirectory, state.selectedFaculty]);

  const loadEnrolments = async (facultyId) => {
    try {
      dispatch({ type: actionTypes.FACULTIES_LOADING });

      let res = await axios.get(`${BASE_URL}/enrolments/faculty/${facultyId}`);

      dispatch({
        type: actionTypes.ENROLMENTS_LOAD_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FACULTIES_ERROR,
        payload: error.response ? error.response : 'Something else went wrong',
      });
      console.error(error);
    }
  };

  const loadStudentStatuses = async (facultyId) => {
    try {
      dispatch({ type: actionTypes.FACULTIES_LOADING });

      let res = await axios.get(
        `${BASE_URL}/studentstatuses/faculty/${facultyId}`
      );

      dispatch({
        type: actionTypes.STUDENT_STATUSES_LOAD_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FACULTIES_ERROR,
        payload: error.response ? error.response : 'Something else went wrong',
      });
      console.error(error);
    }
  };

  const loadIndustryData = async (facultyId) => {
    try {
      dispatch({ type: actionTypes.FACULTIES_LOADING });

      let res = await axios.get(
        `${BASE_URL}/industrydata/faculty/${facultyId}`
      );

      dispatch({
        type: actionTypes.INDUSTRY_DATA_LOAD_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FACULTIES_ERROR,
        payload: error.response ? error.response : 'Something else went wrong',
      });
      console.error(error);
    }
  };

  const loadInternalDeadlines = async (facultyId) => {
    try {
      dispatch({ type: actionTypes.FACULTIES_LOADING });

      let res = await axios.get(
        `${BASE_URL}/internaldeadlines/faculty/${facultyId}`
      );

      dispatch({
        type: actionTypes.INTERNALDEADLINES_LOAD_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FACULTIES_ERROR,
        payload: error.response ? error.response : 'Something else went wrong',
      });
      console.error(error);
    }
  };

  const loadInstitutionalDeadlines = async () => {
    try {
      dispatch({ type: actionTypes.FACULTIES_LOADING });

      let res = await axios.get(`${BASE_URL}/institutionaldeadlines`);

      dispatch({
        type: actionTypes.INSTITUTIONALDEADLINES_LOAD_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FACULTIES_ERROR,
        payload: error.response ? error.response : 'Something else went wrong',
      });
      console.error(error);
    }
  };

  const loadHistoricPerformanceData = async (facultyId) => {
    try {
      dispatch({ type: actionTypes.FACULTIES_LOADING });

      let res = await axios.get(
        `${BASE_URL}/historicperformancedata/faculty/${facultyId}`
      );

      dispatch({
        type: actionTypes.HISTORICPERFORMANCE_LOAD_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FACULTIES_ERROR,
        payload: error.response ? error.response : 'Something else went wrong',
      });
      console.error(error);
    }
  };

  const loadEnrolmentStrategies = async (facultyId) => {
    try {
      dispatch({ type: actionTypes.FACULTIES_LOADING });

      let res = await axios.get(
        `${BASE_URL}/enrolmentstrategies/faculty/${facultyId}`
      );

      dispatch({
        type: actionTypes.ENROLMENTSTRATEGIES_LOAD_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FACULTIES_ERROR,
        payload: error.response ? error.response : 'Something else went wrong',
      });
      console.error(error);
    }
  };

  const fetchFaculties = async () => {
    try {
      dispatch({ type: actionTypes.FACULTIES_LOADING });

      let { data } = await axios.get(`${BASE_URL}/faculties`);

      dispatch({
        type: actionTypes.FACULTIES_SUCCESS,
        payload: data.faculties,
      });
    } catch (error) {
      dispatch({ type: actionTypes.FACULTIES_ERROR, payload: error });
    }
  };

  const setSelectedFaculty = (faculty) => {
    dispatch({ type: actionTypes.SET_SINGLE_FACULT, payload: faculty });
  };

  const loadFacultyById = async (id) => {
    try {
      dispatch({ type: actionTypes.FACULTIES_LOADING });

      let { data } = await axios.get(`${BASE_URL}/faculties/${id}`);

      dispatch({
        type: actionTypes.SINGLE_FACULTIY_SUCCESS,
        payload: data.faculty,
      });
    } catch (error) {
      dispatch({ type: actionTypes.SINGLE_FACULTY_ERROR, payload: error });
    }
  };

  const updateEnrolments = async (enrolmentId, enrolmentData) => {
    try {
      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      dispatch({
        type: actionTypes.ENROLMENTS_UPDATE_LOADING,
      });

      const res = await axios.put(
        `${BASE_URL}/enrolments/${enrolmentId}`,
        enrolmentData,
        axiosConfig
      );

      console.log(res.data);

      dispatch({
        type: actionTypes.ENROLMENTS_UPDATE_SUCCESS,
        payload: res.data.updatedEnrolment,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.ENROLMENTS_UPDATE_ERROR,
        payload: error.response.data.error,
      });
    }
  };

  const updateStudentStatuses = async (studentStatusId, studentStatusData) => {
    try {
      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      dispatch({
        type: actionTypes.STUDENTSTATUSES_UPDATE_LOADING,
      });

      const res = await axios.put(
        `${BASE_URL}/studentstatuses/${studentStatusId}`,
        studentStatusData,
        axiosConfig
      );

      console.log(res.data);

      dispatch({
        type: actionTypes.STUDENTSTATUSES_UPDATE_SUCCESS,
        payload: res.data.updatedEnrolment,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.STUDENTSTATUSES_UPDATE_ERROR,
        payload: error.response.data.error,
      });
    }
  };

  const changeEnrolmentState = (name, value) => {
    dispatch({
      type: actionTypes.CHANGE_ENROLMENTS_DATA,
      payload: {
        name,
        value,
      },
    });
  };

  const changeStudentStatuses = (name, value) => {
    dispatch({
      type: actionTypes.CHANGE_STUDENTSTATUS_DATA,
      payload: {
        name,
        value,
      },
    });
  };

  const updateInternalDeadline = async (
    internalDeadlineId,
    internalDeadlineData
  ) => {
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      dispatch({
        type: actionTypes.INTERNALDEADLINE_UPDATE_LOADING,
      });

      const res = await axios.put(
        `${BASE_URL}/internaldeadlines/${internalDeadlineId}`,
        internalDeadlineData,
        axiosConfig
      );

      dispatch({
        type: actionTypes.INTERNALDEADLINE_UPDATE_SUCCESS,
        payload: res.data.updatedInternalDeadline,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: actionTypes.INTERNALDEADLINE_UPDATE_ERROR,
        payload: error.response.data.error,
      });
    }
  };

  const changeInternalDeadline = (internalDeadlineId, internalDeadlineData) => {
    dispatch({
      type: actionTypes.CHANGE_INTERNALDEADLINE_DATA,
      payload: {
        id: internalDeadlineId,
        data: internalDeadlineData,
      },
    });
  };

  const deleteInternalDeadline = async (deadlineID) => {
    try {
      dispatch({
        type: actionTypes.INTERNALDEADLINE_DELETE_LOADING,
      });

      await axios.delete(`${BASE_URL}/internaldeadlines/${deadlineID}`);

      dispatch({
        type: actionTypes.INTERNALDEADLINE_DELETE_SUCCESS,
        payload: deadlineID,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.INTERNALDEADLINE_DELETE_ERROR,
        payload: deadlineID,
      });
    }
  };

  const addToInternalDeadlines = (deadline) => {
    dispatch({
      type: actionTypes.INTERNALDEADLINE_ADD_DEADLINE,
      payload: deadline,
    });
  };

  /// INSTITUTIONAL DEADLINES
  const updateInstitutionalDeadline = async (
    internalDeadlineId,
    internalDeadlineData
  ) => {
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      dispatch({
        type: actionTypes.INSTITUTIONAL_UPDATE_LOADING,
      });

      const res = await axios.put(
        `${BASE_URL}/institutionaldeadlines/${internalDeadlineId}`,
        internalDeadlineData,
        axiosConfig
      );

      dispatch({
        type: actionTypes.INSTITUTIONAL_UPDATE_SUCCESS,
        payload: res.data.updatedInstitutionalDeadline,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: actionTypes.INSTITUTIONAL_UPDATE_ERROR,
        payload: error.response.data.error,
      });
    }
  };

  const changeInstitutionalDeadline = (
    internalDeadlineId,
    internalDeadlineData
  ) => {
    dispatch({
      type: actionTypes.CHANGE_INSTITUTIONALDEADLINE_DATA,
      payload: {
        id: internalDeadlineId,
        data: internalDeadlineData,
      },
    });
  };

  const deleteInstitutionalDeadline = async (deadlineID) => {
    try {
      dispatch({
        type: actionTypes.INSTITUTIONALDEADLINE_DELETE_LOADING,
      });

      await axios.delete(`${BASE_URL}/institutionaldeadlines/${deadlineID}`);

      dispatch({
        type: actionTypes.INSTITUTIONALDEADLINE_DELETE_SUCCESS,
        payload: deadlineID,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.INSTITUTIONALDEADLINE_DELETE_ERROR,
        payload: deadlineID,
      });
    }
  };

  const addToInstitutionalDeadlines = (deadline) => {
    dispatch({
      type: actionTypes.INSTITUTIONALDEADLINE_ADD_DEADLINE,
      payload: deadline,
    });
  };

  return (
    <FacultyContext.Provider
      value={{
        faculties: state.faculties,
        selectedFaculty: state.selectedFaculty,
        loading: state.loading,
        error: state.error,
        facultyDirectory,
        enrolments: state.enrolments,
        enrolmentStrategies: state.enrolmentStrategies,
        studentStatuses: state.studentStatuses,
        industryData: state.industryData,
        internalDeadlines: state.internalDeadlines,
        institutionalDeadlines: state.institutionalDeadlines,
        historicPerformanceData: state.historicPerformanceData,
        fetchFaculties,
        setSelectedFaculty,
        loadFacultyById,
        setFacultyDirectory,
        loadEnrolments,
        loadStudentStatuses,
        loadIndustryData,
        loadInternalDeadlines,
        loadInstitutionalDeadlines,
        loadHistoricPerformanceData,
        loadEnrolmentStrategies,
        updateEnrolments,
        changeEnrolmentState,
        changeStudentStatuses,
        updateStudentStatuses,
        updateInternalDeadline,
        changeInternalDeadline,
        deleteInternalDeadline,
        addToInternalDeadlines,
        updateInstitutionalDeadline,
        changeInstitutionalDeadline,
        deleteInstitutionalDeadline,
        addToInstitutionalDeadlines,
      }}
    >
      {children}
    </FacultyContext.Provider>
  );
};

export default FacultyState;
