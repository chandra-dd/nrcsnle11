import React from 'react';
import { Audio, Sequence, AbsoluteFill, Img, useCurrentFrame, interpolate, staticFile } from 'remotion';

// Manually list the image files - this is the most reliable method for browser-based projects
const generateImagePaths = () => {
  // Dynamically import all PNG files from the images folder
  const imageContext = require.context('../../public/images', false, /\.png$/);
  
  return imageContext.keys().map(key => 
    staticFile(`images/${key.replace('./', '')}`)
  );
};

// Generate images dynamically
const images = generateImagePaths();

export const MyComposition = ({ 
  durationPerImage = 100, 
  transitionDuration = 5 
}) => {
  return (
    <AbsoluteFill>
      {/* Static background image */}
      <Img
        src={"https://idkblogs.com/images/logo/logo1_250x150.png"}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />

      {/* Render audio if needed */}
      <Audio src={staticFile('aa.mp3')} volume={0.05} />

      {/* Sequence images with slide effect */}
      {images.map((image, index) => (
        <Sequence
          key={index}
          from={25 + (index * durationPerImage)}
          durationInFrames={durationPerImage}
        >
          <SlidingImage
            src={image}
            durationPerImage={durationPerImage}
            transitionDuration={transitionDuration}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

// Component for the slide effect (same as previous implementation)
const SlidingImage = ({ src, durationPerImage, transitionDuration }) => {
  const frame = useCurrentFrame();

  const translateX = interpolate(
    frame,
    [0, transitionDuration, durationPerImage - transitionDuration, durationPerImage],
    [1920, 0, 0, -1920],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <Img
      src={src}
      style={{
        width: '100%',
        height: '100%',
        transform: `translateX(${translateX}px)`,
      }}
    />
  );
};

export default MyComposition;