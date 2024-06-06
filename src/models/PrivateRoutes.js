import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  let login=sessionStorage.getItem(btoa("login"))?sessionStorage.getItem(btoa("login")):btoa('false');
  let isLogin= atob(login)==='true'
  
return (
    isLogin ? <Outlet/> : <Navigate to='/login'/>
  )
}
export default PrivateRoutes