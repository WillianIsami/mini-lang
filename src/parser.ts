import type { Expr, Stmt } from './ast';
import type { Token } from './lexer';

export function parse(tokens: Token[]): Stmt[] {
  let pos = 0;
  const stmts: Stmt[] = [];

  function peek(): Token {
    if (tokens[pos] === undefined) {
      throw new Error('Unexpected end of input');
    }
    return tokens[pos]!;
  }

  function consume() {
    return tokens[pos++];
  }

  function parseExpr(): Expr {
    let left = parsePrimary();

    while (peek().type === 'OP') {
      const opToken = consume();
      if (!opToken || !('value' in opToken)) {
        throw new Error('Expected operator token with value');
      }
      const op = opToken.value;
      if (typeof op !== 'string') {
        throw new Error('Operator token value must be a string');
      }
      const right = parsePrimary();
      left = { type: 'BinaryExpr', operator: op, left, right };
    }

    return left;
  }

  function parsePrimary(): Expr {
    const tok = consume();
    if (!tok) {
      throw new Error('Unexpected end of input while parsing primary expression');
    }
    if (tok.type === 'NUMBER') {
      return { type: 'NumberLiteral', value: tok.value };
    }

    if (tok.type === 'IDENT') {
      return { type: 'Variable', name: tok.value };
    }

    throw new Error('Expected expression');
  }

  while (peek().type !== 'EOF') {
    if (peek().type === 'LET') {
      consume();
      const name = consume();
      if (!name || name.type !== 'IDENT') throw new Error('Expected variable name');
      const equalToken = consume();
      if (!equalToken || equalToken.type !== 'EQUAL') throw new Error('Expected =');
      const value = parseExpr();
      const semi = consume();
      if (!semi || semi.type !== 'SEMICOLON') throw new Error('Expected ;');
      stmts.push({ type: 'LetStmt', name: name.value, value });
    } else {
      const expr = parseExpr();
      const semi = consume()
      if (!semi || semi.type !== 'SEMICOLON') throw new Error('Expected ;');
      if (semi.type !== 'SEMICOLON') throw new Error('Expected ;');
      stmts.push({ type: 'ExprStmt', expr });
    }
  }

  return stmts;
}
