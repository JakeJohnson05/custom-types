type FSClassType<Rule extends string> = `fs-${Rule}`
type FSClassTypeConsent<Rule extends string> = `${FSClassType<Rule>}-consent`

type SingleEventTypeMappings = {
	str: string
	int: number
	real: number
	date: Date
	bool: boolean
}

type AllEventTypeProperties = SingleEventTypeMappings & {
	[Property in keyof SingleEventTypeMappings as `${Property}s`]: SingleEventTypeMappings[Property][]
}

type GetPropertyType<PropertyName extends string | number | symbol> =
	PropertyName extends `${infer _T}_${infer U}`
		? U extends keyof AllEventTypeProperties
			? AllEventTypeProperties[U]
			: never
		: unknown
type EventPropertyType<Type extends Record<string, unknown>> = {
	[Property in keyof Type]: GetPropertyType<Property>
}

declare module '@fullstory/react-native' {
	/**
	 * The options for use on a jsx element with the `testID` attribute.
	 *
	 * This will be mapped to native properties when project is built.
	 *
	 * @example ```jsx
	 * <Text testID='fs-unmask'>Lorem ipsum</Text>
	 * ```
	 */
	export type FullStoryClassOptions =
		| FSClassType<'exclude'>
		| FSClassType<'mask'>
		| FSClassType<'unmask'>
		| FSClassType<'unmask-with-consent'>

	export type JSXIntrinsicAttributes = {
		testID: FullStoryClassOptions
	}

	export type IdentifyUserAttributes<
		Type extends Record<string, unknown> = Record<string, never>
	> = Type & {
		/** Explicity sets the unique identifier for the user */
		uid?: string
		/** Displays nice-looking user names */
		displayName?: string
		/** Enables "Email this user" in FullStory app */
		email?: string
	}

	/** Log levels to be used in {@link log} */
	export enum LogLevel {
		/** Clamps to Debug on ios */
		Log,
		Debug,
		/** The default log level */
		Info,
		Warn,
		Error,
		/** Clamps to Error on Android */
		Assert
	}

	export function anonymize(): void
	export function consent(consentGiven: boolean): void
	export function event<EAttributes extends Record<string, unknown>>(
		eventTitle: string,
		attributes: EventPropertyType<EAttributes>
	): void
	/** Get the current session ID */
	export function getCurrentSession(): Promise<string>
	/** Get the current session URL */
	export function getCurrentSessionURL(): Promise<string>
	export function identify<TAttributes>(
		userID: string,
		userAttributes: IdentifyUserAttributes<TAttributes>
	): void
	export function onReady(): Promise<{
		[K in 'replayStartUrl' | 'replayNowUrl' | 'sessionId']: string
	}>
	export function restart(): void
	export function shutdown(): void
	// export function setUserVars(): void
	export function shutdown(): void
	/**
	 * Log results to the FullStory replay session console
	 *
	 * Note: If an invalid level is specified, it will default to `Info`
	 *
	 * @example ```js
	 * FullStory.log(FullStory.LogLevel.Info, 'Log at Info')
	 * ```
	 */
	export function log(logLevel: LogLevel, message: string): void
}
