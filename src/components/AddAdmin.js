import React, { useState ,useContext} from 'react'

import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext';

import axios from "axios";
const AddAdmin = () => {
  const {setAuth}=useContext(LoginContext);

  const navigateTo=useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [invalid, setInvalid] = useState(false);


  const loginSubmit = async()=>{
    // const navigateTo=useNavigate();
    if(username!=='' && password!==''){
      const formData= new FormData();
        formData.append('username', username);
        formData.append('password', password);
        const response= await axios.post("http://127.0.0.1:8000/api/adduser", formData, {
            headers:{'Content-Type':"multipart/form-data"},
        } );
        if(response.data.message==="Error")
        {
          setInvalid(true)
            console.log(response.data.message)
        }
        else{
          setAuth(true);
        navigateTo('/');
        }
      // setAuth(true);
      // navigateTo('/');
    }
    else{
      setError(true)
    }

    // <Navigate to='/login'/>
    
  }
  const handleInput = (e, type) => {
    switch (type) {
      case "user":
        setError(false);
        setInvalid(false)
        setUsername(e.target.value);
        if (e.target.value === "") {
          setError(true)
        }
        break;
      case "pass":
        setError(false);
        setPassword(e.target.value);
        if (e.target.value === "") {
          setError(true)
        }
        break;
      default:
    }
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Student Management System
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
             {error && <span className='text-red-700'>Username or password cannot be empty</span>}
             {invalid && <span className='text-red-700'>Invalid username or password</span>}
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  // value={username}
                  autoComplete="email"
                  onChange={(e) => handleInput(e, "user")}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
               
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => handleInput(e, "pass")}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  // required
                />
              </div>
            </div>

            <div>
              <button
                onClick={loginSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </div>

      
        </div>
      </div>
  )
}

export default AddAdmin