let bluetoothDevice = null;
let IsConnect = false;

let options = {
  filters: [{ name: "ExampleName" }, { namePrefix: "PAX" }],
  optionalServices: ["battery_service"],
};


async function ConnectDevice() {
  await navigator.bluetooth
    .requestDevice(options)
    .then(async (device) => {
      console.log("> Buscando dispositivo bluetooth...");
      bluetoothDevice = device;
      await Connect();
    })
    .catch((err) => console.log(err));

    return IsConnect != false ? "Conectado" : "Desconectado";

}

async function Connect() {
  console.log("> conectando ao dispositivo bluetooth...");

  await bluetoothDevice.gatt.connect().then((server) => {
    console.log("> Dispositivo bluetooth conectado.");
    return IsConnect = true
  });
}

export default ConnectDevice;
