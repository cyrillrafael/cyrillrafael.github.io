---
layout: text
title: Shop — Working Notes
permalink: /webshop/
noindex: true
scripts:
  - /assets/js/resources.js
---

# Shop — Working Notes

Notes on payment, shipping and production for an online shop. Researched 20 October 2026. "(unverified)" marks figures from secondary sources.

---

## Summary

<div class="featured-grant" markdown="1">
**Own shop:** eenmanszaak (KvK), Stripe Payment Links on this site, prints by an EU print-on-demand lab, originals shipped from The Hague.
</div>

<div class="featured-grant" markdown="1">
**Alongside:** Saatchi Art and Artfinder for originals; a Hague gallery or agent on consignment for large work.
</div>

---

## Payment Rails

### EU sanctions rule

- 19th sanctions package (late 2025): EU payment firms may not provide acquiring or issue payment instruments to Russian nationals ([Baker McKenzie on the March 2026 FAQ](https://sanctionsnews.bakermckenzie.com/eu-issues-new-faq-guidance-on-the-provision-of-payments-services-under-the-eu-russia-sanctions/))
- Exempt: holders of EU/EEA/Swiss nationality or of a valid residence permit in an EU member state
- The residence permit must remain valid for the life of the account
- Wise restricted cards only for Russian customers without EEA status ([Wise](https://wise.com/help/articles/6KoVCechMSzTAHwsKoJfVQ/wise-card-restrictions-for-russian-and-belarusian-customers))
- Onboarding: with the Dutch residence permit now, or with the Dutch passport after naturalisation; both nationalities declared where asked

### Dutch business

- **KvK:** eenmanszaak registration, ~€80 one-off (unverified)
- **VAT on originals:** 9% when supplied by the maker ([Belastingdienst](https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/tarieven_en_vrijstellingen/goederen_9_btw/kunst_verzamelvoorwerpen_antiek/kunstvoorwerpen/kunstvoorwerpen))
- **VAT on reproductions:** giclée likely 21% ([3D-print ruling](https://kennisgroepen.belastingdienst.nl/publicaties/kg20920233-btw-tarief-levering-3d-geprinte-zwangerschapsbeeldjes/)); hand-pulled linocuts likely 9% (unverified)
- **KOR:** VAT exemption under €20,000 turnover
- **OSS:** EU consumer sales above €10,000 a year

### Options

| Rail | Available | Cost | Integration |
|------|-----------|------|-------------|
| [Stripe NL](https://stripe.com/nl/pricing) | Dutch business | EEA cards 1.5% + €0.25; international 3.15% + €0.25; iDEAL €0.29 | Payment Links: one URL per work, hosted checkout, address collection |
| [Mollie](https://help.mollie.com/hc/en-us/articles/25490040188178) | Dutch business | Per method | Payment links |
| PayPal (NL) | Yes | ~3% + fixed (unverified) | Buttons |
| [Saatchi Art](https://www.saatchiart.com/en-nl/whysell) | Yes | 40% commission on originals; prints: 60% of profit to artist | Link out; shipping arranged and insured by Saatchi |
| [Artfinder](https://www.artfinder.com/sell) | Yes | Commission + seller plan | Link out |
| [Singulart](https://www.singulart.com/en/) | Yes | ~50% commission + $15–125/month (unverified) | Link out; logistics included |
| [INPRNT](https://help.inprnt.com/article/80-how-do-i-view-my-sales-and-withdraw-earnings) | Curated, by application | ~50% royalty (unverified); prints in the US | Link out |
| Etsy (NL) | Yes | Listing + transaction fees | Separate shop |
| [Gumroad](https://gumroad.com/help/article/13-getting-paid) | Yes | ~10% + processing (unverified); merchant of record | Buy buttons; physical goods supported |
| [Lemon Squeezy](https://docs.lemonsqueezy.com/help/getting-started/prohibited-products) | Digital goods only | — | — |

- **Own checkout (Stripe, Mollie):** seller is him; VAT handled by him
- **Merchant of record (Gumroad, marketplaces):** seller is the platform; he receives a share

---

## Shipping & Logistics

### From The Hague

- **Rolled canvas:** tube via PostNL or DHL Parcel, ~€10–25 within the NL and EU (unverified); no customs inside the EU
- **Stretched or crated work:** art handler or [Convelio](https://artsandcollections.com/the-logistics-of-moving-valuable-art-explained-by-convelio) (crating, transport, insurance); Saatchi and Singulart ship their own sales
- **Outside the EU:** customs declaration, HS 9701 for paintings; import duties paid by the buyer unless shipped duty-paid
- **Insurance:** courier standard cover is minimal; declare value; platform packing rules apply to claims ([Saatchi](https://support.saatchiart.com/hc/en-us/articles/14710147260187-Shipping-Insurance))

### From Dalian

- **EMS to NL:** from ~¥280 for 0.5 kg ([China Post rates via forwarder](https://goodhopefreight.com/ems/price-holland.html)); a 120 cm tube ~€60–150, 3–10 days (unverified)
- **Export:** no cultural-relics licence for works by living artists; commercial invoice, packing list, authorship statement ([Global Law Experts](https://globallawexperts.com/crossborder-art-sales-china/))
- **Import into NL:** 9% VAT on art; flat €3 EU customs duty per item category on low-value parcels since 1 July 2026 ([Baker McKenzie](https://globalimportblog.bakermckenzie.com/2026/07/02/eu-low-value-consignment-relief-abolished-and-eur-3-customs-duty-introduced-from-1-july-2026/))
- **Selling inside China:** not covered by a visitor or family permit; WeChat Pay and Alipay merchant accounts require a Chinese business licence

### Consignment

- Gallery or agent holds rolled originals and editions
- Written consignment or commission agreement; the gallery invoices the buyer, keeps 30–50%, pays the artist

---

## Production & Formats

| Tier | What | Price range | Made by | Notes |
|------|------|-------------|---------|-------|
| Originals, large | Installation-scale paintings | €2,500+ | Him | Gallery, marketplace, enquiry |
| Originals, small | Studies, works on paper | €150–600 | Him | Flat mailers |
| Linocut editions | Hand-pulled, numbered | €80–300 | Him or Grafische Werkplaats | Likely 9% VAT |
| Signed giclée editions | Numbered, certificate, signed | €60–200 | Fine-art printer, delivered to the studio | Signed by hand |
| Open-edition prints | Unsigned giclée | €30–80 | Print-on-demand | Shipped direct to buyer |
| Textile prints | Large printed fabric | — | Contrado / Spoonflower | Not researched |
| Books, zines, postcards | Riso, art book | €10–40 | Riso studio / Blurb / Peecho | Not researched |

### Print-on-demand

| Service | Model | Notes |
|---------|-------|-------|
| [Prodigi](https://www.prodigi.com/) | Per order, no fees | Fine Art Trade Guild approved; UK, EU, US labs; API, manual orders, CSV |
| [creativehub](https://creativehub.io/help/are-there-any-upfront-or-monthly-fees-to-sell-prints/) | No commission or monthly fee | Shopify/Etsy/Squarespace; payouts via Stripe |
| [Gelato](https://support.gelato.com/en/articles/8996200-start-selling-posters-and-framed-posters) | Per order, optional subscription | Giclée paper, 30+ sizes |
| [Fourthwall](https://fourthwall.com/compare/fourthwall-vs-prodigi) | Merchant of record + POD | Automated fulfilment; print quality unknown |

- A3 giclée, Hahnemühle-class paper: €15–25 print, €6–12 EU shipping; A2 €25–40 (unverified)
- With Stripe Payment Links, each print order is forwarded to the lab manually

### Chinese fine-art printers

- Shenzhen / Dafen: ~¥80–200 for A2 on cotton rag (unverified); quality varies
- Proof and paper-swatch run before an edition

### Editions

- Number, sign, certificate (edition size, paper, printer, date)
- Edition ledger kept in the site's data files
- Print-on-demand sold as open edition only

---

## Set-ups

### 1. Own Dutch shop

- **Seller:** eenmanszaak; Stripe Payment Links
- **Per order:** originals packed and shipped from the studio; prints forwarded to Prodigi
- **Cost:** KvK registration; Stripe fees; no monthly charge
- **Per sale:** €2,500 original ~€2,460 before shipping and tax; €60 print ~€35–40 after printing and fees

### 2. Marketplaces

- **Seller:** Saatchi Art, Artfinder, Singulart (originals); INPRNT (prints)
- **Per order:** originals handed to the platform's courier; prints none
- **Per sale:** €2,500 original ~€1,250–1,500; €60 print ~€24–30

### 3. Gallery consignment

- **Seller:** Hague gallery or agent, written agreement
- **Per sale:** €2,500 original €1,250–1,750

### 4. Gumroad

- **Seller:** Gumroad (merchant of record); physical goods and tax handled
- **Per sale:** €60 print ~€17–27 after ~10% fee and printing

---

## Open Questions

| # | Question | Source of answer |
|---|----------|------------------|
| 1 | Existing KvK registration and activity code | KvK |
| 2 | KOR or regular VAT; giclée 21% vs linocut 9% | Dutch bookkeeper |
| 3 | Payment account on the residence permit now, or on the passport later | Naturalisation timing |
| 4 | Which works become editions | Him |
| 5 | Price ladder: small original, linocut, signed print | Comparable artists on Saatchi |
| 6 | Courier prices for a 120 cm tube, The Hague to EU and US | PostNL, DHL quotes |

## Test Steps

1. One Stripe Payment Link for one small original
2. One A2 giclée proof each from Prodigi and a Chinese printer; compare paper, colour, edge
3. Five works listed on Saatchi Art
4. A linocut edition of 20, numbered, with certificates
5. A consignment enquiry with a Hague gallery

---

*Working notes, October 2026.*
