import './App.css';
import { createConfig, WagmiProvider, reconnect } from 'wagmi'
import { http } from 'wagmi'
import { bsc, mainnet, arbitrum, optimism, polygon, base } from 'wagmi/chains'
import { walletConnect, metaMask, injected, coinbaseWallet } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Airdrops from './pages/Airdrops';
import Tokenomics from './pages/Tokenomics';

const projectId = '2c515028cc183de99fa6a655231e348b'

// Create a query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

// Create wagmi config with optimizations
const config = createConfig({
  chains: [mainnet, bsc, polygon, arbitrum, base, optimism],
  connectors: [
    metaMask({ dappMetadata: { name: 'KertCapitalsConnect' } }),
    injected({ target: 'metaMask' }),
    coinbaseWallet({ 
      appName: 'KertCapitalsConnect',
      appLogoUrl: 'https://kertcapitalsconnect.com/icon.png'
    }),
    walletConnect({ 
      projectId: projectId,
      metadata: {
        name: 'KertCapitalsConnect',
        description: 'Premium Web3 Airdrop Distribution Platform',
        url: 'https://kertcapitalsconnect.com',
        icons: ['https://kertcapitalsconnect.com/icon.png']
      },
      showQrModal: false, // Prevent automatic QR modal for faster mobile connections
    }),
  ],
  transports: {
    [mainnet.id]: http(`https://eth-mainnet.alchemyapi.io/v2/hP6CpRTZybyLdjDaD_PE4qZD2ZlMgkQF`, {
      batch: true,
      fetchOptions: {
        timeout: 10000,
      }
    }),
    [bsc.id]: http('https://bsc-dataseed.binance.org', {
      batch: true,
      fetchOptions: { timeout: 10000 }
    }),
    [polygon.id]: http('https://polygon-rpc.com', {
      batch: true,
      fetchOptions: { timeout: 10000 }
    }),
    [arbitrum.id]: http('https://arb1.arbitrum.io/rpc', {
      batch: true,
      fetchOptions: { timeout: 10000 }
    }),
    [base.id]: http('https://mainnet.base.org', {
      batch: true,
      fetchOptions: { timeout: 10000 }
    }),
    [optimism.id]: http('https://mainnet.optimism.io', {
      batch: true,
      fetchOptions: { timeout: 10000 }
    }),
  },
  ssr: false, // Disable SSR for better client performance
  multiInjectedProviderDiscovery: false, // Faster discovery
})

// Pre-initialize connection attempts
const initializeConnection = async () => {
  try {
    await reconnect(config)
  } catch (error) {
    console.log('No previous connection to restore')
  }
}

// Initialize connection on module load
if (typeof window !== 'undefined') {
  initializeConnection()
}

function App() {
  useEffect(() => {
    // Eager connection attempt on app load
    const connectEagerly = async () => {
      try {
        await reconnect(config)
      } catch (error) {
        // Silently handle connection errors
      }
    }
    
    connectEagerly()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config} reconnectOnMount={true}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="airdrops" element={<Airdrops />} />
              <Route path="tokenomics" element={<Tokenomics />} />
            </Route>
          </Routes>
        </Router>
      </WagmiProvider>
    </QueryClientProvider>
  );
}

export default App;