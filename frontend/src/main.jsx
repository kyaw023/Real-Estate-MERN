import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import IndexRoutes from "./routes/Index.routes.jsx";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { CircleCheckBig, XCircle } from "lucide-react";

import { persistor, store } from "./store/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <IndexRoutes />
        </NextThemesProvider>
        <Toaster
          classNames=" dark:bg-slate-900"
          toastOptions={{
            classNames: {
              error:
                " font-roboto ms-1 border border-red-500 text-red-500 bg-white dark:bg-slate-900",
              success:
                "border font-roboto ms-1 border-green-500 text-green-500 bg-white dark:bg-slate-900",
            },
          }}
          icons={{
            success: <CircleCheckBig size={20} />,

            error: <XCircle size={20} />,
          }}
        />
      </NextUIProvider>
    </PersistGate>
  </Provider>
);
