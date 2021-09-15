import { useState, useEffect, useReducer } from 'react';
import * as actionTypes from './faculty-types';
import FacultyContext from './facultyContext';
import facultyReducer from './facultyReducer';
import axios from 'axios';

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
      }}
    >
      {children}
    </FacultyContext.Provider>
  );
};

export default FacultyState;
