import { Link, Outlet } from 'react-router-dom';
import { useConnect } from 'wagmi';

const Layout = () => {
  const { isPending } = useConnect();

  return (
    <div className="App" style={{background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f3a 50%, #0f1419 100%)', minHeight: '100vh'}}>
      
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg" style={{background: 'rgba(15, 20, 25, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1e3a5f'}}>
        <div className="container-fluid px-4">
          <Link className="navbar-brand d-flex align-items-center" to="/" style={{color: '#64b5f6', fontSize: '24px', fontWeight: 'bold'}}>
            <div className="me-3 d-flex align-items-center justify-content-center" style={{
              width: '40px', 
              height: '40px', 
              background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
              borderRadius: '10px',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              KC
            </div>
            KertCapitalsConnect
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" style={{borderColor: '#1976d2'}}>
            <span style={{color: '#64b5f6'}}>☰</span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/" style={{color: '#90caf9'}}>Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about" style={{color: '#90caf9'}}>About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/airdrops" style={{color: '#90caf9'}}>Airdrops</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/tokenomics" style={{color: '#90caf9'}}>Tokenomics</Link></li>
              <li className="nav-item">
                <button 
                  className="btn btn-outline-primary ms-2" 
                  style={{borderColor: '#1976d2', color: '#64b5f6'}} 
                  data-bs-toggle="modal" 
                  data-bs-target="#connectWallet"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <span className="me-2" style={{
                        display: 'inline-block',
                        width: '14px',
                        height: '14px',
                        border: '2px solid rgba(100, 181, 246, 0.3)',
                        borderTop: '2px solid #64b5f6',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></span>
                      <span style={{color: '#64b5f6'}}>Connecting...</span>
                    </>
                  ) : (
                    'Connect Wallet'
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="py-5" style={{background: 'rgba(15, 20, 25, 0.95)', borderTop: '1px solid #1e3a5f'}}>
        <div className="container-fluid px-4">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h5 style={{color: '#64b5f6', fontWeight: '700'}}>KertCapitalsConnect</h5>
              <p style={{color: '#90caf9'}}>Premium Web3 airdrop distribution platform connecting projects with communities.</p>
            </div>
            <div className="col-md-4 mb-4">
              <h6 style={{color: '#64b5f6', fontWeight: '600'}}>Quick Links</h6>
              <ul className="list-unstyled">
                <li><a href="#" style={{color: '#90caf9', textDecoration: 'none'}}>Documentation</a></li>
                <li><a href="#" style={{color: '#90caf9', textDecoration: 'none'}}>Terms of Service</a></li>
                <li><a href="#" style={{color: '#90caf9', textDecoration: 'none'}}>Privacy Policy</a></li>
              </ul>
            </div>
            <div className="col-md-4 mb-4">
              <h6 style={{color: '#64b5f6', fontWeight: '600'}}>Community</h6>
              <div className="d-flex gap-3">
                {['Twitter', 'Discord', 'Telegram'].map((social, index) => (
                  <a key={index} href="#" className="text-decoration-none" style={{
                    color: '#90caf9',
                    padding: '8px 12px',
                    background: 'rgba(25, 118, 210, 0.1)',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}>
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <hr style={{borderColor: '#1e3a5f'}} />
          <div className="text-center">
            <small style={{color: '#90caf9'}}>
              © 2025 KertCapitalsConnect. All rights reserved.
            </small>
          </div>
        </div>
      </footer>

      {/* Wallet Connect Modal */}
      <div className="modal fade" id="connectWallet">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{
            background: 'linear-gradient(135deg, rgba(15, 20, 25, 0.95), rgba(25, 118, 210, 0.05))',
            border: '1px solid #1e3a5f',
            borderRadius: '20px'
          }}>
            <div className="modal-header border-bottom" style={{borderColor: '#1e3a5f !important'}}>
              <h5 style={{color: '#64b5f6', fontWeight: '700'}}>Connect Your Wallet</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" style={{filter: 'invert(1)'}}></button>
            </div>
            <div className="modal-body p-4">
              <div className="d-grid gap-3">
                <button className="btn btn-outline-primary p-3 d-flex align-items-center" style={{
                  borderColor: '#1976d2',
                  color: '#64b5f6',
                  borderRadius: '15px'
                }}>
                  <span className="me-3">🏛️</span>
                  Coinbase Wallet
                </button>
              </div>
              <div className="text-center mt-4">
                <small style={{color: '#90caf9'}}>
                  By connecting your wallet, you agree to our Terms of Service
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;