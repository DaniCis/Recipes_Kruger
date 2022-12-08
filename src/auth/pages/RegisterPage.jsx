import { collection, query } from "firebase/firestore/lite";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

export default function RegisterPage() {
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [displayName, setDisplayName] = useState("");

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
					defaultValue={displayName}
					onChange={(e) => setDisplayName(e.target.value)}
				/>
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
				<button>Register</button>
			</form>
			{/* <button onClick={handleLogin}>Login</button> */}
		</div>
	);
}
