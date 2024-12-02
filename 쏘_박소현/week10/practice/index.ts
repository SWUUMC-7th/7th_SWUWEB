// const str1: string = 123;

const str2: string = "123";

const num1: number = 123;

// const num2: number = "123";

function isTrue(value: boolean): boolean {
  return value;
}

const result1: boolean = isTrue(true);
// const result2: boolean = isTrue("true");

function getValue(): null {
  return null;
}

const result3: null = getValue();

// const result4: null = getValue() + 1;

function getUndefined(): undefined {
  return undefined;
}

const result5: undefined = getUndefined();
// const result6: undefined = 123;

function getSymbol(): symbol {
  return Symbol("unique");
}

const sym1: symbol = getSymbol();
// const sym2: symbol = "not a symbol";

function getBigInt(): bigint {
  return 123n;
}

const bigValue1: bigint = getBigInt();

// const bigValue2: bigint = 123;

function getObject(): object {
  return { key: "value" };
}

const obj1: object = getObject();
// const obj2: object = "not an object";
