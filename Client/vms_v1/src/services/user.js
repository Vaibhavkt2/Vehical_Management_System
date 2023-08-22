// import axios from 'axios'
// import { createUrl, log } from '../utils/utils'

// export async function registerUser(
//   firstName,
//   lastName,
//   address,
//   phone,
//   email,
//   password,
//   userRoles

// ) {
//   const url = createUrl('/users')
//   const body = {
//     firstName,
//     lastName,
//     address,
//     phone,
//     email,
//     password,
//     userRoles
//   }

//   // wait till axios is making the api call and getting response from server
//   try {
//     const response = await axios.post(url, body)
//     log(response.data)
//     return response.data
//   } catch (ex) {
//     log(ex)
//     return null
//   }
// }


// services/user.js
import axios from 'axios';
import { createUrl, log } from '../utils/utils';

export async function registerUser(
  firstName,
  lastName,
  address,
  phone,
  email,
  password,
  userRoles
) {
  const url = createUrl('/users');
  const body = {
    firstName,
    lastName,
    address,
    phone,
    email,
    password,
    userRoles
  };

  try {
    // Check if the user already exists by email
    try {
      const getUserResponse = await axios.get(url);
      if (getUserResponse.data && getUserResponse.data.email === email) {
        console.log(getUserResponse.data);
        return { email: '' }; // Return an empty object to indicate existing email
      }
    } catch (getUserEx) {
      log('Error fetching user data by email:', getUserEx);
    }

    // Proceed with registration if the email is not found in the database
    const response = await axios.post(url, body);
    log(response.data);
    return response.data;
  } catch (ex) {
    log('Error registering user:', ex);
    return null;
  }
}
