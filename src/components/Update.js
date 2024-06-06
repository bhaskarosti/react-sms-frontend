import React, { useState, useEffect } from 'react'
import { Toaster, toast } from 'sonner'
import axios from "axios";
const Update = () => {

  const [details, setDetails] = useState([]);
  const [Class, setClass] = useState('');
  const [classes, setClasses] = useState([]);
  const [rollnos, setRollnos] = useState([]);
  const [Roll, setRoll] = useState('');
  const [isData, setData] = useState(false);

  const [image, setImage] = useState("");
  const [isImage, setFlag] = useState(false);
  const [changeImage, setChange] = useState(false);

  function handleImage(e) {
    if (e.target.files.length !== 0) {

      setImage(e.target.files[0])
      setFlag(true)
    } else {
      setImage('')
      setFlag(false)
    }

  }
  const uploadProduct = async () => {
    // console.log(image);
    let stdid = details.class + details.rollno;
    let stdFee = parseFloat(details.fee);
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('firstName', details.firstName);
    formData.append('lastName', details.lastName);
    formData.append('sid', stdid);
    formData.append('guardian', details.guardian);
    formData.append('email', details.email);
    formData.append('rollno', details.rollno);
    formData.append('contact', details.contact);
    formData.append('gender', details.gender);
    formData.append('address', details.address);
    formData.append('class', details.class);
    formData.append('fee', stdFee);

    // formData.append('description',txtdescription);
    formData.append('image', image);
    const response = await axios.post("http://127.0.0.1:8000/api/studentsupdate/" + details.class + Roll, formData, {
      headers: { 'Content-Type': "multipart/form-data" },
    });

    // alert("Data Updated Successfully")
    if (response) {
      console.log(response)
    }

  }

  const handleSubmit = async (e) => {
    if (details.firstName !== '' && details.lastName !== '' && details.guardian !== '' && details.email !== '' && details.rollno !== '' && details.contact !== '' && details.gender !== '' && details.address !== '' && details.Class !== '' && details.fee !== '') {
      if (!isNaN(details.fee)) {
        toast.loading('Updating Student....');

        await uploadProduct();

        // alert("Data Successfully updated")
        toast.success('Student data has been updated')

        setData(false)
        console.log("Form handled");
        toast.dismiss()
      }
      else {
        toast.error("Remaining fee should be a number!!")
        toast.dismiss()
      }
    }
    else {
      toast.error("Fields cannot be empty")
    }

  }

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
    toast.loading('Fetching student records....');
    axios.get('http://127.0.0.1:8000/api/student/' + Class + Roll).then(function (response) {
      console.log(response);
      if (!response.data.message) {
        setDetails(response.data.student);
        setData(true)
        toast.dismiss()
        setChange(false)
      }
      else {
        setData(false)
      }
    });
  }
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDetails(values => ({ ...values, [name]: value }));
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

            <Toaster position="top-center" richColors />
            {isData &&
              <div>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Please update information on the respective fields.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="col-span-full">
                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                          Student's photo
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          {details.image === 'Default1.jpg' || changeImage ?
                            <div className="text-center">

                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-12 w-12 text-gray-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                              </svg>

                              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Upload a photo</span>
                                  <input id="file-upload" name="file-upload" type="file"
                                    onChange={(e) => handleImage(e)} className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs leading-5 text-gray-600">PNG, JPG</p>
                            </div>
                            :
                            <div>
                              <button onClick={() => {

                                setImage('');
                                setChange(true);
                              }}>

                                <img className="rounded-full hover:border-4 hover:border-white  w-52 object-cover h-52 m-auto max-w-full "
                                  src={`http://127.0.0.1:8000/storage/${details.image}`}
                                  alt="" />
                              </button>
                              <p className='bg-gray-100 text-indigo-800 rounded-lg  px-4 py-1'>Click on the image to change</p>


                            </div>

                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  {isImage && <span className='italic'>Image uploaded : {image.name}</span>}
                  <div className="border-b border-gray-900/10 pb-12">

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                          First name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="firstName"
                            id="first-name"
                            value={details.firstName}
                            onChange={handleChange}
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 pl-2 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                          Last name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="lastName"
                            id="last-name"
                            value={details.lastName}
                            onChange={handleChange}
                            autoComplete="family-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 pl-2 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="guardian" className="block text-sm font-medium leading-6 text-gray-900">
                          Guardian's name
                        </label>
                        <div className="mt-2">
                          <input
                            id="guardian"
                            name="guardian"
                            value={details.guardian}
                            type="text"
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 pl-2 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={details.email}
                            onChange={handleChange}
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 pl-2 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label htmlFor="rollno" className="block text-sm font-medium leading-6 text-gray-900">
                          Roll no
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="rollno"
                            id="rollno"
                            value={details.rollno}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 pl-2 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="contact" className="block text-sm font-medium leading-6 text-gray-900">
                          Contact
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="contact"
                            value={details.contact}
                            id="contact"
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 pl-2 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                          Gender
                        </label>
                        <div className="mt-2">
                          <select
                            id="gender"
                            name="gender"
                            value={details.gender}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 pl-2 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option disabled selected>Select gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                          Address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="address"
                            value={details.address}
                            onChange={handleChange}
                            id="address"

                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 pl-2 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label htmlFor="class" className="block text-sm font-medium leading-6 text-gray-900">
                          Class
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="class"
                            id="class"
                            value={details.class}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 pl-2 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div><br></br>
                      <div className="sm:col-span-3">
                        <label htmlFor="fee" className="block text-sm font-medium leading-6 text-gray-900">
                          Remaining fee
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="fee"
                            id="fee"
                            value={details.fee}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 pl-2 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                <div className="mt-6 flex items-center justify-start gap-x-6 mb-6">
                  <button
                    onClick={handleSubmit}
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Update
                  </button>
                  <button type="button" onClick={() => setData(false)} className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                    Cancel
                  </button>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>
  )
}


export default Update