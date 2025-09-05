import WalletConnectBtn from '../components/button';
import { useConnect } from 'wagmi';

const Home = () => {
  const { isPending } = useConnect();

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-fluid text-center py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="mb-5">
                <div className="brand-logo d-inline-flex align-items-center justify-content-center mb-4 float-animation" style={{
                  width: '140px', 
                  height: '140px'
                }}>
                  <span className="text-white" style={{fontSize: '4rem', fontWeight: 'bold'}}>KC</span>
                </div>
              </div>
              
              <h1 className="display-3 display-custom gradient-text mb-4">
                Premium Web3 Airdrop Platform
              </h1>
          
              <p className="lead lead-custom mb-5 text-info" style={{maxWidth: '700px', margin: '0 auto'}}>
                Access exclusive token airdrops from top-tier Web3 projects. Connect your wallet and claim your share of the decentralized future.
              </p>

              <div className="alert alert-success border-0 mb-5 slide-in-up" style={{
                background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(129, 199, 132, 0.1))',
                borderRadius: '20px'
              }}>
                <div className="d-flex align-items-center justify-content-center">
                  <span className="me-3 fs-4">🚀</span>
                  <span className="fw-bold text-success fs-5">LIVE: 250,000 KC Tokens Available for Early Adopters</span>
                </div>
              </div>

              <button 
                className="btn btn-gradient-primary btn-lg px-5 py-4 rounded-pill fw-bold fs-5 btn-glow" 
                data-bs-toggle="modal" 
                data-bs-target="#claimAirdrop"
                disabled={isPending}
                onMouseEnter={() => {
                  // Preload wallet connectors when user hovers over button
                  if (window.ethereum) {
                    window.ethereum.request?.({ method: 'eth_accounts' }).catch(() => {})
                  }
                }}
              >
                {isPending ? (
                  <>
                    <span className="me-2" style={{
                      display: 'inline-block',
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></span>
                    <span className="gradient-text">Connecting...</span>
                  </>
                ) : (
                  <>
                    <span className="me-2">💎</span>
                    Claim Your Airdrop
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 gradient-bg-secondary">
        <div className="container-fluid px-4">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold text-info mb-4">Why Choose KertCapitalsConnect?</h2>
                <p className="lead text-info opacity-75" style={{maxWidth: '800px', margin: '0 auto'}}>
                  Access premium Web3 airdrops with institutional-grade security and transparency
                </p>
              </div>
              <div className="row g-4">
                <div className="col-lg-4 col-md-6">
                  <div className="card card-professional h-100 border-0 rounded-4 p-4 text-center">
                    <div className="feature-icon">🚀</div>
                    <h4 className="text-info fw-bold mb-3">Premium Airdrops</h4>
                    <p className="text-info opacity-75">Exclusive access to high-value token distributions from verified Web3 projects</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="card card-professional h-100 border-0 rounded-4 p-4 text-center">
                    <div className="feature-icon">🔒</div>
                    <h4 className="text-info fw-bold mb-3">Secure & Trusted</h4>
                    <p className="text-info opacity-75">Multi-signature smart contracts and rigorous security audits protect your assets</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="card card-professional h-100 border-0 rounded-4 p-4 text-center">
                    <div className="feature-icon">⚡</div>
                    <h4 className="text-info fw-bold mb-3">Instant Claims</h4>
                    <p className="text-info opacity-75">Connect your wallet and claim tokens instantly with minimal gas fees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 gradient-bg-hero">
        <div className="container-fluid px-4">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row text-center g-4">
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="stats-number">$50M+</div>
                  <p className="text-info fs-5 fw-medium">Total Value Distributed</p>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="stats-number">150K+</div>
                  <p className="text-info fs-5 fw-medium">Active Users</p>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="stats-number">200+</div>
                  <p className="text-info fs-5 fw-medium">Partner Projects</p>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="stats-number">24/7</div>
                  <p className="text-info fs-5 fw-medium">Support Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 glass-effect">
        <div className="container-fluid px-4 text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold text-info mb-4">Ready to Start Earning?</h2>
              <p className="lead text-info opacity-75 mb-5">
                Join thousands of users already claiming premium Web3 airdrops
              </p>
              <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                <button 
                  className="btn btn-gradient-primary btn-lg px-5 py-3 rounded-pill fw-bold btn-glow" 
                  data-bs-toggle="modal" 
                  data-bs-target="#claimAirdrop"
                  disabled={isPending}
                  onMouseEnter={() => {
                    // Preload wallet connectors when user hovers over button
                    if (window.ethereum) {
                      window.ethereum.request?.({ method: 'eth_accounts' }).catch(() => {})
                    }
                  }}
                >
                  {isPending ? (
                    <>
                      <span className="me-2" style={{
                        display: 'inline-block',
                        width: '16px',
                        height: '16px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></span>
                      <span className="gradient-text">Connecting...</span>
                    </>
                  ) : (
                    <>
                      <span className="me-2">🚀</span>
                      Get Started Now
                    </>
                  )}
                </button>
                <button className="btn btn-outline-info btn-lg px-5 py-3 rounded-pill fw-bold">
                  <span className="me-2">📚</span>
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Airdrop Claim Modal */}
      <div className="modal fade" id="claimAirdrop">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{
            background: 'linear-gradient(135deg, rgba(15, 20, 25, 0.98), rgba(25, 118, 210, 0.08))',
            border: '1px solid #1e3a5f',
            borderRadius: '20px',
            backdropFilter: 'blur(20px)'
          }}>
            <div className="modal-header border-bottom" style={{borderColor: '#1e3a5f !important'}}>
              <h4 style={{color: '#64b5f6', fontWeight: '700'}}>🎁 Claim Your KC Airdrop</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" style={{filter: 'invert(1)'}}></button>
            </div>
            
            <div className="modal-body p-4">
              <div className="text-center mb-4">
                <div className="mb-3" style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                  borderRadius: '20px',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(25, 118, 210, 0.3)'
                }}>
                  <span style={{color: 'white', fontSize: '32px', fontWeight: 'bold'}}>KC</span>
                </div>
                <h5 style={{color: '#ffffff'}}>250,000 KC Tokens</h5>
                <p style={{color: '#90caf9'}}>≈ $2,500 USD (Estimated Value)</p>
              </div>

              <div className="mb-4">
                <label className="form-label" style={{color: '#64b5f6', fontWeight: '600'}}>
                  Airdrop Amount
                </label>
                <input 
                  className="form-control p-3" 
                  value="250,000 KC" 
                  readOnly
                  style={{
                    background: 'rgba(25, 118, 210, 0.1)',
                    border: '1px solid #1e3a5f',
                    borderRadius: '10px',
                    color: '#ffffff',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}
                />
              </div>

              <div className="mb-4">
                <label className="form-label" style={{color: '#64b5f6', fontWeight: '600'}}>
                  Estimated Value
                </label>
                <input 
                  className="form-control p-3" 
                  value="$2,500 USD" 
                  readOnly
                  style={{
                    background: 'rgba(25, 118, 210, 0.1)',
                    border: '1px solid #1e3a5f',
                    borderRadius: '10px',
                    color: '#ffffff',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}
                />
              </div>

              <div className="alert mb-4" style={{
                background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 235, 59, 0.05))',
                border: '1px solid #ffc107',
                borderRadius: '10px',
                color: '#fff3cd'
              }}>
                <div className="d-flex align-items-center">
                  <span className="me-2">⚡</span>
                  <small>Connect your wallet to claim your tokens securely</small>
                </div>
              </div>

              <div className="text-center">
                <WalletConnectBtn />
              </div>
            </div>

            <div className="modal-footer border-top d-flex justify-content-between align-items-center" style={{borderColor: '#1e3a5f !important'}}>
              <small style={{color: '#90caf9'}}>
                1 KC = $0.01 USD
              </small>
              <small style={{color: '#90caf9'}}>
                Gas fees may apply
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;