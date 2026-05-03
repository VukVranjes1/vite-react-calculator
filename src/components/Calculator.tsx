import { useState } from 'react'
import './Calculator.css'

type Operation = '+' | '-' | '*' | '/'

function compute(a: number, b: number, op: Operation): number {
  switch (op) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '*':
      return a * b
    case '/':
      return a / b
  }
}

function formatResult(value: number): string {
  if (!Number.isFinite(value)) return 'NaN'
  
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(8)))
}

function Calculator() {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = (op: Operation) => {
    setError(null)
    setResult(null)

    const numA = Number(a)
    const numB = Number(b)

    if (a.trim() === '' || b.trim() === '' || Number.isNaN(numA) || Number.isNaN(numB)) {
      setError('Unesite oba broja.')
      return
    }

    if (op === '/' && numB === 0) {
      setError('Deljenje sa nulom nije dozvoljeno.')
      return
    }

    setResult(formatResult(compute(numA, numB, op)))
  }

  const handleClear = () => {
    setA('')
    setB('')
    setResult(null)
    setError(null)
  }

  return (
    <section className="calc">
      <div className="calc__inputs">
        <label className="calc__field">
          <span>Broj 1</span>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="0"
          />
        </label>
        <label className="calc__field">
          <span>Broj 2</span>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="0"
          />
        </label>
      </div>

      <div className="calc__buttons">
        <button type="button" onClick={() => handleCalculate('+')} aria-label="Saberi">
          +
        </button>
        <button type="button" onClick={() => handleCalculate('-')} aria-label="Oduzmi">
          −
        </button>
        <button type="button" onClick={() => handleCalculate('*')} aria-label="Pomnoži">
          ×
        </button>
        <button type="button" onClick={() => handleCalculate('/')} aria-label="Podeli">
          ÷
        </button>
      </div>

      <div className="calc__output" aria-live="polite">
        {error && <p className="calc__error">{error}</p>}
        {result !== null && !error && (
          <p className="calc__result">
            Rezultat: <strong>{result}</strong>
          </p>
        )}
        {result === null && !error && (
          <p className="calc__placeholder">Unesite brojeve i izaberite operaciju.</p>
        )}
      </div>

      <button type="button" className="calc__clear" onClick={handleClear}>
        Obriši
      </button>
    </section>
  )
}

export default Calculator
