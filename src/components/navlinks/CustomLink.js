import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const CustomLink = ({ to, children, ...props }) => {
    // const path = window.location.pathname;
    const resolvedPath=useResolvedPath(to);
    const isActive=useMatch({path:resolvedPath.pathname,end:true})
    return isActive ? (
        <li className="list-item  text-indigo-700 ">
            <Link className="bg-gray-100 hover:bg-gray-200  gap-x-3 flex rounded-md p-2" to={to} {...props}>
                {children}
            </Link>
        </li>
    ) : (
        <li className="list-item text-gray-800">
            <Link className="gap-x-3  hover:bg-gray-100 flex rounded-md p-2" to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default CustomLink