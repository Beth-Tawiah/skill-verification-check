import { ethers } from 'hardhat';
import { Signer, Contract, ContractFactory } from 'ethers';
import { expect } from 'chai';

const contractAddress = '0xYourContractAddress'; // Replace with your contract's actual address
const contractABI = [
  // ... (your contract's ABI)
];

describe('SkillCheck Contract', () => {
  let SkillCheck: ContractFactory;
  let skillCheck: Contract;
  let owner: Signer;
  let trustedSource: Signer;
  let trustedReferee: Signer;

  beforeEach(async () => {
    [owner, trustedSource, trustedReferee] = await ethers.getSigners();
    SkillCheck = await ethers.getContractFactory('SkillCheck');
    skillCheck = await SkillCheck.deploy() as Contract;
    await skillCheck.deployed();
  });

  it('Should issue a new credential', async () => {
    const skill = 'Programming';
    const level = 'Expert';

    const ownerSkillCheck = skillCheck.connect(owner);
    await ownerSkillCheck.issueCredential(skill, level);
    const credentialCount = await skillCheck.getCredentialsCount(await owner.getAddress());
    expect(credentialCount).to.equal(1);

    const [credential] = await skillCheck.getCredentials(await owner.getAddress());
    expect(credential.skill).to.equal(skill);
    expect(credential.level).to.equal(level);
    expect(credential.owner).to.equal(await owner.getAddress());
    expect(credential.status).to.equal(0); // CredentialStatus.Pending
  });

  it('Should allow trusted source to verify a credential', async () => {
    const [credential] = await skillCheck.getCredentials(await owner.getAddress());

    await skillCheck.addTrustedSource(await trustedSource.getAddress());
    await skillCheck.connect(trustedSource).verifyCredential(credential.owner, 0);

    const [, , , status] = await skillCheck.getCredential(credential.owner, 0);
    expect(status).to.equal(1); // CredentialStatus.Endorsed
  });

  it('Should allow trusted referee to reach consensus on a credential', async () => {
    const [credential] = await skillCheck.getCredentials(await owner.getAddress());

    await skillCheck.addTrustedReferee(await trustedReferee.getAddress());
    await skillCheck.connect(trustedReferee).reachConsensus(credential.owner, 0, 2); // CredentialStatus.Flagged

    const [, , , status] = await skillCheck.getCredential(credential.owner, 0);
    expect(status).to.equal(2); // CredentialStatus.Flagged
  });
});
