// @ts-nocheck
import xo from "eslint-config-xo";
import xoTypeScript from "eslint-config-xo-typescript";
import xoReact from "eslint-config-xo-react";
import prettier from "eslint-config-prettier/flat";

// https://github.com/xojs/xo/issues/798
const xo798 = (config) => config.language?.startsWith("json/") !== true;

export default [
	...xo.filter(xo798),
	...xoTypeScript.filter(xo798),
	...xoReact,
	prettier,
	{ ignores: ["dist/", "eslint.config.js"] },
];
