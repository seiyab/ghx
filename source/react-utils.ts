import React from "react";

export type WithChildren = { children: React.ReactNode };

export function useInstance<T>(factory: () => T): T {
	const instance = React.useRef<T>(undefined);
	instance.current ??= factory();
	return instance.current;
}
