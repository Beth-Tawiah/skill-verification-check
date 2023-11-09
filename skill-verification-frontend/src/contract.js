import { ethers } from "ethers";
import ABI from "./abi.json";

const CONTRACT_ADDRESS = "0x0303fa521c87ac696E0F02099A48078EBEfEaC5d";

export const skills = new ethers.Contract(CONTRACT_ADDRESS, ABI);
//skill check deployed to 0x0BCE53f31d105ba2EAE105Ff219785BCCE9131C1