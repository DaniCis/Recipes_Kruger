import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../store/auth/thunks";

export default function Recipies() {
	const dispatch = useDispatch();
	const { displayName } = useSelector((state) => state.auth);

	const onLogout = () => {
		dispatch(startLogout());
	};

	return (
		<div>
			Recipies
			<div>{displayName}</div>
			<button onClick={onLogout}>Logout</button>
		</div>
	);
}
