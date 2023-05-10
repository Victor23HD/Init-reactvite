import crc from "crc";

const SYN = "\x16";
const ETB = "\x17";
const encoder = new TextEncoder();

async function SendsDataToTheOpenPinpad(command) {
  let bufferSnd = `${SYN}${command}${ETB}`;
  let ret = bufferSnd + ComputeChecksumString(bufferSnd.slice(1)); 
  return ret;
}

function ComputeChecksum(...buffer) {
  let crc = 0;
  let wData,
    wCRC = 0;
  let iLength = buffer.length;
  let iData = 0;
  for (; iLength > 0; iLength--, iData++) {
    wData = (buffer[iData] << 8) & 0xffff;
    for (let i = 0; i < 8; i++, wData <<= 1) {
      if (((wCRC ^ wData) & 0x8000) !== 0)
        wCRC = ((wCRC << 1) ^ 0x1021) & 0xffff;
      else wCRC <<= 1;
    }
  }
  return wCRC;
}

function ComputeChecksumString(buffer) {
  let bBuffer = new Uint8Array(buffer.length);

  for (let i = 0; i < buffer.length; i++) {
    bBuffer[i] = buffer.charCodeAt(i);
  }

  let bCRCTmp = new Uint8Array(new Int16Array([ComputeChecksum(...bBuffer)]).buffer);
  let bCRC = new Uint8Array([bCRCTmp[1], bCRCTmp[0]]);
  let decoder = new TextDecoder('iso-8859-1');
  return decoder.decode(bCRC);
}

export default SendsDataToTheOpenPinpad;
