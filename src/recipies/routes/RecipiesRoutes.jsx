import { Navigate, Route, Routes } from "react-router-dom"
import Recipies from "../Recipies"



export const RecipiesRoutes = () => {
  return (
    <Routes>
        <Route path="/home" element={ <Recipies /> } />
        <Route path="/*" element={ <Navigate to="/home" /> } />
    </Routes>
  )
}
