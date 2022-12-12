import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipesId } from "./api/RecipesApi";
import Swal from "sweetalert2";
import Navbar from "../recipies/components/Navbar";
import Footer from "../recipies/components/Footer";
import Loading from "./components/Loading"

export default function DetailsRecipies() {
	const params = useParams();
	const [infos, setInfos] = useState([]);
	const [isSaved, setIsSaved] = useState(false);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			fetchInfo();
			setLoading(false)
		}, 1000);
	}, [params.id]);

	const fetchInfo = async () => {
		const info = await getRecipesId(params.id);
		setInfos(info);
		checkSavedRecipes(info);
	};

	const checkSavedRecipes = (info) => {
		let saveRecipeInfo = [];
		let temp = localStorage.getItem("savedRecipes");
		if (temp === null) localStorage.setItem("savedRecipes", "[]");
		else {
			saveRecipeInfo = JSON.parse(temp);
			let mapSearch = saveRecipeInfo.map((data) => data.label);
			if (mapSearch.includes(info.label)) setIsSaved(true);
			else {
				setIsSaved(false);
				return saveRecipeInfo;
			}
		}
	};

	const handleSave = () => {
		let saveRecipeInfo = checkSavedRecipes(infos);
		if (!isSaved) {
			saveRecipeInfo.push(infos);
			localStorage.setItem("savedRecipes", JSON.stringify(saveRecipeInfo));
			setIsSaved(true);
			Swal.fire({
				title: "Good job!",
				icon: "success",
				text: "Recipe saved successfully",
			});
		}
	};

	const handleReturn = () => {
		navigate("/home");
	}

	return (
		<>
		<Navbar />
			{loading 
				? <Loading />
				: (
					<div className="flex items-center justify-center my-4">
						<div className="flex flex-col sm:w-full max-w-4xl p-10 space-y-6 shadow-lg md:flex-row md:space-x-6 md:space-y-0 rounded-xl max-sm:w-70 max-sm:my-5 bg-gray-100">
							<div className="flex flex-col  p-8 space-y-8 text-gray-600 bg-white shadow-lg rounded-xl w-8/12">
								<div className="my-2">
									<h3 className="text-xl font-bold text-center">{infos.label}</h3>
								</div>
								<div className="flex justify-center">
									<img
										src={infos.image}
										alt=""
										className="mask mask-square rounded-xl w-48"
									/>
								</div>
								<div className="py-4">
									<div className="flex flex-row gap-2">
										<p><span className="font-bold text-xl text-green-500">{infos.yield} </span> 
										servings</p>  
									</div>
									<div className="flex flex-row gap-2">
										<p><span className="font-bold text-xl text-red-300">{infos.calories} </span>calories</p>
									</div>
									<div className="flex flex-row gap-2">
										<p className="font-semibold">Cuisine Type: </p>
										<p className="capitalize">{infos.cuisineType}</p>
									</div>
									<div className="flex flex-row gap-2">
										<p className="font-semibold">Meal Type: </p>
										<p className="capitalize">{infos.mealType}</p>
									</div>
								</div>
							</div>
							<div className="w-10/12 p-8 text-gray-600 bg-white shadow-lg rounded-xl max-sm:w-80">
								<div className="flex flex-col space-y-4">
									<div className="flex justify-center border-b-2">
										<h1 className="my-2 text-lg font-bold">Details</h1>
									</div>
									<div className="flex flex-row space-x-3">
										<p className="font-semibold">Author: </p>{" "}
										<p> {infos.source} </p>
									</div>
									<div>
										<p>
											See full preparation in <a className="link link-primary" href={infos.url}>here</a>
										</p>
									</div>
									<div className="divider"></div>
									<div>
										<p className="mx-2 mb-2 font-semibold">Ingredients: </p>
										<ul>
											{infos.ingredients?.map((recipe, index) => (
												<li className="list-disc list-inside" key={index}>
													{recipe.text}
												</li>
											))}
										</ul>
										<div className="divider"></div>
										<div className="flex justify-end mt-5 gap-4">
										{!isSaved && (
											<button className="btn btn-info" onClick={handleSave}>
												Add to my recipes
											</button>
										)}
											<button className="btn btn-success" onClick={handleReturn}>Go Back</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			}
			<Footer />
		</>
	);
}
