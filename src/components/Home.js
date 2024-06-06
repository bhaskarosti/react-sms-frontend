import React, { useState, useEffect } from 'react'
import CountUp from 'react-countup';

const Home = () => {
  const [nos, setNos] = useState('');
  const [cFee, setFee] = useState('');
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    const getStats = () => {
      fetch("http://127.0.0.1:8000/api/dashboard")
        .then(res => { return res.json() })
        .then(response => {
          // console.log(response.stats[0]['nos'])
          // let test=parseFloat(response.stats[0]['rf'])
          setNos(response.stats[0]['nos'])
          setFee(response.stats[0]['rf'])
        })
        .catch(error => { console.log(error) });
      fetch("http://127.0.0.1:8000/api/classes")
        .then(res => { return res.json() })
        .then(response => {
          // console.log(response.classes)
          setClasses(response.classes)
          // console.log(classes.some(element => {
          //   return element.class !== ''
          // }));
        })
        .catch(error => { console.log(error) });
      }
      getStats();
      // setNoc(classes.length)
  }, []);
  return (

    <div className="contents bg-gray-200">
      <div className="bg-white">
        <div className="py-12 px-4 max-w-7xl m-auto sm:pl-6  sm:pr-6 lg:pl-8 lg:pr-8">
          <div>
            <h3 className="text-gray-900 font-semibold">System Overview</h3>
            {/* {stats.some(element => {
              return element.rf !== '';
            }) && */}
              <div className="grid-cols-1 grid-rows-[6.75rem] grid mt-5 gap-5 sm:grid-cols-3">
                <div className="bg-gray-100 hover:bg-gray-200 py-5 px-4 rounded-lg overflow-hidden sm:p-6">
                  <div className="text-gray-500 text-sm font-medium text-ellipsis overflow-hidden">Total No. of Students</div>
                  <div className="text-gray-900 text-3xl font-semibold mt-1"><CountUp end={nos} duration={0.4}/></div>
                </div>
                <div className="bg-gray-100 hover:bg-gray-200 py-5 px-4 rounded-lg overflow-hidden sm:p-6">
                  <div className="text-gray-500 text-sm font-medium text-ellipsis overflow-hidden">No. of Classes</div>
                  <div className="text-gray-900 text-3xl font-semibold mt-1"> <CountUp end={classes.length} duration={0.4} /></div>
                </div>
                <div className="bg-gray-100 hover:bg-gray-200 py-5 px-4 rounded-lg overflow-hidden sm:p-6">
                  <div className="text-gray-500 text-sm font-medium text-ellipsis overflow-hidden">Total Fee Collectable</div>
                  <div className="text-gray-900 text-3xl font-semibold mt-1">Rs. <CountUp end={cFee} duration={0.4} /> </div>
                </div>
              </div>
            
          </div>
        </div>
      </div>
    </div>

  )
}

export default Home