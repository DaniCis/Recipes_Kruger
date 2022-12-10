import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipesId } from "../api/RecipesApi";
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'

export default function DetailsRecipies() {
	const params = useParams();
	const [infos, setInfos] = useState([])
	const [hasId, setHasId] = useState(false)
	const [isSaved, setIsSaved] = useState(false)

	useEffect(() => {
		if(verifyId(params.id))
			fetchInfo(params.id)
		else
			getInfo(params.id)
	}, [params.id]);

	const verifyId = (id) =>{
		const apiRecipes = JSON.parse(localStorage.getItem('apiRecipes'))
		const apiId = apiRecipes.map(recipe => recipe.uri.split("_",2)[1]).includes(id)
		const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes'))
		let savedId = true
		if(savedRecipes !== null )
		 	savedId = savedRecipes.map(recipe => recipe.uri.split("_",2)[1]).includes(id)
		if(apiId && savedId){
			setHasId(true)
			return true
		}
		else if(apiId){
			setHasId(true)
			return true
		}else{
			setHasId(false)
			return false
		}
	}

	const fetchInfo = async (id) => {
		const info = await getRecipesId(id);
		setInfos(info);
		checkSavedRecipes(info);
	}

	const getInfo = (id) =>{
		const temp = JSON.parse(localStorage.getItem('myRecipes'))
		setInfos(temp.find(recipe => recipe.id === id))
	}

	const checkSavedRecipes = (info) =>{
		let saveRecipeInfo = [];
		let temp = localStorage.getItem("savedRecipes")
		if (temp === null) 
			localStorage.setItem("savedRecipes", "[]");
		else{
			saveRecipeInfo = JSON.parse(temp);
			let mapSearch = saveRecipeInfo.map((data)=> data.label)
			if((mapSearch).includes(info.label))
				setIsSaved(true)
			else{
				setIsSaved(false)
				return saveRecipeInfo;
			}
		}
	}

	const handleSave = () => {
		let saveRecipeInfo = checkSavedRecipes(infos)
		if(!isSaved){
			saveRecipeInfo.push(infos);
			localStorage.setItem("savedRecipes", JSON.stringify(saveRecipeInfo));
			setIsSaved(true)
			Swal.fire({
				title:'Good job!',
                icon:'success',
                text:'Recipe saved successfully'
			})  
		}
	};

	return (
		<div>
			<div>
				{hasId 
					? <h3>{infos.label}</h3>
					: <h3>{infos.title}</h3>
				}
				<img src={infos.image} alt="" />
				{hasId 
					? <p>{infos.source}</p>
					: <p>{infos.author}</p>
				}
				{hasId &&
					<p>Ver receta completa <a href={infos.url}>aqui</a></p>
				}
				{hasId 
					? <p>{infos.yield}</p>
					: <p>{infos.servings}</p>
				}
				<p>{infos.cuisineType}</p>
				<p>{infos.mealType}</p>
				<p>{infos.calories}</p>
				{hasId 
					? <ul>
						{infos.ingredients?.map((recipe,index) => (
							<li key={index}>{recipe.text}</li>
						))}
					</ul>
					: <p>{infos.ingredients}</p>
				}
				{(!isSaved && hasId) && 
					 <button onClick={handleSave}>Agregar a mis recetas</button>
				}
				{!hasId &&
					<Link to={`/editRecipe/${infos.id}`}>
					<button>Edit Recipe</button>
					</Link>
				}
			</div>
		</div>
	);
}
