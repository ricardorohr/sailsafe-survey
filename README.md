# SailSafe — Survey

A self-serve customer-discovery survey for **SailSafe**, a maintenance app for recreational boat owners in Brazil. Mobile-first, Brazilian Portuguese, built to feel like a real product so the answers (especially willingness-to-pay) are trustworthy.

- **Stack:** React + Vite (plain JS), plain CSS. No database, no server to run.
- **Storage:** answers are POSTed to a **Google Apps Script** web app that appends them to your **Google Sheet**.
- **Privacy by design:** answers and contact info land in two separate tabs (`Respostas` and `Contatos`), joinable by a shared `submission_id` but kept apart by default.

---

## 1. Create the Google Sheet + script (one time, ~5 min)

1. Go to [sheets.new](https://sheets.new) and create a Sheet (name it e.g. "SailSafe"). Keep it private to your Google account — that is your access control.
2. In the Sheet: **Extensions → Apps Script**. Delete the sample code, then paste the entire contents of [`google-apps-script/Code.gs`](./google-apps-script/Code.gs). Save.
3. **Deploy → New deployment**:
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**, authorize when prompted, and **copy the Web app URL** (it ends with `/exec`).

The `Respostas` and `Contatos` tabs are created automatically on the first submission.

## 2. Connect the survey

```bash
npm install
cp .env.example .env      # then paste your Web app URL into VITE_SHEETS_URL
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

> Without a `.env`, the form still runs for previewing — it shows a non-blocking banner and works end to end, but submissions aren't sent.

## 3. Deploy to Vercel

1. Push this folder to a Git repo and import it at [vercel.com/new](https://vercel.com/new), **or** run `npx vercel` from this directory. Framework preset: **Vite**. If the repo root is the parent folder, set the **Root Directory** to `sailsafe-survey`.
2. Add the env var under **Settings → Environment Variables** (Production + Preview): `VITE_SHEETS_URL`.
3. Deploy. (`vercel.json` is included so the `/admin` route works.)

---

## Where the results live

Open your Google Sheet:

- **`Respostas`** — one row per submission, one column per question, plus `created_at` and `submission_id`.
- **`Contatos`** — only the people who left a contact, with their `submission_id`.

Use the Sheet's built-in tools (filters, pivot tables, charts) to analyze. The columns that carry most of the signal: **`tipo_embarcacao`** (persona — segment everything by this, sailboat vs motorboat is the key read), **`intencao_uso`** (0–10 willingness to pay), **`estado_manutencao`** (the boat's self-reported "waiting room", ordered healthy→critical), **`gastos_manutencao`** (yearly spend tier), and **`beta_interesse`** (who wants the beta).

The stored option values are your codebook — they're defined in [`src/data/questions.js`](./src/data/questions.js).

### Optional: a quick "Resumo" tab

Add a tab named `Resumo` and paste these for instant headline numbers (robust to column order):

```
Respostas:            =COUNTA(Respostas!A2:A)
Intenção média (0–10):=IFERROR(ROUND(AVERAGE(INDEX(Respostas!$A:$AZ,0,MATCH("intencao_uso",Respostas!$1:$1,0))),1),"—")
Confiança média (1–5):=IFERROR(ROUND(AVERAGE(INDEX(Respostas!$A:$AZ,0,MATCH("confianca_manutencao",Respostas!$1:$1,0))),1),"—")
"Sim, topo" (testes): =COUNTIF(INDEX(Respostas!$A:$AZ,0,MATCH("wants_future_tests",Respostas!$1:$1,0)),"sim_topo")
```

---

## Editing the survey

The survey is **config-driven**. To change wording, options, order, or branching, edit [`src/data/questions.js`](./src/data/questions.js) — you rarely need to touch components. New answer fields automatically become new columns in the Sheet (the script syncs headers).

- **Field types:** `single`, `multi`, `likert` (1–5), `scale` (0–10), `open`.
- **`isOther: true`** on an option reveals a free-text input.
- **`exclusive: true`** on an option (e.g. "Nenhum desses") clears the others when picked.
- **`followUp`** renders an inline conditional question under its parent (shown when `showIf(answers)` is true). Follow-ups never add a step, so the progress bar denominator only counts the main questions (currently "de 17").

Retune the visual brand in [`src/styles/tokens.css`](./src/styles/tokens.css) — colors, type, spacing, radii all live there.

## The /admin page

`/admin` is a self-contained **preview** of a dashboard layout running on sample data, useful for design. Your real analysis is the Google Sheet. (A live dashboard on top of the Sheet can be added later behind proper access control.)

## Spam protection

A hidden **honeypot** field is included on the final screen. Real users never see or fill it; if it arrives filled, the submission is silently dropped (the user still sees the thank-you screen).

## How the pieces fit

```
src/
  App.jsx                 step sequencing, state, validation, submit
  data/questions.js       the whole survey definition (single source of truth)
  lib/
    config.js             reads VITE_SHEETS_URL + isConfigured flag
    submit.js             payload building, honeypot, POST to the Sheets endpoint
  components/             field components + screens (Intro, Concept, Contact, ...)
  styles/                 tokens.css (brand) + app.css
  admin/                  preview dashboard (sample data)
google-apps-script/Code.gs   paste into your Sheet's Apps Script, then deploy
```
