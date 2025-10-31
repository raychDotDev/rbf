export enum BFToken {
	// ,
	READ = 1 >> 1,
	// .
	WRITE = 1 << 1,
	// +
	INC = 1 << 2,
	// -
	DEC = 1 << 3,
	// <
	MOVE_LEFT = 1 << 4,
	// >
	MOVE_RIGHT = 1 << 5,
	// [
	LOOP_START = 1 << 6,
	// ]
	LOOP_END = 1 << 7,
	// !
	EXIT = 1 << 8,
}
export class BFTokenizer {
	private code: string;
	constructor(code: string) {
		if (code.length == 0) {
			throw new Error("Input is empty, nothing to parse");
		}
		this.code = code;
	}
	public tokenize(): BFToken[] {
		const res: BFToken[] = [];
		for (let i = 0; i < this.code.length; i++) {
			switch (this.code[i]) {
				case ",":
					res.push(BFToken.READ);
					break;
				case ".":
					res.push(BFToken.WRITE);
					break;
				case "+":
					res.push(BFToken.INC);
					break;
				case "-":
					res.push(BFToken.DEC);
					break;
				case "<":
					res.push(BFToken.MOVE_LEFT);
					break;
				case ">":
					res.push(BFToken.MOVE_RIGHT);
					break;
				case "[":
					res.push(BFToken.LOOP_START);
					break;
				case "]":
					res.push(BFToken.LOOP_END);
					break;
				case "!":
					res.push(BFToken.EXIT);
					break;
			}
		}
		if (res.length === 0) {
			throw new Error("There's no tokens in input string");
		}
		return res;
	}
}
