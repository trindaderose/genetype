import { useRef, useEffect } from "react";
import p5 from "p5";
import "../App.css";

const P5Sketch = () => {
	const sketchRef = useRef();

	useEffect(() => {
		const sketch = (p) => {
			let mathematicalFont = [];
			let font;
			let points;
			let words = [
				"genetype",
				"is",
				"about",
				"modular",
				"mathematical",
				"typography",
			];
			let font_size = 200;

			const colors = ["#ff0000", "hotpink", "#a3e366"];

			p.preload = () => {
				mathematicalFont[0] = p.loadFont("/Akzidenz-Grotesk.otf");
				mathematicalFont[1] = p.loadFont("/Helvetica.otf");
				mathematicalFont[2] = p.loadFont("/UniversLTStd-Bold.ttf");
			};

			p.setup = () => {
				p.createCanvas(p.windowWidth, p.windowHeight);
				p.noFill();
				p.background("#fff");
				p.frameRate(2);

				font = p.random(mathematicalFont);
			};

			p.draw = () => {
				p.stroke(p.random(colors));

				let x = p.random(p.windowWidth);
				let y = p.random(p.windowHeight);

				let word = p.random(words);

				points = font.textToPoints(word, x, y, font_size, {
					sampleFactor: 0.05,
					simplifyThreshold: 0,
				});

				if (check_bounds(font.textBounds(word, x, y, font_size))) {
					points.forEach((item) => {
						rubble({
							pos: p.createVector(item.x, item.y),
							a: item.alpha,
							w: 2,
							h: 4,
						});
					});
				}
			};

			function check_bounds(bounds) {
				return !(
					bounds.x < 1 ||
					bounds.x + bounds.w > p.windowWidth ||
					bounds.y < 1 ||
					bounds.y + bounds.h > p.windowHeight
				);
			}

			function rubble(obj) {
				let p_arr = [];

				for (let i = 0; i < 20; i++)
					p_arr.push(
						p.createVector(
							myGaussian() * obj.w,
							myGaussian() * obj.h
						)
					);
				p.push();
				p.translate(obj.pos.x, obj.pos.y);

				p_arr.forEach(function (item) {
					p.beginShape();
					regular_polygon(
						item.x,
						item.y,
						p.random([10, 10, 4]),
						6
					).forEach(function (item2) {
						p.vertex(item2.x, item2.y);
					});
					p.endShape(p.CLOSE);
				});
				p.pop();
			}

			function regular_polygon(cx, cy, n, r) {
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

			function myGaussian() {
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
	}, []);

	return <div ref={sketchRef}></div>;
};

export default P5Sketch;
