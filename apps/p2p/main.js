let localStream;
let remoteStream;
let peerConnection;

const servers = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
    ]
}

let init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    document.getElementById('user-1').srcObject = localStream;

    createOffer();
}

let createOffer = async () => {
    peerConnection = new RTCPeerConnection(servers);

    remoteStream = new MediaStream();
    document.getElementById('user-2').srcObject = remoteStream;

    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    peerConnection.ontrack = event => {
        event.streams[0].getTracks().forEach(track => remoteStream.addTrack(track));
    }

    peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
            console.log("New ICE candidate : ", event.candidate);
        }
    }

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log(offer);
}

let createAnswer = async () => {
    const answer = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    document.getElementById('user-1').srcObject = answer;
}

let join = async () => {
    const offer = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    document.getElementById('user-2').srcObject = offer;
}

init();