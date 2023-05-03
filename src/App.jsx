import { useState } from "react";
import { ArrowUpTrayIcon} from "@heroicons/react/24/solid";

import ConnectDevice from "../config/bluetooth.js";

function App() {
  const [status, setStatus] = useState("");

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-slate-800">
        <div className="text-center bg-white rounded-md p-5 shadow-lg text-sm">
          <h1 className="font-semibold text-lg">Pax-Solutions</h1>
          <h2 className="font-medium text-gray-600">  
            Comunicação bluetooth com POS
          </h2>
          <div className="card">
            <div className="flex justify-center items-center m-2 font-medium">
              <button
                className="bg-blue-600 rounded-lg px-6 py-2 m-1"
                onClick={async() => {
                  setStatus(await ConnectDevice());
                }}>
                <ArrowUpTrayIcon className="w-6 text-white font-bold" />
              </button>
              <label>{status}</label>
            </div>

            

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
