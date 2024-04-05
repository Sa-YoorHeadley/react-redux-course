import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./app/globals.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { fetchUsers } from "./app/features/users/usersSlice.ts";

store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
