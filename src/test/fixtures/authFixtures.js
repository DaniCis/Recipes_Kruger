export const initialState = {
    status: 'checking', 
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authenticatedState = {
    status: 'authenticated', 
    uid: '123ABX',
    email: 'demo@gmail.com',
    displayName: 'Demo User',
    photoURL: 'https://demo.jp',
    errorMessage: null,
}

export const notAuthenticatedState = {
    status: 'not-authenticated', 
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const demoUser ={
    uid: '123ABX',
    email: 'demo@gmail.com',
    displayName: 'Demo User',
    photoURL: 'https://demo.jp'
}