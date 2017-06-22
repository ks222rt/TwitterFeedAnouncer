// Create and export actions

export const login = (loggedIn) => {
  return {
    type: 'LOGIN',
    loggedIn
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export const startLogin = () => {
  return (dispatch, getState) => {
    const test = getState();
    return new Promise((resolve, reject) => {
      if(test){
        setTimeout(function(){
          resolve(test);
        }, 2500);
      }else {
        reject('Error');
      }
    });
  }
}