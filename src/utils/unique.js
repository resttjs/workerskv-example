/* Generate a unique key */

// Generate a series of characters based on the date and a random
const unique = (n) => ((Math.random() * 10000) * Date.now()).toString(36).slice(0, n);

// Generate a unique key
export const generateUnique = () => {

  // Return a 10 character unique
  return `${unique(6)}${unique(4)}`
}