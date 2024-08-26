import React from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";
import color from '../../config/color';

const Loading = () => {
  return (
        <ScaleLoader
          color={color['dark'].main}
          loading={true}
          css={{ display: "block", margin: "0 auto", borderColor: "red",height:100,width:100 }}
          speedMultiplier={1.5}
        />
  );
}

export default Loading;