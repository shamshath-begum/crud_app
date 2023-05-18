import React from 'react'

import Spinner from 'react-bootstrap/Spinner';
function Spiner() {
  return  <>
  <div className="d-flex justify-content-center">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
  </>
  
}

export default Spiner