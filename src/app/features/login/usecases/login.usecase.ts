import { CriptoService } from "../../../shared/services/cripto.service";
import { UsuarioRepository } from "../../usuario/repositories/usuario.repository";

export interface LoginDto {
  username: string;
  senha: string;
}

export interface LoginRespostaDto {
  sucesso: boolean;
  mensagem: string;
  uuid?: string;
  token?: string;
}

export class LoginUseCase {
  constructor(private repository: UsuarioRepository) {}

  public async execute(data: LoginDto): Promise<LoginRespostaDto> {
    const usuario = await this.repository.obtemPorUserName(data.username);

    if (!usuario) {
      return {
        sucesso: false,
        mensagem: "Usuário não encontrado",
      };
    }

    const criptoService = new CriptoService();

    // teste
    // const x = await criptoService.criptografa("123456");
    // console.log(x);

    // verificar a senha
    const match = await criptoService.comparar(data.senha, usuario.senha);
    if (!match) {
      return {
        sucesso: false,
        mensagem: "Senha incorreta",
      };
    }

    return {
      sucesso: true,
      mensagem: "OK",
      uuid: usuario.id,
      token: "", // ??
    };
  }
}