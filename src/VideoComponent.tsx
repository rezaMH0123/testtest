import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

export default function VideoComponent() {
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [capturedVideo, setCapturedVideo] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoChunks = useRef<Blob[]>([]);

  const startRecording = useCallback(() => {
    if (webcamRef.current && webcamRef.current.video) {
      videoChunks.current = [];
      const stream = webcamRef.current.video.srcObject as MediaStream;
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          videoChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(videoChunks.current, { type: "video/webm" });
        const videoUrl = URL.createObjectURL(blob);
        setCapturedVideo(videoUrl);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  }, [webcamRef, setCapturedVideo]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [mediaRecorderRef, isRecording]);

  const switchCamera = () => {
    setFacingMode((prevState) =>
      prevState === "user" ? "environment" : "user"
    );
  };

  return (
    <div>
      <Webcam
        audio={true}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: facingMode,
        }}
      />

      {!isRecording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
      <button onClick={switchCamera}>
        Switch to {facingMode === "user" ? "Back" : "Front"} Camera
      </button>

      {capturedVideo && (
        <div>
          <h2>Recorded Video:</h2>
          <video src={capturedVideo} controls />
        </div>
      )}
    </div>
  );
}
