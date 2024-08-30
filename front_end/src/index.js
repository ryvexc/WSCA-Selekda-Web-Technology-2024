import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Game from "./pages/game/page";
import Auth from "./components/Auth";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Auth />,
		children: [
			{
				path: "game",
				element: <Game />,
			},
		],
	},
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
