// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SkillCheck {
    enum CredentialStatus {
        Pending,
        Endorsed,
        Flagged
    }

    struct Credential {
        string skill;
        string level;
        address owner;
        CredentialStatus status;
    }

    mapping(address => Credential[]) public credentials;
    mapping(address => bool) public trustedSources;
    mapping(address => bool) public trustedReferees;

    event CredentialIssued(address indexed owner, string skill, string level);
    event CredentialStatusChanged(address indexed owner, uint index, CredentialStatus status);

    function issueCredential(string memory _skill, string memory _level) public {
        Credential memory newCredential = Credential({
            skill: _skill,
            level: _level,
            owner: msg.sender,
            status: CredentialStatus.Pending
        });

        credentials[msg.sender].push(newCredential);
        emit CredentialIssued(msg.sender, _skill, _level);
    }

    modifier onlyTrustedSource {
        require(trustedSources[msg.sender], "Only Trusted Source can Verify Credentials");
        _;
    }

    function verifyCredential(address _owner, uint256 _credentialIndex) public onlyTrustedSource {
        require(_credentialIndex < credentials[_owner].length, "Invalid Credential");
        
        Credential storage credential = credentials[_owner][_credentialIndex];
        credential.status = CredentialStatus.Endorsed;
        emit CredentialStatusChanged(_owner, _credentialIndex, CredentialStatus.Endorsed);
    }

    modifier onlyTrustedReferee {
        require(trustedReferees[msg.sender], "Only Trusted Referee can Reach Consensus");
        _;
    }

    function reachConsensus(address _owner, uint256 _credentialIndex, CredentialStatus _consensus) public onlyTrustedReferee {
        require(_credentialIndex < credentials[_owner].length, "Invalid credential index");

        Credential storage credential = credentials[_owner][_credentialIndex];
        credential.status = _consensus;
        emit CredentialStatusChanged(_owner, _credentialIndex, _consensus);
    }

    function addTrustedSource(address _source) public {
        require(!trustedSources[_source], "Source is already Trusted");
        trustedSources[_source] = true;
    }

    function addTrustedReferee(address _referee) public {
        require(!trustedReferees[_referee], "Referee is already Trusted");
        trustedReferees[_referee] = true;
    }

    function getCredentialsCount(address _owner) public view returns (uint256) {
        return credentials[_owner].length;
    }

    function getCredential(address _owner, uint256 _credentialIndex) public view returns (Credential memory) {
        require(_credentialIndex < credentials[_owner].length, "Invalid credential index");
        return credentials[_owner][_credentialIndex];
    }

    function getCredentials(address _owner) public view returns (Credential[] memory) {
        return credentials[_owner];
    }
}
