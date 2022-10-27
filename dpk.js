const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  // Helper function to generate the DPK when needed
  const createDpk = (value) => {
    // checks that the value is a string and casts one otherwise
    const pkString = typeof value !== "string" ? JSON.stringify(value) : value;
    // applies cryptography
    return crypto.createHash("sha3-512").update(pkString).digest("hex");
  };

  candidate =
    (event && (event?.partitionKey || createDpk(event))) ||
    TRIVIAL_PARTITION_KEY;

  candidate =
    typeof candidate !== "string" ? JSON.stringify(candidate) : candidate;

  candidate =
    candidate.length > MAX_PARTITION_KEY_LENGTH
      ? createDpk(candidate)
      : candidate;

  return candidate;
};
