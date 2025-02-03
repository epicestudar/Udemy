import { Joi } from "celebrate";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";

export class Category {
  id: string;
  descricao: string;
  ativa: boolean;

  constructor(data: Category | any) {
    this.id = data.id;
    this.descricao = data.descricao;
    this.ativa = data.ativa ?? true;
  }
};

export const newCategorySchema = Joi.object().keys({
  descricao: Joi.string().required(),
  ativa: Joi.boolean().only().allow(true).default(true),
});

  export const updateCategorySchema = Joi.object().keys({
    descricao: Joi.string().required(),
    ativa: Joi.boolean().required(),
  });

  export const categoryConverter: FirestoreDataConverter<Category> = {
    toFirestore: (category: Category): DocumentData => {
      return {
      descricao: category.descricao,
      ativa : category.ativa,
      }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): Category => {
      return new Category({
        id: snapshot.id,
        ...snapshot.data()
      });
    }
  }