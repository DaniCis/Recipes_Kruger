import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RecipiesApi, searchRecipes } from "./api/RecipesApi";
import { startLogout } from "../store/auth/thunks";
import { useEffect, useState } from "react";

export default function Recipies() {
	const dispatch = useDispatch();
	const { displayName } = useSelector((state) => state.auth);
	const { recipes } = RecipiesApi();

	const [recipeName, setRecipeName] = useState([]);
	const [infoSearch, setInfoSearch] = useState([]);
	const [validationHome, setValidationHome] = useState(true);


	useEffect(()=>{
		if(recipeName === ''){
			setValidationHome(true);
		}
	},[recipeName])

	const onLogout = () => {
		dispatch(startLogout());
	}

	

	const handleSearch = async () => {
		const searchInput = await searchRecipes(recipeName);
		setValidationHome(false);
		setInfoSearch(searchInput);
		
	};

	return (
		<div>
			Recipes
			<button onClick={onLogout}>Logout</button>
			<div>{displayName}</div>
			<div>
				<div>
					<input
						name="recipe"
						type="text"
						placeholder="Enter a recipe"
						value={recipeName}
						onChange={(e) => setRecipeName(e.target.value)}
					/>
					<button onClick={handleSearch}>search</button>
				</div>
				<div>
					{validationHome ? (
						<>
							{recipes.map((receta, index) => (
								<>
									<p key={index}>{receta.label}</p>
									<Link to={`/details/${receta.uri.split("_", 2)[1]}`}>
										<button>Details</button>
									</Link>
								</>
							))}
						</>
					) : (
						<>
							{infoSearch?.map((receta) => (
								<>
									<p>{receta.label}</p>
									<Link to={`/details/${receta.uri.split("_", 2)[1]}`}>
										<button>Details</button>
									</Link>
								</>
							))}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
