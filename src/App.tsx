import { useState, useEffect } from 'react'
import './App.css'

import {Box, Button, Card} from '@0xsequence/design-system'
import { sequence } from '0xsequence'
import { Session } from '@0xsequence/auth'
import { ethers } from 'ethers';

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

  sequence.initWallet({defaultNetwork: 'arbitrum-nova', projectAccessKey: 'tDhYCwkYMCT6dPrEPpqS02MBAAAAAAAA'} as any)

  const connect = async () => {
    const wallet = sequence.getWallet()
    const details = await wallet.connect({
      app: 'app',
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
      const provider = new ethers.providers.JsonRpcProvider('https://nodes.sequence.app/mainnet')

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
        {proof ? <p>best not to share this ETHAuthProof with anyone</p> : null }
        <br/>
        {proof ? <Card>
          <p style={{width: '701px', wordWrap: 'break-word'}}>{proof}</p>
          <br/>
          {proof ? <Button label="copy to clipboard" onClick={() => copy(proof)}/> : null }
        </Card> : null }
      </Box>
      <br/>
      <Box>
        <Button label="connect" variant='primary' onClick={() => connect()}/>
        <br/>
        <br/>
        {isCopied ? <><p style={{color: 'lime'}}>copied!</p></> : null }
        <hr style={{color: 'white'}}/>
        <br/>
        <Button label="generate local wallet" onClick={() => generate()}/>
        <br/>
        <br/>
        {walletAddress ? <Card>
          <p style={{width: '701px', wordWrap: 'break-word'}}>address: {walletAddress}</p>
          <br/>
          {walletAddress ? <Button label="copy to clipboard" onClick={() => copy(walletAddress)}/> : null }
          <br/>
          <br/>
          <p style={{width: '701px', wordWrap: 'break-word'}}>privateKey: {privateKey}</p>
          <br/>
          {privateKey ? <Button label="copy to clipboard" onClick={() => copy(privateKey)}/> : null }
        </Card> : null }
      </Box>
    </>
  )
}

export default App
