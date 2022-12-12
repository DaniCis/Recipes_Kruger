import { Link } from "react-router-dom";
import { RecipiesApi, searchRecipes } from "./api/RecipesApi";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import Swal from "sweetalert2";

export default function Recipies() {
	const { recipes } = RecipiesApi();
	const [recipeName, setRecipeName] = useState("");
	const [infoSearch, setInfoSearch] = useState([]);
	const [validationHome, setValidationHome] = useState(true);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1000);

		if (recipeName === "") {
			setValidationHome(true);
		}
	}, [recipeName]);

	const handleSearch = async () => {
		if (recipeName === "") {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "No, you searched for nothing",
			});
		} else {
			const searchInput = await searchRecipes(recipeName);
			setValidationHome(false);
			setInfoSearch(searchInput);
		}
	};

	return (
		<>
			<Navbar />
			<div>
			<h2 className="font-semibold text-3xl text-center my-6 text-gray-500">Feeling hungry? <br/> Find anything you desire!</h2>
				<div className="flex items-center justify-center px-2 mb-1 mt-8 sm:px-6 lg:px-2">
					<div className="relative">
						<input
							type="text"
							className="z-0 pl-5 pr-8 border-2 border-opacity-50 h-12 w-96 rounded-2xl focus:shadow focus:outline-none max-sm:w-64 max-sm:h-15"
							placeholder="Search for recipes, ingredients..."
							value={recipeName}
							onChange={(e) => setRecipeName(e.target.value)}
						/>
						<div className="absolute top-3 right-3">
							<i
								className="z-20 text-gray-400 fa fa-search hover:text-gray-500"
								onClick={handleSearch}></i>
						</div>
					</div>
				</div>
			</div>
			<div>
				{validationHome ? (
					<>
						<div className="py-8 px-2 lg:ml-5 md:flex md:justify-center ">
							<div className="grid flex-wrap grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3 md:mx-2 max-sm:flex max-sm:justify-center 2xl:grid-cols-5">
								{recipes.map((receta, index) => (
									<div key={index} className="w-56 shadow-xl card bg-base-100">
										<figure className="px-8 pt-8">
											<img className="rounded-lg" src={receta.image} alt="imagen" />
										</figure>
										<div className="items-center text-center card-body">
											<p className="card-title text-sm font-bold">{receta.label}</p>
											<div className="justify-center card-actions ">
												<Link to={`/details/${receta.uri.split("_", 2)[1]}`}>
													<button className="px-4 py-2 mt-2 text-base font-medium rounded-xl shadow-lg bg-gradient-to-r from-teal-200 to-lime-200">
														View Details
													</button>
												</Link>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</>
				) : (
					<>
						{loading ? (
							<Loading />
						) : (
							<div className="py-8 px-2 lg:ml-5 md:flex md:justify-center ">
								<div className="grid flex-wrap grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3 md:mx-2 max-sm:flex max-sm:justify-center 2xl:grid-cols-5">
									{infoSearch?.map((receta, index) => (
										<>
											<div
												key={index}
												className="w-56 shadow-lg card bg-base-100">
												<figure className="px-8 pt-8">
													<img
														className="rounded-lg"
														src={receta.image}
														alt="imagen"
													/>
												</figure>
												<div className="items-center text-center card-body">
													<p className="card-title text-sm font-bold">{receta.label}</p>
													<div className="justify-center card-actions ">
														<Link
															to={`/searchdetails/${
																receta.uri.split("_", 2)[1]
															}`}>
															<button className="px-4 py-2 mt-2 text-base font-medium rounded-xl shadow-lg bg-gradient-to-r from-teal-200 to-lime-200">
																View Details
															</button>
														</Link>
													</div>
												</div>
											</div>
										</>
									))}
								</div>
							</div>
						)}
					</>
				)}
			</div>
			<Footer />
		</>
	);
}
