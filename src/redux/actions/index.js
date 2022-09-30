export const EMAIL = 'EMAIL';
export const PASSWORD = 'PASSWORD';

export const emailData = (email) => ({
  type: EMAIL,
  payload: email,
});

export const passwordData = (password) => ({
  type: PASSWORD,
  payload: password,
});
