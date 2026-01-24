async function main() {
  const NeuroVault = await ethers.getContractFactory("NeuroVault");
  const contract = await NeuroVault.deploy();

  await contract.deployed();

  console.log("NeuroVault deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
