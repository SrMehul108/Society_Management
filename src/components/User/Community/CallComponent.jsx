import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { EndCall, UserCall } from "../../../apis/api";

const API_URL = import.meta.env.VITE_API_URL; // Replace with your API base URL
const socket = io(API_URL);

const CallComponent = ({ callerId, calleeId, roomId, callType }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStarted, setCallStarted] = useState(false);
  const [remoteStream, setRemoteStream] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [error, setError] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const peerConnectionRef = useRef(null);

  const config = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

  useEffect(() => {
    const initLocalStream = async () => {
      try {
        const constraints =
          callType === "voice" ? { audio: true, video: false } : { audio: true, video: true };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setLocalStream(stream);

        if (callType === "video") {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError("Error accessing media devices.");
        console.error("Error accessing media devices:", err);
      }
    };

    initLocalStream();

    // Listen for incoming calls (offer) via socket.io
    socket.on("receive-offer", async (data) => {
      console.log("Incoming call offer:", data);
      if (data.to === calleeId) {
        setIncomingCall(data); // Show the incoming call notification
      }
    });

    socket.on("receive-answer", (data) => {
      if (data.roomId === roomId) {
        handleAnswer(data);
      }
    });

    socket.on("receive-ice-candidate", (data) => {
      if (data.roomId === roomId) {
        handleNewICECandidate(data);
      }
    });

    return () => {
      socket.off("receive-offer");
      socket.off("receive-answer");
      socket.off("receive-ice-candidate");
    };
  }, [roomId, callType, calleeId]);

  const startCall = async () => {
    try {
      const response = await UserCall({
        callerId,
        calleeId,
        roomId,
        callType,
      });

      if (response.status === 200) {
        setIsCallActive(true);
        setCallStarted(true);

        peerConnectionRef.current = new RTCPeerConnection(config);

        localStream.getTracks().forEach((track) => {
          peerConnectionRef.current.addTrack(track, localStream);
        });

        peerConnectionRef.current.onicecandidate = handleICECandidateEvent;
        peerConnectionRef.current.ontrack = handleTrackEvent;

        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);

        socket.emit("offer-call", {
          to: calleeId,
          from: callerId,
          roomId,
          offer: peerConnectionRef.current.localDescription,
          callType,
        });
      }
    } catch (error) {
      setError("Error starting call.");
      console.error("Error starting call:", error);
    }
  };

  const handleOffer = async (data) => {
    peerConnectionRef.current = new RTCPeerConnection(config);

    localStream.getTracks().forEach((track) => {
      peerConnectionRef.current.addTrack(track, localStream);
    });

    peerConnectionRef.current.onicecandidate = handleICECandidateEvent;
    peerConnectionRef.current.ontrack = handleTrackEvent;

    await peerConnectionRef.current.setRemoteDescription(data.offer);
    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);

    socket.emit("answer-call", {
      to: data.to,
      roomId,
      answer: peerConnectionRef.current.localDescription,
    });
  };

  const handleAnswer = (data) => {
    peerConnectionRef.current.setRemoteDescription(data.answer);
  };

  const handleICECandidateEvent = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", {
        to: calleeId,
        roomId,
        candidate: event.candidate,
      });
    }
  };

  const handleNewICECandidate = (data) => {
    const candidate = new RTCIceCandidate(data.candidate);
    peerConnectionRef.current.addIceCandidate(candidate);
  };

  const handleTrackEvent = (event) => {
    setRemoteStream(event.streams[0]);
    if (callType === "video") {
      remoteVideoRef.current.srcObject = event.streams[0];
    }
  };

  const acceptCall = async () => {
    if (incomingCall) {
      await handleOffer(incomingCall);
      setIncomingCall(null);
      setIsCallActive(true);
    }
  };

  const declineCall = () => {
    setIncomingCall(null);
  };

  const endCall = async () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }

    try {
      await EndCall({ callerId, calleeId, roomId });
    } catch (error) {
      console.error("Error ending call:", error);
    }

    socket.emit("end-call", roomId);
    setIsCallActive(false);
    setCallStarted(false);
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      {incomingCall && (
        <div>
          <p>Incoming call from {incomingCall.from}</p>
          <button onClick={acceptCall}>Accept</button>
          <button onClick={declineCall}>Decline</button>
        </div>
      )}
      <div>
        {callType === "video" && <video ref={localVideoRef} autoPlay muted></video>}
        {isCallActive && callType === "video" && <video ref={remoteVideoRef} autoPlay></video>}
        {isCallActive && callType === "voice" && <p>Call in progress...</p>}
      </div>
      <div>
        {callStarted ? (
          <button onClick={endCall}>End Call</button>
        ) : (
          <button onClick={startCall}>Start Call</button>
        )}
      </div>
    </div>
  );
};

export default CallComponent;
