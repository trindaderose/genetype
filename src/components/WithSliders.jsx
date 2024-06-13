import { useRef, useEffect, useState } from "react";
import p5 from "p5";
import "./WithSliders.scss";

const WithSliders = () => {
	const sketchRef = useRef();
	const [colorR, setColorR] = useState(255);
	const [bgColor, setBgColor] = useState("#ffffff");
	const [colorG, setColorG] = useState(0);
	const [colorB, setColorB] = useState(0);
	const [fontSize, setFontSize] = useState(300);
	const [frameRate, setFrameRate] = useState(3);
	const [rubbleW, setRubbleW] = useState(1);
	const [rubbleH, setRubbleH] = useState(1);
	const [polygonSides, setPolygonSides] = useState(100);
	const [inputWords, setInputWords] = useState("Digite aqui... 🤖");

	useEffect(() => {
		const sketch = (p) => {
			let fonts = [];
			let points;
			let words = inputWords.split(",");
			let colorRSlider,
				colorGSlider,
				colorBSlider,
				fontSizeSlider,
				frameRateSlider,
				rubbleWSlider,
				rubbleHSlider,
				polygonSidesSlider;

			p.preload = () => {
				fonts[0] = p.loadFont("/Akzidenz-Grotesk.otf");
				fonts[1] = p.loadFont("/Helvetica.otf");
				fonts[2] = p.loadFont("/UniversLTStd-Bold.ttf");
			};

			p.setup = () => {
				p.createCanvas(p.windowWidth, p.windowHeight);
				p.noFill();
				p.background(bgColor);

				colorRSlider = labelSlider(
					p,
					"R:",
					10,
					p.height - 50,
					colorR,
					setColorR
				);
				colorGSlider = labelSlider(
					p,
					"G:",
					10,
					p.height - 100,
					colorG,
					setColorG
				);
				colorBSlider = labelSlider(
					p,
					"B:",
					10,
					p.height - 150,
					colorB,
					setColorB
				);
				fontSizeSlider = labelSlider(
					p,
					"Font Size:",
					100,
					p.height - 50,
					fontSize,
					setFontSize,
					50,
					300
				);
				frameRateSlider = labelSlider(
					p,
					"Frame Rate:",
					100,
					p.height - 100,
					frameRate,
					setFrameRate,
					1,
					60
				);
				rubbleWSlider = labelSlider(
					p,
					"Texture 2:",
					200,
					p.height - 50,
					rubbleW,
					setRubbleW,
					1,
					10
				);
				rubbleHSlider = labelSlider(
					p,
					"Texture 1:",
					200,
					p.height - 100,
					rubbleH,
					setRubbleH,
					1,
					10
				);
				polygonSidesSlider = labelSlider(
					p,
					"Paths:",
					100,
					p.height - 150,
					polygonSides,
					setPolygonSides,
					3,
					10
				);
				p.fill(bgColor);
				p.background(bgColor);
			};

			p.draw = () => {
				setColorR(colorRSlider.value());
				setColorG(colorGSlider.value());
				setColorB(colorBSlider.value());
				setFontSize(fontSizeSlider.value());
				setFrameRate(frameRateSlider.value());
				setRubbleW(rubbleWSlider.value());
				setRubbleH(rubbleHSlider.value());
				setPolygonSides(polygonSidesSlider.value());

				let currentColor = p.color(colorR, colorG, colorB);

				p.stroke(currentColor);

				p.frameRate(frameRate);

				let x = p.random(p.width);
				let y = p.random(p.height);
				let word = p.random(words);
				let font = p.random(fonts);

				points = font.textToPoints(word, x, y, fontSize, {
					sampleFactor: 0.06,
					simplifyThreshold: 0,
				});

				if (limitations(font.textBounds(word, x, y, fontSize))) {
					points.forEach((item) => {
						rubble({
							pos: p.createVector(item.x, item.y),
							a: p.random(p.TAU),
							w: rubbleW,
							h: rubbleH,
						});
					});
				}
			};

			function labelSlider(
				p,
				label,
				x,
				y,
				initialValue,
				stateSetter,
				min = 0,
				max = 255
			) {
				let slider = p.createSlider(min, max, initialValue);
				slider.position(x, y);
				slider.style("width", "80px");

				let labelDiv = p.createDiv(label);
				labelDiv.position(x, y - 20);
				labelDiv.style("color", "#000");

				return slider;
			}

			function limitations(bounds) {
				return !(
					bounds.x < 1 ||
					bounds.x + bounds.w > p.width ||
					bounds.y < 1 ||
					bounds.y + bounds.h > p.height
				);
			}

			function rubble(obj) {
				let p_arr = [];
				for (let i = 0; i < 10; i++)
					p_arr.push(p.createVector(Gauss() * obj.w, Gauss() * obj.h));

				p.push();
				p.translate(obj.pos.x, obj.pos.y);
				p.rotate(obj.a);
				p_arr.forEach((item) => {
					p.beginShape();
					polygon(item.x, item.y, 2, polygonSides).forEach((item2) => {
						p.vertex(item2.x, item2.y);
					});
					p.endShape(p.CLOSE);
				});
				p.pop();
			}

			function polygon(cx, cy, n, r) {
				let points_arr = [];
				let a = p.random(p.TAU);
				for (let i = 0; i < n; i++) {
					let angle = p.map(i, 0, n, a, 2 * p.PI + a);
					let x = cx + r * p.cos(angle);
					let y = cy + r * p.sin(angle);
					points_arr.push(p.createVector(x, y));
				}
				return points_arr;
			}

			function Gauss() {
				let x1, x2, rad;
				do {
					x1 = 2 * p.random(1) - 1;
					x2 = 2 * p.random(1) - 1;
					rad = x1 * x1 + x2 * x2;
				} while (rad >= 1 || rad === 0);
				let c = p.sqrt((-2 * Math.log(rad)) / rad);
				return x1 * c;
			}
		};

		const p5Instance = new p5(sketch, sketchRef.current);
		return () => {
			p5Instance.remove();
		};
	}, [
		colorR,
		colorG,
		colorB,
		fontSize,
		frameRate,
		rubbleW,
		rubbleH,
		polygonSides,
		inputWords,
		bgColor,
	]);

	return (
		<>
			<input
				className="slider-input"
				type="text"
				value={inputWords}
				onChange={(e) => setInputWords(e.target.value)}
				placeholder="Digite aqui..."
			/>
			<input
				type="color"
				value={bgColor}
				onChange={(e) => setBgColor(e.target.value)}
				style={{ marginLeft: "10px" }}
			/>
			<div className="" ref={sketchRef}></div>
		</>
	);
};

export default WithSliders;
