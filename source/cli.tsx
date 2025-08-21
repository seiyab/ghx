#!/usr/bin/env node
import React from "react";
import meow from "meow";
import App from "./app.js";
import { renderFullScreen } from "./full-screen.js";

meow(
	`
	Usage
	  $ ghx

	Options
		--name  Your name

	Examples
	  $ ghx --name=Jane
	  Hello, Jane
`,
	{ importMeta: import.meta, flags: { name: { type: "string" } } },
);

renderFullScreen(<App />);
