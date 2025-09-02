import './App.css';
import { createConfig, WagmiProvider } from 'wagmi'
import { http } from 'wagmi'
import { bsc, mainnet, arbitrum, optimism, polygon, base } from 'wagmi/chains'
import { walletConnect, metaMask, injected, coinbaseWallet } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Airdrops from './pages/Airdrops';
import Tokenomics from './pages/Tokenomics';

const projectId = '2c515028cc183de99fa6a655231e348b'

// Create a query client
const queryClient = new QueryClient()

// Create wagmi config
const config = createConfig({
  chains: [mainnet, bsc, polygon, arbitrum, base, optimism],
  connectors: [
    metaMask(),
    injected(),
    coinbaseWallet({ appName: 'KertCapitalsConnect' }),
    walletConnect({ 
      projectId: projectId,
      metadata: {
        name: 'KertCapitalsConnect',
        description: 'Premium Web3 Airdrop Distribution Platform',
        url: 'https://kertcapitalsconnect.com',
        icons: ['https://kertcapitalsconnect.com/icon.png']
      }
    }),
  ],
  transports: {
    [mainnet.id]: http(`https://eth-mainnet.alchemyapi.io/v2/hP6CpRTZybyLdjDaD_PE4qZD2ZlMgkQF`),
    [bsc.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
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