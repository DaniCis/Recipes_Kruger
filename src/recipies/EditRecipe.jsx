import { useDispatch} from 'react-redux'
import { editRecipe } from "../store/recipes/recipeSlice";
import { useNavigate,useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";

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
            setIngredients(recipe.ingredients)
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
            ingredients,
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
        <form onSubmit={handleSubmit}>
        <h3>Edit Recipe</h3>
        <div>
            <label>Title</label>
            <input type="text" name="title" onChange={handleChange} value={title} required />
        </div>
        <div>
            <label>Author</label>
            <input type="text" name="author" onChange={handleChange} value={author} required />
        </div>
        <div>
            <label>Serving</label>
            <input type="number" name="servings" min={1} onChange={handleChange} value={servings} required />
        </div>
        <div>
            <label>Cuisine Type</label>
            <input type="text" name="cuisineType" onChange={handleChange} value={cuisineType} required />
        </div>
        <div>
            <label>Meal Type</label>
            <input type="text" name="mealType" onChange={handleChange} value={mealType} required />
        </div>
        <div>
            <label>Total Calories</label>
            <input type="number" name="calories" min={1} onChange={handleChange} value={calories}  required/>
        </div>
        <div>
            <label>Ingredients</label>
            <input type="textarea" name="ingredients" onChange={handleChange} value={ingredients} required />
        </div>
        <div>
            <label>Image</label>
            <input type="file" name="image" onChange={handleChangeFile} required={!image} />
            <div >
                { !!image 
                    && <img src={image} alt="preview" />
                }
            </div>
        </div>
        
        <button type='submit'>Update</button>
    </form>
    )
}

export default EditRecipe;