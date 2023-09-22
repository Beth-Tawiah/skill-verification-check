// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract skillCheck {
    enum CredentialStatus{Pending, Endorsed, Flagged}

    //Structure for credentials 
    struct Credential{
        string skill;
        string level;
        address owner;
        CredentialStatus status;
    }

    //store credentials according to owners address
    mapping(address=> Credential[]) public credentials;
    mapping(address => bool) public trustedSources;

    //log credentials issued 
    event CredentialIssued(address indexed owner,string skill, string level);
    event CredentialVerified(address indexed owner,unit256 index, CredentialStatus status);

    //Issue New Digital Credential
    function issueCredential(string memory  _skill, string memory _level)public{
        Credential storage newCredentials = Credential({
            skill: _skill,
            level: _level,
            owner: msg.sender,
            isVerified: false
        });

        credentials[msg.sender].push(newCredential);
        emit CredentialIssued(msg.sender, _skill, _level);
    }
      // verify a credential by trusted source
    function verifyCredential(address _owner, uint256 _credentialIndex) public onlyTrustedSource {
    Credential storage credential = credentials[_owner][_credentialIndex];
    
    
    //Add a Trusted Source
    function addtrustedSource(address _sources)public{
        require(!trustedSources[_sources], "Sources is already Trusted");
        trustedSources[_sources]=true;
    }


        //Verify a credential by a trusted users 
    function verifyCredential(address _owner, unit256 _CredentialIndex)public{
    //[Perform id verification of the trusted user]
    //mapping to store trustedSources 
    mapping(address => bool) public trustedSources;
    require(msg.sender==trustedSourceAddress, "Only Trusted Source can Verify Credentials")
    Credential storage credential = credentials[_owner][_credentialIndex];
    credential.isVerified == true;
    }

  redential.isVerified = true;
}
    //verify Credentials status and  if valid or Invalid 

    function  verifyCredential(address _owner, unit256 _credentialIndex)public onlyTrustedSource{
        require(_credentialIndex < credentials[_owner].length, "Invalid Credential");

        Credential storage credential = credentials[_owner][_credentialIndex];
        credential.status = CredentialStatus.Pending;
        emit CredentialVerified(_owner, _credentialIndex, CredentialStatus.Pending);
    }
    function reachConsensus(address _owner, uint256 _credentialIndex, CredentialStatus _consensus) public onlyTrustedReferee {
        require(_credentialIndex < credentials[_owner].length, "Invalid credential index");

        Credential storage credential = credentials[_owner][_credentialIndex];
        credential.status = _consensus;
        emit CredentialVerified(_owner, _credentialIndex, _consensus);
    }

    function addTrustedReferee(address _referee) public {
        require(!trustedReferees[_referee], "Referee is already trusted");
        trustedReferees[_referee] = true;
    }  

    function getCredentialsCount(address _owner) public view returns (uint256) {
        return credentials[_owner].length;
    }

    function getCredential(address _owner, uint256 _credentialIndex) public view returns (string memory skill, string memory level, address owner, CredentialStatus status) {
        require(_credentialIndex < credentials[_owner].length, "Invalid credential index");
        
        if(credential.status == CredentialStatus.Endorsed){
            return ("Endorsed");
        } else if (credential.status == CredentialStatus.Flagged) {
            return "flagged";
        } else {
            return "pending";
        }
        Credential storage credential = credentials[_owner][_credentialIndex];
        return (credential.skill, credential.level, credential.owner, credential.status);
    }
}  
        
//List of all credentials for a specific owner
    function getCredentials(address _owner) public
    view returns (Credential[] memory){
        return credentials[_owner];
    
    }
  
}
