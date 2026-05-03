import { useState } from 'react'
import { OPERATIONS, calculate, formatResult } from '../lib/calculator'
import './Calculator.css'

function Calculator() {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = (op: string) => {
    const outcome = calculate(a, b, op)
    if (outcome.ok) {
      setResult(formatResult(outcome.value))
      setError(null)
    } else {
      setError(outcome.error)
      setResult(null)
    }
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
        {OPERATIONS.map((op) => (
          <button
            key={op.key}
            type="button"
            onClick={() => handleCalculate(op.key)}
            aria-label={op.label}
          >
            {op.symbol}
          </button>
        ))}
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
