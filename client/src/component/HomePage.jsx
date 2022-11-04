import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addStudent } from '../redux/studentReducer';

export const HomePage = () => {
    const initialState = {
        first_name:"",
        last_name:"",
        email_id:"",
    }
    const [data,setData] = useState(initialState)
    const usedispatch = useDispatch() 

    const saveStudent =(e)=>{
        e.preventDefault();
        usedispatch(addStudent(data))
        setData(initialState)
    }
    const handleChnage =(event)=>{
        const {name,value} = event.target
        setData((prev)=>{
            return({
                ...prev,
                [name]:value
            })
        })
    }

  return (
    <div className='homePage'>
        <form onSubmit={saveStudent}>
            <input onChange={handleChnage} required value = {data.first_name} type="text" autoFocus name="first_name" placeholder='Enter First Name' />
            <input onChange={handleChnage} required value = {data.last_name} type="text" name="last_name" placeholder='Enter Last Name' />
            <input onChange={handleChnage} required value = {data.email_id} type="email" name="email_id" placeholder='Enter Your Email-Id' />
            <button type="submit">Save</button>
        </form>
        <Link to = '/dashboard'>Go to DashBoard </Link>
    </div>
  )
}
