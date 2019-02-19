// Import the required modules from Restt
import { Service } from 'restt';

// Import the required resources
import { fetchCustomerResource, createCustomerResource, updateCustomerResource } from 'resources/customers';

// Export the customers service
export const CustomersService = new Service({

  // Define the origin of the service
  origin: configuration.cloudflare.routes.live,

  // Allow CORS for this service
  headers: {
    'access-control-allow-origin': '*'
  },

  // Add the resources to the service
  resources: [
    fetchCustomerResource(false), // do not cache this resource
    createCustomerResource,
    updateCustomerResource
  ]
});

// Export the cached customers service
export const CachedCustomersService = new Service({

  // Define the origin of the service
  origin: configuration.cloudflare.routes.cache,

  // Allow CORS for this service
  headers: {
    'access-control-allow-origin': '*'
  },

  // Add the resources to the service
  resources: [
    fetchCustomerResource(true), // cache this resource
  ]
});