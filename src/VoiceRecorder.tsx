import React, { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

const VoiceRecorder: React.FC = () => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // متد برای دریافت اطلاعات صدا بعد از ضبط
  const handleAudioData = (audioData: Blob) => {
    const url = URL.createObjectURL(audioData);
    setAudioUrl(url);
  };

  return (
    <div>
      <h1>Voice Recorder</h1>
      <AudioRecorder
        onRecordingComplete={handleAudioData} // تغییر نام پراپرتی به "onRecordingComplete"
        // می‌توانید سایر پراپرتی‌ها را نیز اضافه کنید
      />
      {audioUrl && (
        <div>
          <h2>Recorded Audio:</h2>
          <audio controls src={audioUrl} />
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
