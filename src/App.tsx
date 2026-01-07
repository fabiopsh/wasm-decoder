import { Component } from "solid-js";
import { Router, Route } from "@solidjs/router";
import Decoder from "./pages/Decoder";
import About from "./pages/About";
import Layout from "./components/Layout";

const App: Component = () => {
	const base = import.meta.env.BASE_URL?.replace(/\/$/, "");
	return (
		<Router base={base}>
			<Route component={Layout}>
				<Route path="/" component={Decoder} />
				<Route path="/about" component={About} />
			</Route>
		</Router>
	);
};

export default App;
