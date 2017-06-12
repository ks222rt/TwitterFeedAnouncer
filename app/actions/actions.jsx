// Create and export actions

export const login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};