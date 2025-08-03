export type Expr =
  | { type: 'NumberLiteral'; value: number }
  | { type: 'Variable'; name: string }
  | { type: 'BinaryExpr'; operator: string; left: Expr; right: Expr };

export type Stmt =
  | { type: 'LetStmt'; name: string; value: Expr }
  | { type: 'ExprStmt'; expr: Expr };
