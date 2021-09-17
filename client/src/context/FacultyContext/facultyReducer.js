import * as actionTypes from './faculty-types';

const facultyReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FACULTIES_LOADING:
    case actionTypes.ENROLMENTS_UPDATE_LOADING:
    case actionTypes.STUDENTSTATUSES_UPDATE_LOADING:
    case actionTypes.INTERNALDEADLINE_UPDATE_LOADING:
    case actionTypes.INTERNALDEADLINE_DELETE_LOADING:
    case actionTypes.INSTITUTIONAL_UPDATE_LOADING:
    case actionTypes.INSTITUTIONALDEADLINE_DELETE_LOADING:
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

    case actionTypes.INTERNALDEADLINE_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        internalDeadlines: state.internalDeadlines.filter(
          (deadline) => deadline.id !== action.payload
        ),
      };

    case actionTypes.INSTITUTIONALDEADLINE_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        institutionalDeadlines: state.institutionalDeadlines.filter(
          (deadline) => deadline.id !== action.payload
        ),
      };

    case actionTypes.FACULTIES_ERROR:
    case actionTypes.SINGLE_FACULTY_ERROR:
    case actionTypes.ENROLMENTS_UPDATE_ERROR:
    case actionTypes.STUDENTSTATUSES_UPDATE_ERROR:
    case actionTypes.INTERNALDEADLINE_UPDATE_ERROR:
    case actionTypes.INSTITUTIONALDEADLINE_DELETE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actionTypes.INTERNALDEADLINE_ADD_DEADLINE:
      return {
        ...state,
        internalDeadlines: [...state.internalDeadlines, action.payload],
      };

    case actionTypes.INSTITUTIONALDEADLINE_ADD_DEADLINE:
      return {
        ...state,
        institutionalDeadlines: [
          ...state.institutionalDeadlines,
          action.payload,
        ],
      };

    case actionTypes.SET_SINGLE_FACULT:
    case actionTypes.SINGLE_FACULTIY_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedFaculty: action.payload,
      };

    case actionTypes.ENROLMENTS_UPDATE_SUCCESS:
    case actionTypes.STUDENTSTATUSES_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
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

    case actionTypes.INSTITUTIONAL_UPDATE_SUCCESS:
      let tempInstitutionalDeadlines = state.institutionalDeadlines.map(
        (deadline) => {
          if (deadline.id === action.payload.id) {
            return {
              ...deadline,
              ...action.payload,
            };
          }

          return deadline;
        }
      );

      return {
        ...state,
        loading: false,
        institutionalDeadlines: tempInstitutionalDeadlines,
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

    case actionTypes.CHANGE_ENROLMENTS_DATA:
      return {
        ...state,
        enrolments: state.enrolments.map((enrolment) => {
          return {
            ...enrolment,
            [action.payload.name]: action.payload.value,
          };
        }),
      };

    case actionTypes.CHANGE_STUDENTSTATUS_DATA:
      return {
        ...state,
        studentStatuses: state.studentStatuses.map((studentStatus) => {
          return {
            ...studentStatus,
            [action.payload.name]: action.payload.value,
          };
        }),
      };

    case actionTypes.INTERNALDEADLINE_UPDATE_SUCCESS:
      let temp = state.internalDeadlines.map((deadline) => {
        if (deadline.id === action.payload.id) {
          return {
            ...deadline,
            ...action.payload,
          };
        }

        return deadline;
      });

      return {
        ...state,
        loading: false,
        internalDeadlines: temp,
      };

    case actionTypes.CHANGE_INTERNALDEADLINE_DATA:
      let id = action.payload.id;
      let data = action.payload.data;

      let newInternalDeadlinesArray = state.internalDeadlines.map(
        (deadline) => {
          if (deadline.id === id) {
            return {
              ...deadline,
              ...data,
            };
          }

          return deadline;
        }
      );

      return {
        ...state,
        internalDeadlines: newInternalDeadlinesArray,
      };

    case actionTypes.CHANGE_INSTITUTIONALDEADLINE_DATA:
      let idTwo = action.payload.id;
      let dataTwo = action.payload.data;

      let tempArrOne = state.institutionalDeadlines.map((deadline) => {
        if (deadline.id === idTwo) {
          return {
            ...deadline,
            ...dataTwo,
          };
        }

        return deadline;
      });

      return {
        ...state,
        institutionalDeadlines: tempArrOne,
      };
    default:
      return state;
  }
};

export default facultyReducer;
