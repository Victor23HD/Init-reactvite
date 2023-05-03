import { useState } from "react";
import { CommandLineIcon, SignalIcon } from "@heroicons/react/24/solid";

import { ConnectDevice, PP_OPEN } from "../config/bluetooth.js";

function App() {
  const [status, setStatus] = useState("---");

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-slate-800">
        <div className="text-center bg-white rounded-md p-5 shadow-lg text-sm">
          <h1 className="font-semibold text-lg">Pax-Solutions</h1>
          <h2 className="font-medium text-gray-600">  
            Comunicação bluetooth com POS
          </h2>
          <div className="card">
            <div className="justify-center items-center m-2 font-medium">
              <button
                className="bg-blue-600 rounded-lg px-6 py-1 m-2"
                onClick={async() => {
                  setStatus(await ConnectDevice());
                }}>
                <SignalIcon className="w-7 text-white" />
              </button>
            </div>
            <div className="m-2">
            Status: <label className={"font-bold " +
              (status === "conectado" ? "text-green-500" : "text-red-500")
              }> {status}</label>
            </div>

            <button
                className="bg-blue-600 rounded-lg px-6 py-2 m-2"
                onClick={async () => { await PP_OPEN()}}>
                <CommandLineIcon className="w-6 text-white" />
              </button>

          </div>
          <p className="text-gray-500 font-medium">
          PAX Technology © 2023
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
