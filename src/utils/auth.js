export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const setUserId = (userId) => {
  localStorage.setItem('userId', userId);
};

export const getUserId = () => {
  return localStorage.getItem('userId');
};

export const removeUserId = () => {
  localStorage.removeItem('userId');
};

export const getRole = () => {
  return localStorage.getItem('role');
};

export const setRole = (role) => {
  localStorage.setItem('role', role);
};

export const removeRole = () => {
  localStorage.removeItem('role');
};

export const setUserInfo = (userInfo) => {
  localStorage.setItem('username', userInfo.username);
  localStorage.setItem('email', userInfo.email);
  localStorage.setItem('no_telp', userInfo.no_telp);
  localStorage.setItem('nik', userInfo.nik);
  localStorage.setItem('alamat', userInfo.alamat);
  localStorage.setItem('jenis_kelamin', userInfo.jenis_kelamin);
  localStorage.setItem('usia', userInfo.usia);
};

export const getUserInfo = () => {
  return {
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
    no_telp: localStorage.getItem('no_telp'),
    nik: localStorage.getItem('nik'),
    alamat: localStorage.getItem('alamat'),
    jenis_kelamin: localStorage.getItem('jenis_kelamin'),
    usia: localStorage.getItem('usia'),
  };
};

export const removeUserInfo = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  localStorage.removeItem('no_telp');
  localStorage.removeItem('nik');
  localStorage.removeItem('alamat');
  localStorage.removeItem('jenis_kelamin');
  localStorage.removeItem('usia');
};

export const clearUserData = () => {
  removeToken();
  removeUserId();
  removeRole();
  removeUserInfo();
};

