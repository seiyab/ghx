import React from "react";
import chalk from "chalk";
import { render } from "ink-testing-library";
import { expect, test } from "vitest";
import App from "./app.js";

test("greet unknown user", () => {
	const { lastFrame } = render(<App />);

	expect(lastFrame()).toBe(`Hello, ${chalk.green("Stranger")}`);
});

test("greet user with a name", () => {
	const { lastFrame } = render(<App />);

	expect(lastFrame()).toBe(`Hello, ${chalk.green("Jane")}`);
});
