import { useState, useEffect } from 'react'
import './App.css'

import {Box, Button, Card, Tag} from '@0xsequence/design-system'
import { sequence } from '0xsequence'
import { Session } from '@0xsequence/auth'
import { ethers } from 'ethers';

const networks = [
  {
    network: 'Ethereum',
    chainId: 1,
    chainHandle: 'mainnet',
  },
  {
    network: 'Arbitrum One',
    chainId: 42161,
    chainHandle: 'arbitrum',
  },
  {
    network: 'Arbitrum Nova',
    chainId: 42170,
    chainHandle: 'arbitrum-nova',
  },
  {
    network: 'Polygon',
    chainId: 137,
    chainHandle: 'polygon',
  },
  {
    network: 'Polygon zkEVM',
    chainId: 1101,
    chainHandle: 'polygon-zkevm',
  },
  {
    network: 'Base',
    chainId: 8453,
    chainHandle: 'base',
  },
  {
    network: 'Optimism',
    chainId: 10,
    chainHandle: 'optimism',
  },
  {
    network: 'Astar zkEVM',
    chainId: 3776,
    chainHandle: 'astar-zkevm',
  },
  {
    network: 'Avalanche',
    chainId: 43114,
    chainHandle: 'avalanche',
  },
  {
    network: 'HOME Verse',
    chainId: 19011,
    chainHandle: 'homeverse',
  },
  {
    network: 'BSC',
    chainId: 56,
    chainHandle: 'bsc',
  },
  {
    network: 'Gnosis',
    chainId: 100,
    chainHandle: 'gnosis',
  },
  {
    network: 'Xai',
    chainId: 660279,
    chainHandle: 'xai',
  },
  {
    network: 'Ethereum Sepolia',
    chainId: 11155111,
    chainHandle: 'sepolia',
  },
  {
    network: 'Arbitrum Sepolia',
    chainId: 421614,
    chainHandle: 'arbitrum-sepolia',
  },
  {
    network: 'Avalanche Testnet',
    chainId: 43113,
    chainHandle: 'avalanche-testnet',
  },
  {
    network: 'Base Sepolia',
    chainId: 84532,
    chainHandle: 'base-sepolia',
  },{
    network: 'XR Sepolia',
    chainId: 2730,
    chainHandle: 'xr-sepolia',
  },
  {
    network: 'Optimism Sepolia',
    chainId: 11155420,
    chainHandle: 'optimism-sepolia',
  },
  {
    network: 'Polygon Amoy',
    chainId: 80002,
    chainHandle: 'amoy',
  },
  {
    network: 'Astar zKyoto Testnet',
    chainId: 6038361,
    chainHandle: 'astar-zkyoto',
  },
  {
    network: 'BSC Testnet',
    chainId: 97,
    chainHandle: 'bsc-testnet',
  },
  {
    network: 'Xai Sepolia',
    chainId: 37714555429,
    chainHandle: 'xai-sepolia',
  }
]

const ColorfulText = ({ text }: any) => {
  const colors = ['#5b6bf5', '#75befb', '#aa4ee4'];  // Define your colors

  const coloredText = text.split('').map((char: any, index:any) => (
    <span key={index} style={{ color: colors[index % colors.length] }}>
      {char}
    </span>
  ));

  return <p>{coloredText}</p>;
};

function App() {
  const copyTextToClipboard = async (text: any) => {
    if ('clipboard' in navigator) {
          return await navigator.clipboard.writeText(text);
      } else {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
      }
  };

  const [proof, setProof] = useState<string>('')
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [privateKey, setPrivateKey] = useState<string>('')
  const [network, setNetwork] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)

  const connect = async () => {
    sequence.initWallet({defaultNetwork: network, projectAccessKey: 'AQAAAAAAAABem5byI8C2p-GSKx00BeuvaVo'} as any)
    const wallet = sequence.getWallet()
    const details = await wallet.connect({
      app: 'eth auth proof viewer',
      authorize: true
    })

    if(details.connected){
      setProof(details.proof?.proofString!)
    }
  }
  useEffect(() => {

  }, [isCopied])
  const copy = (text: string) => {
    setIsCopied(true)
    copyTextToClipboard(text)
    .then(() => {
      setTimeout(() => setIsCopied(false), 2000)
        console.log('Text successfully copied to clipboard');
    })
  }

  const generate = async () => {
    	// Generate a new EOA
      const wallet = ethers.Wallet.createRandom()
      const privateKey = wallet.privateKey

      // Or, use an existing EOA private key
      const provider = new ethers.providers.JsonRpcProvider(`https://nodes.sequence.app/${network}`)

      // Create your server EOA
      const walletEOA = new ethers.Wallet(privateKey, provider)

      // Open a Sequence session, this will find or create
      // a Sequence wallet controlled by your server EOA
      const session = await Session.singleSigner({
        signer: walletEOA,
        projectAccessKey: 'lzgYBJVkt1q3jhxfxAx59WTDAAAAAAAAA'
      })

      const signer = session.account.getSigner(1)

      setWalletAddress(signer.account.address)
      setPrivateKey(privateKey)
  }

  return (
    <>
      <Box>
      {!network ? <ColorfulText text="choose your network" /> : <p>chainId: {chainId}</p>}
        <br/>
        <div style={{width: '700px'}}>
        {
          networks.map((network: any) => {
            return <Tag onClick={() => {setChainId(network.chainId);setNetwork(network.chainHandle)}} style={{cursor: 'pointer'}} label={network.chainHandle} margin={"1"}/>
          })
        }
        </div>
      </Box>
      <br/>
      <Box>
        {proof ? <p>best not to share this <span style={{color: '#2c7dff'}}>ETHAuthProof</span> with anyone</p> : null }
        <br/>
        {proof ? <><Card>
          <p style={{width: '701px', wordWrap: 'break-word'}}>{proof}</p>
          <br/>
          {proof ? <Button label="copy to clipboard" onClick={() => copy(proof)}/> : null }
        </Card> <br/></>: null }
      </Box>
      { network ? <Box>
        <Button label="connect" variant='primary' onClick={() => connect()}/>
        <br/>
        <br/>
        {isCopied ? <><p style={{color: 'lime'}}>copied!</p></> : null }
        <hr style={{color: 'white'}}/>
        <br/>
        <Button label="generate local wallet" onClick={() => generate()}/>
        <br/>
        <br/>
        { walletAddress ? <Card>
          <p style={{width: '701px', wordWrap: 'break-word'}}>address: {walletAddress}</p>
          <br/>
          {walletAddress ? <Button label="copy to clipboard" onClick={() => copy(walletAddress)}/> : null }
          <br/>
          <br/>
          <p style={{width: '701px', wordWrap: 'break-word'}}>privateKey: {privateKey}</p>
          <br/>
          {privateKey ? <Button label="copy to clipboard" onClick={() => copy(privateKey)}/> : null }
        </Card> : null }
      </Box> : null }
    </>
  )
}

export default App
