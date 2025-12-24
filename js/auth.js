/**
 * HARSHUU ADMIN AUTH SCRIPT
 * Production Ready – Zomato / Swiggy Style
 */

const API_BASE = "https://harshuu-backend.onrender.com";

/**
 * Admin Login
 */
async function adminLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("error");

  errorBox.innerText = "";

  if (!email || !password) {
    errorBox.innerText = "Email आणि Password आवश्यक आहे";
    return;
  }

  try {
    const res = await fetch(API_BASE + "/api/auth/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      errorBox.innerText = data.message || "Login failed";
      return;
    }

    // ✅ Save token
    localStorage.setItem("harshuu_admin_token", data.token);
    localStorage.setItem("harshuu_admin_name", data.admin.name);

    // ✅ Redirect to dashboard
    window.location.href = "dashboard.html";

  } catch (err) {
    console.error(err);
    errorBox.innerText = "Server error. पुन्हा प्रयत्न करा.";
  }
}

/**
 * Check Admin Authentication (for protected pages)
 */
function checkAdminAuth() {
  const token = localStorage.getItem("harshuu_admin_token");
  if (!token) {
    window.location.href = "index.html";
  }
}

/**
 * Logout Admin
 */
function adminLogout() {
  localStorage.removeItem("harshuu_admin_token");
  localStorage.removeItem("harshuu_admin_name");
  window.location.href = "index.html";
}

/**
 * Get Auth Header
 */
function getAuthHeader() {
  const token = localStorage.getItem("harshuu_admin_token");
  return {
    "Authorization": "Bearer " + token,
    "Content-Type": "application/json"
  };
}
