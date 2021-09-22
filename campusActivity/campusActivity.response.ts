export enum ECampusActivityResponse {
    CAMPUS_ACTIVITY_ADD_SUCCESS,
    CAMPUS_ACTIVITY_UPDATE_SUCCESS,
}

export const StuentResponse = {
    [ECampusActivityResponse.CAMPUS_ACTIVITY_ADD_SUCCESS]: {
        message: "Student Addded."
    },
    [ECampusActivityResponse.CAMPUS_ACTIVITY_UPDATE_SUCCESS]: {
        message: "Student Updated"
    },
}