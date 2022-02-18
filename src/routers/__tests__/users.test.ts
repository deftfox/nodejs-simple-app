import app from "../../index";
import db from '../../data-access/models';
import request from "supertest";

const testUserLogin: string = process.env.TEST_USER_LOGIN!;
const testUserPassword: string = process.env.TEST_USER_PASSWORD!;

describe("/api/users router", () => {
    let thisDb: any = db;
    let token: string = '';
    let createdUserId: string = '';
    let createdUserLogin: string = '';

    beforeAll(async () => {
        await thisDb.sequelize.sync();
    })

    it("returns status code 403 and 'No token provided' message if authorization token is not provided", async () => {
      const res = await request(app)
        .get("/api/users/")
        .send({ 
            loginSubstring:"jack",
            limit:3 
        });
        
      expect(res.statusCode).toEqual(403);
      expect(res.text).toEqual('No token provided');
    });

    it("returns status code 401 and 'Failed to authenticate token' message if authorization token is incorrect", async () => {
        const res = await request(app)
          .get("/api/users/")
          .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhiM2EyM2QzLTMwZTctNDRjMi1iMzlhLWFlNGQ1ZjM4YmI4NiIsImlhdCI6MTY0MTU1NTk5OCwiZXhwIjoxNjQxNTU5NTk4fQ.zxNT3STJrZ46pWd0IazJfnknA18W9VjG8paP-RZQTfk')
          .send({ 
              loginSubstring:"jack",
              limit:3 
          });
          
        expect(res.statusCode).toEqual(401);
        expect(res.text).toEqual('Failed to authenticate token');
      });

    it("POST method successfully creates user", async () => {

        const time = new Date().getTime();
        createdUserLogin = time + '@mail.ru';
    
        const tokenRequest = await request(app)
            .post('/api/login/')
            .send({
                login: testUserLogin,
                password: testUserPassword,
            });

        token = tokenRequest.text;
    
        const res = await request(app)
            .post("/api/users")
            .set('x-access-token', token)
            .send({
                login: createdUserLogin,
                password:"password",
                age:18
            });
        
        createdUserId = res.text;
        
        expect(res.statusCode).toEqual(201);
    });

    it("GET with user ID successfully gets user", async () => {

        const res = await request(app)
            .get("/api/users/" + createdUserId)
            .set('x-access-token', token)
            .send();
            
        expect(res.statusCode).toEqual(200);
        expect(res.body.login).toEqual(createdUserLogin);
    });

    it("GET with user login substring and limit successfully gets user", async () => {

        const res = await request(app)
            .get("/api/users/")
            .set('x-access-token', token)
            .send({
                loginSubstring: createdUserLogin,
                limit:3
            });
            
        expect(res.statusCode).toEqual(200);
        expect(res.body[0].login).toEqual(createdUserLogin);
    });

    it("PUT method successfully updates user", async () => {

        const time = new Date().getTime();
        createdUserLogin = time + '@mail.ru';
    
        const res = await request(app)
            .put("/api/users/" + createdUserId)
            .set('x-access-token', token)
            .send({
                login: createdUserLogin,
                password:"password",
                age:18
            });
        
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual(`User with id ${createdUserId} updated succesfully`)
    });

    it("DELETE method successfully deletes user", async () => {
    
        const res = await request(app)
            .delete("/api/users/" + createdUserId)
            .set('x-access-token', token)
            .send();
        
        expect(res.statusCode).toEqual(204);
    });

    afterAll(async () => {
        await thisDb.sequelize.close()
    });
  });