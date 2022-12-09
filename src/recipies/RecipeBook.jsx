import { Navigate } from "react-router-dom"

const RecipeBook=() =>{
    return(
        <div>
            <h2>Recetario</h2>
            <button onclick={<Navigate to="/createRecipe" /> }>Agregar nueva receta</button>
            <div>
                <h4>Mis propias recetas</h4>
            </div>
            <div>
                <h4>Mis recetas guardadas</h4>
            </div>
        </div>
    )

}

export default RecipeBook;