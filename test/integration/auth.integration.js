import request from 'supertest';
import { app } from '../server.js';
import User from '../../models/User.js';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Mock mongoose.connect to prevent real connection
jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose');
  return {
    ...actualMongoose,
    connect: jest.fn().mockResolvedValue(), // Mock connect to do nothing
    disconnect: jest.fn().mockResolvedValue(), // Mock disconnect
    connection: { close: jest.fn() }, // Mock connection.close
  };
});

let mongoServer;

beforeAll(async () => {
  // Disconnect any existing Mongoose connections
  await mongoose.disconnect();

  // Start the in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Unmock mongoose.connect for the in-memory server
  mongoose.connect.mockRestore();

  // Connect Mongoose to the in-memory server
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Disconnect Mongoose and stop the in-memory server
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany();
});

// Test registration API
test('POST /register → 201 + creates user', async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'Password123',
    });

  expect(res.status).toBe(201);
  expect(res.body).toEqual({ message: 'User created!' });

  // Verify user in DB
  const user = await User.findOne({ email: 'test@example.com' });
  expect(user).toBeTruthy();
  expect(user.username).toBe('testuser');
});

// Test login API
test('POST /login → 200 + returns token', async () => {
  // Create user first
  await request(app).post('/api/auth/register').send({
    username: 'testuser',
    email: 'test@example.com',
    password: 'Password123',
  });

  const res = await request(app)
    .post('/api/auth/login')
    .send({
      usernameOrEmail: 'test@example.com',
      password: 'Password123',
    });

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('token');
});