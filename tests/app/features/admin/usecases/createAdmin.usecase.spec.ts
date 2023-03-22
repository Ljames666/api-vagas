import { DataBaseConnection } from "../../../../../src/main/database/typeorm.connection";
import { RedisConnection } from "../../../../../src/main/database/redis.connection";
import { UsuarioRepository } from "../../../../../src/app/features/usuario/repositories/usuario.repository";
import { CreateAdminUseCase } from "../../../../../src/app/features/admin/usecases/createAdmin.usecase";
import { CacheRepository } from "../../../../../src/app/shared/database/repositories/cache.repository";
import { UserEntity } from "../../../../../src/app/shared/entities/user.entity";

describe("Criar um usuário Admin", () => {
  beforeAll(async () => {
    await DataBaseConnection.connect();
    await RedisConnection.connect();
  });

  afterAll(async () => {
    // TODO! - Desconectar do DB e Cache
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const makeSut = () => {
    const repository = new UsuarioRepository();
    const usecase = new CreateAdminUseCase(repository);

    return {
      sut: usecase,
      repository,
    };
  };

  test("Deveria criar um usuário do tipo Admin", async () => {
    const { sut } = makeSut();

    // simular o comportamento do Cache
    jest.spyOn(CacheRepository.prototype, "del").mockResolvedValue();

    // jest.spyOn(UsuarioRepository.prototype, "criaUsuario").mockResolvedValue({
    //   id: "XXX",
    //   nome: "",
    //   username: "",
    // });

    const result = await sut.execute({
      nome: "Usuario",
      username: "guest",
      senha: "123456",
    });

    // Asserts
    expect(result).toBeDefined(); // Espero que o resultado esteja definido
    expect(result.id).toBeDefined();
    expect(result.username).toBe("guest");
  });
});
