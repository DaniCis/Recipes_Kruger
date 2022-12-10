import { Navigate, Route, Routes } from "react-router-dom"
import Recipies from "../Recipies"
import RecipeBook from "../RecipeBook"
import DetailsRecipies from "../components/DetailRecipes"
import CreateRecipe from "../CreateRecipe"
import EditRecipe from "../EditRecipe"

export const RecipiesRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={ <Recipies /> } />
      <Route path="/recipeBook" element={ <RecipeBook />} />
      <Route path="/details/:id" element={ <DetailsRecipies /> } />
      <Route path="/createRecipe" element={ <CreateRecipe />} />
      <Route path="/editRecipe/:id" element={ <EditRecipe /> } />
      <Route path="/*" element={ <Navigate to="/home" /> } />
    </Routes>
  )
}
