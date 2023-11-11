export function errorToString(e: any): string { // eslint-disable-line @typescript-eslint/no-explicit-any
	if (typeof e == 'string') {
		return e;
	} else if (e.toString) {
		return e.toString() as string;
	} else {
		return 'Unknown error';
	}
}
