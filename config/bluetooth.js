let bluetoothDevice = null;
let serviceUuid = '00001800-0000-1000-8000-00805f9b34fb'; // Generic Access
let characteristicUuid = "00002a05-0000-1000-8000-00805f9b34fb"; // Heart Rate Measuremen
let IsConnect = false;

let options = {
  filters: [ { namePrefix: "PAX" }],
  optionalServices: [serviceUuid]
};

export async function ConnectDevice() {
  await navigator.bluetooth
    .requestDevice(options)
    .then(async (device) => {
      console.log("> Buscando dispositivo bluetooth...");
      bluetoothDevice = device;
      await Connect();
    })
    .catch((err) => console.log(err));

    return IsConnect != false ? "conectado" : "desconectado";

}

async function Connect() {

  console.log("> conectando ao dispositivo bluetooth...");
  await bluetoothDevice.gatt.connect().then(async(server) => {
    console.log("> Dispositivo bluetooth conectado.");
    return IsConnect = true
  });
}

export async function PP_OPEN() {

  if (!bluetoothDevice || !bluetoothDevice.gatt.connected) {
    console.log("> Dispositivo bluetooth não conectado.");
    return;
  }

  let service = await bluetoothDevice.gatt.getPrimaryService(serviceUuid);
  let characteristic = await service.getCharacteristic(characteristicUuid);
  console.log(characteristic);
  if (!characteristic) {
    console.log("> Característica não encontrada.");
    return;
  }

  let data = [0x01, 0x02, 0x03]
  let buffer = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    buffer[i] = data[i];
  }
  let ret = await characteristic.writeValue(buffer);
  console.log(ret);
  console.log("> Dados enviados com sucesso!");
}


