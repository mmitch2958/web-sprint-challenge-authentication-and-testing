const request = require('supertest');

const server = require('./server.js');
const db = require('../database/dbConfig.js');

describe('auth-router.js', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });
  
    it('Test will use testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
  
    describe('Register and Return new user', () => {
        it('will recieve 201 status on success', async () => {
            const response = await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });
  
            expect(response.status).toEqual(201);
        });
  
        it('Test will return object with username on success', async () => {
            const response = await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });
  
            expect(response.body).toHaveProperty('username', "test");
        });
  
        it('Test will return a 400 error if missing username', async () => {
            const response = await request(server).post('/api/auth/register').send({ password: 'pass' });
  
            expect(response.status).toEqual(400);
        });
  
        it('Test will return a 500 error if username already taken', async () => {
            await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });
            const response = await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass2' });
  
            expect(response.status).toEqual(500);
        });
    });
