import { Navigate, Route, Routes } from 'react-router-dom';
import LayoutAuth from '../layout/layoutAuth';

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="/auth" element={ <LayoutAuth /> } />
        <Route path='/*' element={ <Navigate to="/auth" /> } />
    </Routes>
  )
}
