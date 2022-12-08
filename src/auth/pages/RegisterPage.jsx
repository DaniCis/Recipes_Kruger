import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkingCredentials } from "../../store/auth/authSlice";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

export default function RegisterPage() {
	const dispatch = useDispatch();

	const [credentials, setCredentials] = useState({
		displayName: "",
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [displayName, setDisplayName] = useState("");

	// const handleLogin = () => {
	// 	navigate("/auth/login");
	// };

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(
			startCreatingUserWithEmailPassword({ email, password, displayName })
		);
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					name="name"
					type="text"
					placeholder="Complete Name"
					defaultValue={credentials.displayName}
					onChange={(e) => setDisplayName(e.target.value)}
				/>
				<input
					name="email"
					type="email"
					placeholder="correo@google.com"
					defaultValue={credentials.email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					name="password"
					type="password"
					placeholder="Contraseña"
					defaultValue={credentials.password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button>save</button>
			</form>
			{/* <button onClick={handleLogin}>Login</button> */}
		</div>
	);
}
