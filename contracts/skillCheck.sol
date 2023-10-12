// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SkillCheck {
    enum CredentialStatus {
        Pending,
        Endorsed,
        Flagged
    }

    // Structure for credentials
    struct Credential {
        string skill;
        string level;
        address owner;
        CredentialStatus status;
    }

    

    // Store credentials according to owner's address
    mapping(address => Credential[]) public credentials;
    mapping(address => bool) public trustedSources;
    mapping(address => bool) public trustedReferees;

    // Log credentials issued
    event CredentialIssued(address indexed owner, string skill, string level);
    event CredentialVerified(
        address indexed owner,
        uint index,
        CredentialStatus status
    );

    // Issue New Digital Credential
    function issueCredential(
        string memory _skill,
        string memory _level
    ) public {
        Credential memory newCredential = Credential({
            skill: _skill,
            level: _level,
            owner: msg.sender,
            status: CredentialStatus.Pending
        });

        credentials[msg.sender].push(newCredential);
        emit CredentialIssued(msg.sender, _skill, _level);
    }

    // Verify a credential by a trusted source
    modifier onlyTrustedSource {
        require(trustedSources[msg.sender], "Only Trusted Source can Verify Credentials");
        _;
    }

    function verifyCredential(
        address _owner,
        uint256 _credentialIndex
    ) public onlyTrustedSource {
        require(_credentialIndex < credentials[_owner].length, "Invalid Credential");
        
        Credential storage credential = credentials[_owner][_credentialIndex];
        credential.status = CredentialStatus.Endorsed;
        emit CredentialVerified(_owner, _credentialIndex, CredentialStatus.Endorsed);
    }

    // Verify Credentials status and if valid or Invalid
    modifier onlyTrustedReferee {
        require(trustedReferees[msg.sender], "Only Trusted Referee can Reach Consensus");
        _;
    }

    function reachConsensus(
        address _owner,
        uint256 _credentialIndex,
        CredentialStatus _consensus
    ) public onlyTrustedReferee {
        require(_credentialIndex < credentials[_owner].length, "Invalid credential index");

        Credential storage credential = credentials[_owner][_credentialIndex];
        credential.status = _consensus;
        emit CredentialVerified(_owner, _credentialIndex, _consensus);
    }

    // Add a Trusted Source
    function addTrustedSource(address _source) public {
        require(!trustedSources[_source], "Source is already Trusted");
        trustedSources[_source] = true;
    }

    // Add a Trusted Referee
    function addTrustedReferee(address _referee) public {
        require(!trustedReferees[_referee], "Referee is already Trusted");
        trustedReferees[_referee] = true;
    }

    // Get the count of credentials for a specific owner
    function getCredentialsCount(address _owner) public view returns (uint256) {
        return credentials[_owner].length;
    }

    // Get a specific credential for an owner
    function getCredential(
        address _owner,
        uint256 _credentialIndex
    )
        public
        view
        returns (
            string memory skill,
            string memory level,
            address owner,
            CredentialStatus status
        )
    {
        require(_credentialIndex < credentials[_owner].length, "Invalid credential index");

        Credential storage credential = credentials[_owner][_credentialIndex];
        return (
            credential.skill,
            credential.level,
            credential.owner,
            credential.status
        );
    }

    // Get a list of all credentials for a specific owner
    function getCredentials(
        address _owner
    ) public view returns (Credential[] memory) {
        return credentials[_owner];
    }
}
