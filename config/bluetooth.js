const ConnectDevice = () => 
{
    navigator.bluetooth.requestDevice(options)
    .then((device) => 
    {
        console.log("Conectando no dispositivo...");
        return device.gatt.connect();

    })
    .catch((err) => console.log(err));
}


let options = {
    filters: [
        { name: "ExampleName" },
        { namePrefix: "PAX" }
      ],
      optionalServices: ["battery_service"],
};

export default ConnectDevice;