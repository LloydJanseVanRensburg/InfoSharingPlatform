import * as actionTypes from './faculty-types';

const facultyReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FACULTIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FACULTIES_SUCCESS:
      return {
        ...state,
        loading: false,
        faculties: action.payload,
      };
    case actionTypes.FACULTIES_ERROR:
    case actionTypes.SINGLE_FACULTY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.SET_SINGLE_FACULT:
    case actionTypes.SINGLE_FACULTIY_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedFaculty: action.payload,
      };
    case actionTypes.ENROLMENTS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        enrolments: action.payload.enrolments,
      };
    case actionTypes.STUDENT_STATUSES_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        studentStatuses: action.payload.studentStatuses,
      };
    case actionTypes.INDUSTRY_DATA_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        industryData: action.payload.industryData,
      };
    case actionTypes.INTERNALDEADLINES_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        internalDeadlines: action.payload.internalDeadlines,
      };
    case actionTypes.ENROLMENTSTRATEGIES_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        enrolmentStrategies: action.payload.enrolmentStrategies,
      };
    case actionTypes.HISTORICPERFORMANCE_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        historicPerformanceData: action.payload.historicPerformanceData,
      };
    case actionTypes.INSTITUTIONALDEADLINES_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        institutionalDeadlines: action.payload.institutionalDeadlines,
      };
    default:
      return state;
  }
};

export default facultyReducer;
