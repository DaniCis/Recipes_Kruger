import FormRecipe from "./components/FormRecipe";
import { useDispatch } from 'react-redux'
import { addRecipe } from "../store/recipes/recipeSlice";
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import Swal from "sweetalert2";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const CreateRecipe = () =>{

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if (localStorage.getItem("myRecipes") === null) 
			localStorage.setItem("myRecipes", [])
    },[])

    const handleSubmit = (recipe) =>{
		if (localStorage.getItem("myRecipes") !== []) {
            dispatch(addRecipe(recipe))
            Swal.fire({
                title:'Good job!',
                icon:'success',
                text:'Recipe added successfully'
            }).then((result) => {
                if (result.isConfirmed) 
                    navigate("/recipeBook")
            })
        }
    }

    return(
        <>
            <Navbar />
            <FormRecipe titleForm='Add a new recipe' titleBtn='Add' onAction={handleSubmit} />
            <Footer />
        </>
    )
}

export default CreateRecipe;