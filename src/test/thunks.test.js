import { checkingCredentials } from "../store/auth/authSlice";
import { checkingAuthentication } from "../store/auth/thunks"

jest.mock('../auth/firebase/providers')

describe('Pruebas en AuthThunks', () => {
    test('Debe invocar el checkingCredentials', async () => {
        const dispatch = jest.fn();
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    })

})
