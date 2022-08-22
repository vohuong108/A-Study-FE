  // return the token from the local storage
  export const getToken = (name) => {
    return localStorage.getItem(name) || null;
  }
  
  // remove the token and user from the local storage
  export const removeToken = (name) => {
    localStorage.removeItem(name);
  }
  
  // set the token from the local storage
  export const setToken = (token, name) => {
    localStorage.setItem(name, token);
  }