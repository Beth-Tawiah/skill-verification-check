import { ethers } from "ethers";
import ABI from "./abi.json";

const CONTRACT_ADDRESS = "0x0303fa521c87ac696E0F02099A48078EBEfEaC5d";

export const voting = new ethers.Contract(CONTRACT_ADDRESS, ABI);