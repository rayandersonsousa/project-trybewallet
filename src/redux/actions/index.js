export const EMAIL = 'EMAIL';
export const PASSWORD = 'PASSWORD';
export const GET_CURRENCY = 'GET_CURRENCY';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const FAILED_FETCH = 'FAILED_FETCH';

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

const failedFetch = (fail) => ({
  type: FAILED_FETCH,
  payload: fail,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await request.json();
    delete data.USDT;
    dispatch(getCurrency(data));
  } catch {
    dispatch(failedFetch('Erro'));
  }
};
