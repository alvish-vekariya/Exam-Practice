import { Container } from "inversify";
import { adminService, examService, questionService, userServices } from "../services";
import { adminMiddleware, loginMiddleware } from "../middleware";

const container = new Container();

container.bind<userServices>(userServices).toSelf();
container.bind<adminService>(adminService).toSelf();
container.bind<questionService>(questionService).toSelf();
container.bind<examService>(examService).toSelf();

container.bind<loginMiddleware>(loginMiddleware).toSelf();
container.bind<adminMiddleware>(adminMiddleware).toSelf();

export default container;