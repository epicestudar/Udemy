export class ErrorBase extends Error {
    status;
    constructor(status, message) {
        super(message);
        this.status = status;
    }
    send(res) {
        res.status(this.status).send({
            message: this.message,
        });
    }
}
//# sourceMappingURL=base.error.js.map