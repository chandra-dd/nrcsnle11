"use client"; 
import React, { useState, useMemo } from 'react';
import { Composition } from 'remotion';
import MyComposition from './MyComposition';

export const RemotionRoot = () => {
  // Dynamically import image paths
  const imageContext = require.context('../../public/images', false, /\.png$/);
  const imageCount = imageContext.keys().length;

  // Fixed duration settings
  const durationPerImage = 100; // frames per image
  const transitionDuration = 10; // frames for transition
  const extraFrames = 25; // extra frames at the beginning and end

  // Calculate total composition duration
  const durationInFrames = useMemo(() => {
    // (Number of images * frames per image) + extra frames at start and end
    return (imageCount * durationPerImage) + (2 * extraFrames);
  }, [imageCount, durationPerImage, extraFrames]);

  const [showControls, setShowControls] = useState(true);
  const isRendering = process.env.NODE_ENV === 'production';

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
          <div>
            <p>Total Images: {imageCount}</p>
            <p>Total Duration: {durationInFrames} frames</p>
          </div>
        </div>
      )}

      <Composition
        id="video"
        component={MyComposition}
        durationInFrames={durationInFrames}
        fps={25}
        width={1920}
        height={1080}
        defaultProps={{ 
          durationPerImage, 
          transitionDuration,
          extraFrames
        }}
      />
    </>
  );
};

export default RemotionRoot;