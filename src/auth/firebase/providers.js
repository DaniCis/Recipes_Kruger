import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        await updateProfile(FirebaseAuth.currentUser, { displayName });
        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const loginWithEmailPassword = async({ email, password }) => {
    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;
        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async() => {
    localStorage.removeItem('apiRecipes');
    localStorage.removeItem('myRecipes');
    localStorage.removeItem('savedRecipes');
    return await FirebaseAuth.signOut();
}
