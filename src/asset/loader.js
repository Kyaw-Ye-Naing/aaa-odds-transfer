import React from 'react'
import Spinner from './Spin-2s-200px.gif'

function loader() {
  return (
    <div>
        <img src={Spinner} width={100} height={100} style={{textAlign:"center"}}/>
    </div>
  )
}

export default loader