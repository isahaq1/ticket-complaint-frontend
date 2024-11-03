export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const checkAdmin = (): boolean => {
  const authuserinfo = localStorage.getItem("authuser");
  const userRole = authuserinfo ? (JSON.parse(authuserinfo)).role : "";
  const isadmin = (userRole == 'admin' ? 'true' : '');
  return !!isadmin;
};