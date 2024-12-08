import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { EndCall, UserCall } from "../../../apis/api";

const socket = io("https://society-management-4z4w.onrender.com"); // Your backend URL

const CallComponent = ({
  currentUserId,
  calleeId,
  roomId,
  callType = "video",
}) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStarted, setCallStarted] = useState(false);
  const [remoteStream, setRemoteStream] = useState(null);
  const [localStream, setLocalStream] = useState(null);

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
          callType === "audio"
            ? { audio: true, video: false }
            : { audio: true, video: true };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setLocalStream(stream);

        if (callType === "video") {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    initLocalStream();

    socket.on("receive-offer", (data) => {
      if (data.roomId === roomId) {
        handleOffer(data);
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
  }, [roomId, callType]);

  const startCall = async (calleeId) => {
    try {
      console.log("start Call");
      const response = await UserCall({
        callerId: currentUserId,
        calleeId,
        roomId,
        callType,
      });
      console.log(response, "StartCall");
      if (response.status === 200) {
        setIsCallActive(true);
        setCallStarted(true);

        peerConnectionRef.current = new RTCPeerConnection(config);

        localStream.getTracks().forEach((track) => {
          peerConnectionRef.current.addTrack(track, localStream);
        });

        peerConnectionRef.current.onicecandidate = handleICECandidateEvent;
        peerConnectionRef.current.ontrack = handleTrackEvent;

        peerConnectionRef.current
          .createOffer()
          .then((offer) => peerConnectionRef.current.setLocalDescription(offer))
          .then(() => {
            socket.emit("offer-call", {
              to: calleeId,
              from: currentUserId,
              roomId,
              offer: peerConnectionRef.current.localDescription,
              callType,
            });
          });
      }
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  const handleOffer = (data) => {
    peerConnectionRef.current = new RTCPeerConnection(config);

    localStream.getTracks().forEach((track) => {
      peerConnectionRef.current.addTrack(track, localStream);
    });

    peerConnectionRef.current.onicecandidate = handleICECandidateEvent;
    peerConnectionRef.current.ontrack = handleTrackEvent;

    peerConnectionRef.current
      .setRemoteDescription(data.offer)
      .then(() => peerConnectionRef.current.createAnswer())
      .then((answer) => peerConnectionRef.current.setLocalDescription(answer))
      .then(() => {
        socket.emit("answer-call", {
          to: data.from,
          roomId,
          answer: peerConnectionRef.current.localDescription,
        });
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

  const endCall = async () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }

    try {
      // Notify backend to end the call
      await EndCall(roomId);
    } catch (error) {
      console.error("Error ending call:", error);
    }

    socket.emit("end-call", roomId);
    setIsCallActive(false);
    setCallStarted(false);
  };

  return (
    <div>
      <div>
        {callType === "video" && (
          <video ref={localVideoRef} autoPlay muted></video>
        )}
        {isCallActive && callType === "video" && (
          <video ref={remoteVideoRef} autoPlay></video>
        )}
        {isCallActive && callType === "audio" && <p>Call in progress...</p>}
      </div>
      <div>
        {callStarted ? (
          <button onClick={endCall}>End Call</button>
        ) : (
          <button onClick={() => startCall(calleeId)}>Start Call</button>
        )}
      </div>
    </div>
  );
};

export default CallComponent;
