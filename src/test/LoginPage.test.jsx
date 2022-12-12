import { async } from "@firebase/util";
import { configureStore } from "@reduxjs/toolkit";
import {
	screen,
	render,
	fireEvent,
	waitForElement,
	getByTestId,
	waitFor,
	act,
} from "@testing-library/react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import { authSlice } from "../store/auth/authSlice";
import { notAuthenticatedState } from "./fixtures/authFixtures";

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
	},
	preloadedState: {
		auth: notAuthenticatedState,
	},
});

describe("pruebas eb el LoginPage", () => {
	it("debe demostrar el componente correctamente", () => {
		render(
			<Provider store={store}>
				<LoginPage />
			</Provider>
		);
		expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
	});

	test("boton login debe de llamar el startLogin", async () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);
		fireEvent.click(screen.getByLabelText("login-btn"));
	});
});
