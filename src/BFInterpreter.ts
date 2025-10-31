import { BFToken, BFTokenizer } from "./BFTokenizer.ts";

export class BFInterpreter {
	private tape: Uint8Array = new Uint8Array(30_000);
	private pointer = 0;
	private loop_data: Map<number, number> = new Map();
	private tokens: BFToken[];
	private tokenizer: BFTokenizer;
	constructor(code: string) {
		this.tokenizer = new BFTokenizer(code);
		this.tokens = this.tokenizer.tokenize();
	}
	private preprocess() {
		const loopStack: number[] = [];

		for (let i = 0; i < this.tokens.length; i++) {
			if (this.tokens[i] === BFToken.LOOP_START) {
				loopStack.push(i);
			} else if (this.tokens[i] === BFToken.LOOP_END) {
				if (loopStack.length === 0) {
					throw new Error("Unmatched LOOP_END at " + i);
				}
				const begin = loopStack.pop()!;
				this.loop_data.set(begin, i);
				this.loop_data.set(i, begin);
			}
		}

		if (loopStack.length > 0) {
			throw new Error("Unmatched LOOP_START(s)");
		}
	}
	public run() {
		const ibuf: Uint8Array = new Uint8Array(1);
		const obuf: Uint8Array = new Uint8Array(1);
		this.preprocess();
		for (let i = 0; i < this.tokens.length; i++) {
			const token = this.tokens[i];
			switch (token) {
				case BFToken.READ:
					{
						Deno.stdin.readSync(ibuf);
						this.tape[this.pointer] = ibuf[0];
					}
					break;
				case BFToken.WRITE:
					{
						obuf[0] = this.tape[this.pointer];
						Deno.stdout.writeSync(obuf);
					}
					break;
				case BFToken.INC:
					this.tape[this.pointer]++;
					break;
				case BFToken.DEC:
					this.tape[this.pointer]--;
					break;
				case BFToken.MOVE_LEFT:
					this.pointer = (this.pointer - 1) % this.tape.length;
					break;
				case BFToken.MOVE_RIGHT:
					this.pointer = (this.pointer + 1) % this.tape.length;
					break;
				case BFToken.LOOP_START:
					{
						const entry = this.loop_data.get(i)!;
						if (this.tape[this.pointer] === 0) {
							i = entry;
						}
					}
					break;
				case BFToken.LOOP_END:
					{
						const entry = this.loop_data.get(i)!;
						if (this.tape[this.pointer] !== 0) {
							i = entry;
						}
					}
					break;
				case BFToken.EXIT: {
					Deno.exit(1);
				}
			}
		}
	}
}
