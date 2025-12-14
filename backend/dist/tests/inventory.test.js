"use strict";
/**
 * Inventory Management Tests
 *
 * Tests for purchase and restock operations.
 * Tests inventory constraints (no negative stock, etc.).
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
    // Create regular user
    const userRes = await (0, supertest_1.default)(app_1.default)
        .post("/api/auth/register")
        .send({ email: "buyer@test.com", password: "Password123" });
    userToken = userRes.body.token;
    // Create admin user
    const adminRes = await (0, supertest_1.default)(app_1.default)
        .post("/api/auth/register")
        .send({ email: "invadmin@test.com", password: "AdminPass123" });
    adminToken = adminRes.body.token;
    // Elevate the second user to admin and re-login to get updated token
    await user_model_1.User.updateOne({ email: "invadmin@test.com" }, { role: "admin" });
    const adminLogin = await (0, supertest_1.default)(app_1.default)
        .post("/api/auth/login")
        .send({ email: "invadmin@test.com", password: "AdminPass123" });
    adminToken = adminLogin.body.token;
});
afterAll(async () => {
    await (0, db_1.disconnectFromDatabase)();
});
afterEach(async () => {
    await sweet_model_1.Sweet.deleteMany({});
});
describe("Inventory Endpoints", () => {
    describe("POST /api/sweets/:id/purchase", () => {
        it("should allow a customer to purchase a sweet and decrease quantity", async () => {
            const sweet = await sweet_model_1.Sweet.create({
                name: "PurchaseTest",
                category: "Test",
                price: 1.5,
                quantity: 2,
            });
            const res = await (0, supertest_1.default)(app_1.default)
                .post(`/api/sweets/${sweet._id}/purchase`)
                .set("Authorization", `Bearer ${userToken}`);
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.sweet.remainingQuantity).toBe(1);
        });
        it("should prevent purchase when sweet is out of stock", async () => {
            const sweet = await sweet_model_1.Sweet.create({
                name: "OutOfStock",
                category: "Test",
                price: 1.5,
                quantity: 0,
            });
            const res = await (0, supertest_1.default)(app_1.default)
                .post(`/api/sweets/${sweet._id}/purchase`)
                .set("Authorization", `Bearer ${userToken}`);
            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });
    });
    describe("POST /api/sweets/:id/restock", () => {
        it("should allow admin to restock a sweet", async () => {
            const sweet = await sweet_model_1.Sweet.create({
                name: "RestockTest",
                category: "Test",
                price: 2.5,
                quantity: 1,
            });
            const res = await (0, supertest_1.default)(app_1.default)
                .post(`/api/sweets/${sweet._id}/restock`)
                .set("Authorization", `Bearer ${adminToken}`)
                .send({ quantity: 5 });
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.sweet.newQuantity).toBe(6);
        });
        it("should not allow non-admin to restock", async () => {
            const sweet = await sweet_model_1.Sweet.create({
                name: "RestockDenied",
                category: "Test",
                price: 1.0,
                quantity: 1,
            });
            const res = await (0, supertest_1.default)(app_1.default)
                .post(`/api/sweets/${sweet._id}/restock`)
                .set("Authorization", `Bearer ${userToken}`)
                .send({ quantity: 5 });
            expect(res.status).toBe(403);
            expect(res.body.success).toBe(false);
        });
    });
});
