import SendsDataToTheOpenPinpad from "./bc.js";

let bluetoothDevice = null;
let gattServer = null;
let commandService = null;
let serviceUuid = "49535343-fe7d-4ae5-8fa9-9fafd205e455";
let service = null;
let characteristicUuid = "49535343-aca3-481c-91ec-d85e28a60318";
let characteristic = null;
let IsConnect = false;
const OPN = "OPN";

let options = {
  filters: [{ namePrefix: "PAX" }],
  optionalServices: [serviceUuid],
};

export async function ConnectDevice() {
  await navigator.bluetooth
    .requestDevice(options)
    .then(async (device) => {
      console.log("> Searching for bluetooth device...");
      bluetoothDevice = device;
      await Connect();
    })
    .then(async (_) => {
      console.log("> Found GATT server");
      return (service = await gattServer.getPrimaryService(serviceUuid));
    })
    .then(async (service) => {
      console.log("> Found command service");
      commandService = service;
      return (characteristic = await commandService.getCharacteristic(
        characteristicUuid
      ));
    })
    .catch((err) => console.log(err));

  return IsConnect != false ? "connected" : "disconnected";
}

async function Connect() {
  console.log("> connecting to the bluetooth device...");
  await bluetoothDevice.gatt.connect().then(async (server) => {
    console.log("> Bluetooth device connected.");
    gattServer = server;
    return (IsConnect = true);
  });
}

export async function PP_OPEN() {
  if (!bluetoothDevice || !bluetoothDevice.gatt.connected) {
    console.log("> Bluetooth device not connected.");
    return;
  }
  let valueToSend = SendsDataToTheOpenPinpad(OPN);
  const encoder = new TextEncoder();
  const data = encoder.encode(valueToSend);
  let retValue = await characteristic.writeValue(data.buffer);

  console.log(retValue);
}
