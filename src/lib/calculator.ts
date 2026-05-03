// src/lib/calculator.ts
//
// Logika kalkulatora: definicija operacija, parsiranje unosa, izvođenje kalkulacije i formatiranje rezultata

export interface OperationDefinition {
  readonly key: string
  readonly symbol: string 
  readonly label: string  
  apply(a: number, b: number): number
}

export const OPERATIONS = [
  { key: '+', symbol: '+', label: 'Saberi',  apply: (a: number, b: number) => a + b },
  { key: '-', symbol: '−', label: 'Oduzmi',  apply: (a: number, b: number) => a - b },
  { key: '*', symbol: '×', label: 'Pomnoži', apply: (a: number, b: number) => a * b },
  { key: '/', symbol: '÷', label: 'Podeli',  apply: (a: number, b: number) => a / b },
] as const satisfies readonly OperationDefinition[]

export type Operation = typeof OPERATIONS[number]['key']



export function isBlank(value: string): boolean {
  return value.trim() === ''
}

export function isValidNumber(value: string): boolean {
  if (isBlank(value)) return false
  return Number.isFinite(Number(value))
}

export function isKnownOperation(op: string): op is Operation {
  return OPERATIONS.some((o) => o.key === op)
}

export function isDivisionByZero(op: Operation, b: number): boolean {
  return op === '/' && b === 0
}



export type ParsedInput =
  | { ok: true; a: number; b: number; op: Operation }
  | { ok: false; error: string }

export function parse(rawA: string, rawB: string, rawOp: string): ParsedInput {
  if (!isValidNumber(rawA) || !isValidNumber(rawB)) {
    return { ok: false, error: 'Unesite oba broja.' }
  }
  if (!isKnownOperation(rawOp)) {
    return { ok: false, error: 'Nepoznata operacija.' }
  }

  const a = Number(rawA)
  const b = Number(rawB)

  if (isDivisionByZero(rawOp, b)) {
    return { ok: false, error: 'Deljenje sa nulom nije dozvoljeno.' }
  }

  return { ok: true, a, b, op: rawOp }
}



export type CalculateResult =
  | { ok: true; value: number }
  | { ok: false; error: string }

export function calculate(rawA: string, rawB: string, rawOp: string): CalculateResult {
  const parsed = parse(rawA, rawB, rawOp)
  if (!parsed.ok) return { ok: false, error: parsed.error }

  const operation = OPERATIONS.find((o) => o.key === parsed.op)
  if (!operation) {
    
    return { ok: false, error: 'Nepoznata operacija.' }
  }

  return { ok: true, value: operation.apply(parsed.a, parsed.b) }
}

// Formatiranje rezultata: ako je ceo broj, prikaži bez decimalnog dela, inače sa do 8 decimala.

export function formatResult(value: number): string {
  if (!Number.isFinite(value)) return 'NaN'
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(8)))
}
