import { useEffect, useState } from "react"
import { useNavigate,Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { deleteRecipe } from "../store/recipes/recipeSlice";
import Navbar from "./components/Navbar";
import Swal from 'sweetalert2'
import Footer from "./components/Footer";

const RecipeBook=() =>{
    const [savedRecipes, setSavedRecipes] = useState([])
    const myRecipes = useSelector(state => state.recipe);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        loadSavedRecipes()
        if(localStorage.getItem('myRecipes') !==[])
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
        <>
            <Navbar />
            <div>
                <h2 className="text-xl font-bold text-center capitalize" >My recipe book</h2>
                <div className="flex ml-6 md:justify-end md:mr-8">
                    <button className="btn btn-sm" onClick={()=>{ navigate('/createRecipe')} }>Agregar nueva receta</button>
                </div>
                <div className="overflow-x-auto w-full">
                    <h4 className="text-lg my-4 ml-4">Mis propias recetas</h4>
                    <table className="table w-full ">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Recipe Name</th>
                                <th>Author</th>
                                <th>Meal</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        { myRecipes !=="[]" &&
                            <>
                            {myRecipes?.map( (recipe,index) => (
                            <tr key={index}  className="hover">
                                <td>{index+1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={recipe.image} alt="recipe" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{recipe.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td> {recipe.author}</td>
                                <td>{recipe.mealType}</td>
                                <td><Link to={`/details/${recipe.id}`}>
                                        <button className="btn btn-ghost btn-xs">More Details</button>
                                    </Link>
                                </td>
                                <td><button  className="btn btn-ghost" onClick={() => handleDeleteMY(recipe.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red">
                                        <path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                            ))}
                            </>
                        }
                        </tbody>
                    </table>
                </div>
                <div className="overflow-x-auto w-full "> 
                    <h4 className="text-lg my-4 ml-4">Mis recetas guardadas</h4>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Recipe Name</th>
                                <th>Author</th>
                                <th>Meal</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {savedRecipes?.map( (recipe,index) => (
                            <tr key={index}  className="hover">
                                <td>{index+1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={recipe.image} alt="recipe" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{recipe.label}</div>
                                        </div>
                                    </div>
                                </td>
                                <td> {recipe.source}</td>
                                <td>{recipe.mealType}</td>
                                <td><Link to={`/details/${recipe.uri.split("_", 2)[1]}`}>
                                        <button className="btn btn-ghost btn-xs">More Details</button>
                                    </Link>
                                </td>
                                <td><button  className="btn btn-ghost" onClick={() => handleDeleteSR(recipe.label)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red">
                                        <path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" />
                                    </svg>
                                    </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    )

}

export default RecipeBook;