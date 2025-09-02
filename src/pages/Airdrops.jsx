const Airdrops = () => {
  return (
    <div className="container py-5">
      <section className="py-5">
        <h2 className="text-center mb-5" style={{color: '#64b5f6', fontSize: '2.5rem', fontWeight: '700'}}>
          Active Airdrops
        </h2>
        
        <div className="row g-4">
          <div className="col-md-4">
            <div className="h-100 p-4" style={{
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(15, 20, 25, 0.8))',
              border: '1px solid #1e3a5f',
              borderRadius: '20px',
              transition: 'all 0.3s ease'
            }}>
              <div className="d-flex align-items-center mb-3">
                <div className="me-3" style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>KC</div>
                <div>
                  <h5 style={{color: '#ffffff', margin: '0'}}>KertCapitals Token</h5>
                  <small style={{color: '#90caf9'}}>Premium Tier</small>
                </div>
              </div>
              <p style={{color: '#b0bec5'}}>250,000 KC tokens available for early community members</p>
              <div className="d-flex justify-content-between align-items-center">
                <span style={{color: '#4caf50', fontWeight: '600'}}>Active</span>
                <small style={{color: '#90caf9'}}>Ends in 7 days</small>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="h-100 p-4" style={{
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(15, 20, 25, 0.8))',
              border: '1px solid #1e3a5f',
              borderRadius: '20px'
            }}>
              <div className="d-flex align-items-center mb-3">
                <div className="me-3" style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #7b1fa2, #ab47bc)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>DX</div>
                <div>
                  <h5 style={{color: '#ffffff', margin: '0'}}>DeFiX Protocol</h5>
                  <small style={{color: '#90caf9'}}>Partner Project</small>
                </div>
              </div>
              <p style={{color: '#b0bec5'}}>100,000 DFX tokens for liquidity providers</p>
              <div className="d-flex justify-content-between align-items-center">
                <span style={{color: '#ff9800', fontWeight: '600'}}>Coming Soon</span>
                <small style={{color: '#90caf9'}}>Starts in 3 days</small>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="h-100 p-4" style={{
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(15, 20, 25, 0.8))',
              border: '1px solid #1e3a5f',
              borderRadius: '20px'
            }}>
              <div className="d-flex align-items-center mb-3">
                <div className="me-3" style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #388e3c, #66bb6a)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>GT</div>
                <div>
                  <h5 style={{color: '#ffffff', margin: '0'}}>Green Token</h5>
                  <small style={{color: '#90caf9'}}>Eco Project</small>
                </div>
              </div>
              <p style={{color: '#b0bec5'}}>500,000 GREEN tokens for carbon offset supporters</p>
              <div className="d-flex justify-content-between align-items-center">
                <span style={{color: '#9e9e9e', fontWeight: '600'}}>Ended</span>
                <small style={{color: '#90caf9'}}>Completed</small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Airdrops;