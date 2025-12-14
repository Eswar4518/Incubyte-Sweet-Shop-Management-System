const axios = require("axios");
const jwt = require("jsonwebtoken");

const BASE_URL =
  "https://api.render.com/deploy/srv-d4va2pje5dus73aa9r60?key=75ximUyEw3Y";
const JWT_SECRET = "your-super-secret-key-change-in-production-12345";

async function testAdminAccess() {
  try {
    console.log("🔐 Testing admin login...");

    // Step 1: Login as admin
    const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: "Eswar@sweetshop.com",
      password: "admin123",
    });

    console.log("✅ Login successful!");
    console.log("User:", loginResponse.data.user);
    console.log("Role:", loginResponse.data.user.role);

    const token = loginResponse.data.token;
    console.log("\n🔍 Token verification:");

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log("✅ Token is valid:", decoded);
    } catch (err) {
      console.log("❌ Token verification failed:", err.message);
    }

    // Step 2: Test user management access
    console.log("\n👥 Testing user management access...");

    const usersResponse = await axios.get(`${BASE_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ User management access successful!");
    console.log("Users found:", usersResponse.data.length);
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
}

testAdminAccess();
