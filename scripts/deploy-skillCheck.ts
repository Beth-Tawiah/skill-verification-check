
    import { ethers } from "hardhat";
import { skillCheckSol } from "../typechain-types";

async function main() {
    const skillCheck = await ethers.deployContract("skillCheck");

    await skillCheck.waitForDeployment();

    console.log(`skill check deployed to ${skillCheck.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});