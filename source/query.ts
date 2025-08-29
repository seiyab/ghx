import { type UseQueryOptions } from "@tanstack/react-query";

// eslint-disable-next-line @typescript-eslint/naming-convention
type JSONValue = ReturnType<typeof JSON.parse>;

type QueryProxy<Instance extends Record<string, unknown>> = {
	[K in keyof Instance]: Instance[K] extends (
		(...args: infer Args) => Promise<infer Return>
	) ?
		(...args: Args & JSONValue[]) => UseQueryOptions<Return, unknown>
	:	undefined;
};

export function q<Instance extends Record<string, unknown>>(
	instance: Instance,
): QueryProxy<Instance> {
	let instanceKey = instanceKeys.get(instance);
	if (!instanceKey) {
		instanceKey = crypto.randomUUID();
		instanceKeys.set(instance, instanceKey);
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
	return new Proxy({} as QueryProxy<Instance>, {
		get(_, prop) {
			if (typeof prop !== "string") return undefined;
			if (!(prop in instance)) return undefined;
			if (typeof instance[prop] !== "function") return undefined;

			return (...args: JSONValue[]) => ({
				// eslint-disable-next-line @tanstack/query/exhaustive-deps
				queryKey: [instanceKey, prop, ...args],
				queryFn: async () =>
					// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
					(instance[prop] as (...args: unknown[]) => Promise<unknown>)(...args),
			});
		},
	});
}

const instanceKeys = new WeakMap<Record<string, unknown>, string>();
