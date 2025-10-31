import { BFInterpreter } from "./BFInterpreter.ts";

function print_help_message() {
	console.log(`
R8CH'S BRAINFUCK INTERPRETER (powered by deno)\n
example usage:\n
\trbc hello.bf
`);
}
if (import.meta.main) {
	const args = Deno.args;
	if (args.length === 0 || args[0] == "-h") {
		print_help_message();
		Deno.exit(0);
	}
	const text = Deno.readTextFileSync(args[0]);
	const interpreter = new BFInterpreter(text);
	interpreter.run();
}
