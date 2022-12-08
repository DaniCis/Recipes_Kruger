import React, { useState } from "react";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import '../styles/Login-Register-Layout.css'

export default function LayoutAuth() {
	const [addClass, setAddClass] = useState("");
	return (
		<div className={`container ${addClass}`} id="container">
			<div className="form-container sign-in-container">
				<LoginPage />
			</div>
			<div className="form-container  sign-up-container">
				<RegisterPage />
			</div>
			<div className="overlay-container">
				<div className="overlay">
					<div className="overlay-panel overlay-left">
						<button
							className="ghost"
							id="signIn"
							onClick={() => setAddClass("")}>
							GO TO LOGIN
						</button>
					</div>
					<div className="overlay-panel overlay-right">
						<button
							className="ghost"
							id="signUp"
							onClick={() => setAddClass("right-panel-active")}>
							GO TO REGISTER
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
