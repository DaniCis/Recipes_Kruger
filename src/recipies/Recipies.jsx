import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RecipiesApi } from "./api/RecipesApi";
import { startLogout } from "../store/auth/thunks";


export default function Recipies() {

	const dispatch = useDispatch();
	const { displayName } = useSelector((state) => state.auth);
	const {recipes} = RecipiesApi();

	const onLogout = () => {
		dispatch(startLogout());
	};

	return (
		<div>
			Recipes
			<button onClick={onLogout}>Logout</button>
			<div>{displayName}</div>
			<div>
				{recipes.map((receta, index) => (
					<>
						<p key={index}>{receta.label}</p>
						<p>{receta.uri.split('_',2)[1]}</p>
						<Link to={`/details/${receta.uri.split('_',2)[1]}`}>
							<button>Details</button>
						</Link>
					</>
				))}
			</div>
		</div>
	);
}
