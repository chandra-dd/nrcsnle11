import React, { useState } from 'react';
import { Composition } from 'remotion';
import { MyComposition, myCompSchema } from './MyComposition';

export const RemotionRoot = () => {
  const [durationPerImage, setDurationPerImage] = useState(100);
  
  const transitionDuration = 10;

  // Check if the app is rendering a video
  const isRendering = process.env.NODE_ENV === 'production';

 

  return (
    <>
    

      {/* Register the composition */}
      <Composition
        id="video"
        component={MyComposition}
        durationInFrames={(durationPerImage * 10)+25}
        fps={25}
        schema={myCompSchema}
        width={1920}
        height={1080}
        defaultProps={{ durationPerImage, transitionDuration }}
      />
    </>
  );
};
