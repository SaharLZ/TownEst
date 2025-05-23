import React from 'react'
import axios from 'axios'


export const getUserEmail = () => {
    const usermail = localStorage.getItem('usermail');
    console.log(usermail);
    return usermail;
  };
  
export  const findUserByEmail = async (email) => {


    try {
      const response = await axios.get(`http://localhost:5000/api/find-user`, {
        params: { email }
      });
      
      if (response.status === 200) {
        console.log('User found:', response.data);
        return response.data;
      } else {
        console.log('User not found');
        return null;
      }
    } catch (error) {
      console.error('Error finding user:');
      return null;
    }
  };

export default function util() {
  return (
    <div>
      
    </div>
  )
}
