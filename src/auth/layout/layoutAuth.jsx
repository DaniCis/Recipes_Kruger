import React, { useState } from "react";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import "../styles/Login-Register-Layout.css";
import logo from "../../Assets/cooking.svg";

export default function LayoutAuth() {
	const [activeForm, setActiveForm] = useState("login");

	return (
		<div className="login bg-cover bg-[url('https://img.freepik.com/free-photo/colored-vegetables-white-background_179666-40.jpg?w=2000')]">
			<div className="login__content">
				<div className="login__img">
					<img src={logo} alt="imagen" />
				</div>

				<div className="login__forms">
					{activeForm === "login" ? (
						<>
							<LoginPage />
						</>
					) : (
						<>
							<RegisterPage />
						</>
					)}
					<div className="flex -mt-3">
						<button
						 id=""
							className={
								activeForm === "login"
									? "rounded-lg shadow-md shadow-gray-400/50 bg-gradient-to-r from-rose-400 to-orange-300 text-sm font-medium  capitalize text-gray-50 py-4 px-3 mt-96 ml-24 md:ml-12 lg:-ml-28 max-sm:ml-5"
									: "rounded-lg shadow-md shadow-gray-400/50 bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-yellow-200 via-yellow-400 to-yellow-700 text-sm w-60 font-medium capitalize text-gray-50 py-4 px-3 mt-96 ml-24 md:ml-12 lg:-ml-28 max-sm:ml-5"	
							}
							type="button"
							onClick={() =>
								setActiveForm(activeForm === "login" ? "register" : "login")
							}>
							{activeForm === "login"
								? "New member? Create an account"
								: "Already have an account? Login"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
