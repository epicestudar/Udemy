import express from "express";
import { routes } from "./routes/index.js";
const app = express();
routes(app);
app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
});
//# sourceMappingURL=index.js.map