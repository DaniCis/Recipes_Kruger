import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipesId } from "../api/RecipesApi";

export default function DetailsRecipies() {
	const params = useParams();
	const [infos, setInfos] = useState([]);

	useEffect(() => {
		const fetchInfo = async () => {
			const info = await getRecipesId(params.id);
			setInfos(info)
			console.log(info)
		};

		fetchInfo();
	}, []);



	return (
		<div>
			<div>
				{infos.label}
				<img src={infos.image} alt="" />
				<p>{infos.source}</p>
				<a href={infos.url}>Website</a>
				<p>{infos.yield}</p>
				<p>{infos.cuisineType}</p>
				<p>{infos.mealType}</p>
				<p>{infos.calories}</p>
				<ul>
					{infos.ingredients?.map((recipe)=>
						<li key={recipe.text}>{recipe.text}</li>
					)}
				</ul>
			</div>
		</div>
	);
}
