export const EMAIL = 'EMAIL';
export const PASSWORD = 'PASSWORD';
export const GET_CURRENCY = 'GET_CURRENCY';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const FETCH_RATES = 'FETCH_RATES';

export const emailData = (email) => ({
  type: EMAIL,
  payload: email,
});

export const passwordData = (password) => ({
  type: PASSWORD,
  payload: password,
});

const getCurrency = (currency) => ({
  type: GET_CURRENCY,
  payload: currency,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const getData = (payload) => ({
  type: FETCH_RATES,
  payload,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await request.json();
    delete data.USDT;
    dispatch(getCurrency(Object.keys(data)));
  } catch (erro) {
    throw new Error(erro);
  }
};

export const fetchRates = (expense) => async (dispatch) => {
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await request.json();
    expense.exchangeRates = data;
    dispatch(getData(expense));
  } catch (erro) {
    throw new Error(erro);
  }
};
