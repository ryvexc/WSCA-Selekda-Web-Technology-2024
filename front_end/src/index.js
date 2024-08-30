import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Game from "./pages/game/page";
import Auth from "./components/Auth";
import GameLobby from "./pages/game/lobby";

const router = createBrowserRouter([
	{
		path: "/game",
		element: <Game />,
	},
	{
		path: "/game",
		element: <Auth />,
		children: [
			{
				path: "lobby",
				element: <GameLobby />,
			},
		],
	},
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
