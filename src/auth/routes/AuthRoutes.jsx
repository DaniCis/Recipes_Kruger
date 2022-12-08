import { Navigate, Route, Routes } from 'react-router-dom';
import LayoutAuth from '../layout/layoutAuth';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="/auth" element={ <LayoutAuth /> } />
        {/* <Route path="/register" element={ <RegisterPage /> } /> */}
        <Route path='/*' element={ <Navigate to="/auth" /> } />
    </Routes>
  )
}
