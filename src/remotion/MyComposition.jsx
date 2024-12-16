import React from 'react';
import { Audio, Sequence, AbsoluteFill, Img, useCurrentFrame, interpolate, staticFile } from 'remotion';
import background from '../../public/background.png'; // Static background image
// Dynamically import image paths
const generateImagePaths = () => {
  const imageContext = require.context('../../public/images', false, /\.png$/);
  
  return imageContext.keys().map(key => 
    staticFile(`images/${key.replace('./', '')}`)
  );
};

// Generate images dynamically
const images = generateImagePaths();

export const MyComposition = ({ 
  durationPerImage = 100, 
  transitionDuration = 10,
  extraFrames = 25
}) => {
  return (
    <AbsoluteFill>
      {/* Static background image */}
      <Img
       src={background}
        // src={"https://idkblogs.com/images/logo/logo1_250x150.png"}
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
          from={extraFrames + (index * durationPerImage)}
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