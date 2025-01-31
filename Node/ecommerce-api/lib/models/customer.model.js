import Joi from "joi";
import { phoneRegexPattern } from "../utils/regex-utils.js";
export const customerSchema = Joi.object().keys({
    nome: Joi.string().trim().min(5).required(),
    telefone: Joi.string().regex(phoneRegexPattern).required()
});
//# sourceMappingURL=customer.model.js.map