// Import the required modules from Restt
import { Response } from 'restt';

// Import the required utils
import { generateUnique } from 'utils/unique';

// Export the fetch customer response
export const fetchCustomerResponse = async({ id }) => {

  // Create an object for the response
  let response;

  // Fetch the value from the WorkersKV namespace
  const customer = await Customers.get(id, 'json');

  // Check whether there is a customer
  if (customer) {

    // Set the response to the customer object as we have an entry
    response = { ...customer, success: true };
    
  } else {

    // Set the response as an error as we cannot find an entry
    response = {
      error: `Failed to fetch customer '${id}' - customer does not exist`,
      success: false
    }
  }

  // Return a response with the KV pair
  return new Response({
    body: response,
    status: 200
  });

}

// Export the create customer response
export const createCustomerResponse = async({ email, name, metadata }) => {

  // Create an object for the response
  let response;

  // Generate the customer from the params
  const customer = {
    id: generateUnique(),
    email,
    name
  }

  // Add the metadata when applicable
  if (metadata) customer.metadata = metadata;

  // Insert the customer to the WorkersKV namespace
  await Customers.put(customer.id, JSON.stringify(customer));

  // Attempt to fetch the customer from the WorkersKV namespace
  if (await Customers.get(customer.id, 'json')) {
    
    // Set the response as the customer as we have a success
    response = { ...customer, success: true };

  } else {

    // Set the response as an error as we could not make an entry
    response = {
      error: 'Failed to create customer - database error',
      success: false
    }
  }

  // Return the response with the customer
  return new Response({
    body: response,
    status: 200
  });

}

// Export the update customer response
export const updateCustomerResponse = async({ id, email, name, metadata }) => {

  // Create an object for the response
  let response;

  // Fetch the value from the WorkersKV namespace
  const customer = await Customers.get(id, 'json');

  // Check whether there is a customer
  if (customer) {

    // If there is an email then update it
    if (email) customer.email = email;

    // If there is a name then update it
    if (name) customer.name = name;

    // If there is metadata then update it
    if (metadata) customer.metadata = metadata;

    // Update customer in the WorkersKV namespace
    await Customers.put(id, JSON.stringify(customer));

    // Attempt to fetch the customer from the WorkersKV namespace
    if (await Customers.get(id, 'json')) {
      
      // Set the response as the customer as we have a success
      response = { ...customer, success: true };

    } else {

      // Set the response as an error as we could not make an entry
      response = {
        error: `Failed to update customer '${id}' - database error`,
        success: false
      }
    }
    
  } else {

    // Set the response as an error as we cannot find an entry
    response = {
      error: `Failed update customer '${id}' - customer does not exist`,
      success: false
    }
  }

  // Return a response with the KV pair
  return new Response({
    body: response,
    status: 200
  });

}