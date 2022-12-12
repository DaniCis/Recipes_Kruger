import { authSlice, login } from "../store/auth/authSlice";
import { demoUser, initialState } from "./fixtures/authFixtures";

describe('Pruebas en el authSlice', () => {
    test('debe de regresar el estado inicial y llamarse "auth"', () => {
        expect(authSlice.name).toBe('auth');
        const state = authSlice.reducer(initialState, {})
        expect(state).toEqual(initialState);
    });

    test('debe realizar la autenticación', () => {
        const state = authSlice.reducer(initialState, login(demoUser))
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        })
    })
})