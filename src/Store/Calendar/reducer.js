import { SET_DATE } from './actions'
import { getStringFromDate } from '../../Helpers/Utils/dateFormat';

const initialState = {
    selectedDate: getStringFromDate(new Date())
  }
  
export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATE:
        return {
            ...state,
            selectedDate: action.payload
        }
        default:
            return state
    }
}