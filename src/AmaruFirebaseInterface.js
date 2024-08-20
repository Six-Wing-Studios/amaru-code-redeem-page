
const loginEndpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCuPBS62otAtKUJelEV8dVtXi_afDBFsYk';

export const LoginResult = Object.freeze({
    SUCCESS: 0,
    BAD_EMAIL: 1,
    BAD_PASSWORD: 2,
    NO_EMAIL: 3,
    NO_PASSWORD: 4,
    UNKNOWN_ERROR: 99,
})

export const RedeemResult = Object.freeze({
    SUCCESS: 0,
    UNKNOWN_ERROR: 99,
})

export const login = async (email, password) => {
    if (!email)
        return  { resultCode: LoginResult.NO_EMAIL, uid: null }

    if (!password)
        return { resultCode: LoginResult.NO_PASSWORD, uid: null }

    const loginResponse = await fetch(loginEndpoint, {
        method: 'POST',
        body: {
            email: email,
            password: password,
            returnSecureToken: true
        },
        headers: {
          'Content-Type': 'application/json'
        }
    })

    const resJson = await loginResponse.json();

    if (!loginResponse.ok) {
        alert(`Bad Response: ${JSON.stringify(resJson, null, 2)}`);
        return { resultCode: LoginResult.UNKNOWN_ERROR, uid: null }
    }

    alert(JSON.stringify(resJson, null, 2));

    return { resultCode: LoginResult.SUCCESS, uid: resJson.body.localId }
    
}

export const redeemCode = async (uid, code) => {

}
