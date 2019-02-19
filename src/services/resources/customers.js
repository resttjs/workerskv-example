// Import the required modules from Restt
import { Resource } from 'restt';

// Import the required customer responses
import { fetchCustomerResponse, createCustomerResponse, updateCustomerResponse } from 'responses/customers';

// Export the fetch customer resource (with an optional 60 second cache)
export const fetchCustomerResource = (cache) => new Resource({
  endpoint: '/customers/{id}',
  method: 'GET',
  cache: (cache) ? 60 : false,
  response: fetchCustomerResponse
});

// Export the create customer resource
export const createCustomerResource = new Resource({
  endpoint: '/customers',
  method: 'POST',
  fields: ['email', 'name'],
  response: createCustomerResponse
});

// Export the update customer response
export const updateCustomerResource = new Resource({
  endpoint: '/customers/{id}',
  method: 'PATCH',
  response: updateCustomerResponse
});