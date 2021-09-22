import { IRoute } from "./routes.types";
import StudentRouter from "../student/student.route";
import CampusActivityRouter from "../campusActivity/campusActivity.route";
import UserRouter from "../user/user.route";
export const routes: IRoute[] = [
  {
    path: "/student",
    router: StudentRouter,
  },
  {
    path: "/campusActivity",
    router: CampusActivityRouter,
  },

  {
    path: "/user",
    router: UserRouter,
  },
 
];
