const hre = require("hardhat");

async function main() {
  const Lock = await hre.ethers.getContractFactory("Artist3");
  const lock = await Lock.deploy(
    "Artist3",
    "A3",
    "0xe22eCBbA8fB9C0124eeCb6AfE0bf6A487424989f",
    0
  );

  await lock.deployed();

  console.log(`Artist3 Contract deployed to ${lock.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
