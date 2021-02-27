/**
 * @jest-environment node
 */

const request = require('supertest')
const app = require('../app');

const template = {
  "name": "My Sample Product",
  "image": "https://my.dummy.url/to/store/sample-image.png",
  "sku": [{
    "id": "MY-PUBLISHED-SKU",
    "inventory": "15",
    "price": "59.90"
  }]
};

const endpoint = '/products';

describe('Testing /products endpoint', () => {

  test('Inserindo um produto', async () => {
    const { text, statusCode } = await request(app).post(endpoint).send(template);
    const response = JSON.stringify(text);
    expect(statusCode).toBe(200);
    expect(response).toContain('My Sample Product');
    expect(response).toContain('my.dummy.url');
    expect(response).toContain('MY-PUBLISHED-SKU');
    expect(response).toContain('_id');
  });

  test('Tentando inserir produto com atributos faltando', async () => {
    await testWithoutProperty('name', 'required');
    await testWithoutProperty('image', 'required');
    await testWithoutProperty('sku', 'required');
  });

  test('Inserindo produto sem SKU', async () => {
    await testWithoutProperty('sku', 'at least one', true);
  });

  /* AUXILIARY METHODS */
  const testWithoutProperty = async (property, required, isArray = false) => {
    const product = { ...template };
    isArray ? product[property] = [] : delete product[property];
    const { text, statusCode } = await request(app).post(endpoint).send(product);
    const { error } = JSON.parse(text);
    expect(statusCode).toBe(400);
    expect(error).toContain(property);
    expect(error).toContain(required);
  }

});