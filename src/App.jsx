import { useState } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <img src="/public/Images/BookBanner.jpg" />
      <div className="flex justify-center items-center h-screen bg-slate-800">
        <div className="text-center bg-white rounded-md p-5 shadow-lg text-sm">
          <h1 className="font-semibold text-lg">OliveiraBookstore</h1>
          <h2 className="font-medium text-gray-600">
            O melhor lugar para suas compras!
          </h2>
          <div className="card">
            <div className="flex flex-row justify-center items-center m-2 font-medium">
              <button
                className="px-6 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-800 transition duration-100"
                onClick={() =>
                  setCount((count) => (count > 0 ? count - 1 : (count = 0)))
                }
              >
                <MinusCircleIcon className="w-5 scale-110" />
              </button>
              <label className="mx-4"> {count} </label>
              <button
                className="px-6 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-800 transition duration-1000"
                onClick={() => setCount(count + 1)}
              >
                <PlusCircleIcon className="w-5 scale-110" />
              </button>
            </div>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
