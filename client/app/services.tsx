import './services.css'; 

const Services = () => {
  return (
    <>
    
    <div className="test">
    <div className="shapes-container">
          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
        </div>
      <h1 className="header">Our Services</h1>
      <p className="sub-header">24/7 Dedicated Support Team</p>
      <div className="card-container">
        <div className="card">
          <img src='/images/ar.png' alt ='architect' />
          <h2 className="card-title">Custom Project Planning</h2>
          <p className="card-text">Collaborate with our expert team to create a personalized design plan that aligns with your vision and needs. </p>
          <button className='btn'>Get Started</button>
        </div>
        <div className="card">
          <img src='/images/de.png' alt ='design interior' />
          <h2 className="card-title">Interior Design Consulting</h2>
          <p className="card-text"> We help you create a space that reflects your style and meets your lifestyle needs.</p>
          <button  className='btn'>Get Started</button>
        </div>
        <div className="card">
          <img src='/images/pr.png' alt ='project' />
          <h2 className="card-title">Pre-Planned Projects</h2>
          <p className="card-text">Choose from our selection of pre-designed architectural and interior design projects for a quicker solution.</p>
          <button className='btn'>Get Started</button>
        </div>
        
      </div>
      </div>
    
    </>
  );
};

export default Services;
