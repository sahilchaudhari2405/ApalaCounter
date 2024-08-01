import React from 'react';
import BarGraphWithDropdown from '../component/BarGraphWithDropdown';
import ChartWithDropdown from '../component/lineGraphSales';
import ChartofProducts from '../component/lineGraphProduct';
import ChartofVisitors from '../component/lineGraphVisitors';
import Chartofdonut from '../component/donutChart';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useState } from 'react';




// { selectedCounter, onCounterChange }
const Admin = () => {
  const [ourUsers, setourUsers] = useState([]);

  const [selectedCounter, setSelectedUserID] = useState('');
  const [counterUser, setCounterUser] = useState(null);
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        fetchUsers(token);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.error('No token found in localStorage');
    }
  }, []);

  
  const fetchUsers = async (token) => {
    try {
      if (!token) {
        throw new Error('No token found in localStorage');
      }
      const response = await axiosInstance.get('/auth/users', {
        withCredentials: true
      });
      const resData = response.data;
      console.log("CounterUsers: ", resData);
      setourUsers(resData);
    } catch (error) {
      console.error('Error fetching users:', error); 
    }
  };

  const onCounterChange = (event) => {
    const selectedValue = event.target.value;
    console.log("isndie counter chaneg: ",selectedValue);
    setSelectedUserID(selectedValue);

    const selectedUser = ourUsers.find(
      (user, index) => (user._id) == selectedValue
    );
    setCounterUser(selectedUser);
    console.log("selecteduser is: ", counterUser);
  };

  const fetchOrders = async (token=null) => {
    try {
      if (!token) {
          throw new Error('No token found in localStorage');
      }
      const response = await axiosInstance.get('/order/getAllOrderByCounter', {
          headers: { Authorization: `Bearer ${token}` }
      });
        // setOrders(response.data.data);
        const resData = response.data.data;
        console.log("getAllOrderByCounter : ",resData);
      
        const matchingOrder = resData.find(order => order?.user?._id === counterUser?._id);
        if (matchingOrder) {
          setOrders(matchingOrder);
          console.log("matchingOrder is: ",matchingOrder);
        } else {
          console.log(`No order found for user ID: ${counterUser._id}`);
        }
        
    } catch (error) {
        console.error('Error fetching orders:', error); 
    }
  };

  useEffect(() => {
    console.log("indie fetch");
    const token = localStorage.getItem('token');
    if (token) {  
      const decodedToken = jwtDecode(token);
      console.log("decoded token is: ",decodedToken);
      console.log("decoded token userid is: ",decodedToken.id);
      fetchOrders(token);
    }
  },[]);


  return (
    <div className='flex flex-col justify-center items-center '>

      <div className="p-8 w-[95vw] mt-20">
        <h1 className="text-3xl font-bold mb-4">Counter Wise Dashboards</h1>

        <select className="my-5" value={selectedCounter} onChange={onCounterChange}>
          {ourUsers.filter(user => user.role !== 'admin').map((user, index) => (
            <option key={user._id} value={user._id}>
              {user.counterNumber ? 'Counter Number: ' + user.counterNumber : ''} Name: {user.fullName}
            </option>
          ))}
        </select>


        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-purple-500 text-white p-6 rounded-lg">
            <h2 className="text-xl">Current Users</h2>
            <h3 className="text-2xl font-bold">500</h3>
            <p className='flex flex-row gap-2'>Increased by 45% <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07" />
            </svg></p>
          </div>
          <div className="bg-orange-500 text-white p-6 rounded-lg">
            <h2 className="text-xl">Sales Today</h2>
            <h3 className="text-2xl font-bold">600</h3>
            <p className='flex flex-row gap-2'>Above Average by 45% <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07" />
            </svg></p>
          </div>
          <div className="bg-blue-500 text-white p-6 rounded-lg">
            <h2 className="text-xl">Revenue today</h2>
            <h3 className="text-2xl font-bold">44400</h3>
            <p className='flex flex-row gap-2'>More than 45% <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07" />
            </svg></p>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg">
            <h2 className="text-xl">Total Visitors Today</h2>
            <h3 className="text-2xl font-bold">100</h3>
            <p className='flex flex-row gap-2'>User Increased 45% <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07" />
            </svg></p>
          </div>
        </div>
      </div>

      <div className='flex m-20 mt-0 mb-20 rounded-md  flex-row w-[90vw]'>
        <BarGraphWithDropdown />
        <ChartWithDropdown />
      </div>

      <div className='flex mb-10 bg-white shadow-3xl rounded shadow-xl flex-row items-center justify-center  w-[90vw]'>

        <div className=''>
          <ChartofProducts />
        </div>
        <div className=''>
          <ChartofVisitors />
        </div>
        <div className=''>
          <Chartofdonut />
        </div>

      </div>
    </div>
  );
}

export default Admin;

