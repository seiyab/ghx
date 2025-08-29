import React from "react";
import { Text, useInput, useApp, Box } from "ink";
import { Header } from "./header.js";

export default function App() {
	const { exit } = useApp();
	const [command, setCommand] = React.useState("");
	useInput((input, key) => {
		if (key.return) {
			if (command === ":q") exit();
			setCommand("");
			return;
		}

		if ((key.ctrl && input === "u") || (key.ctrl && input === "[")) {
			setCommand("");
			return;
		}

		if (command.startsWith(":") || input.startsWith(":")) {
			setCommand((prev) => prev + input);
		}
	});
	return (
		<Box flexDirection="column" alignItems="stretch" width="100%" height="100%">
			<Header />
			<Box flexDirection="column" flexGrow={1}>
				<Text color="white">line 1</Text>
				<Text color="white">line 2</Text>
				<Text color="white">line 3</Text>
			</Box>
			<Box flexGrow={0} flexShrink={0} flexBasis="auto" minHeight={1}>
				<Text color="white">{command}</Text>
			</Box>
		</Box>
	);
}
