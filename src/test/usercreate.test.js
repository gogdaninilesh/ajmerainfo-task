const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Adjust the path to your server file
const { expect } = chai;

chai.use(chaiHttp);

describe('User API - Create User', () => {
    it('should create a user with valid data', (done) => {
        chai.request(server)
            .post('/api/users') // Adjust endpoint as necessary
            .send({
                name: 'Nilesh User',
                email: 'nileshtest@gmail.com',
                mobile: '9997765663',
                role: 'admin'
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id');
                expect(res.body.name).to.equal('Nilesh User');
                expect(res.body.email).to.equal('nileshtest@gmail.com');
                expect(res.body.mobile).to.equal('9997765663');
                expect(res.body.role).to.equal('admin');
                done();
            });
    });

    it('should return an error for missing fields', (done) => {
        chai.request(server)
            .post('/api/users')
            .send({ name: 'Nilesh User' }) // Missing email, mobile, and role
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                done();
            });
    });

    it('should return an error for invalid email format', (done) => {
        chai.request(server)
            .post('/api/users')
            .send({
                name: 'Nilesh User',
                email: 'invalidemail',
                mobile: '1234567890',
                role: 'user'
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                done();
            });
    });

    it('should return an error for duplicate email', (done) => {
        const user = {
            name: 'Jane Doe',
            email: 'janedoe@example.com',
            mobile: '9997765663',
            role: 'user'
        };
        chai.request(server)
            .post('/api/users')
            .send(user)
            .end(() => {
                chai.request(server)
                    .post('/api/users')
                    .send(user)
                    .end((err, res) => {
                        expect(res).to.have.status(409);
                        expect(res.body).to.have.property('error');
                        done();
                    });
            });
    });
});
