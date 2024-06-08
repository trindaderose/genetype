import "./App.css";
import "./index.css";
import P5Sketch from "./components/P5Sketch";
import WithSliders from "./components/WithSliders";
import { useState } from "react";
import { Underlay } from "./components/Overlay";

function App() {
	const [showWithSliders, setShowWithSliders] = useState(false);

	const toggleWithSliders = () => {
		setShowWithSliders(!showWithSliders);
	};

	return (
		<>
			<Underlay />
			<div className="nav">
				<button onClick={toggleWithSliders}>
					{showWithSliders ? "/" : "Controller 🤖"}
				</button>
			</div>
			{showWithSliders ? <WithSliders /> : <P5Sketch />}
		</>
	);
}

export default App;
