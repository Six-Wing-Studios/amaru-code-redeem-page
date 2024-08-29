const loginEndpoint =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCuPBS62otAtKUJelEV8dVtXi_afDBFsYk";
const redeemEndpoint =
    "https://us-central1-fom-amaru.cloudfunctions.net/api/redeemGiftCode";

export const LoginResult = Object.freeze({
    SUCCESS: 0,
    BAD_EMAIL: 1,
    BAD_PASSWORD: 2,
    NO_EMAIL: 3,
    NO_PASSWORD: 4,
    UNKNOWN_ERROR: 99,
});

export const RedeemResult = Object.freeze({
    SUCCESS: 0,
    BAD_UID: 1,
    BAD_CODE: 2,
    CODE_ALREADY_USED: 3,
    USER_ALREADY_OWNS: 4,
    NO_CODE: 5,
    NO_UID: 6,
    UNKNOWN_ERROR: 99,
});

export const login = async (email, password) => {
    if (!email) return { resultCode: LoginResult.NO_EMAIL, uid: null };

    if (!password) return { resultCode: LoginResult.NO_PASSWORD, uid: null };

    const loginResponse = await fetch(loginEndpoint, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const resJson = await loginResponse.json();

    if (!loginResponse.ok) {
        let errorCode = LoginResult.UNKNOWN_ERROR;

        if (resJson.error.message.includes("EMAIL_NOT_FOUND")) {
            errorCode = LoginResult.BAD_EMAIL;
        } else if (resJson.error.message.includes("INVALID_PASSWORD")) {
            errorCode = LoginResult.BAD_PASSWORD;
        }

        return { resultCode: errorCode, uid: null };
    }

    //alert(JSON.stringify(resJson, null, 2));

    return { resultCode: LoginResult.SUCCESS, uid: resJson.localId };
};

export const redeemCode = async (uid, code) => {
    if (!uid) return RedeemResult.NO_UID;
    if (!code) return RedeemResult.NO_CODE;

    const redeemResponse = await fetch(redeemEndpoint, {
        method: "POST",
        body: JSON.stringify({
            uid: uid,
            giftCode: code,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const redeemJson = redeemResponse.json();

    alert(JSON.stringify(redeemJson, null, 2));

    return RedeemResult.UNKNOWN_ERROR;
};
