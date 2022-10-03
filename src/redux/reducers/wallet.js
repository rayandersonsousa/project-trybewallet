import { GET_CURRENCY, ADD_EXPENSE, FAILED_FETCH } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCY:
    return { ...state, currencies: Object.keys(action.payload) };
  case ADD_EXPENSE:
    return { ...state, ...action.payload };
  case FAILED_FETCH:
    return { ...state, error: action.payload };
  default:
    return state;
  }
};

export default wallet;
