import app from "../../index";
import db from '../../data-access/models';
import request from "supertest";

const testUserLogin: string = process.env.TEST_USER_LOGIN!;
const testUserPassword: string = process.env.TEST_USER_PASSWORD!;

describe("/api/groups router", () => {
    let thisDb: any = db;
    let token: string = '';
    let createdGroupId: string = '';
    let createdGroupName: string = '';

    beforeAll(async () => {
        await thisDb.sequelize.sync();
    })

    it("returns status code 403 and 'No token provided' message if authorization token is not provided", async () => {
      const res = await request(app)
        .get("/api/groups/")
        .send();
        
      expect(res.statusCode).toEqual(403);
      expect(res.text).toEqual('No token provided');
    });

    it("returns status code 401 and 'Failed to authenticate token' message if authorization token is incorrect", async () => {
        const res = await request(app)
          .get("/api/groups/")
          .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhiM2EyM2QzLTMwZTctNDRjMi1iMzlhLWFlNGQ1ZjM4YmI4NiIsImlhdCI6MTY0MTU1NTk5OCwiZXhwIjoxNjQxNTU5NTk4fQ.zxNT3STJrZ46pWd0IazJfnknA18W9VjG8paP-RZQTfk')
          .send();
          
        expect(res.statusCode).toEqual(401);
        expect(res.text).toEqual('Failed to authenticate token');
      });

    it("POST method successfully creates group", async () => {

        const time = new Date().getTime();
        createdGroupName = time.toString();
    
        const tokenRequest = await request(app)
            .post('/api/login/')
            .send({
                login: testUserLogin,
                password: testUserPassword,
            });

        token= tokenRequest.text;
    
        const res = await request(app)
            .post("/api/groups")
            .set('x-access-token', token)
            .send({
                name: createdGroupName,
                permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
            });
        
        createdGroupId = res.text;
        
        expect(res.statusCode).toEqual(201);
    });

    it("GET with group ID successfully gets group", async () => {

        const res = await request(app)
            .get("/api/groups/" + createdGroupId)
            .set('x-access-token', token)
            .send();
            
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual(createdGroupName);
    });

    it("GET with no arguments gets all groups", async () => {

        const res = await request(app)
            .get("/api/groups/")
            .set('x-access-token', token)
            .send();
            
        expect(res.statusCode).toEqual(200);
    });

    it("PUT method successfully updates group", async () => {

        const time = new Date().getTime();
        createdGroupName = time.toString();
    
        const res = await request(app)
            .put("/api/groups/" + createdGroupId)
            .set('x-access-token', token)
            .send({
                name: createdGroupName,
                permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
            });
        
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual(`Group with id ${createdGroupId} updated succesfully`)
    });

    it("DELETE method successfully deletes group", async () => {
    
        const res = await request(app)
            .delete("/api/groups/" + createdGroupId)
            .set('x-access-token', token)
            .send();
        
        expect(res.statusCode).toEqual(204);
    });

    afterAll(async () => {
        await thisDb.sequelize.close()
    });
  });