import axios from "axios";
import { useEffect, useState } from "react";

export const RecipiesApi = () => {
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		getRecipes();
	}, []);

	const getRecipes = async () => {
		const check = localStorage.getItem("apiRecipes");
		if (check) {
			setRecipes(JSON.parse(check));
		} else {
			await axios
				.get(
					`${process.env.REACT_APP_URL}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}&ingr=5-6&random=true`
				)
				.then((response) => {
					const temp = response.data.hits;
					let recetas = [];
					for (const receta in temp) recetas.push(temp[receta].recipe);
					localStorage.setItem('apiRecipes', JSON.stringify(recetas));
					setRecipes(recetas);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};
	return { recipes };
};

export const getRecipesId = async (id) => {
	let value = [];
	await axios
		.get(
			`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}`
		)
		.then((response) => {
			const temp = response.data.recipe;
			value = temp;
		})
		.catch((error) => {
			console.log(error);
		});
	return value;
};

export const searchRecipes = async (name) => {
	let recetasSearch = [];
	await axios
		.get(
			`https://api.edamam.com/api/recipes/v2?type=public&q=${name}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}`
		)
		.then((response) => {
			const temp = response.data.hits;
			for (const receta in temp) recetasSearch.push(temp[receta].recipe);
			//console.log(recetasSeacrh);
		})
		.catch((error) => {
			console.log(error);
		});

	return recetasSearch;
};
