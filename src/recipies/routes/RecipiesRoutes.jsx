import { Navigate, Route, Routes } from "react-router-dom"
import Recipies from "../Recipies"
import RecipeBook from "../RecipeBook"
import DetailsRecipies from "../components/DetailRecipes"

export const RecipiesRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={ <Recipies /> } />
      <Route path="/recipeBook" element={ <RecipeBook />} />
      <Route path="details/:id" element={ <DetailsRecipies /> } />
      <Route path="/*" element={ <Navigate to="/home" /> } />
    </Routes>
  )
}
