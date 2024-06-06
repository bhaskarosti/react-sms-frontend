import React, { useState, useEffect } from 'react'
import { Toaster, toast } from 'sonner'

import axios from "axios";
const Search = () => {
  const [details, setDetails] = useState([]);
  const [Class, setClass] = useState('');
  const [classes, setClasses] = useState([]);
  const [rollnos, setRollnos] = useState([]);
  const [Roll, setRoll] = useState('');
  const [isData, setFlag] = useState(false);

  useEffect(() => {
    const getClasses = () => {
      fetch("http://127.0.0.1:8000/api/classes")
        .then(res => { return res.json() })
        .then(response => {
          console.log(response.classes)
          setClasses(response.classes)
        })
        .catch(error => { console.log(error) });
    }
    getClasses();
  }, []);
  function getRollnos(e) {
    // setRoll(e.target.value)
    fetch("http://127.0.0.1:8000/api/rollnos/" + Class)
      .then(res => { return res.json() })
      .then(response => {
        // console.log(response.rollnos)
        setRollnos(response.rollnos)
      })
      .catch(error => { console.log(error) });

  }

  function getStudent() {
    toast.loading('Fetching Student Details....');

    axios.get('http://127.0.0.1:8000/api/student/' + Class + Roll).then(function (response) {
      console.log(response);
      if (!response.data.message) {
        setDetails(response.data.student);
        setFlag(true)
      }
      else {
        setFlag(false)
      }
      toast.dismiss()
    });
  }
  return (
    <div className="contents bg-gray-200">
      <div className="bg-white pb-10">
        <div className="max-w-7xl m-auto">
          <div className="px-4 sm:pl-6  sm:pr-6 lg:pl-8 lg:pr-8">
            <div className="sm:flex  sm:items-center">
              <div className="flex-grow">
                <p className="text-gray-700  text-sm">Select class and roll no of the student to display details.</p>
              </div>
            </div>
            <Toaster position="top-center" richColors />

            <div className="mt-4">
              <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <select
                  id="Class"
                  name="Class"
                  onChange={(e) => setClass(e.target.value)}
                  className="block px-2 w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option disabled selected>Select class</option>
                  {
                    classes.map((cdata) => (
                      <option className='uppercase'>{cdata.class}</option>
                    ))
                  }
                </select>
                <select
                  id="rollno"
                  name="rollno"
                  onClick={(e) => getRollnos(e)}
                  onChange={(e) => setRoll(e.target.value)}
                  className="block px-2 ml-2 w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option disabled selected>Select roll no</option>
                  {
                    rollnos.map((cdata) => (
                      <option className='uppercase'>{cdata.rollno}</option>
                    ))
                  }
                </select>

                <button
                  className="relative z-[2] flex items-center  bg-indigo-500 px-6 ml-2 py-2.5 text-xs font-medium uppercase leading-tight rounded-sm text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg"
                  type="button"
                  id="button-addon1"
                  onClick={getStudent}
                  data-te-ripple-init
                  data-te-ripple-color="light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5">
                    <path
                      fill-rule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            {isData &&
              <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Student's information
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Details and informations about student.
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    {
                      details.image === "Default1.jpg" ?
                        <img class="rounded-full w-52 object-cover h-52 m-auto max-w-full "
                          src="http://127.0.0.1:8000/storage/user.png"
                          alt="" /> 
                    

                        :
                        <img class="rounded-full w-52 object-cover h-52 m-auto max-w-full "
                          src={`http://127.0.0.1:8000/storage/${details.image}`}
                          alt="" />
                    }
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Full name
                      </dt>
                      <dd className="mt-1 capitalize text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {details.firstName} {details.lastName}
                      </dd>
                    </div>

                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Guardian's name
                      </dt>
                      <dd className="mt-1 text-sm capitalize text-gray-900 sm:mt-0 sm:col-span-2">
                        {details.guardian}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {details.email}
                      </dd>
                    </div>

                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Rollno
                      </dt>
                      <dd className="mt-1 text-sm capitalize text-gray-900 sm:mt-0 sm:col-span-2">
                        {details.rollno}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Contact
                      </dt>
                      <dd className="mt-1  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {details.contact}
                      </dd>
                    </div>

                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Gender
                      </dt>
                      <dd className="mt-1 text-sm capitalize text-gray-900 sm:mt-0 sm:col-span-2">
                        {details.gender}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Address
                      </dt>
                      <dd className="mt-1  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {details.address}
                      </dd>
                    </div>

                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Remaining fee
                      </dt>
                      <dd className="mt-1 text-sm capitalize text-gray-900 sm:mt-0 sm:col-span-2">
                        {details.fee}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>

  )
}

export default Search