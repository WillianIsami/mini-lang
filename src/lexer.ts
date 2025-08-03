export type Token =
  | { type: 'NUMBER'; value: number }
  | { type: 'IDENT'; value: string }
  | { type: 'OP'; value: string }
  | { type: 'LET' }
  | { type: 'EQUAL' }
  | { type: 'SEMICOLON' }
  | { type: 'EOF' };

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  const chars = input.match(/\s+|[0-9]+|[a-zA-Z_]+|==|=|[+*-/();]/g) || [];

  for (const part of chars) {
    if (/\s/.test(part)) continue;
    if (part === 'let') tokens.push({ type: 'LET' });
    else if (part === '=') tokens.push({ type: 'EQUAL' });
    else if (part === ';') tokens.push({ type: 'SEMICOLON' });
    else if (/^\d+$/.test(part)) tokens.push({ type: 'NUMBER', value: +part });
    else if (/^[a-zA-Z_]+$/.test(part)) tokens.push({ type: 'IDENT', value: part });
    else tokens.push({ type: 'OP', value: part });
  }

  tokens.push({ type: 'EOF' });
  return tokens;
}
