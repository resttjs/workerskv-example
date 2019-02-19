// Import the Restt framework
import { Restt } from 'restt';

// Import the required services
import { CustomersService, CachedCustomersService } from 'services/customers';

// Create an application
const app = new Restt();

// Add the customers service
app.use(CustomersService);

// Add the cached customers service
app.use(CachedCustomersService);