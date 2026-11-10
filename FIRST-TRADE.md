# Your first trade, walked through on real data

Demo account: **$100,000**. Every number below came from the installed Day Trader
skill pack running on a real recorded TSLA session (Monday 2026-10-19), not from
my imagination. Nothing was placed anywhere.

## The three numbers that decide a beginner's survival

Not the stock. These:

| Setting | Value | Why |
| --- | --- | --- |
| Max loss per trade | **$1,000** (1%) | This is your real bet size. Not the $24,764 you put up. |
| Max daily loss | **$2,000** (2%) | Two bad trades and you stop. Enforced, not optional. |
| Max trades per day | **2** | Beginner rule. Overtrading is the #1 killer. |
| Max position | **25%** of account | Stops one name from being able to hurt you. |
| Min reward:risk | **2.0** | Refuse trades that do not pay at least 2:1. |

Note what happened: you said "$100,000" and the pack sized the trade to
**68 shares ($24,764)** because the *position cap* bound, not the budget. The
account size decides how much you can put on, but the **max loss** decides how
much you can lose. Bigger account does not mean bigger risk.

## The eight steps, in order

**1. Setup (scanner).** TSLA closed above its 15-minute opening range. Range
high $362.18, low $354.47. A real, rule-based setup, not a hunch.

**2. Entry trigger (entry timer).** The first 5-minute bar to CLOSE above the
range high did so at **10:15 AM at $364.18**. Not "it touched $362.18" - it had
to close there. That distinction is the whole skill.

**3. Stop and target (exit planner), set BEFORE buying.**

- Entry: $364.18
- Stop: **$358.32** (the midpoint of the opening range)
- Target: **$375.90** (2R)
- Risk per share: **$5.86**
- Flat by 15:55 ET, win or lose. No overnight hold.

**4. The honest odds (time machine).** 10,000 replays of the rest of that session:

| Outcome | Chance |
| --- | --- |
| Target first | **4.0%** |
| Stop first | **25.6%** |
| Neither by the close | 70.5% |
| Above entry at 4:00 PM | 50.1% |

Then the same rule replayed on the 59 real sessions before it: 33 setups fired,
**3 hit target, 17 hit stop**, 13 neither. Average **-0.154R**.

**This is the lesson.** Earlier the same trade with a 1R target showed 29.4%
target / 25.5% stop - roughly a coin flip. Demanding 2R turned a coin flip into
a losing proposition: the target gets hit 4% of the time. Reaching further for
more profit did not improve the trade, it destroyed it. Most beginners never
test this, so they never learn it.

**5. Position size (budget).** 68 shares, $24,764.24 at risk in the market,
**$398.48 actually at risk** at the stop.

**6. Risk check.** PASS - loss $398.48 against the $1,000 limit, R:R exactly 2.00,
0 of 2 trades used.

**7. Ticket.** A bracket order: buy 68 TSLA, stop-loss $358.32, take-profit
$375.90. Printed, not placed.

## What you should take from this

1. **$398 at risk to make $797, when the odds of the target are 4%.** Expected
   value is negative. A correct-looking chart with bad odds is still a bad trade.
2. **The stop is the plan, not a guarantee.** A gap or fast market fills below it.
   Your $398 could become $600.
3. **The account size is a distraction.** Your risk per trade is the only number
   that compounds - up or down.
4. **You never got a stock tip, because the stock was never the point.** The
   setup, the trigger, the stop, the size and the odds were.

## What I will not do

Name a stock to buy tonight. There is no data feed in this sandbox, the US open
is at 20:00 IST and the close is 02:30 IST, and you told me you are a beginner.
A ticker from me would be a coin flip dressed up as advice.

## Your legitimate next steps

- Re-run this exact walkthrough yourself with a different seed or symbol and see
  whether the odds ever favour the setup.
- Try `--target 1R` versus `--target 2R` on the same trade and watch the odds move.
- Do this for a few weeks on the demo account before any real money.

Not financial advice. Most people who day trade lose money.
