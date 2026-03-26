(function () {
  const auth = window.AdminAuth;
  const form = document.getElementById("loginForm");
  const status = document.getElementById("loginStatus");

  if (auth.isLoggedIn()) {
    window.location.replace("admin.html");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const username = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "").trim();

    status.className = "login-status";

    if (!username || !password) {
      status.textContent = "Please enter both username and password.";
      status.classList.add("error");
      return;
    }

    if (!auth.login(username, password)) {
      status.textContent = "Invalid username or password.";
      status.classList.add("error");
      return;
    }

    status.textContent = "Login successful. Redirecting to admin panel...";
    status.classList.add("success");

    window.setTimeout(() => {
      window.location.href = "admin.html";
    }, 600);
  });
})();
