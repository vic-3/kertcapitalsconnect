import './App.css';
import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { mainnet, bsc, polygon, arbitrum, base, optimism } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Airdrops from './pages/Airdrops';
import Tokenomics from './pages/Tokenomics';

const projectId = 'efcba8d13491798a9449bfe4a8484273'

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

// Define networks
const networks = [mainnet, bsc, polygon, arbitrum, base, optimism]

// Create wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false
})

// Create the AppKit instance
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'KertCapitalsConnect',
    description: 'Premium Web3 Airdrop Distribution Platform',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://kertcapitalsconnect.com',
    icons: ['https://kertcapitalsconnect.com/icon.png']
  },
  features: {
    analytics: true,
  }
})

function App() {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;