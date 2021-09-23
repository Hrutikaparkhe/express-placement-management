export enum ECampusActivityResponse {
    CAMPUS_ACTIVITY_ADD_SUCCESS,
    CAMPUS_ACTIVITY_UPDATE_SUCCESS,
}

export const CampusActivityResponse = {
    [ECampusActivityResponse.CAMPUS_ACTIVITY_ADD_SUCCESS]: {
        message: "Campus Activity Addded."
    },
    [ECampusActivityResponse.CAMPUS_ACTIVITY_UPDATE_SUCCESS]: {
        message: "Campus Activity Updated"
    },
}