import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserContextProvider } from "./Component/Contexts/context";
import { BrowserRouter as Router } from "react-router-dom";
import { hydrate, render } from "react-dom";
 
const root = document.getElementById("root");
// if (root.hasChildNodes()) {
//   hydrate(
//     <Router>
//       <UserContextProvider>
//         <App />
//       </UserContextProvider>
//     </Router>
//   , root);
// } else {
  render(
    <Router>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </Router>
  , root);
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
if ("serviceWorker" in navigator) {
  // //console.log("Unregistring Service Worker!");
  if (caches) {
    //console.log("Clearing Caches!");
    // Service worker cache should be cleared with caches.delete()
    caches.keys().then(async (names) => {
      names.forEach(cache => caches.delete(cache));
    });
  }
  navigator.serviceWorker.getRegistrations()
  .then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
    }
    //console.log("Service Worker Unregistered: "+registrations.length);
  });
}
reportWebVitals();
