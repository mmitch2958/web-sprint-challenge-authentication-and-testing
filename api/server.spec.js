const request = require('supertest');

const server = require('./server.js');
const db = require('../database/dbConfig.js');

//API Auth 

describe('auth-router.js', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });
  
    it('Test will use testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

//Register a User 
   
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

    //API JOKES 
    describe('Return jokes on /api/jokes get request', () => {
        it('Recieve 200 status on success', async () => {
            await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });
            const userResponse = await request(server).post('/api/auth/login').send({ username: 'test', password: 'pass' });
            const response = await request(server).get('/api/jokes').set({ Authorization: userResponse.body.token });
    
            expect(response.status).toEqual(200);
        })
    
        it('Return a List of 20 jokes', async () => {
            await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });
            const userResponse = await request(server).post('/api/auth/login').send({ username: 'test', password: 'pass' });
            const response = await request(server).get('/api/jokes').set({ Authorization: userResponse.body.token });
    
            expect(response.body).toHaveLength(20);
        })
    
        it('Return 400 when there is not a token provided', async () => {
            const response = await request(server).get('/api/jokes');
    
            expect(response.status).toEqual(400);
        })
    
    })
});
