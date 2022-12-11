import React, { useState } from "react";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import "../styles/Login-Register-Layout.css";
import logo from "../../Assets/donat.svg";

export default function LayoutAuth() {
	const [activeForm, setActiveForm] = useState("login");

	return (
		<div className="login">
			<div className="login__content">
				<div className="login__img">
					<img src={logo} alt="" />
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
					<div className="flex h-12 mt-96">
						<button
						 id="buttonAuth"
							className={
								activeForm === "login"
									? "overflow-hidden rounded-sm shadow-md shadow-gray-400/50 bg-gradient-to-r from-blue-400 to-cyan-400 text-sm w-52 font-medium tracking-wider uppercase  text-gray-50 py-1 px-2"
									: "overflow-hidden rounded-sm shadow-md shadow-gray-400/50 bg-gradient-to-r from-rose-400 to-orange-300 text-sm w-60 font-medium tracking-wider uppercase text-gray-50 px-2"
							}
							type="button"
							onClick={() =>
								setActiveForm(activeForm === "login" ? "register" : "login")
							}>
							{activeForm === "login"
								? "Create an account"
								: "Already have an account"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
