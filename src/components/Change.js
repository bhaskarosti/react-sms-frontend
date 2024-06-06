import React, { useState } from 'react'
import axios from "axios";
import { Toaster, toast } from 'sonner'


const Change = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");

  const handleInput = (e, type) => {
    switch (type) {
      case "user":
        setUsername(e.target.value);
        if (e.target.value === "") {
          toast.warning("Username cannot be empty")

        }
        break;
      case "pass":
        setPassword(e.target.value);
        if (e.target.value === "") {
          toast.warning("Password cannot be empty")
        }
        break;
      case "new":

        setnewPassword(e.target.value);
        if (e.target.value === "") {
          toast.warning("New password field cannot be empty")
        }
        break;
      case "conf":
        setconfirmPassword(e.target.value);
        if (e.target.value === "") {
          toast.warning("Field cannot be empty")
        }
        break;
      default:
    }
  }
  const handleSubmit = async () => {
    // const navigateTo=useNavigate();
    if (username !== '' && password !== '' && newpassword !== '' && confirmpassword !== '') {
      if (newpassword === confirmpassword) {

        toast.loading('Changing Password....');

        const formData = new FormData();
        formData.append('_method', 'PUT');

        formData.append('username', username);
        formData.append('password', password);
        formData.append('newpassword', newpassword);
        const response = await axios.post("http://127.0.0.1:8000/api/changeusers/1", formData, {
          headers: { 'Content-Type': "multipart/form-data" },
        });
        if (response.data.message === "Error") {
          toast.dismiss()
          toast.error("Invalid username or password")

          console.log(response.data.message)
        }else if(response.data.message === "Success"){
          // alert("Password Changed successfully")
          toast.success('Password changed succesfully')

          toast.dismiss()
        }else{
          toast.dismiss()
          console.log(response.data)
        }


        // else {
        //   const newformData = new FormData();
        //   newformData.append('_method', 'PUT');
        
        //   newformData.append('newpassword', newpassword);
        //   console.log("password"+newpassword);
        //   const newresponse = await axios.post("http://127.0.0.1:8000/api/changeusers/1", newformData, {
        //     headers: { 'Content-Type': "multipart/form-data" },
        //   });
        //   if (newresponse.data.message === "Error") {
        //     setWrong(true)
        //     console.log(newresponse.data)
        //   }
        //   else {
        //     alert('Password changed successfully')
        //   }
        // }

      }
      else {
        toast.error("New password doesnot match with confirm")
      }
      // setAuth(true);
      // navigateTo('/');
    }
    else {
      toast.error("Username or password cannot be empty")
    }
  }

  return (
    <div>
      <div className="contents bg-gray-200">
      <div className="bg-white pb-10">
        <div className="max-w-7xl m-auto">
          <div className="px-4 sm:pl-6  sm:pr-6 lg:pl-8 lg:pr-8">
      <div className="space-y-4">
        <div className="border-b border-gray-900/10 pb-4">
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Please enter information on the respective fields.
          </p>

        </div>
        <Toaster position="top-center" richColors />

        <div className="border-b border-gray-900/10 pb-2">
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-4">
              <label htmlFor="guardian" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="user"
                  name="guardian"
                  onChange={(e) => handleInput(e, "user")}
                  type="text"
                  placeholder='Enter username'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 pl-2 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="guardian" className="block text-sm font-medium leading-6 text-gray-900">
                Current password
              </label>
              <div className="mt-2">
                <input
                  id="pass"
                  name="guardian"
                  onChange={(e) => handleInput(e, "pass")}
                  type="password"
                  placeholder='Enter your current password'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 pl-2 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="guardian" className="block text-sm font-medium leading-6 text-gray-900">
                New password
              </label>
              <div className="mt-2">
                <input
                  id="newpass"
                  name="guardian"
                  type="password"
                  onChange={(e) => handleInput(e, "new")}
                  placeholder='Enter a new password'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 pl-2 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="guardian" className="block text-sm font-medium leading-6 text-gray-900">
                Re-enter new password
              </label>
              <div className="mt-2">
                <input
                  id="repass"
                  name="guardian"
                  type="password"
                  onChange={(e) => handleInput(e, "conf")}
                  placeholder='Re-enter the new password'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 pl-2 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


          </div>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-start gap-x-6 mb-6">
        {/* <button
          type="submit"
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
          </svg><span>Change password</span>
        </button> */}
        <button onClick={handleSubmit} class=" px-6 py-3  text-white bg-indigo-500 hover:bg-indigo-400 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
          </svg>

          <span>Change password</span>
        </button>
        {/* <button type="button" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
            Cancel
        </button> */}
      </div>
    </div>
      </div>
    </div>
      </div>
    </div>
  )
}

export default Change