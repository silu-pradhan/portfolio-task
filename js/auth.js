(function () {
  const AUTH_KEY = "portfolio-admin-auth";

  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123"
  };

  function isLoggedIn() {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (!raw) {
        return false;
      }

      const parsed = JSON.parse(raw);
      return parsed && parsed.loggedIn === true;
    } catch (error) {
      return false;
    }
  }

  function login(username, password) {
    const isValid =
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password;

    if (!isValid) {
      return false;
    }

    localStorage.setItem(AUTH_KEY, JSON.stringify({
      loggedIn: true,
      username
    }));

    return true;
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
  }

  function requireAuth() {
    if (!isLoggedIn()) {
      window.location.replace("login.html");
    }
  }

  window.AdminAuth = {
    AUTH_KEY,
    ADMIN_CREDENTIALS,
    isLoggedIn,
    login,
    logout,
    requireAuth
  };
})();
