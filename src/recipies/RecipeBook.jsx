import { useEffect, useState } from "react"
import { useNavigate,Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { deleteRecipe } from "../store/recipes/recipeSlice";
import Swal from 'sweetalert2'

const RecipeBook=() =>{
    const [savedRecipes, setSavedRecipes] = useState([])
    const myRecipes = useSelector(state => state.recipe);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        loadSavedRecipes()
        if(localStorage.getItem('myRecipes') !=="[]")
            localStorage.setItem('myRecipes',JSON.stringify(myRecipes))
    },[myRecipes])

    const loadSavedRecipes = () =>{
        const recipes = JSON.parse(localStorage.getItem('savedRecipes'))
        if(recipes)
            setSavedRecipes(recipes)
    }

    const handleDeleteMY = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteRecipe(id))
                Swal.fire(
                    'Deleted!',
                    'The recipe has been deleted.',
                    'success',
                )
            }
        })
    }

    const handleDeleteSR = (recipeName) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                let newRecipes = []
                const temp = savedRecipes.filter((recipe) => recipe.label !== recipeName);
			    newRecipes= JSON.stringify(temp);
			    localStorage.setItem("savedRecipes", newRecipes);
                Swal.fire(
                    'Deleted!',
                    'The recipe has been deleted.',
                    'success',
                )
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        })
    }

    return(
        <div>
            <Link to='/'>
                <button>Regresar</button>
            </Link>
            <h2>Recetario</h2>
            <button onClick={()=>{ navigate('/createRecipe')} }>Agregar nueva receta</button>
            <div>
                <h4>Mis propias recetas</h4>
                { myRecipes !=="[]" &&
                    <ol>
                        {myRecipes?.map( (recipe,index) => (
                        <li key={index}>
                            <p>{recipe.title}</p>
                            <p>Author: {recipe.author}</p>
                            <p>{recipe.servings} servings</p>
                            <Link to={`/details/${recipe.id}`}>
                                <button>More Details</button>
                            </Link>
                            <button onClick={() => handleDeleteMY(recipe.id)}>Delete</button>
                        </li> 
                        ))}
                    </ol>
                }
            </div>
            <div>
                <h4>Mis recetas guardadas</h4>
                <ol>
                {savedRecipes?.map( (recipe,index) => (
                    <li key={index}>
                        <p>{recipe.label}</p>
                        <p>Source: {recipe.source}</p>
                        <p>{recipe.yield} servings</p>
                        <Link to={`/details/${recipe.uri.split("_", 2)[1]}`}>
                            <button>More Details</button>
                        </Link>
                        <button onClick={() => handleDeleteSR(recipe.label)}>Delete</button>
                    </li> 
                    ))}
                </ol>
            </div>
        </div>
    )

}

export default RecipeBook;