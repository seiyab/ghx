import React from "react";
import { Text, useInput, useApp } from "ink";

type Props = Readonly<{ name: string | undefined }>;

export default function App({ name = "Stranger" }: Props) {
	const { exit } = useApp();
	const [command, setCommand] = React.useState("");
	useInput((input, key) => {
		if (key.return) {
			if (command === ":q") exit();
			setCommand("");
			return;
		}

		if (command.startsWith(":") || input.startsWith(":")) {
			setCommand((prev) => prev + input);
		}
	});
	return (
		<Text>
			Hello, <Text color="green">{name}</Text>
		</Text>
	);
}
