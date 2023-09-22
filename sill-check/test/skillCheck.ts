import { ethers } from "hardhat";

const { expect } = require("chai");

describe("SkillCheck", function () {
  let skillCheckInstance: { issueCredential: (arg0: string, arg1: string) => any; getCredentialsCount: (arg0: any) => any; verifyCredential: (arg0: any, arg1: number, arg2: { from: any; }) => any; getCredential: (arg0: any, arg1: number) => any; };

  before(async () => {
    const SkillCheck = await ethers.getContractFactory("SkillCheck");
  });

  it("should issue a new credential", async () => {
    const owner = await ethers.getSigners();
    const skill = "Programming";
    const level = "Expert";

    await skillCheckInstance.issueCredential(skill, level);

    const credentials = await skillCheckInstance.getCredentialsCount(owner[0].address);
    expect(credentials.toNumber()).to.equal(1, "Credential was not issued correctly");
  });

  it("should verify a credential", async () => {
    const [owner, verifier] = await ethers.getSigners();
    const credentialIndex = 0;

    await skillCheckInstance.verifyCredential(owner.address, credentialIndex, { from: verifier.address });

    const credential = await skillCheckInstance.getCredential(owner.address, credentialIndex);
    expect(credential[3].toNumber()).to.equal(1, "Credential was not verified correctly");
  });
});
