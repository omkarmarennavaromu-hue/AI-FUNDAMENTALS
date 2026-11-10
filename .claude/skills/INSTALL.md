# Day Trader skill - install notes (AI-FUNDAMENTALS)

Upstream: https://github.com/Jakeschincariol/day-trader-skill (MIT, by Jake Schincariol)
Installed: v2.0.0, commit `3d0f4ef` ("The Trader skill v2: 11 day-trading skills")

## What is here

Project-local install of the 11 skills into `.claude/skills/`, which is the
layout the README documents for project-local use ("copy the same folders into
your repo's `.claude/skills/`").

```
.claude/skills/
  trader-scanner/      Chart scanner (opening-range breakouts, flags, oversold)
  trader-news/         News monitor (Yahoo headlines, SEC 8-Ks)
  trader-entry/        Entry timer (bar by bar: waiting / triggered / expired)
  trader-exit/         Exit planner (stop + target before you enter)
  trader-timemachine/  10,000-session Monte Carlo + rule replay on real history
  trader-risk/         Risk manager (PASS / BLOCK per order)
  trader-budget/       Position sizing + bracket order builder
  trader-broker/       Order ticket + approval gate (never places orders itself)
  trader-alerts/       Price / stop / target / flat-by-close alerts
  trader-analyst/      Earnings reader (SEC XBRL company facts)
  trader-pelosi/       Congressional PTR (STOCK Act) filings tracker
  tests/               Upstream offline test suite + fixtures
  LICENSE, README.md   Upstream license and docs
```

Nothing to pip install: all tools are standard-library Python (3.8+; this
sandbox has 3.11).

## Usage

Skills are invoked as slash commands - `/trader-scanner`, `/trader-news`,
`/trader-entry`, and so on. Each has a `SKILL.md` with its full contract.

The tools also run directly. From the repo root:

```bash
python3 .claude/skills/trader-scanner/scan.py --help
python3 .claude/skills/trader-analyst/facts.py --help
python3 .claude/skills/trader-entry/entry.py check TSLA --setup orb
```

Runtime state lives in `trader/` at the repo root (watchlist, plan, orders,
alerts, config). `trader/config.json` was seeded from the upstream
`config.example.json`.

## Configuration you must edit

`trader/config.json`:

- `sec_user_agent` - currently the placeholder `"Your Name you@example.com"`.
  SEC requires a real name + email; the news and analyst tools will be refused
  (or unruly) until you set it. Alternatively export `SEC_USER_AGENT`.
- `budget`, `max_loss_per_trade_usd`, `max_daily_loss_usd`, `max_trades_per_day`
  - the $5,000 / $50 defaults are placeholders, not your numbers.
- `paper` is `true` and should stay `true` until you have deliberately decided
  otherwise. `allow_options`, `allow_margin`, `allow_short` are all `false`.

## Verification

```bash
cd .claude/skills && python3 -m unittest discover -s tests
```

Upstream result from its own repo root: 315 tests, all pass.

Installed here: 315 tests, **313 pass, 2 fail**. Both failures are in
`tests/test_repo.py`, and both are packaging assertions rather than skill
behaviour:

- `test_root_matches_the_reel` asserts the repo root contains exactly
  `.claude-plugin`, `LICENSE`, `README.md`, `tests` and the 11 skill folders.
- `test_plugin_manifest_points_at_the_root_skills` reads
  `.claude-plugin/plugin.json`.

We copied the skill folders into `.claude/skills/` instead of taking over the
repo root, and did not copy the plugin manifest, so those two assertions no
longer describe this tree. Every functional test (scanner, news, entry, exit,
time machine, risk, budget, broker, alerts, analyst, pelosi) passes.

## Sandbox caveat: no market data here

This environment's network egress is limited to GitHub, npm and PyPI. Yahoo
Finance, Nasdaq Trader, SEC and the House Clerk are **not** reachable, so live
scans, live quotes and live filings fail here with a TLS error. The offline
fixtures and all arithmetic work fine. Live use needs an environment with
normal internet access.

## Safety properties (verified by reading the source)

- `trader-broker/ticket.py` never talks to a broker and never places an order.
  It writes the exact JSON arguments for Alpaca's `place_stock_order` tool and
  waits for an explicit recorded approval. Execution requires a separate
  broker connector plus your "yes".
- No `eval`/`exec`, no obfuscated payloads, no hardcoded endpoints beyond the
  public data hosts listed in the README.
- The only subprocess use is `pdftotext` in `trader-pelosi/ptr.py`.
- The only environment variable read is `SEC_USER_AGENT`; no credentials are
  read, logged or transmitted.

## Fine print

Not financial advice. Most people who day trade lose money. The Time Machine is
a simulation built from the last ~60 days of the stock's own bars, not a
prediction.
