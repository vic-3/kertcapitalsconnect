const About = () => {
  return (
    <div className="container py-5">
      <section className="py-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2 className="mb-4" style={{color: '#64b5f6', fontSize: '2.5rem', fontWeight: '700'}}>
              Why KertCapitalsConnect?
            </h2>
            <div className="mb-4">
              <p style={{color: '#b0bec5', fontSize: '18px', lineHeight: '1.8'}}>
                KertCapitalsConnect is the premier platform for accessing high-quality Web3 token airdrops. We partner with leading blockchain projects to bring you exclusive early access opportunities.
              </p>
              <p style={{color: '#b0bec5', fontSize: '18px', lineHeight: '1.8'}}>
                Our advanced smart contract technology ensures secure, transparent, and efficient token distribution across multiple blockchain networks.
              </p>
            </div>
            
            <div className="row g-4">
              <div className="col-6">
                <div className="text-center p-3" style={{background: 'rgba(25, 118, 210, 0.1)', borderRadius: '15px', border: '1px solid rgba(25, 118, 210, 0.2)'}}>
                  <h4 style={{color: '#64b5f6', fontWeight: '700'}}>500K+</h4>
                  <p style={{color: '#90caf9', fontSize: '14px'}}>Tokens Distributed</p>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center p-3" style={{background: 'rgba(25, 118, 210, 0.1)', borderRadius: '15px', border: '1px solid rgba(25, 118, 210, 0.2)'}}>
                  <h4 style={{color: '#64b5f6', fontWeight: '700'}}>15+</h4>
                  <p style={{color: '#90caf9', fontSize: '14px'}}>Partner Projects</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6 text-center">
            <div className="p-4" style={{
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(66, 165, 245, 0.05))',
              borderRadius: '25px',
              border: '1px solid rgba(25, 118, 210, 0.2)'
            }}>
              <div className="mb-4" style={{
                width: '200px',
                height: '200px',
                background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                borderRadius: '50%',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 40px rgba(25, 118, 210, 0.3)'
              }}>
                <span style={{color: 'white', fontSize: '72px'}}>🪙</span>
              </div>
              <h5 style={{color: '#64b5f6'}}>Secure Multi-Chain Support</h5>
            </div>
          </div>
        </div>

        {/* Supported Networks */}
        <div className="py-5">
          <h3 className="text-center mb-4" style={{color: '#64b5f6', fontWeight: '600'}}>
            Supported Networks
          </h3>
          <div className="row text-center g-3">
            {[
              { name: 'Ethereum', color: '#627eea' },
              { name: 'Polygon', color: '#8247e5' },
              { name: 'BSC', color: '#f3ba2f' },
              { name: 'Arbitrum', color: '#28a0f0' },
              { name: 'Base', color: '#0052ff' },
              { name: 'Optimism', color: '#ff0420' }
            ].map((network, index) => (
              <div key={index} className="col-md-2 col-4">
                <div className="p-3" style={{
                  background: `rgba(${parseInt(network.color.slice(1, 3), 16)}, ${parseInt(network.color.slice(3, 5), 16)}, ${parseInt(network.color.slice(5, 7), 16)}, 0.1)`,
                  border: `1px solid ${network.color}40`,
                  borderRadius: '15px'
                }}>
                  <div className="mb-2" style={{
                    width: '40px',
                    height: '40px',
                    background: network.color,
                    borderRadius: '50%',
                    margin: '0 auto'
                  }}></div>
                  <small style={{color: '#90caf9', fontWeight: '500'}}>{network.name}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;