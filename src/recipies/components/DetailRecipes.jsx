import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipesId } from "../api/RecipesApi";

export default function DetailsRecipies() {
	const params = useParams();
	const [infos, setInfos] = useState([]);

	useEffect(() => {
		const fetchInfo = async () => {
			const info = await getRecipesId(params.id);
            let array = [];
            array.push(info)
			setInfos(array[0]);
		};
		fetchInfo();
	}, []);



	return (
		<div>
			<div>
                {infos.label}
				<img src={infos.image} alt="" />
			</div>
		</div>
	);
}
