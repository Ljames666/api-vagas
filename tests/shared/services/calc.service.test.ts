import { Calculadora } from "../../../src/app/shared/services/calc.service";

describe("Conjunto de testes do componente Calculadora", () => {
  const makeSut = () => {
    return new Calculadora();
  };

  test("Deveria retornar 41 ao Somar 20 + 21", () => {
    const sut = makeSut();

    const resultado = sut.somar(20, 21);
    expect(resultado).toBe(41);
  });

  test("Deveria retornar -90 ao Somar -190 + 100", () => {
    const sut = makeSut();

    const resultado = sut.somar(-190, 100);
    expect(resultado).toBe(-90);
  });

  test("Deveria retornar 27 ao subtrair 13 de 40", () => {
    const sut = makeSut();

    const resultado = sut.subtrair(40, 13);
    expect(resultado).toBe(27);
  });
});
