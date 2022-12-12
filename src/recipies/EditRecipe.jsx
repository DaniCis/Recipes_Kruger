import { useDispatch} from 'react-redux'
import { editRecipe } from "../store/recipes/recipeSlice";
import { useNavigate,useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import Navbar from './components/Navbar';
import Footer from './components/Footer'

const EditRecipe = () =>{

    const [id,setId] = useState("")
    const [title,setTitle] = useState("")
    const [author,setAuthor] = useState("")
    const [servings,setServings] = useState(0)
    const [calories,setCalories] = useState(0)
    const [cuisineType,setCuisineType] = useState("")
    const [mealType,setMealType] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [image,setImage] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    useEffect( () => {
        const temp = JSON.parse(localStorage.getItem('myRecipes'))
		const recipe = temp.find(recipe => recipe.id === params.id)
        if(recipe){
            setId(recipe.id)
            setTitle(recipe.title)
            setAuthor(recipe.author)
            setCalories(recipe.calories)
            setIngredients(recipe.ingredients.toString())
            setCuisineType(recipe.cuisineType)
            setMealType(recipe.mealType)
            setImage(recipe.image)
            setServings(recipe.servings)
        }
    },[params.id])

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        switch(name){
            case 'title':
                setTitle(value)
                break
            case 'author':
                setAuthor(value)
                break
            case 'ingredients':
                setIngredients(value)
                    break
            case 'servings':
                setServings(value)
                break
            case 'cuisineType':
                setCuisineType(value)
                break 
            case 'mealType':
                setMealType(value)
                break 
            case 'calories':
                setCalories(value)
                break 
            default:
        }
    }

    const handleChangeFile = (e) =>{
        const element = e.target
        const file = element.files[0]
        const reader = new FileReader()     
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImage(reader.result.toString())
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const recipe = {
            id,
            title,
            author,
            servings,
            ingredients:ingredients.split(','),
            calories,
            cuisineType,
            mealType,
            image,
        }
        dispatch(editRecipe(recipe))
        Swal.fire({
            title:'Good job!',
            icon:'success',
            text:'Recipe update successfully'
        }).then((result) => {
            if (result.isConfirmed) 
                navigate("/recipeBook")
        })
    }

    return(
        <>
            <Navbar />
            <div className="pt-8 pb-2 h-auto mt-4 mb-16">
                <form onSubmit={handleSubmit} className=" card bg-white border border-gray-300 shadow-lg mx-6 sm:mx-12 md:mx-24 lg:mx-42 xl:mx-60 mb-8">
                    <h3 className='md:text-2xl text-xl capitalize leading-7 font-bold text-center text-gray-700 mt-4'>Edit Recipe</h3>
                    <div className="card md:card-side ">
                        <div className='sm:w-1/2 mx-12 xl:ml-24 mt-6 md:mb-6'>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text font-semibold">Title</span>
                                </label>
                                <input type="text" name="title" className="input input-bordered input-sm w-full max-w-xs bg-gray-100" 
                                onChange={handleChange} value={title} required />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text font-semibold">Author</span>
                                </label>
                                <input type="text" name="author" className="input input-bordered input-sm w-full max-w-xs bg-gray-100" onChange={handleChange} value={author} required />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text font-semibold">Cuisine Type</span>
                                </label>
                                <input type="text" name="cuisineType" className="input input-bordered input-sm w-full max-w-xs bg-gray-100"
                                onChange={handleChange} value={cuisineType} required />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text font-semibold">Meal Type</span>
                                </label>
                                <input type="text" name="mealType" className="input input-bordered input-sm w-full max-w-xs bg-gray-100"
                                onChange={handleChange} value={mealType} required />
                            </div> 
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text font-semibold">List of Ingredients</span>
                                </label>
                                <textarea name="ingredients" className="textarea textarea-bordered bg-gray-100"
                                onChange={handleChange} value={ingredients} required />
                            </div>          
                        </div>
                        <div className='sm:w-1/2 mx-12 xl:mr-24 mb-6 md:mt-6'>
                            <div className='md:flex md:flex-row'>
                                <div className="form-control w-5/12 max-w-xs md:mr-8">
                                    <label className="label">
                                        <span className="label-text font-semibold">Servings</span>
                                    </label>
                                    <input type="number" name="servings" className="input input-bordered input-sm w-full max-w-xs bg-gray-100"
                                    onChange={handleChange} value={servings} min={1} required />
                                </div>
                                <div className="form-control w-5/12 max-w-xs">
                                    <label className="label">
                                        <span className="label-text font-semibold">Calories</span>
                                    </label>
                                    <input type="number" name="calories" className="input input-bordered input-sm w-full max-w-xs bg-gray-100"
                                    onChange={handleChange} value={calories} min={1} required/>
                                </div>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text font-semibold">Image</span>
                                </label>
                                <input type="file" name="image" className="file-input file-input-bordered file-input-success file-input-sm w-full max-w-xs bg-gray-100"
                                onChange={handleChangeFile} required={!image} />
                                <div className="mt-5 flex justify-content">
                                    { !!image 
                                        && <img className="w-3/5 h-auto" src={image} alt="preview" />
                                    }
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <button className="btn btn-primary w-32 mt-6" type='submit'>Update</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default EditRecipe;