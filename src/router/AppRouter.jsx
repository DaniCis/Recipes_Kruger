import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { RecipiesRoutes } from "../recipies/routes/RecipiesRoutes";

export default function AppRouter() {
	const status = useCheckAuth();

	if (status === "checking") {
		return <LoginPage />;
	}
	
	return (
		<Routes>
			{status === "authenticated" ? (
				<Route path="/*" element={<RecipiesRoutes />} />
			) : (
				<Route path="/*" element={<AuthRoutes />} />
			)}
			<Route path="/*" element={<Navigate to="/login" />} />
		</Routes>
	);
}
