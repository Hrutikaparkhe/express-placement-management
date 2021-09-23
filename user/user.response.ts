export enum EUserResponse {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SIGNUP_SUCCESS,
    USER_ALREADY_REGISTERED
}

export const UserResponse = {
    [EUserResponse.LOGIN_FAILED]: {
        message: "EMAIL OR PASSWORD IS INCORRECT",
        statusCode: 403
    },
    [EUserResponse.LOGIN_SUCCESS]: {
        message: "LOGGED IN SUCCESFULLY"
    },
    [EUserResponse.SIGNUP_SUCCESS]: {
        message: "REGISTERED SUCCESFULLY"
    },
    [EUserResponse.USER_ALREADY_REGISTERED]: {
        message: "USER WITH THIS EMAIL ALREADY REGISTERED",
        statusCode:404
    }
}