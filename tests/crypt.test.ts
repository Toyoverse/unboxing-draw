const { Crypt } = require("../src/utils/crypt/crypt");

process.env.CRYPTO_IV =
  "9a6eac0b2b23d3605ca1f021d20b84da469829a133081dc4a4b3aba63e6a9660";

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
});
