// const { expect } = require('chai');
// const sinon = require('sinon');

// const productsController = require('../../controllers/productsController.js');
// const productsService = require('../../services/productsService.js');

// describe('Call the create method from the productsController', () => {
//   describe('when the payload is invalid', () => {
//     describe('when the payload misses an attribute', () => {
//       const payloads = [{}, { quantity: 10 }, { name: 'produto' }];
//       const expected = [
//         { message: '"name" is required' },
//         { message: '"name" is required' },
//         { message: '"quantity" is required' },
//       ];

//       payloads.forEach((payload, index) => {
//         const response = {};
//         const request = {};

//         before(() => {
//           request.body = payload;

//           response.status = sinon.stub().returns(response);
//           response.json = sinon.stub().returns();
//         });

//         it('should call the status method with status code 400', async () => {
//           await productsController.create(request, response);

//           expect(response.status.calledWith(400)).to.be.true;
//         });

//         it('should call the json method with error message', async () => {
//           await productsController.create(request, response);

//           expect(response.json.calledWith(expected[index])).to.be.true;
//         });
//       });
//     });

//     describe("when the attribute 'name' has a length less than 5", () => {
//       const response = {};
//       const request = {};

//       before(() => {
//         request.body = { name: 'pro', quantity: 100 };

//         response.status = sinon.stub().returns(response);
//         response.json = sinon.stub().returns();
//       });

//       it('should call the status method with status code 422', async () => {
//         await productsController.create(request, response);

//         expect(response.status.calledWith(422)).to.be.true;
//       });

//       it('should call the json method with error message', async () => {
//         await productsController.create(request, response);

//         expect(
//           response.json.calledWith({
//             message: "\"name\" length must be at least 5 characters long",
//           })
//         ).to.be.true;
//       });
//     });

//     describe("when the attribute 'quantity' is invalid", () => {
//       const payloads = [
//         { name: "produto", quantity: "string" },
//         { name: "produto", quantity: -1 },
//         { name: "produto", quantity: 0 },
//       ];
//       const expected = {
//         message: '"quantity" must be a number larger than or equal to 1',
//       };

//       payloads.forEach(payload => {
//         const response = {};
//         const request = {};
  
//         before(() => {
//           request.body = payload;
  
//           response.status = sinon.stub().returns(response);
//           response.json = sinon.stub().returns();
//         });
  
//         it('should call the status method with status code 422', async () => {
//           await productsController.create(request, response);
  
//           expect(response.status.calledWith(422)).to.be.true;
//         });
  
//         it('should call the json method with error message', async () => {
//           await productsController.create(request, response);
  
//           expect(response.json.calledWith(expected)).to.be.true;
//         });
//       });
//     });
//   });

//   describe('when the product already exists', () => {
//     const response = {};
//     const request = {};

//     before(() => {
//       request.body = { name: 'produto', quantity: 100 };

//       response.status = sinon.stub().returns(response);
//       response.json = sinon.stub().returns();

//       sinon
//         .stub(productsService, 'create')
//         .resolves({ error: { message: 'Product already exists' } });
//     });

//     after(() => {
//       productsService.create.restore();
//     });

//     it('should call the status method with status code 409', async () => {
//       await productsController.create(request, response);

//       expect(response.status.calledWith(409)).to.be.true;
//     });

//     it('should call the json method with error message', async () => {
//       await productsController.create(request, response);

//       expect(
//         response.json.calledWith({
//           message: 'Product already exists',
//         })
//       ).to.be.true;
//     });
//   });

//   describe('when the product is created', () => {
//     const response = {};
//     const request = {};

//     before(() => {
//       request.body = { name: 'produto', quantity: 10 };

//       response.status = sinon.stub().returns(response);
//       response.json = sinon.stub().returns();

//       sinon
//         .stub(productsService, 'create')
//         .resolves({ ...request.body, id: 1 });
//     });

//     after(() => {
//       productsService.create.restore();
//     });

//     it('should call the status method with status code 201', async () => {
//       await productsController.create(request, response);

//       expect(response.status.calledWith(201)).to.be.true;
//     });

//     it('should call the json method with the product', async () => {
//       await productsController.create(request, response);

//       expect(response.json.calledWith({ id: 1, name: 'produto', quantity: 10 }))
//         .to.be.true;
//     });
//   });
// });
