/**
 * Inventory Management Tests
 *
 * Tests for purchase and restock operations.
 * Tests inventory constraints (no negative stock, etc.).
 */

import request from "supertest";
import app from "../app";
import { Sweet } from "../models/sweet.model";
import { User } from "../models/user.model";
import { connectToDatabase, disconnectFromDatabase } from "../config/db";

let userToken: string;
let adminToken: string;

beforeAll(async () => {
  await connectToDatabase();

  // Create regular user
  const userRes = await request(app)
    .post("/api/auth/register")
    .send({ email: "buyer@test.com", password: "Password123" });
  userToken = userRes.body.token;

  // Create admin user
  const adminRes = await request(app)
    .post("/api/auth/register")
    .send({ email: "invadmin@test.com", password: "AdminPass123" });
  adminToken = adminRes.body.token;

  // Elevate the second user to admin and re-login to get updated token
  await User.updateOne({ email: "invadmin@test.com" }, { role: "admin" });
  const adminLogin = await request(app)
    .post("/api/auth/login")
    .send({ email: "invadmin@test.com", password: "AdminPass123" });
  adminToken = adminLogin.body.token;
});

afterAll(async () => {
  await disconnectFromDatabase();
});

afterEach(async () => {
  await Sweet.deleteMany({});
});

describe("Inventory Endpoints", () => {
  describe("POST /api/sweets/:id/purchase", () => {
    it("should allow a customer to purchase a sweet and decrease quantity", async () => {
      const sweet = await Sweet.create({
        name: "PurchaseTest",
        category: "Test",
        price: 1.5,
        quantity: 2,
      });
      const res = await request(app)
        .post(`/api/sweets/${sweet._id}/purchase`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.sweet.remainingQuantity).toBe(1);
    });

    it("should prevent purchase when sweet is out of stock", async () => {
      const sweet = await Sweet.create({
        name: "OutOfStock",
        category: "Test",
        price: 1.5,
        quantity: 0,
      });
      const res = await request(app)
        .post(`/api/sweets/${sweet._id}/purchase`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe("POST /api/sweets/:id/restock", () => {
    it("should allow admin to restock a sweet", async () => {
      const sweet = await Sweet.create({
        name: "RestockTest",
        category: "Test",
        price: 2.5,
        quantity: 1,
      });
      const res = await request(app)
        .post(`/api/sweets/${sweet._id}/restock`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ quantity: 5 });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.sweet.newQuantity).toBe(6);
    });

    it("should not allow non-admin to restock", async () => {
      const sweet = await Sweet.create({
        name: "RestockDenied",
        category: "Test",
        price: 1.0,
        quantity: 1,
      });
      const res = await request(app)
        .post(`/api/sweets/${sweet._id}/restock`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({ quantity: 5 });

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });
  });
});
