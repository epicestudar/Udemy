import { AuthService } from "../services/auth.service.js";
export class AuthController {
    static async login(req, res) {
        const { email, password } = req.body;
        const userRecord = await new AuthService().login(email, password);
        const token = await userRecord.user.getIdToken(true);
        res.send({
            token: token,
        });
    }
    static async signin(req, res) {
        const userRecord = await new AuthService().signin();
        const token = await userRecord.user.getIdToken(true);
        res.send({
            token: token,
        });
    }
    static async recovery(req, res) {
        const { email } = req.body;
        await new AuthService().recovery(email);
        res.end();
    }
}
//# sourceMappingURL=auth.controller.js.map