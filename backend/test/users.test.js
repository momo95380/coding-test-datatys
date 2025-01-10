/* eslint-disable func-names */
require('dotenv').config();
const chai = require('chai');
const sinon = require('sinon');
const shajs = require('sha.js');
const user = require('../src/services/userService');
const auth = require('../src/services/authService');
const db = require('../src/sql/db');

const { expect } = chai;
const { stub } = sinon;

describe('User and Auth Services', () => {
  describe('authenticateUser', () => {
    afterEach(() => {
      sinon.restore();
    });

    beforeEach(function () {
      sinon.restore();
      this.queryStub = stub(db, 'query').resolves({
        rowCount: 0,
        rows: [],
      });
    });

    it('should throw an error if query fail', async function () {
      this.queryStub.rejects(new Error('Bad credentials'));
      try {
        await auth.authenticateUser('toto@toto.fr', 'tata');
      } catch (err) {
        expect(err.message).to.equal('Bad credentials');
        expect(this.queryStub.callCount).to.equal(1);
        return;
      }
      throw new Error('Should have thrown an error');
    });

    it('should throw an error if query return 0 row', async function () {
      try {
        await auth.authenticateUser('toto@toto.fr', 'tata');
      } catch (err) {
        expect(err.message).to.equal('Bad credentials');
        expect(this.queryStub.callCount).to.equal(1);
        return;
      }
      throw new Error('Should have thrown an error');
    });

    it('should succeed', async function () {
      // First create a test user
      const testUser = {
        id: 1,
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
        password: 'testpass',
      };
      this.queryStub.resolves({ rowCount: 1, rows: [testUser] });
      // Register the user
      const registeredUser = await auth.registerUser({
        email: testUser.email,
        password: testUser.password,
        firstName: testUser.first_name,
        lastName: testUser.last_name,
      });

      expect(registeredUser.user.email).to.equal(testUser.email);
      // Looking at authService.js, the password is hashed using: email + password + SECRET
      const hashedPassword = shajs('sha256')
        .update(`${testUser.email}${testUser.password}${process.env.SECRET}`)
        .digest('hex');
      // Update test user with hashed password for authentication
      const userWithHashedPass = {
        ...testUser,
        password: hashedPassword,
      };
      // Now try to authenticate with the created user
      this.queryStub.resolves({ rowCount: 1, rows: [userWithHashedPass] });
      const authUser = await auth.authenticateUser(testUser.email, testUser.password);
      expect(authUser.user.email).to.equal(testUser.email);
      expect(authUser.token).to.be.a('string');
    });
  });

  describe('registerUser', () => {
    afterEach(() => {
      sinon.restore();
    });

    beforeEach(function () {
      sinon.restore();
      this.queryStub = stub(db, 'query').resolves({
        rowCount: 0,
        rows: [],
      });
    });

    it('should throw an error if query fails', async function () {
      this.queryStub.rejects(new Error('Registration failed'));
      try {
        await auth.registerUser({
          email: 'new@user.com',
          password: 'password123',
          firstName: 'New',
          lastName: 'User',
        });
      } catch (err) {
        expect(err.message).to.equal('Registration failed');
        expect(this.queryStub.callCount).to.equal(1);
        return;
      }
      throw new Error('Should have thrown an error');
    });

    it('should successfully register a new user', async function () {
      const newUser = {
        id: 1,
        email: 'new@user.com',
        first_name: 'New',
        last_name: 'User',
      };
      this.queryStub.resolves({ rowCount: 1, rows: [newUser] });

      const result = await auth.registerUser({
        email: 'new@user.com',
        password: 'password123',
        firstName: 'New',
        lastName: 'User',
      });

      expect(result.user.email).to.equal(newUser.email);
      expect(result.token).to.be.a('string');
      expect(this.queryStub.callCount).to.equal(1);
    });
  });

  describe('updateUser', () => {
    afterEach(() => {
      sinon.restore();
    });

    beforeEach(function () {
      sinon.restore();
      this.queryStub = stub(db, 'query').resolves({
        rowCount: 0,
        rows: [],
      });
    });

    it('should throw an error if user not found', async function () {
      try {
        await user.updateUser('999', { firstName: 'Updated' });
      } catch (err) {
        expect(err.message).to.equal('User not found');
        expect(this.queryStub.callCount).to.equal(1);
        return;
      }
      throw new Error('Should have thrown an error');
    });

    it('should successfully update user', async function () {
      const updatedUser = {
        id: 1,
        email: 'test@test.com',
        first_name: 'Updated',
        last_name: 'User',
      };
      this.queryStub.resolves({ rowCount: 1, rows: [updatedUser] });
      const result = await user.updateUser('1', { firstName: 'Updated' });
      expect(result.first_name).to.equal('Updated');
      expect(this.queryStub.callCount).to.equal(1);
    });
  });

  describe('deleteUser', () => {
    afterEach(() => {
      sinon.restore();
    });

    beforeEach(function () {
      sinon.restore();
      this.queryStub = stub(db, 'query').resolves({
        rowCount: 0,
        rows: [],
      });
    });

    it('should throw an error if user not found', async function () {
      try {
        await user.deleteUser('999');
      } catch (err) {
        expect(err.message).to.equal('User not found');
        expect(this.queryStub.callCount).to.equal(1);
        return;
      }
      throw new Error('Should have thrown an error');
    });

    it('should successfully delete user', async function () {
      this.queryStub.resolves({ rowCount: 1, rows: [] });
      await user.deleteUser('1');
      expect(this.queryStub.callCount).to.equal(1);
    });
  });
});
