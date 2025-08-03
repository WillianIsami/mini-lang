import type { Expr, Stmt } from "./ast";

type Env = Record<string, number>;

export function interpret(stmts: Stmt[]): void {
  const env: Env = {};

  for (const stmt of stmts) {
    if (stmt.type === 'LetStmt') {
      const val = evalExpr(stmt.value, env);
      env[stmt.name] = val;
    } else if (stmt.type === 'ExprStmt') {
      const result = evalExpr(stmt.expr, env);
      console.log(result);
    }
  }
}

function evalExpr(expr: Expr, env: Env): number {
  switch (expr.type) {
    case 'NumberLiteral':
      return expr.value;
    case 'Variable':
      if (!(expr.name in env)) throw new Error(`Undefined variable: ${expr.name}`);
      return env[expr.name]!;
    case 'BinaryExpr':
      const l = evalExpr(expr.left, env);
      const r = evalExpr(expr.right, env);
      if (expr.operator === '+') return l + r;
      if (expr.operator === '*') return l * r;
      if (expr.operator === '-') return l - r;
      if (expr.operator === '/') return l / r;
      throw new Error(`Unknown operator: ${expr.operator}`);
  }
}
