// src/app/video/page.js
import { Player } from '@remotion/player';
import { MyComposition } from '../../../remotion/MyComposition';

export default function VideoPage() {
  return (
    <main>
      <h1>Remotion Video</h1>
      <Player component={MyComposition} durationInFrames={300} />
    </main>
  );
}
