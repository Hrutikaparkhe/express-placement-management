import { body } from "express-validator";
import { validate } from "../utility/validate";

export const CampusActivityValidator = [
    body('company_name').isString(),
    body('domain').isString().not().isEmpty(),
    body('noOfStudents').isNumeric().not().isEmpty(),
    body('noOfStudents').isNumeric().not().isEmpty(),
    validate
]