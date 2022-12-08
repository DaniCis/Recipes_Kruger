import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { checkingCredentials } from "../../store/auth/authSlice";
import { startLoginWithEmailPassword } from "../../store/auth/thunks";
import { useNavigate } from "react-router-dom";
import RegisterPage from "./RegisterPage";

export default function LoginPage() {
	const { status, errorMessage } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(startLoginWithEmailPassword({ email, password }));
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					name="email"
					type="email"
					placeholder="correo@google.com"
					defaultValue={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					name="password"
					type="password"
					placeholder="Contraseña"
					defaultValue={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button>LogIn</button>
			</form>
		</div>
	);
}
