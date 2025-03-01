import "tailwindcss";

import { RouterProvider } from "react-router-dom";
import { router } from "./service/routes";
import { SessionProvider } from "./context/SessionContext";

function App() {
  return (
    <div className="bg-pink-100 h-screen">
      <div className="flex justify-center items-center h-screen">
        <SessionProvider>
          <RouterProvider router={router} />
        </SessionProvider>
      </div>
    </div>
  );
}

export default App;
