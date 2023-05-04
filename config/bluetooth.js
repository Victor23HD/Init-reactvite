let bluetoothDevice = null;
let gattServer = null;
let commandService = null;
let serviceUuid = "00001800-0000-1000-8000-00805f9b34fb";
let characteristicUuid = "0000ffe9-0000-1000-8000-00805f9b34fb";
let IsConnect = false;

let options = {
  filters: [{ namePrefix: "PAX" }],
  optionalServices: [serviceUuid],
};

export async function ConnectDevice() {
  await navigator.bluetooth
    .requestDevice(options)
    .then(async (device) => {
      console.log("> Buscando dispositivo bluetooth...");
      bluetoothDevice = device;
      await Connect();
    })
    .then(_ => {
      console.log('> Found GATT server');
      return gattServer.getPrimaryService(serviceUuid)
    })
    .then(async service => {
      console.log('> Found command service');
      commandService = service;

      return await commandService.getCharacteristic("00002a00-0000-1000-8000-00805f9b34fb");
    })
    .catch((err) => console.log(err));

  return IsConnect != false ? "conectado" : "desconectado";
}

async function Connect() {
  console.log("> conectando ao dispositivo bluetooth...");
  await bluetoothDevice.gatt.connect().then(async (server) => {
    console.log("> Dispositivo bluetooth conectado.");
    gattServer = server;
    return IsConnect = true;;
  });
}

export async function PP_OPEN() {
  if (!bluetoothDevice || !bluetoothDevice.gatt.connected) {
    console.log("> Dispositivo bluetooth não conectado.");
    return;
  }

  let service = await bluetoothDevice.gatt.getPrimaryService(serviceUuid);


    let characteristic = await service.getCharacteristic(characteristicUuid[0]);
    console.log(characteristic);
  

  services.forEach((service) => {
    console.log(service.uuid);

    if (service.uuid == serviceUuid) {
      console.log("Serviço encontrado!");
      // faça o que precisa ser feito com o serviço
    }
  });
}
