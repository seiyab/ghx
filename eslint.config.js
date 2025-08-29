// @ts-nocheck
import xo from "eslint-config-xo";
import xoTypeScript from "eslint-config-xo-typescript";
import xoReact from "eslint-config-xo-react";
import prettier from "eslint-config-prettier/flat";
import pluginQuery from "@tanstack/eslint-plugin-query";

// https://github.com/xojs/xo/issues/798
const xo798 = (config) => config.language?.startsWith("json/") !== true;

export default [
	...xo.filter(xo798),
	...xoTypeScript.filter(xo798),
	...xoReact,
	...pluginQuery.configs["flat/recommended"],
	prettier,
	{ ignores: ["dist/", "eslint.config.js"] },
];
