const { Crypt } = require("../src/utils/crypt/crypt");

process.env.CRYPTO_IV =
  "d56efa06cc71921dda7c17576e17e71d848eb525ae763a940810d13f1ee64bc0";

describe("Unit tests for AES Crypt", () => {
  let crypt = new Crypt();

  it("Test encrypt and decrypt", () => {
    const toyoId = "4BrO23lLIa";
    const key =
      "0x44c65c0d15ebce6578e11b728df1d145c27b0dbca1bfe541f5a2c4feb1ec8dd6";

    const cypher = crypt.encrypt(toyoId, key);
    console.log(cypher);
    const decodedToyoId = crypt.decrypt(cypher, key);

    expect(toyoId).toEqual(decodedToyoId);
  });

  it("Test  decrypt", () => {
    const toyoId = "01wecM9g39";
    const key =
      "0x4cc78e7a8f6621f3a5aace64e99e2bf6af1098f38ee788ab95dbb8dd45b00f37";

    const cypher = crypt.encrypt(toyoId, key);
    console.log(cypher);

    // const decodedToyoId = crypt.decrypt(
    //   "5b3c00a96fe4418b89849b0ed16f2cac",
    //   key
    // );

    // expect(decodedToyoId).toEqual(toyoId);
  });
});
