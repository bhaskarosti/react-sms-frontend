import React, { useState ,useEffect} from 'react'
import { Toaster, toast } from 'sonner'


const Classwise = () => {
    const [student, setStudent] = useState([]);
    const [classes, setClasses] = useState([]);
    const [Class, setClass] = useState('');
    const [values, setValue] = useState(false);

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

    const getStudent = () => {
        toast.loading('Fetching student records....');
        fetch("http://127.0.0.1:8000/api/students/" + Class)
            .then(res => { return res.json() })
            .then(response => {
                console.log(response.students)
                setStudent(response.students)
                setValue(true)
                toast.dismiss()
            })
            .catch(error => { console.log(error) });
    }

    return (
        <div className="contents bg-gray-200">
            <div className="bg-white pb-10">
                <div className="max-w-7xl m-auto">
                    <div className="px-4 sm:pl-6  sm:pr-6 lg:pl-8 lg:pr-8">
                        <div className="sm:flex  sm:items-center">
                            <div className="flex-grow">
                                <p className="text-gray-700  text-sm">Select a class to list students.</p>

                            </div>
                        </div>
                                <Toaster position="top-center" richColors />

                        <div className="mt-4">
                            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                                <select
                                    id="gender"
                                    name="gender"
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

                                <button
                                    className="relative z-[2] flex items-center  bg-indigo-500 px-6 ml-2 py-2.5 text-xs font-medium uppercase leading-tight rounded-sm text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg"
                                    type="button"
                                    id="button-addon1"
                                    data-te-ripple-init
                                    onClick={getStudent}
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
                        {values &&
                            <div className="flow-root mt-8">
                                <div className="-mt-2 -mr-4 -mb-2 -ml-4 overflow-x-auto sm:-ml-6  sm:-mr-6 lg:-ml-8 lg:-mr-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:pl-6  sm:pr-6 lg:pl-8 lg:pr-8">
                                        <table className="border-collapse table min-w-full">
                                            <thead className="table-header-group">
                                                <tr className="table-row">
                                                    <th className="text-gray-900 text-sm font-semibold py-3.5 pl-4 pr-3 table-cell sm:pl-0">Full name</th>
                                                    <th className="text-gray-900 text-sm font-semibold py-3.5 px-3 table-cell">Guardian's name</th>
                                                    <th className="text-gray-900 text-sm font-semibold py-3.5 px-3 table-cell">Email address</th>
                                                    <th className="text-gray-900 text-sm font-semibold py-3.5 px-3 table-cell">Roll no</th>
                                                    <th className="text-gray-900 text-sm font-semibold py-3.5 px-3 table-cell">Contact</th>
                                                    <th className="text-gray-900 text-sm font-semibold py-3.5 px-3 table-cell">Gender</th>
                                                    <th className="text-gray-900 text-sm font-semibold py-3.5 px-3 table-cell">Address</th>
                                                    <th className="text-gray-900 text-sm font-semibold py-3.5 px-3 table-cell">Ramaining fee</th>
                                                    <th className="font-bold py-3.5 pl-3 pr-4 relative text-center table-cell sm:pr-0">
                                                        <span className="bottom-[1.63rem] left-[2.75rem] absolute right-[2.00rem] top-[1.50rem] w-0 h-0 overflow-hidden -m-0">Edit</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="border-t-2 text-center table-row-group border-gray-300 border-solid text-sm">

                                                {
                                                    student.map((sdata, index) => (
                                                        <tr key={index} className="border-t-2 table-row border-gray-200 border-solid">
                                                            <td className="text-gray-900 capitalize font-medium py-4 pl-4 pr-3 table-cell sm:pl-0">{sdata.firstName} {sdata.lastName}</td>
                                                            <td className="text-gray-500 capitalize py-4 px-3 table-cell">{sdata.guardian}</td>
                                                            <td className="text-gray-500 capitalize py-4 px-3 table-cell">{sdata.email}</td>
                                                            <td className="text-gray-500 capitalize py-4 px-3 table-cell">{sdata.rollno}</td>
                                                            <td className="text-gray-500 capitalize py-4 px-3 table-cell">{sdata.contact}</td>
                                                            <td className="text-gray-500 capitalize py-4 px-3 table-cell">{sdata.gender}</td>
                                                            <td className="text-gray-500 capitalize py-4 px-3 table-cell">{sdata.address}</td>
                                                            <td className="text-gray-500 capitalize py-4 px-3 table-cell">{sdata.fee}</td>
                                                            {/* <td className="font-medium py-4 pl-3 pr-4 relative text-right table-cell text-indigo-600 sm:pr-0">
                                                            <a href="#">
                                                                Edit
                                                            </a>
                                                        </td> */}
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Classwise