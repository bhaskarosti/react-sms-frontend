import React, { useState } from 'react'
import { Toaster, toast } from 'sonner'

import axios from "axios";

const Add = () => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [guardian, setGuardian] = useState("");
    const [email, setEmail] = useState("");
    const [rollno, setRollno] = useState("");
    const [contact, setContact] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [Class, setClass] = useState("");
    const [fee, setFee] = useState("");
    const [image, setImage] = useState("");
    const [isImage, setFlag] = useState(false);



    function handleImage(e) {
        if (e.target.files.length !== 0) {

            setImage(e.target.files[0])
            setFlag(true)
        } else {
            setImage('')
            setFlag(false)
        }
        console.log(e.target.files.length)
        // console.log(e.target.files[0].webkitRelativePath)
        // console.log(URL.createObjectURL(e.target.files[0]))

    }
    const uploadProduct = async () => {
        // console.log(image);
        let stdid = Class + rollno;
        let stdFee = parseFloat(fee);
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('sid', stdid);
        formData.append('guardian', guardian);
        formData.append('email', email);
        formData.append('rollno', rollno);
        formData.append('contact', contact);
        formData.append('gender', gender);
        formData.append('address', address);
        formData.append('class', Class);
        formData.append('fee', stdFee);

        // formData.append('description',txtdescription);
        formData.append('image', image);
        const response = await axios.post("http://127.0.0.1:8000/api/students", formData, {
            headers: { 'Content-Type': "multipart/form-data" },
        });

        if (response.data.message === 'Error') {
            toast.error("Student with that rollno already exists!!")
            toast.dismiss()
        } else {
            toast.success('Data successfully added!')
            toast.dismiss()
        }
    }

    const handleSubmit = async (e) => {
        if (firstName !== '' && lastName !== '' && guardian !== '' && email !== '' && rollno !== '' && contact !== '' && gender !== '' && address !== '' && Class !== '' && fee !== '') {

            if(!isNaN(fee)){

                toast.loading('Adding Student....');
                await uploadProduct();
                // toast.success('Student has been added')
                // alert("Data Successfully added")
                console.log("Form handled");
                toast.dismiss()
                // window.location.reload(false);
            }
            else{
                toast.error("Remaining fee should be a number!!")
                toast.dismiss()
            }

        }
        else {
            toast.error("Fields cannot be empty")
        }

    }
    return (
        <div className="contents bg-gray-200">
            <div className="bg-white pb-10">
                <div className="max-w-7xl m-auto">
                    <div className="px-4 sm:pl-6  sm:pr-6 lg:pl-8 lg:pr-8">
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Please enter information on the respective fields.
                                </p>
                                <Toaster position="top-center" richColors />

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                            Student's photo
                                        </label>
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                {/* <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> */}
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
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {isImage && <span className='italic'> Image uploaded : {image.name}</span>}
                            <div className="border-b border-gray-900/10 pb-12">

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            First name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                onChange={(e) => setfirstName(e.target.value)}
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
                                                name="last-name"
                                                id="last-name"
                                                onChange={(e) => setlastName(e.target.value)}
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
                                                type="text"
                                                onChange={(e) => setGuardian(e.target.value)}
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
                                                onChange={(e) => setEmail(e.target.value)}
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
                                                onChange={(e) => setRollno(e.target.value)}
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
                                                id="contact"
                                                onChange={(e) => setContact(e.target.value)}
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
                                                onChange={(e) => setGender(e.target.value)}
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
                                                onChange={(e) => setAddress(e.target.value)}
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
                                                onChange={(e) => setClass(e.target.value)}
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
                                                onChange={(e) => setFee(e.target.value)}
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
                                Submit
                            </button>
                            <button type="button" className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                            onClick={() => window.location.reload(false)}>
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Add