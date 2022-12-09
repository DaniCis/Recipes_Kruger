import { useState } from 'react'

const FormRecipe = () =>{
    const [title,setTitle] = useState("")  //label
    const [author,setAuthor] = useState("")  //source
    const [ingredients, setIngredients] = useState("") //ingredientLines
    const [url,setUrl] = useState("") //url
    const [serving,setServing] = useState(0) //yield
    const [cuisineType, setCuisineType] = useState("")
    const [mealType, setMealType] = useState("")
    const [calories,setCalories] = useState(0)
    const [image,setImage] = useState('')
 

    const handleChangeFile = (e) =>{
        const element = e.target
        const file = element.files[0]
        const reader = new FileReader()     
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setCover(reader.result.toString())
        }
    }


    return(
        <form>
            <input type="text" name="title" />
        </form>
    )
}

export default FormRecipe;