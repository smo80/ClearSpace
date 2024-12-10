import { useEffect } from 'react';

function MeditationSession({ endMeditation }) {
  useEffect(() => {
    const video = document.getElementById('meditation-video');
    video.onended = () => {
      endMeditation();
    };
  }, [endMeditation]);

  return (
    <div className="meditation-session">
      <h2>Meditation Session</h2>
      <video id="meditation-video" width="600" controls autoPlay>
        <source src="/meditation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default MeditationSession;