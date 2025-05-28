import { useState, useMemo, useCallback, useEffect } from "react";
import "./App.css";

import { Button, Card, Select } from "@0xsequence/design-system";
import { sequence } from "0xsequence";
import { Session } from "@0xsequence/auth";
import { ethers } from "ethers";
// import { Network, networks } from "./networks";
import CopyableText from "./CopyableText";
import { allNetworks } from "@0xsequence/network";

function App() {
  const projectAccessKey = import.meta.env.VITE_PROJECT_ACCESS_KEY;

  const [network, setNetwork] = useState<sequence.network.NetworkConfig | undefined>();
  const [proof, setProof] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");

  useEffect(()=> {
    setProof("")
  },[network])

  const connectAndGetProof = useCallback(async (chainId: number) => {
    console.log(chainId)
    sequence.initWallet(projectAccessKey, {
      defaultNetwork: chainId,
    });
    const wallet = sequence.getWallet();
    const details = await wallet.connect({
      app: "eth auth proof viewer",
      authorize: true,
    });

    if (details.connected && details.proof?.proofString) {
      setProof(details.proof.proofString);
    }
  }, []);

  const [generatingLocalWallet, setGeneratingLocalWallet] = useState(false);

  const generate = useCallback(async () => {
    setGeneratingLocalWallet(true);
    // Generate a new EOA
    const wallet = ethers.Wallet.createRandom();
    const privateKey = wallet.privateKey;

    // Or, use an existing EOA private key
    const provider = new ethers.JsonRpcProvider(
      `https://nodes.sequence.app/${network}`,
    );

    // Create your server EOA
    const walletEOA = new ethers.Wallet(privateKey, provider);

    // Open a Sequence session, this will find or create
    // a Sequence wallet controlled by your server EOA
    const session = await Session.singleSigner({
      signer: walletEOA,
      projectAccessKey,
    });

    const signer = session.account.getSigner(1);

    setWalletAddress(signer.account.address);
    setPrivateKey(privateKey);

    setGeneratingLocalWallet(false);
  }, []);

  const dropdownOptions = useMemo(() => {
    const dropdownNetworks = allNetworks.map((n) => {
      return {
        label: n.title || n.name,
        value: n.name,
        disabled: false,
      };
    }).sort((a,b) => a.label.localeCompare(b.label));
    return [
      {
        label: "Choose your network",
        value: "no-network",
        disabled: true,
      },
    ].concat(dropdownNetworks);
  }, []);
  return (
    <>
      <Card>
        <h2>ETH Auth Proof Viewer</h2>
        <p className="text-xs text-gray-400">
          This tools helps developers retrieve their ethauthproof string for
          subsequent API calls
        </p>
        <br />
        <Select
          className="w-auto"
          name={"network-select"}
          options={dropdownOptions}
          defaultValue="no-network"
          onValueChange={(v) => {
            setNetwork(allNetworks.find((n) => n.name === v));
          }}
        />

        {network && (
          <>
            <br />
            <Button
              label="Connect and get proof"
              variant="primary"
              onClick={() => connectAndGetProof(network.chainId)}
            />
          </>
        )}
        {proof && (
          <>
            <br />
            <br />
            <p>
              Do not to share this{" "}
              <span style={{ color: "#2c7dff" }}>ETHAuthProof</span> with
              anyone:
            </p>
            <br />
            <Card>
              <CopyableText value={proof} />
            </Card>
          </>
        )}
      </Card>
      <br />
      {network && (
        <Card>
          <Button
            variant="feature"
            label={
              generatingLocalWallet ? "Generating..." : "Generate Local Wallet"
            }
            disabled={generatingLocalWallet}
            onClick={() => generate()}
          />
          <br />
          <br />
          {walletAddress && (
            <Card>
              Public Address:
              <CopyableText value={walletAddress} />
              <br />
              <p>Private Key:</p>
              <CopyableText value={privateKey} />
            </Card>
          )}
        </Card>
      )}
    </>
  );
}

export default App;
