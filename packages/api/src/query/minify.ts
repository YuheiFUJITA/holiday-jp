import { z } from "@hono/zod-openapi";

const minify = z
	.union([z.literal("true"), z.literal("false"), z.literal("")])
	.transform((value) => value === "true" || value === "")
	.optional()
	.default("false");

minify.openapi({
	param: {
		name: "minify",
		in: "query",
	},
	description: "JSONをminifyするかどうか",
	example: "true",
});

export { minify };
