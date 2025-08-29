import React from "react";
import { Octokit } from "octokit";
import { useInstance, type WithChildren } from "./react-utils.js";

const OctkitContext = React.createContext<Octokit | undefined>(undefined);

export function OctkitProvider({ children }: WithChildren): React.ReactNode {
	const octokit = useInstance<Octokit>(
		() => new Octokit({ auth: process.env["GITHUB_TOKEN"] }),
	);
	return (
		<OctkitContext.Provider value={octokit}>{children}</OctkitContext.Provider>
	);
}

export function useOctkit(): Octokit {
	const octokit = React.useContext(OctkitContext);
	if (!octokit) {
		throw new Error("useOctkit must be used within an OctkitProvider");
	}

	return octokit;
}
