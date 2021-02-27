/**
 * @jest-environment node
 */


const request = require('supertest')
const app = require('../app');

const template = {
    "name": "Serum antiacne",
    "image": "https://cdn.shopify.com/s/files/1/0074/3486/2639/products/sa-carrossel-SA-sozinho.jpg",
    "sku": {
        "id": "S-SAA-250",
        "inventory": "15",
        "price": "59.90"
    }
};

const feature = '/products';

describe('Testing /products endpoint', () => {
  test('Inserindo um produto', async () => {
    const { text, statusCode } = await request(app).post(feature).send(template)
    expect(statusCode).toBe(200)
  });

  const testWithoutProperty = async (property) => {
    const product = { ...template };
    delete product[property];
    const { text, statusCode } = await request(app).post(feature).send(product);
    const { error } = JSON.parse(text);

    expect(statusCode).toBe(400);
    expect(error).toContain(property);
    expect(error).toContain('required');
  }

  test('Inserindo produto com atributo faltando', async () => {
    await testWithoutProperty('image');
  })


});