export enum EStudentResponse {
    STUDENT_ADD_SUCCESS,
    STUDENT_UPDATE_SUCCESS,
}

export const StuentResponse = {
    [EStudentResponse.STUDENT_ADD_SUCCESS]: {
        message: "Student Addded."
    },
    [EStudentResponse.STUDENT_UPDATE_SUCCESS]: {
        message: "Student Updated"
    },
}