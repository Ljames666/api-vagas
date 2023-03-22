import { TipoUser, User } from "./user.model";

export class Candidato extends User {
  constructor(nome: string, username: string, senha: string) {
    super("", nome, username, senha, TipoUser.Candidato);
  }
}
