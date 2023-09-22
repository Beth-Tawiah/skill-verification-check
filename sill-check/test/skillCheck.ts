const skillCheck = artifacts.require("skillCheck");

contract("skillCheck", (accounts) => {
  let skillCheckInstance;

  before(async () => {
    skillCheckInstance = await skillCheck.deployed();
  });

  it("should issue a new credential", async () => {
    const owner = accounts[0];
    const skill = "Programming";
    const level = "Expert";

    await skillCheckInstance.issueCredential(skill, level, { from: owner });

    const credentials = await skillCheckInstance.getCredentialsCount.call(owner);
    assert.equal(credentials.toNumber(), 1, "Credential was not issued correctly");
  });

  it("should verify a credential", async () => {
    const owner = accounts[0];
    const credentialIndex = 0;

    await skillCheckInstance.verifyCredential(owner, credentialIndex, { from: accounts[1] });

    const credential = await skillCheckInstance.getCredential.call(owner, credentialIndex);
    assert.equal(credential[3].toNumber(), 1, "Credential was not verified correctly");
  });
});
