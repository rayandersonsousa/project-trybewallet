import { GET_CURRENCY, FETCH_RATES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCY:
    return { ...state, currencies: action.payload };
  // case ADD_EXPENSE:
  //   return {
  //     ...state,
  //     expenses: [...state.expenses, ...action.payload],
  //   };
  case FETCH_RATES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
