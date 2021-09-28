import { NextFunction, Request, Response, Router } from "express";
import { ResponseHandler } from "../utility/response-handler";
import studentService from "./student.service";
import { IStudent, IStudentUpdate } from "./student.types";
import path from "path";
const router = Router();

router.get(
  "/file/:filename",
  (req: Request, res: Response, next: NextFunction) => {
    const { filename } = req.params;
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, "files/" + filename);
    res.sendFile(fullfilepath);
  }
);


router.post("/",  studentService.fileUpload.single("file"),async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const student = req.body as IStudent;
    const student:IStudent={
        file:req.file?req.file.filename:'',
        name:req.body.name,
        year:parseInt(req.body.year),
        avg:parseInt(req.body.avg),
    }
    console.log(student);
    const result = await studentService.create(student);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const response = await studentService.getOne(id);
    res.send(new ResponseHandler(response));
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await studentService.get();
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

router.put("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = req.body as IStudentUpdate;
    const result = await studentService.update(student);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

router.post(
  "/file",
  studentService.fileUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file || Object.keys(req.file).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    if (!req.file?.originalname.match(/\.(pdf|doc|docx)$/)) {
      return res.status(400).send("Invalid file");
    }
    console.log(req.file);
    console.log(req.body);
    res.json("/file api");
  }
);


export default router;
