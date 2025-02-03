import { Joi } from "celebrate";
export class User {
    id;
    nome;
    email;
    password;
    constructor(data) {
        this.id = data.id;
        this.nome = data.nome;
        this.email = data.email;
        this.password = data.password;
    }
}
;
export const newUserSchema = Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});
export const updateUserSchema = Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6)
});
export const authLoginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});
export const authRecoverySchema = Joi.object().keys({
    email: Joi.string().email().required()
});
export const userConverter = {
    toFirestore: (user) => {
        return {
            nome: user.nome,
            email: user.email,
        };
    },
    fromFirestore: (snapshot) => {
        return new User({
            id: snapshot.id,
            ...snapshot.data()
        });
    }
};
//# sourceMappingURL=user.model.js.map