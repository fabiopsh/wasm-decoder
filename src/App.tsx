import { Component } from "solid-js";
import { Router, Route } from "@solidjs/router";
import Decoder from "./pages/Decoder";
import About from "./pages/About";

const App: Component = () => {
	return (
		<Router base={import.meta.env.BASE_URL}>
			<Route path="/" component={Decoder} />
			<Route path="/about" component={About} />
		</Router>
	);
};

export default App;
