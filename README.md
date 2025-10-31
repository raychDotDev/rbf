This is my little precious (brainfck)[https://esolangs.org/wiki/Brainfuck] interpreter.

Install (deno.js)[https://deno.com/]
to just run some .bf file: 
```sh
deno run dev [your_bf_file].bf
```
to compile the interpreter:
```sh
deno run dev [your_bf_file].bf
```
and then:
```sh
./rbf file.bf
```
to run the code from standalone executable.

available commands:
    "," - read char to cell
    "." - write char from cell
    "+" - increment cell value
    "-" - decrement cell value
    "<" - move pointer to left
    ">" - move pointer to right
    "[" - loop start
    "]" - loop end
    "!" - stop the program

have fun!
