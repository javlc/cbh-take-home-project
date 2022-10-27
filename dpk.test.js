const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the value event.partitionKey when passed a valid object as input.", () => {
    const event = { partitionKey: "myEventPartitionKey" };
    const eventPartitionKey = deterministicPartitionKey(event);
    expect(eventPartitionKey).not.toBe("0");
    expect(eventPartitionKey).toBe(event.partitionKey);
  });

  it("Returns a data type of 'string' when given number input", () => {
    const eventPartitionKey = deterministicPartitionKey(123456789);
    const dpkDataType = typeof eventPartitionKey;
    expect(dpkDataType).toBe("string");
  });

  it("Returns a data type of 'string' when given array input", () => {
    const arrayInput = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const eventPartitionKey = deterministicPartitionKey(arrayInput);
    const dpkDataType = typeof eventPartitionKey;
    expect(dpkDataType).toBe("string");
  });

  it("Returns a data type of 'string' when given object input", () => {
    const objectInput = { key1: false, key2: 13, key3: [1, "2", true] };
    const eventPartitionKey = deterministicPartitionKey(objectInput);
    const dpkDataType = typeof eventPartitionKey;
    expect(dpkDataType).toBe("string");
  });
  it("Returned string is always less than or equal to 256 in length.", () => {
    const event = {
      partitionKey:
        "looongStringCopiedMultipleTimeslooongStringCopiedMultipleTimeslooongStringCopiedMultipleTimeslooongStringCopiedMultipleTimeslooongStringCopiedMultipleTimeslooongStringCopiedMultipleTimeslooongStringCopiedMultipleTimeslooongStringCopiedMultipleTimeslooongStringCopiedMultipleTimes",
    };
    const longStringKey = deterministicPartitionKey(event);

    expect(longStringKey.length).toBeLessThanOrEqual(256);
  });
  // it("", () => {});
});
