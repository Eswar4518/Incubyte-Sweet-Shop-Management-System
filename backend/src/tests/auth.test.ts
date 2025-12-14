/**
 * Authentication Tests
 *
 * Tests for user registration and login endpoints.
 * Follows TDD pattern: write tests first, then implementation.
 *
 * Test Cases:
 * 1. User registration with valid credentials
 * 2. Registration fails with missing email
 * 3. Registration fails with duplicate email
 * 4. User login with valid credentials
 * 5. Login fails with incorrect password
 * 6. Login fails with non-existent email
 */

import request from 'supertest';
import app from '../app';
import { User } from '../models/user.model';
import { connectToDatabase, disconnectFromDatabase } from '../config/db';

// Setup and teardown
beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await disconnectFromDatabase();
});

// Clear users before each test
afterEach(async () => {
  await User.deleteMany({});
});

describe('Authentication Endpoints', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'newuser@test.com',
          password: 'Password123'
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe('newuser@test.com');
      expect(res.body.user.role).toBe('customer');
    });

    it('should fail registration without email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          password: 'Password123'
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('required');
    });

    it('should fail registration without password', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'user@test.com'
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should fail registration with duplicate email', async () => {
      // Register first user
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'duplicate@test.com',
          password: 'Password123'
        });

      // Try to register with same email
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'duplicate@test.com',
          password: 'Password456'
        });

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('already registered');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a test user before each login test
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'testuser@test.com',
          password: 'CorrectPassword123'
        });
    });

    it('should login user with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'testuser@test.com',
          password: 'CorrectPassword123'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe('testuser@test.com');
    });

    it('should fail login with incorrect password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'testuser@test.com',
          password: 'WrongPassword123'
        });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Invalid email or password');
    });

    it('should fail login with non-existent email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@test.com',
          password: 'Password123'
        });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should fail login without email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          password: 'Password123'
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should fail login without password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'testuser@test.com'
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
