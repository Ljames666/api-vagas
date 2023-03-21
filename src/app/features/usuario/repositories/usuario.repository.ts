import { DataBaseConnection } from "../../../../main/database/typeorm.connection";
import { User } from "../../../models/user.model";
import { UserEntity } from "../../../shared/entities/user.entity";

export class UsuarioRepository {
  private _repository = DataBaseConnection.connection.getRepository(UserEntity);

  public async criaUsuario(user: User) {
    const usuarioEntidade = this._repository.create({
      id: user.id,
      nome: user.nome,
      nomeEmpresa: user.nomeEmpresa,
      senha: user.senha,
      username: user.username,
      tipo: user.tipo,
    });
    const result = await this._repository.save(usuarioEntidade);

    return this.mapEntityToModel(result);
  }

  public async atualizar(nome: string, senha: string) {
    const result = await this._repository.findOneBy({
      nome,
    });

    if (senha) {
      result!.senha = senha;
    }

    await this._repository.save(result!);
  }

  public async obtemPorUserName(username: string) {
    const result = await this._repository.findOneBy({
      username,
    });

    if (!result) {
      return null;
    }

    return this.mapEntityToModel(result);
  }
  public async getAll() {
    const result = await this._repository.find();

    if (!result) {
      return null;
    }

    return result.map((user) => this.mapEntityToModel(user));
  }

  private mapEntityToModel(entity: UserEntity) {
    return User.create(entity.id, entity.nome, entity.username, entity.senha, entity.tipo, entity.nomeEmpresa);
  }
}
