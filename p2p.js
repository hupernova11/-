let pc = new RTCPeerConnection();
let channel = pc.createDataChannel("game");
channel.onmessage = (event) => {
  const data = JSON.parse(event.data);
  handleMessage(data);
};

pc.ondatachannel = (event) => {
  channel = event.channel;
  channel.onmessage = (event) => {
    const data = JSON.parse(event.data);
    handleMessage(data);
  };
};

async function createOffer() {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  document.getElementById("signal-data").value = JSON.stringify(offer);
}

async function joinOffer() {
  const offer = JSON.parse(document.getElementById("signal-data").value);
  await pc.setRemoteDescription(offer);
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  document.getElementById("signal-data").value = JSON.stringify(answer);
}

async function setRemote() {
  const answer = JSON.parse(document.getElementById("signal-data").value);
  await pc.setRemoteDescription(answer);
  document.getElementById("connection").style.display = "none";
  document.getElementById("game").style.display = "block";
}

document.getElementById("create-offer").onclick = createOffer;
document.getElementById("join-offer").onclick = joinOffer;
document.getElementById("set-remote").onclick = setRemote;

function sendMessage(data) {
  channel.send(JSON.stringify(data));
}