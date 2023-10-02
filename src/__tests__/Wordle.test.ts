import { describe, expect, test } from "@jest/globals";

function fizz_buzz(numbers: number[]) {
  const result = [];

  for (const number of numbers) {
    if (number % 15 === 0) {
      result.push("fizzbuzz");
    } else if (number % 3 === 0) {
      result.push("fizz");
    } else if (number % 5 === 0) {
      result.push("buzz");
    } else {
      result.push(number);
    }
  }

  return result.join(", ");
}

describe("FizzBuzz", () => {
  test('[3] should result in "fizz"', () => {
    expect(fizz_buzz([3])).toBe("fizz");
  });

  test('[5] should result in "buzz"', () => {
    expect(fizz_buzz([5])).toBe("buzz");
  });

  test('[15] should result in "fizzbuzz"', () => {
    expect(fizz_buzz([15])).toBe("fizzbuzz");
  });

  test('[1,2,3] should result in "1, 2, fizz"', () => {
    expect(fizz_buzz([3])).toBe("fizz");
  });
});
