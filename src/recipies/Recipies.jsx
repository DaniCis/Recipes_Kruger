import { Link } from "react-router-dom";
import { RecipiesApi, searchRecipes } from "./api/RecipesApi";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Recipies() {

	const { recipes } = RecipiesApi();
	const [recipeName, setRecipeName] = useState([]);
	const [infoSearch, setInfoSearch] = useState([]);
	const [validationHome, setValidationHome] = useState(true);

	useEffect(()=>{
		if(recipeName === ''){
			setValidationHome(true);
		}
	},[recipeName])

	const handleSearch = async () => {
		const searchInput = await searchRecipes(recipeName);
		setValidationHome(false);
		setInfoSearch(searchInput);		
	};

	return (
		<>
			<Navbar />
			<div>
				<div>
					<div className="max-sm:flex justify-center">
						<input
							name="recipe"
							type="text"
							placeholder="Enter a recipe"
							value={recipeName}
							onChange={(e) => setRecipeName(e.target.value)}
							className=" h-14 w-96 px-6 text-lg text-black bg-white border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 
						max-sm:w-80 "
						/>
					</div>
					<div className="max-sm:flex justify-center">
						<button
							className="overflow-hidden
                        rounded-sm
                        shadow-md
                        shadow-gray-400/50
                        bg-gradient-to-r
                        from-blue-400
                        to-cyan-400
                        py-1 px-5
                        text-lg
                        font-medium
                        uppercase
                        tracking-wider
                        text-gray-50
						mt-2 mb-5"
							onClick={handleSearch}>
							search
						</button>
					</div>
				</div>
				<div>
					{validationHome ? (
						<>
							<div className="container py-10 px-2 lg:ml-5">
								<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
									{recipes.map((receta, index) => (
										<div className="shadow-xl shadow-slate-500/30 rounded-lg bg-cover bg-center border border-slate-500/30">
											<div className="m-5 flex justify-center">
												<img
													className="rounded-lg w-auto h-auto lg:mx-2 mt-5"
													src={receta.image}
													alt="1"
												/>
											</div>
											<div className="p-5">
												<h4
													className="break-words text-lg font-medium flex justify-center"
													key={index}>
													{receta.label}
												</h4>

												<div className="flex justify-center">
													<Link to={`/details/${receta.uri.split("_", 2)[1]}`}>
														<button
															className="overflow-hidden
														rounded-sm
														shadow-md
														shadow-gray-400/50
														bg-gradient-to-r
														from-blue-400
														to-cyan-400
														py-0 px-2
														text-lg
														font-medium
														uppercase
											tracking-wider
											text-gray-50
											mt-2 mb-5">
															Details
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
			<Footer />
		</>
	);
}
