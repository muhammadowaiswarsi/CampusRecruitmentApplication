import ActionTypes from '../constant/constant';


const INITIAL_STATE = {
    jobpostdata: [],
    companyprofiledata: [],
    studentprofiledata: [],
    mycompanyjobpostdata: [],
    studentdataforcompany: [],
    companyusers: [],
    datapushkey: [],
    jobuidkeys: [],
    appliedstudents: [],
    errorstudentsn: '',
    errorstudentsu: '',
    errorcompanysu: '',
    errorcompanysn: '',
    erroradminsn: '',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case ActionTypes.JOBPOSTDATA:
            return ({
                ...state,
                jobpostdata: action.payload,
            })

        case ActionTypes.STUDENTCURRENTUSER:
            return ({
                ...state,
                studentcurrentuser: action.payload
            })

        case ActionTypes.STUDENTPROFILEDATA:
            return ({
                ...state,
                studentprofiledata: action.payload
            })

        case ActionTypes.COMPANYCURRENTUSER:
            return ({
                ...state,
                companycurrentuser: action.payload
            })

        case ActionTypes.COMPANYPROFILEDATA:
            return ({
                ...state,
                companyprofiledata: action.payload
            })

        case ActionTypes.MYCOMPANYJOBPOSTDATA:
            return ({
                ...state,
                mycompanyjobpostdata: action.payload
            })

        case ActionTypes.STUDENTDATAFORCOMPANY:
            return ({
                ...state,
                studentdataforcompany: action.payload
            })

        case ActionTypes.COMPANYUSERS:
            return ({
                ...state,
                companyusers: action.payload
            })

        case ActionTypes.DELETESTUDENT:
            state.studentdataforcompany.splice(action.payload, 1)
            return ({
                ...state,
                studentdataforcompany: state.studentdataforcompany.concat()
            })

        case ActionTypes.DELETECOMPUSERS:
            state.companyusers.splice(action.payload, 1)
            return ({
                ...state,
                companyusers: state.studentdataforcompany.concat()
            })

        case ActionTypes.JOBPOSTDATAPUSHKEY:
            return ({
                ...state,
                datapushkey: action.payload
            })

        case ActionTypes.JOBUIDKEYS:
            return ({
                ...state,
                jobuidkeys: action.payload
            })

        case ActionTypes.APPLIEDSTUDENTS:
            return ({
                ...state,
                appliedstudents: action.payload
            })

        case ActionTypes.ERRORSTUDENTSN:
            return ({
                ...state,
                errorstudentsn: action.payload
            })

        case ActionTypes.ERRORSTUDENTSU:
            return ({
                ...state,
                errorstudentsu: action.payload
            })

        case ActionTypes.ERRORCOMPANYSU:
            return ({
                ...state,
                errorcompanysu: action.payload
            })

        case ActionTypes.ERRORCOMPANYSN:
            return ({
                ...state,
                errorcompanysn: action.payload
            })

            case ActionTypes.ERRORADMINSN:
            return({
                ...state,
                erroradminsn: action.payload
            })

        default:
            return state;
    }
}
