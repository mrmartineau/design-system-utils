declare class DesignSystem {
	constructor(system: object, options?: object);
	/*~ Multiply two items together */
	multiply(initial: number, multiplier: number): any;
	get(val: string): any;
	bp(bp: string): any;
	z(z: string): any;
	fontSize(size: string|number, toPxl?: boolean): string;
	fs(size: string|number, toPxl?: boolean): string;
	spacing(index: number): string;
	space(index: number): string;
	toPx(value: number, base: number, unit?: string): string;
	pxTo(value: number, base: number): string;
	color(hue:string, value:string): string;
	designSystem: object;
	interface options {
		defaultUnit: string,
		useModularScale: boolean,
		fontSizeUnit: string
	}
}
