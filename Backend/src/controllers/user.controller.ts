import { Request, Response } from "express";
import { inject } from "inversify";
import {
    controller,
    httpGet,
    httpPost,
    httpPut,
} from "inversify-express-utils";
import { userServices } from "../services";
import { loginMiddleware } from "../middleware";
import { upload } from "../middleware/multer.middleware";
import { IuserModel } from "../interfaces";
import bcrypt from "bcryptjs";

@controller("/user")
export class userController {
    constructor(@inject(userServices) private userService: userServices) { }

    @httpPost("/login")
    async login(req: Request, res: Response) {
        try {
            const loginData = {
                email: req.body.email,
                password: req.body.password,
            };
            res.json(await this.userService.login(loginData));
        } catch (err: any) {
            res.json({ status: false, message: err.message });
        }
    }

    @httpPost("/logout", loginMiddleware)
    async logout(req: Request, res: Response) {
        try {
            res.json(await this.userService.logout(req.headers.userId as string));
        } catch (err: any) {
            res.json({ status: false, message: err.message });
        }
    }

    @httpPost("/signup", upload.single("profile"))
    async signup(req: Request, res: Response) {
        try {
            let signupData = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
            } as IuserModel;

            if (req.file) {
                signupData = {
                    ...signupData,
                    profile: req.file.filename,
                };
            }
            res.json(await this.userService.signup(signupData));
        } catch (err: any) {
            res.json({ status: false, message: err.message });
        }
    }

    @httpPut("/updateProfile", upload.single("profile"), loginMiddleware)
    async updateProfile(req: Request, res: Response) {
        try {
            let updateData = req.body as IuserModel;
            if (updateData.password) {
                const hashedPassword = await bcrypt.hash(updateData.password, 10);
                updateData.password = hashedPassword;
            }

            if (req.file) {
                updateData = {
                    ...updateData,
                    profile: req.file.filename,
                };
            }
            const data = await this.userService.updateProfile(
                req.headers.userId as string,
                updateData
            );
            res.json(data);
        } catch (err: any) {
            res.json({ status: false, message: err.message });
        }
    }

    @httpGet("/getDetails", loginMiddleware)
    async getDetails(req: Request, res: Response) {
        try {
            res.json(await this.userService.getDetails(req.headers.userId as string));
        } catch (err: any) {
            res.json({ status: false, message: err.messsage });
        }
    }

    @httpGet("/getHistory", loginMiddleware)
    async getHistory(req: Request, res: Response) {
        try {
            res.json(await this.userService.getHistory(req.headers.userId as string));
        } catch (err: any) {
            res.json({ status: false, message: err.messsage });
        }
    }

    @httpGet("/getStats", loginMiddleware)
    async getStats(req: Request, res: Response) {
        try {
            res.json(await this.userService.getStats(req.headers.userId as string));
        } catch (err: any) {
            res.json({ status: false, message: err.messsage });
        }
    }
}
