"use strict";
/**
 * Sweet Management Tests
 *
 * Tests for sweet CRUD operations and search functionality.
 * Includes tests for public and protected endpoints.
 *
 * Test Categories:
 * 1. Get all sweets (public)
 * 2. Search sweets with filters (public)
 * 3. Create sweet (authenticated)
 * 4. Update sweet (authenticated)
 * 5. Delete sweet (admin only)
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const sweet_model_1 = require("../models/sweet.model");
const user_model_1 = require("../models/user.model");
const db_1 = require("../config/db");
let userToken;
let adminToken;
beforeAll(async () => {
    await (0, db_1.connectToDatabase)();
    // Create regular user for testing
    const userRes = await (0, supertest_1.default)(app_1.default).post("/api/auth/register").send({
        email: "customer@test.com",
        password: "Password123",
    });
    userToken = userRes.body.token;
    // Create admin user
    const adminRes = await (0, supertest_1.default)(app_1.default).post("/api/auth/register").send({
        email: "admin@test.com",
        password: "AdminPass123",
    });
    adminToken = adminRes.body.token;
    // Make second user admin
    await user_model_1.User.updateOne({ email: "admin@test.com" }, { role: "admin" });
    // Re-login admin to receive updated token with admin role in payload
    const updatedAdminLoginRes = await (0, supertest_1.default)(app_1.default)
        .post("/api/auth/login")
        .send({ email: "admin@test.com", password: "AdminPass123" });
    adminToken = updatedAdminLoginRes.body.token;
});
afterAll(async () => {
    await (0, db_1.disconnectFromDatabase)();
});
afterEach(async () => {
    await sweet_model_1.Sweet.deleteMany({});
});
describe("Sweet Management Endpoints", () => {
    describe("GET /api/sweets", () => {
        it("should get all sweets (empty initially)", async () => {
            const res = await (0, supertest_1.default)(app_1.default).get("/api/sweets");
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.sweets).toEqual([]);
        });
        it("should get all sweets when available", async () => {
            // Create test sweets
            await sweet_model_1.Sweet.create([
                { name: "Chocolate", category: "Candy", price: 2.99, quantity: 10 },
                { name: "Cake", category: "Dessert", price: 5.99, quantity: 5 },
            ]);
            const res = await (0, supertest_1.default)(app_1.default).get("/api/sweets");
            expect(res.status).toBe(200);
            expect(res.body.sweets.length).toBe(2);
            expect(res.body.sweets[0].name).toBe("Chocolate");
        });
    });
    describe("GET /api/sweets/search", () => {
        beforeEach(async () => {
            // Create test sweets
            await sweet_model_1.Sweet.create([
                { name: "Chocolate Cake", category: "Cake", price: 5.99, quantity: 10 },
                { name: "Vanilla Cake", category: "Cake", price: 4.99, quantity: 8 },
                {
                    name: "Chocolate Candy",
                    category: "Candy",
                    price: 2.99,
                    quantity: 20,
                },
            ]);
        });
        it("should search by name", async () => {
            const res = await (0, supertest_1.default)(app_1.default)
                .get("/api/sweets/search")
                .query({ name: "chocolate" });
            expect(res.status).toBe(200);
            expect(res.body.sweets.length).toBe(2);
        });
        it("should filter by category", async () => {
            const res = await (0, supertest_1.default)(app_1.default)
                .get("/api/sweets/search")
                .query({ category: "Cake" });
            expect(res.status).toBe(200);
            expect(res.body.sweets.length).toBe(2);
        });
        it("should filter by price range", async () => {
            const res = await (0, supertest_1.default)(app_1.default)
                .get("/api/sweets/search")
                .query({ minPrice: 3, maxPrice: 6 });
            expect(res.status).toBe(200);
            expect(res.body.sweets.length).toBe(2);
        });
        it("should combine multiple filters", async () => {
            const res = await (0, supertest_1.default)(app_1.default)
                .get("/api/sweets/search")
                .query({ name: "chocolate", category: "Cake" });
            expect(res.status).toBe(200);
            expect(res.body.sweets.length).toBe(1);
            expect(res.body.sweets[0].name).toBe("Chocolate Cake");
        });
    });
    describe("POST /api/sweets", () => {
        it("should create sweet with authentication", async () => {
            const res = await (0, supertest_1.default)(app_1.default)
                .post("/api/sweets")
                .set("Authorization", `Bearer ${userToken}`)
                .send({
                name: "Donut",
                category: "Pastry",
                price: 1.99,
                quantity: 15,
            });
            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.sweet.name).toBe("Donut");
        });
        it("should fail to create sweet without authentication", async () => {
            const res = await (0, supertest_1.default)(app_1.default).post("/api/sweets").send({
                name: "Donut",
                category: "Pastry",
                price: 1.99,
                quantity: 15,
            });
            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });
        it("should fail to create sweet with missing fields", async () => {
            const res = await (0, supertest_1.default)(app_1.default)
                .post("/api/sweets")
                .set("Authorization", `Bearer ${userToken}`)
                .send({
                name: "Donut",
                price: 1.99,
            });
            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });
    });
    describe("PUT /api/sweets/:id", () => {
        let sweetId;
        beforeEach(async () => {
            const sweet = await sweet_model_1.Sweet.create({
                name: "Original Name",
                category: "Candy",
                price: 2.99,
                quantity: 10,
            });
            sweetId = sweet._id.toString();
        });
        it("should update sweet with authentication", async () => {
            const res = await (0, supertest_1.default)(app_1.default)
                .put(`/api/sweets/${sweetId}`)
                .set("Authorization", `Bearer ${userToken}`)
                .send({ name: "Updated Name", price: 3.99 });
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.sweet.name).toBe("Updated Name");
            expect(res.body.sweet.price).toBe(3.99);
        });
        it("should fail to update without authentication", async () => {
            const res = await (0, supertest_1.default)(app_1.default)
                .put(`/api/sweets/${sweetId}`)
                .send({ name: "Updated" });
            expect(res.status).toBe(401);
        });
    });
    describe("DELETE /api/sweets/:id", () => {
        let sweetId;
        beforeEach(async () => {
            const sweet = await sweet_model_1.Sweet.create({
                name: "Sweet to Delete",
                category: "Candy",
                price: 2.99,
                quantity: 10,
            });
            sweetId = sweet._id.toString();
        });
        it("should delete sweet as admin", async () => {
            const res = await (0, supertest_1.default)(app_1.default)
                .delete(`/api/sweets/${sweetId}`)
                .set("Authorization", `Bearer ${adminToken}`);
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            // Verify deletion
            const checkRes = await (0, supertest_1.default)(app_1.default).get("/api/sweets");
            expect(checkRes.body.sweets.length).toBe(0);
        });
        it("should fail to delete as regular user", async () => {
            const res = await (0, supertest_1.default)(app_1.default)
                .delete(`/api/sweets/${sweetId}`)
                .set("Authorization", `Bearer ${userToken}`);
            expect(res.status).toBe(403);
            expect(res.body.success).toBe(false);
        });
        it("should fail to delete without authentication", async () => {
            const res = await (0, supertest_1.default)(app_1.default).delete(`/api/sweets/${sweetId}`);
            expect(res.status).toBe(401);
        });
    });
});
