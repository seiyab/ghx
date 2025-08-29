import { Box, Text } from "ink";
import React from "react";
import { useOctkit } from "./octkit.js";
import { q } from "./query.js";
import { useQuery } from "@tanstack/react-query";

export function Header() {
	const octkit = useOctkit();
	const user = useQuery(q(octkit.rest.users).getAuthenticated());

	return (
		<Box borderBottom borderStyle="classic" justifyContent="space-between">
			<Box flexGrow={0} flexShrink={0} flexBasis="auto">
				<Text>ghx</Text>
			</Box>
			<Box flexGrow={0} flexShrink={0} flexBasis="auto">
				<Text>{user.data?.data.name ?? "Guest"}</Text>
			</Box>
		</Box>
	);
}
