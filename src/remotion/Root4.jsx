"use client"; 
import React, { useState } from 'react';
import { Composition } from 'remotion';
import { MyComposition } from './MyComposition';

export const RemotionRoot = () => {
  const [durationPerImage, setDurationPerImage] = useState(100);
  const [transitionDuration, setTransitionDuration] = useState(10);
  const [showControls, setShowControls] = useState(true); // Only show controls before rendering
  const isRendering = process.env.NODE_ENV === 'production'; // Check if rendering

  // Method to toggle controls
  const toggleControls = () => {
    setShowControls(!showControls);
  };

  return (
    <>
      {/* Show controls only if NOT rendering */}
      {!isRendering && showControls && (
        <div>
          <button onClick={toggleControls}>Toggle Controls</button>
          {/* Add buttons for uploading and deleting images */}
        </div>
      )}

      <Composition
        id="video"
        component={MyComposition}
        durationInFrames={(durationPerImage * 10) + 25}
        fps={25}
        width={1920}
        height={1080}
        defaultProps={{ durationPerImage, transitionDuration }}
      />
    </>
  );
};
