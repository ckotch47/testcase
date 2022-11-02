// eslint-disable-next-line
const jestExpect = (global as any).expect;

interface JestReponse {
  pass: boolean;
  message: () => string;
}

jestExpect.extend({
  // eslint-disable-next-line
  nullOrArray: function (this: jest.MatcherContext, received: any) {
    return {
      pass: received === null || typeof received === 'string' || received instanceof Array,
      message: (): string =>
        `expected null or instance of ${this.utils.printExpected(String)}, but received ${this.utils.printReceived(
          received,
        )}`,
    };
  },
  // eslint-disable-next-line
  nullOrString(this: jest.MatcherContext, received: any) {
    return {
      pass: received === null || typeof received === 'string' || received instanceof String,
      message: (): string =>
        `expected null or instance of ${this.utils.printExpected(String)}, but received ${this.utils.printReceived(
          received,
        )}`,
    };
  },
  // eslint-disable-next-line
  nullOrNumber(this: jest.MatcherContext, received: any) {
    return {
      pass: received === null || typeof received === 'number' || received instanceof Number,
      message: (): string =>
        `expected null or instance of ${this.utils.printExpected(String)}, but received ${this.utils.printReceived(
          received,
        )}`,
    };
  },
  // eslint-disable-next-line
  nullOrObject(this: jest.MatcherContext, received: any) {
    return {
      pass: received === null || typeof received === 'object' || received instanceof Object,
      message: (): string =>
        `expected null or instance of ${this.utils.printExpected(String)}, but received ${this.utils.printReceived(
          received,
        )}`,
    };
  },
  // eslint-disable-next-line
  nullOrBoolean(this: jest.MatcherContext, received: any) {
    return {
      pass: received === null || typeof received === 'boolean' || received instanceof Boolean,
      message: (): string =>
        `expected null or instance of ${this.utils.printExpected(String)}, but received ${this.utils.printReceived(
          received,
        )}`,
    };
  },
});

declare global {
  // Доавляет в namespase jest
  // eslint-disable-next-line
  namespace jest {
    // В интерфейс Expect Новые методы для сравнения
    interface Expect {
      nullOrArray(): JestReponse;
      nullOrString(): JestReponse;
      nullOrNumber(): JestReponse;
      nullOrObject(): JestReponse;
      nullOrBoolean(): JestReponse;
    }
  }
}
export {};
