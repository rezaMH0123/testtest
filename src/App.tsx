import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

const CameraComponent: React.FC = () => {
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  }, [webcamRef, setCapturedImage]);

  const switchCamera = () => {
    setFacingMode((prevState) =>
      prevState === "user" ? "environment" : "user"
    );
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: facingMode,
        }}
      />

      <button onClick={capture}>Take Photo</button>
      <button onClick={switchCamera}>
        Switch to {facingMode === "user" ? "Back" : "Front"} Camera
      </button>

      {capturedImage && (
        <div>
          <h2>Captured Image:</h2>
          <img src={capturedImage} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default CameraComponent;
