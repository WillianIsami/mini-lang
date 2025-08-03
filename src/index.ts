import { tokenize } from './lexer';
import { parse } from './parser';
import { interpret } from './interpreter';

const source = `
  let x = 20 + 5;
  let y = x * 0;
  y;
  let y = x * 1;
  y;
  let y = x * 2;
  y;
`;

const tokens = tokenize(source);
const stmts = parse(tokens);
interpret(stmts);
