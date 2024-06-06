import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Home from './components/Home';
import Search from './components/Search';
import PrivateRoutes from './models/PrivateRoutes';
import Login from './components/Login';
import RootLayout from './layouts/RootLayout';
import Add from './components/Add';
import Classwise from './components/Classwise';
import Update from './components/Update';
import Delete from './components/Delete';
import Change from './components/Change';
import AddAdmin from './components/AddAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={

          <PrivateRoutes />
        }>
          <Route path='/' element={<RootLayout />} >

            <Route index element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/add' element={<Add />} />
            <Route path='/classwise' element={<Classwise />} />
            <Route path='/update' element={<Update />} />
            <Route path='/delete' element={<Delete />} />
            <Route path='/change' element={<Change />} />
          </Route>
        </Route>
        <Route path='/login' element={<Login />} />
        {/* <Route path='/login' element={<LoginContext.Provider value={{ setAuth }}>
          <Login />
        </LoginContext.Provider>} /> */}
        {/* <Route path='/addadmin' element={<LoginContext.Provider value={{ setAuth }}>
          <AddAdmin/>
        </LoginContext.Provider>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
