---
layout: text
title: Shop — Working Notes
permalink: /webshop/
noindex: true
scripts:
  - /assets/js/resources.js
---

# Shop — Working Notes

*Unlisted. Not a shop yet: a long think about how one could work — who takes the money, how the work travels, and what can be made in numbers without diluting it. Researched 20 October 2026, for an artist based in The Hague (Russian passport, Dutch residence permit, Dutch citizenship imminent). Claims marked (unverified) came from secondary sources and need checking before anything rests on them.*

---

## The Short Answer

<div class="featured-grant" markdown="1">
**Sell from The Hague under his own Dutch registration.** A sole proprietorship (eenmanszaak) with Stripe Payment Links on this site, prints fulfilled by an EU print-on-demand lab, originals shipped by him from the studio.
</div>

<div class="featured-grant" markdown="1">
**Run marketplaces and a gallery alongside it.** Saatchi Art and Artfinder for reach on originals, a Hague gallery or agent on consignment for the large work.
</div>

Three of the problems are smaller than they look from a distance: payment is solved by residence, shipping is domestic for most European buyers, and print production can be fully outsourced. The genuinely open work is **formats and editions** — deciding what exists in numbers and what never does.

---

## Payment Rails

### Why the sanctions rule doesn't block him

Since the EU's 19th sanctions package (late 2025), EU payment firms may not provide "acquiring of payment transactions" or issue payment instruments to Russian nationals — **except** those who also hold EU/EEA/Swiss nationality **or a valid residence permit in an EU member state** ([Baker McKenzie on the March 2026 FAQ](https://sanctionsnews.bakermckenzie.com/eu-issues-new-faq-guidance-on-the-provision-of-payments-services-under-the-eu-russia-sanctions/)). His Dutch residence permit puts him inside the exception today; the permit must stay valid for as long as the account exists. Wise, for instance, blocked cards only for Russian customers *without* EEA status ([Wise](https://wise.com/help/articles/6KoVCechMSzTAHwsKoJfVQ/wise-card-restrictions-for-russian-and-belarusian-customers)).

**Practical sequence:** if naturalisation is weeks away, wait and onboard with the Dutch passport — one less document to keep valid. If a shop is needed sooner, onboard now with the residence permit and update the ID once the passport arrives. Either way, declare both nationalities wherever a form asks.

### The Dutch business

- **KvK registration** as an eenmanszaak (sole proprietorship) — ~€80 one-off (unverified); a working artist selling regularly should be registered anyway. If he already has a KvK number for his practice, the shop sits under it.
- **VAT.** Original art supplied by its maker is 9% ([Belastingdienst](https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/tarieven_en_vrijstellingen/goederen_9_btw/kunst_verzamelvoorwerpen_antiek/kunstvoorwerpen/kunstvoorwerpen)); mechanical reproductions such as giclées are likely 21% ([3D-print ruling](https://kennisgroepen.belastingdienst.nl/publicaties/kg20920233-btw-tarief-levering-3d-geprinte-zwangerschapsbeeldjes/)); hand-pulled linocuts plausibly 9% (unverified). Under €20,000 turnover the **KOR** small-business scheme exempts him from charging VAT at all. Sales to other EU consumers above €10,000 a year go through the OSS return.

### Options

| Rail | Open to him? | Cost | Fits a static site? |
|------|--------------|------|---------------------|
| [Stripe NL](https://stripe.com/nl/pricing) | Yes — Dutch business | EEA cards 1.5% + €0.25; international 3.15% + €0.25; iDEAL €0.29 | **Payment Links** — one URL per work, hosted checkout, address collection; ideal |
| [Mollie](https://help.mollie.com/hc/en-us/articles/25490040188178) | Yes — Dutch business | Per method | Payment links |
| PayPal (NL) | Yes | ~3% + fixed (unverified) | Buttons; also the payout route for some marketplaces |
| [Saatchi Art](https://www.saatchiart.com/en-nl/whysell) | Yes | 40% commission on originals; prints 60% of profit to artist | Link out; Saatchi arranges and insures shipping |
| [Artfinder](https://www.artfinder.com/sell) | Yes (from the Netherlands) | Commission + seller plan | Link out |
| [Singulart](https://www.singulart.com/en/) | Yes | ~50% commission + subscription $15–125/month (unverified) | Link out; handles logistics |
| [INPRNT](https://help.inprnt.com/article/80-how-do-i-view-my-sales-and-withdraw-earnings) | Curated — apply | ~50% royalty (unverified); prints in the US | Link out |
| Etsy (NL) | Yes | Listing + transaction fees | Separate shop |
| [Gumroad](https://gumroad.com/help/article/13-getting-paid) | Yes | ~10% + processing (unverified); reportedly merchant of record | Buy buttons; physical goods supported — handles tax for him |
| [Lemon Squeezy](https://docs.lemonsqueezy.com/help/getting-started/prohibited-products) | Digital only | — | Only for e.g. hi-res files |

**Merchant of record, in one line:** with Stripe he is the seller and handles VAT himself; with Gumroad or a marketplace, the platform is the seller and he is paid a share. The first keeps more money; the second keeps less paperwork.

---

## Shipping & Logistics

### From The Hague

- **Rolled canvas in a tube** for large paintings: PostNL or DHL Parcel within the Netherlands and the EU, roughly €10–25 per tube (unverified). No customs inside the EU.
- **Stretched or crated work:** an art handler or [Convelio](https://artsandcollections.com/the-logistics-of-moving-valuable-art-explained-by-convelio) quotes crating, transport and insurance; Saatchi and Singulart run their own art logistics for their sales.
- **Outside the EU:** a customs declaration (HS code 9701 for paintings), and the buyer pays import duties unless shipped duty-paid. Say so plainly on the listing.
- **Insurance:** couriers' standard cover is minimal — declare value and buy cover, and follow the platform's packing rules or lose the claim ([Saatchi](https://support.saatchiart.com/hc/en-us/articles/14710147260187-Shipping-Insurance)).

### From Dalian, while he is there

- Work made in China can travel home by courier: EMS starts around ¥280 for 0.5 kg to the Netherlands ([China Post rates via forwarder](https://goodhopefreight.com/ems/price-holland.html)); a 120 cm tube runs roughly **€60–150**, 3–10 days (unverified). Works by living artists need no cultural-relics export licence; carry a commercial invoice, packing list and a signed authorship statement ([Global Law Experts](https://globallawexperts.com/crossborder-art-sales-china/)).
- Importing his own originals into the Netherlands: 9% import VAT on art. Since 1 July 2026 low-value parcels also carry a flat €3 EU customs duty per item category ([Baker McKenzie](https://globalimportblog.bakermckenzie.com/2026/07/02/eu-low-value-consignment-relief-abolished-and-eur-3-customs-duty-introduced-from-1-july-2026/)).
- **Not** selling inside China: a visitor's or family permit doesn't authorise paid work there, and WeChat Pay or Alipay merchant accounts need a Chinese business licence. Sell from the Netherlands, to anyone, including buyers in China.

### Consignment — for the large work

A Hague gallery or agent holds a selection of rolled originals and editions and sells them under its own name on a written **consignment or commission agreement**: it invoices the buyer, keeps 30–50%, pays him. Good for work too large to sell through a link, and for buyers who want to see it in person.

---

## Production & Formats

The ladder, from most original to most scalable:

| Tier | What | Price range | Who makes it | Notes |
|------|------|-------------|--------------|-------|
| Originals, large | Installation-scale paintings | €2,500+ | Him | Gallery, marketplace, or by enquiry — rarely a buy button |
| Originals, small | Studies, works on paper | €150–600 | Him | Flat mailers; the best first purchase for a new collector |
| Linocut editions | Hand-pulled, numbered | €80–300 | Him, or Grafische Werkplaats | Original prints — likely 9% VAT; the strongest scalable original |
| Signed giclée editions | Numbered, certificate, hand-signed | €60–200 | Fine-art printer, delivered to the studio | Signing means the prints must pass through his hands |
| Open-edition prints | Unsigned giclée | €30–80 | Print-on-demand | Never touches him |
| Textile prints | Large printed fabric | — | Contrado / Spoonflower (not researched) | Echoes the large-surface work |
| Books, zines, postcards | Riso, art book | €10–40 | Riso studio / Blurb / Peecho (not researched) | Cheap reach |

### Print-on-demand

| Service | Model | Notes |
|---------|-------|-------|
| [Prodigi](https://www.prodigi.com/) | Pay per order, no fees | Fine Art Trade Guild approved; UK, EU and US labs; API, manual orders, CSV |
| [creativehub](https://creativehub.io/help/are-there-any-upfront-or-monthly-fees-to-sell-prints/) (theprintspace) | No commission or monthly fee | Connects to Shopify/Etsy/Squarespace; payouts via Stripe |
| [Gelato](https://support.gelato.com/en/articles/8996200-start-selling-posters-and-framed-posters) | Per order, optional subscription | Giclée paper, 30+ sizes |
| [Fourthwall](https://fourthwall.com/compare/fourthwall-vs-prodigi) | Merchant of record + POD | Automates fulfilment; art-print quality unknown |

Indicative costs (unverified): an A3 giclée on Hahnemühle-class paper costs €15–25 to print plus €6–12 to ship within the EU; A2 €25–40. With Stripe Payment Links the order flow is manual — a sale arrives, he forwards the address to Prodigi; at a few orders a week that is minutes.

### China as a print shop

Shenzhen and Dafen fine-art printers are cheap and capable — anecdotally ¥80–200 for an A2 on cotton rag (unverified), with variable quality. While he is in Dalian: order one proof and a paper-swatch run, compare against a Prodigi proof, and if it holds, bring or ship a small signed edition home.

### Editions, properly

- Number, sign, and issue a certificate (edition size, paper, printer, date).
- Keep a ledger of every edition in the site's own data files, so provenance lives with the work.
- Print-on-demand can't be hand-signed — sell it as open edition, never as limited.

---

## Four Architectures, Ranked

### 1. Own Dutch shop — recommended

- **Seller:** him, as an eenmanszaak; Stripe Payment Links on this site
- **Per order:** originals — pack and ship from the studio; prints — forward the order to Prodigi
- **Cost:** KvK registration; Stripe fees only, no monthly charge
- **Per sale:** €2,500 original → ~€2,460 before shipping and tax; €60 print → ~€35–40 after printing and fees
- **Next step:** confirm or create the KvK registration, open Stripe NL (with the passport if it's weeks away), make one Payment Link for one small work

### 2. Marketplaces, in parallel

- **Seller:** Saatchi Art, Artfinder, Singulart (originals); INPRNT (prints)
- **Per order:** originals — pack and hand to the platform's courier; prints — nothing
- **Per sale:** €2,500 original → ~€1,250–1,500; €60 print → ~€24–30
- **Why bother:** buyers who would never find the site; the platforms do the marketing
- **Next step:** list five works on Saatchi Art; apply to INPRNT

### 3. Gallery consignment, for the large work

- **Seller:** a Hague gallery or agent, under a written agreement
- **Per sale:** €2,500 original → €1,250–1,750
- **Next step:** ask two or three Hague contacts — galleries he has shown with, Grafische Werkplaats — about a 20-piece commission agreement

### 4. Gumroad as merchant of record — if VAT admin is the obstacle

- **Seller:** Gumroad; supports physical goods and handles tax
- **Per sale:** €60 print → ~€17–27 after its ~10% and printing
- Keeps the paperwork near zero at the cost of margin; a reasonable bridge before registering for VAT

---

## Open Questions

| # | Question | Who answers it |
|---|----------|----------------|
| 1 | Is he already registered with KvK, and under which activity code? | Him / KvK |
| 2 | KOR or regular VAT — and is a giclée 21% while a hand-pulled linocut is 9%? | A Dutch bookkeeper |
| 3 | Open the payment account now on the residence permit, or wait for the passport? | Depends on naturalisation timing |
| 4 | Which works exist in numbers — which paintings become editions, which never do? | Him — the real decision |
| 5 | Price ladder: what is a small original, a linocut, a signed print? | Him, against comparable artists on Saatchi |
| 6 | Real courier prices for a 120 cm tube, The Hague → EU and → US? | PostNL, DHL quotes |

## Cheap Experiments, in Order

1. **One Payment Link.** One small original, one Stripe link, shared with friends — the whole pipeline in an afternoon.
2. **One proof.** One A2 giclée from Prodigi, one from a Chinese printer while he's in Dalian; compare paper, colour, edge.
3. **Five listings.** Five works on Saatchi Art; note which get views.
4. **One edition.** A small linocut edition of 20, numbered, with certificates — sold through the Payment Link.
5. **One conversation.** A Hague gallery about consignment for the large work.

---

*Working notes, October 2026 — not linked from the site navigation.*
