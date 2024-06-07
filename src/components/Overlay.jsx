export function Underlay() {
	const date = new Date();
	const today = date.getFullYear();

	return (
		<div
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				padding: 40,
				display: "inline-flex",
				flexDirection: "column",
				alignItems: "flex-start",
				justifyContent: "flex-start",
				pointerEvents: "none",
			}}
		>
			<div
				style={{
					width: "100%",
					padding: 0,
					display: "inline-flex",
					flexDirection: "row",
					alignItems: "left",
					justifyContent: "left",
				}}
			>
				<p
					style={{
						flex: "1 1 0%",
						height: 30,
						fontSize: 30,
						fontWeight: "700",
						lineHeight: "30px",
						color: "#000",
					}}
				>
					genetype
				</p>
				<div style={{ flex: "1 1 0%", display: "flex", gap: "2em" }}></div>
				<p
					style={{
						flex: "1 1 0%",
						height: 30,
						fontSize: 30,
						lineHeight: "30px",
						textAlign: "right",
						color: "#000",
					}}
				>
					🍀
				</p>
			</div>
			<div style={{ height: 60 }} />

			<p
				className="container-info"
				style={{
					height: "fit-content",
					fontSize: 12,
					lineHeight: "1.5em",
					color: "#000",
				}}
			>
				<b> genetype is about modular </b>
				<br />
				mathematical typography.
				<br />
				<b>—</b>
			</p>

			<div style={{ height: 7 }} />
			<div
				className="full"
				style={{
					flex: "1 1 0%",
					padding: 0,
					display: "inline-flex",
					flexDirection: "row",
					alignItems: "flex-end",
					justifyContent: "left",
				}}
			></div>
			<div style={{ height: 60 }} />
			<div
				style={{
					pointerEvents: "all",
					width: "100%",
					padding: 0,
					display: "inline-flex",
					flexDirection: "row",
					alignItems: "flex-end",
					justifyContent: "left",
				}}
			>
				<p
					className="full"
					style={{
						whiteSpace: "nowrap",
						flex: "1 1 0%",
						fontSize: 12,
						lineHeight: "1.5em",
						color: "#000",
						background: "rgba (0,0,0,)",
						backdropFilter: blur("10px"),
					}}
				>
					<a href="rose.filtrolabcriativo.com">rose.filtrolabcriativo.com</a>{" "}
					<a href="https://github.com/trindaderose"></a> <br />
					The web is what we make it.
				</p>
				<div style={{ width: 10 }} />
				<p
					className="full"
					style={{
						flex: "1 1 0%",
						fontSize: 16,
						fontWeight: "700",
						lineHeight: "1em",
						textAlign: "right",
						color: "#000",
						whiteSpace: "nowrap",
						marginLeft: "10px",
					}}
				>
					{[today]}
				</p>
			</div>
		</div>
	);
}

export function Overlay() {
	return (
		<div style={{ position: "absolute", bottom: 40, right: 40 }}>
			<p
				style={{
					flex: "1 1 0%",
					fontSize: 12,
					lineHeight: "1em",
					textAlign: "right",
					color: "#A2E366",
				}}
			>
				<a href="">pmnd.rs</a> <a href="https://github.com/trindaderose">git</a>{" "}
				<a href="">csb</a>
			</p>
		</div>
	);
}
