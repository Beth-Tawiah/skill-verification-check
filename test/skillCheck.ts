// Import necessary libraries and artifacts
import { Contract } from 'ethers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('SkillCheck Contract', () => {
  let skillCheck: Contract;
  let owner: any;
  let trustedSource: any;
  let trustedReferee: any;

  before(async () => {
    [owner, trustedSource, trustedReferee] = await ethers.getSigners();

    // Deploy the SkillCheck contract
    const SkillCheck = await ethers.getContractFactory('SkillCheck');
    skillCheck = await SkillCheck.deploy();

    // Add trusted sources and referees
    await skillCheck.addTrustedSource(trustedSource.address);
    await skillCheck.addTrustedReferee(trustedReferee.address);
  });

  it('should issue a new credential', async () => {
    const skill = 'Programming';
    const level = 'Expert';

    await expect(skillCheck.issueCredential(skill, level))
      .to.emit(skillCheck, 'CredentialIssued')
      .withArgs(owner.address, skill, level);
  });

  it('should verify a credential by a trusted source', async () => {
    const credentialIndex = 0;

    await expect(skillCheck.verifyCredential(owner.address, credentialIndex))
      .to.emit(skillCheck, 'CredentialVerified')
      .withArgs(owner.address, credentialIndex, 1); // CredentialStatus.Endorsed
  });

  it('should reach consensus on a credential by a trusted referee', async () => {
    const credentialIndex = 0;
    const consensus = 2; // CredentialStatus.Flagged

    await expect(skillCheck.reachConsensus(owner.address, credentialIndex, consensus))
      .to.emit(skillCheck, 'CredentialVerified')
      .withArgs(owner.address, credentialIndex, consensus);
  });

  it('should get the count of credentials for an owner', async () => {
    const credentialsCount = await skillCheck.getCredentialsCount(owner.address);
    expect(credentialsCount).to.equal(1); // Assuming one credential has been issued
  });

  it('should get a specific credential for an owner', async () => {
    const credentialIndex = 0;
    const [skill, level, credentialOwner, status] = await skillCheck.getCredential(owner.address, credentialIndex);
    
    expect(skill).to.equal('Programming');
    expect(level).to.equal('Expert');
    expect(credentialOwner).to.equal(owner.address);
    expect(status).to.equal(2); // CredentialStatus.Flagged
  });

  it('should get a list of all credentials for an owner', async () => {
    const ownerCredentials = await skillCheck.getCredentials(owner.address);
    
    expect(ownerCredentials).to.have.lengthOf(1); // Assuming one credential has been issued
  });
});
