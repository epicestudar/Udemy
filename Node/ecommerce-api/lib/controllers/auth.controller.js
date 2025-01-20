import { AuthService } from "../services/auth.service.js";
export class AuthController {
    static async login(req, res) {
        const { email, password } = req.body;
        const userRecord = await new AuthService().login(email, password);
        const token = await userRecord.user.getIdToken(true);
        res.send({
            token: token
        });
    }
}
//# sourceMappingURL=auth.controller.js.map