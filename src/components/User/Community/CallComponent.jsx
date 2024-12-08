import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("https://society-management-4z4w.onrender.com"); // Your backend URL

const CallComponent = ({ currentUserId, calleeId, roomId, callType = "video" }) => {
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
                urls: "stun:stun.l.google.com:19302", // Google's public STUN server
            },
        ],
    };

    useEffect(() => {
        // Initialize the media stream based on the call type
        const initLocalStream = async () => {
            try {
                const constraints = callType === "audio"
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

        socket.on("incoming-call", (data) => {
            if (data.roomId === roomId) {
                startCall(data.from);
            }
        });

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
            socket.off("incoming-call");
            socket.off("receive-offer");
            socket.off("receive-answer");
            socket.off("receive-ice-candidate");
        };
    }, [roomId, callType]);

    const startCall = (calleeId) => {
        setIsCallActive(true);
        setCallStarted(true);

        peerConnectionRef.current = new RTCPeerConnection(config);

        localStream.getTracks().forEach((track) => {
            peerConnectionRef.current.addTrack(track, localStream);
        });

        peerConnectionRef.current.onicecandidate = handleICECandidateEvent;
        peerConnectionRef.current.ontrack = handleTrackEvent;

        // Create an offer
        peerConnectionRef.current
            .createOffer()
            .then((offer) => {
                return peerConnectionRef.current.setLocalDescription(offer);
            })
            .then(() => {
                socket.emit("offer-call", {
                    to: calleeId,
                    from: currentUserId,
                    roomId,
                    offer: peerConnectionRef.current.localDescription,
                    callType,
                });
            });
    };

    const handleOffer = (data) => {
        peerConnectionRef.current = new RTCPeerConnection(config);

        localStream.getTracks().forEach((track) => {
            peerConnectionRef.current.addTrack(track, localStream);
        });

        peerConnectionRef.current.onicecandidate = handleICECandidateEvent;
        peerConnectionRef.current.ontrack = handleTrackEvent;

        peerConnectionRef.current.setRemoteDescription(data.offer).then(() => {
            return peerConnectionRef.current.createAnswer();
        })
        .then((answer) => {
            return peerConnectionRef.current.setLocalDescription(answer);
        })
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

    const endCall = () => {
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
        }

        socket.emit("end-call", roomId);
        setIsCallActive(false);
        setCallStarted(false);
    };

    return (
        <div>
            <div>
                {callType === "video" && <video ref={localVideoRef} autoPlay muted></video>}
                {isCallActive && callType === "video" && <video ref={remoteVideoRef} autoPlay></video>}
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
