import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../store/auth/thunks";

export default function Recipies() {
	const dispatch = useDispatch();
	const { displayName } = useSelector((state) => state.auth);

	const [recipes,setRecipes] = useState([])

	useEffect( () => {
        getRecipes()
    },[])

	const getRecipes = async() =>{
		await axios.get(`${process.env.REACT_APP_URL}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}&ingr=5-6&random=true`)
		  .then((response) => {
			const temp = response.data.hits
			let recetas = []
			for(const receta in temp)
				recetas.push(temp[receta].recipe)
			setRecipes(recetas)
		}).catch(error => {
		  console.log(error)
		});
	}

	const onLogout = () => {
		dispatch(startLogout());
	};


	return (
		<div>
			Recipes
			<div>{displayName}</div>
			<div>
				{recipes.map((receta,index) =>
					<p key={index}>{receta.label}</p>
				)}
			</div>
			<button onClick={onLogout}>Logout</button>
		</div>
	);
}
