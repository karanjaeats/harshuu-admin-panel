/**
 * HARSHUU ADMIN PANEL
 * Production-grade API Connector
 * Zomato / Swiggy style
 */

const API_BASE_URL = "https://harshuu-backend.onrender.com/api";

/**
 * Get Admin Token
 */
function getToken() {
  return localStorage.getItem("harshuu_admin_token");
}

/**
 * Logout Admin
 */
function logout() {
  localStorage.removeItem("harshuu_admin_token");
  window.location.href = "index.html";
}

/**
 * Handle API Response
 */
async function handleResponse(response) {
  if (response.status === 401) {
    // Token expired / invalid
    logout();
    return;
  }

  const data = await response.json();

  if (!response.ok) {
    alert(data.message || "Server error");
    throw new Error(data.message);
  }

  return data;
}

/**
 * Common GET request
 */
async function apiGet(path) {
  const token = getToken();

  const response = await fetch(API_BASE_URL + path, {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    }
  });

  return handleResponse(response);
}

/**
 * Common POST request
 */
async function apiPost(path, body) {
  const token = getToken();

  const response = await fetch(API_BASE_URL + path, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  return handleResponse(response);
}

/**
 * Common PATCH request
 */
async function apiPatch(path, body = {}) {
  const token = getToken();

  const response = await fetch(API_BASE_URL + path, {
    method: "PATCH",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  return handleResponse(response);
}

/* ===========================
   ADMIN SPECIFIC API CALLS
=========================== */

/**
 * AUTH
 */
async function adminLogin(phone, otp) {
  const response = await fetch(API_BASE_URL + "/auth/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, otp })
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.message || "Login failed");
    return;
  }

  localStorage.setItem("harshuu_admin_token", data.token);
  window.location.href = "dashboard.html";
}

/**
 * RESTAURANTS
 */
function getRestaurants() {
  return apiGet("/admin/restaurants");
}

function approveRestaurant(id) {
  return apiPatch(`/admin/restaurants/${id}/approve`);
}

function toggleRestaurant(id, isOpen) {
  return apiPatch(`/admin/restaurants/${id}/status`, { isOpen });
}

/**
 * ORDERS
 */
function getOrders() {
  return apiGet("/admin/orders");
}

function updateOrderStatus(orderId, status) {
  return apiPatch(`/admin/orders/${orderId}/status`, { status });
}

/**
 * RIDERS
 */
function getRiders() {
  return apiGet("/admin/riders");
}

function approveRider(id) {
  return apiPatch(`/admin/riders/${id}/approve`);
}

function suspendRider(id) {
  return apiPatch(`/admin/riders/${id}/suspend`);
}

/**
 * ANALYTICS
 */
function getDashboardStats() {
  return apiGet("/admin/analytics");
}
