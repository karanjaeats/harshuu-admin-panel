/**
 * HARSHUU ADMIN AUTH SCRIPT
 * Production Ready – Zomato / Swiggy Style
 */

const API_BASE = "https://harshuu-backend.onrender.com";

/**
 * =========================
 * ADMIN LOGIN
 * =========================
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
    const res = await fetch(API_BASE + "/api/admin/login", {
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

    // ✅ TOKEN SAVE (IMPORTANT FIX)
    localStorage.setItem("harshuu_admin_token", data.accessToken);
    localStorage.setItem("harshuu_admin_email", data.admin.email);

    // ✅ Redirect to dashboard
    window.location.href = "dashboard.html";

  } catch (err) {
    console.error(err);
    errorBox.innerText = "Server error. पुन्हा प्रयत्न करा.";
  }
}

/**
 * =========================
 * CHECK AUTH (Protected Pages)
 * =========================
 */
function checkAdminAuth() {
  const token = localStorage.getItem("harshuu_admin_token");

  if (!token) {
    window.location.href = "index.html";
  }
}

/**
 * =========================
 * LOGOUT
 * =========================
 */
function adminLogout() {
  localStorage.removeItem("harshuu_admin_token");
  localStorage.removeItem("harshuu_admin_email");
  window.location.href = "index.html";
}

/**
 * =========================
 * AUTH HEADER (API CALLS)
 * =========================
 */
function getAuthHeader() {
  const token = localStorage.getItem("harshuu_admin_token");

  return {
    "Authorization": "Bearer " + token,
    "Content-Type": "application/json"
  };
    }
