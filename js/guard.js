/**
 * HARSHUU ADMIN PANEL
 * Page Guard (JWT Protected Routes)
 * Production-grade – Zomato/Swiggy style
 */

const API_BASE_URL = "https://harshuu-backend.onrender.com/api";

/**
 * Get admin JWT token
 */
function getAdminToken() {
  return localStorage.getItem("harshuu_admin_token");
}

/**
 * Force logout
 */
function forceLogout() {
  localStorage.removeItem("harshuu_admin_token");
  window.location.replace("index.html");
}

/**
 * Verify token with backend
 */
async function verifyAdminToken() {
  const token = getAdminToken();

  // Token missing
  if (!token) {
    forceLogout();
    return;
  }

  try {
    const res = await fetch(API_BASE_URL + "/auth/admin/verify", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      }
    });

    // Invalid / expired token
    if (res.status === 401 || res.status === 403) {
      forceLogout();
      return;
    }

    // Server error
    if (!res.ok) {
      alert("Server error. Please login again.");
      forceLogout();
      return;
    }

    // Token valid → allow page load
    return;

  } catch (err) {
    console.error("Guard error:", err);
    alert("Network error. Please login again.");
    forceLogout();
  }
}

/**
 * AUTO EXECUTE GUARD
 * This runs immediately when page loads
 */
verifyAdminToken();
