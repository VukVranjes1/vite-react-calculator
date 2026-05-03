# vite-react-calculator

Mini kalkulator napravljen u **React + Vite + TypeScript** okruženju, kao deo domaćeg zadatka iz predmeta *Nadzor i kontrola u DS. Cloud okruženje*.

## Opis projekta

Jednostavna web aplikacija koja podržava četiri osnovne aritmetičke operacije:

- sabiranje (`+`)
- oduzimanje (`−`)
- množenje (`×`)
- deljenje (`÷`)

UI sadrži dva input polja za unos brojeva, dugmad za operacije i prikaz rezultata. Aplikacija takođe pravilno obrađuje slučajeve nepotpunog unosa i deljenja sa nulom.

## Live verzija

[[https://vite-react-calculator.vercel.app](https://vite-react-calculator.vercel.app)](https://vite-react-calculator-nine.vercel.app/)

> Zameniti link iznad konkretnim Vercel URL-om nakon deployment-a.

## Tehnologije

- [Vite](https://vitejs.dev/) 5
- [React](https://react.dev/) 18
- [TypeScript](https://www.typescriptlang.org/) 5

## Lokalno pokretanje

Klonirati repozitorijum, instalirati zavisnosti i pokrenuti dev server:

```bash
git clone https://github.com/<your-username>/vite-react-calculator.git
cd vite-react-calculator
npm install
npm run dev
```

Aplikacija će biti dostupna na [http://localhost:5173](http://localhost:5173).

## Build za produkciju

```bash
npm run build
npm run preview
```

## Deployment

Aplikacija je deploy-ovana na [Vercel](https://vercel.com) sa automatskim CI/CD-om — svaki push na `main` granu pokreće novi build i ažurira live verziju aplikacije.

## Struktura projekta

```
vite-react-calculator/
├── public/
├── src/
│   ├── components/
│   │   ├── Calculator.tsx
│   │   └── Calculator.css
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
