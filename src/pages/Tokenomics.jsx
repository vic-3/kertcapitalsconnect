const Tokenomics = () => {
  return (
    <div className="container py-5">
      <section className="py-5">
        <h2 className="text-center mb-5" style={{color: '#64b5f6', fontSize: '2.5rem', fontWeight: '700'}}>
          Tokenomics
        </h2>
        
        <div className="row g-4">
          <div className="col-md-3">
            <div className="text-center h-100 p-4" style={{
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(15, 20, 25, 0.8))',
              border: '1px solid #1e3a5f',
              borderRadius: '20px'
            }}>
              <div className="mb-3" style={{color: '#64b5f6', fontSize: '48px'}}>💎</div>
              <h4 style={{color: '#ffffff', fontWeight: '700'}}>1B</h4>
              <p style={{color: '#90caf9'}}>Total Supply</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="text-center h-100 p-4" style={{
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(15, 20, 25, 0.8))',
              border: '1px solid #1e3a5f',
              borderRadius: '20px'
            }}>
              <div className="mb-3" style={{color: '#64b5f6', fontSize: '48px'}}>🎁</div>
              <h4 style={{color: '#ffffff', fontWeight: '700'}}>25%</h4>
              <p style={{color: '#90caf9'}}>Airdrop Allocation</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="text-center h-100 p-4" style={{
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(15, 20, 25, 0.8))',
              border: '1px solid #1e3a5f',
              borderRadius: '20px'
            }}>
              <div className="mb-3" style={{color: '#64b5f6', fontSize: '48px'}}>🌊</div>
              <h4 style={{color: '#ffffff', fontWeight: '700'}}>30%</h4>
              <p style={{color: '#90caf9'}}>Liquidity Pool</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="text-center h-100 p-4" style={{
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(15, 20, 25, 0.8))',
              border: '1px solid #1e3a5f',
              borderRadius: '20px'
            }}>
              <div className="mb-3" style={{color: '#64b5f6', fontSize: '48px'}}>🚀</div>
              <h4 style={{color: '#ffffff', fontWeight: '700'}}>45%</h4>
              <p style={{color: '#90caf9'}}>Development & Marketing</p>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-8 mx-auto">
            <div className="p-4" style={{
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(15, 20, 25, 0.8))',
              border: '1px solid #1e3a5f',
              borderRadius: '20px'
            }}>
              <h4 className="mb-4" style={{color: '#64b5f6', textAlign: 'center'}}>Distribution Timeline</h4>
              <div className="row">
                <div className="col-md-6">
                  <h6 style={{color: '#ffffff'}}>Phase 1: Early Adopters (Current)</h6>
                  <p style={{color: '#b0bec5', fontSize: '14px'}}>250,000 KC tokens available for the first 1,000 community members</p>
                </div>
                <div className="col-md-6">
                  <h6 style={{color: '#ffffff'}}>Phase 2: Community Growth</h6>
                  <p style={{color: '#b0bec5', fontSize: '14px'}}>500,000 KC tokens for active community participation and referrals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tokenomics;