const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying CertificateVerification contract...");

  const Certificate = await hre.ethers.getContractFactory(
    "CertificateVerification"
  );

  const contract = await Certificate.deploy();

  // ethers v6 FIX
  await contract.waitForDeployment();

  const address = await contract.getAddress();

  console.log("✅ Contract deployed successfully!");
  console.log("📌 Contract address:", address);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
