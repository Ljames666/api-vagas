import { DataBaseConnection } from "../../../../../src/main/database/typeorm.connection";
import { RedisConnection } from "../../../../../src/main/database/redis.connection";
import { UsuarioRepository } from "../../../../../src/app/features/usuario/repositories/usuario.repository";
import { FindAllUsuarioUseCase } from "../../../../../src/app/features/usuario/usecases/findAllusuarios.usecase";
import { CacheRepository } from "../../../../../src/app/shared/database/repositories/cache.repository";
import { UserEntity } from "../../../../../src/app/shared/entities/user.entity";

describe("Listar usuários", () => {
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
    const usecase = new FindAllUsuarioUseCase(repository);

    return {
      sut: usecase,
      repository,
    };
  };

  test("Deveria retonar os usuários cadastrados", async () => {
    const { sut } = makeSut();

    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);
    jest.spyOn(CacheRepository.prototype, "setEX").mockResolvedValue();

    const result = await sut.execute();

    expect(result).toBeDefined();
    expect(result).toHaveLength(2);
  });
});
