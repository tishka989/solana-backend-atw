# Web3 Real Estate MVP Backend

Minimal Express + TypeScript API for storing real-world asset metadata and linking each asset to a Solana token mint.

## Run

1. Install dependencies:
   - `npm install`
2. Create env:
   - copy `.env.example` to `.env`
3. Start dev server:
   - `npm run dev`

## Core idea

- This backend only stores metadata.
- It does not process balances, ownership, payments, or token transfers.
- Blockchain state is handled on Solana.

## Endpoints

### Assets

- `GET /assets`
- `GET /assets/:id`
- `POST /assets`
- `PUT /assets/:id`
- `DELETE /assets/:id`

Asset payload:

```json
{
  "name": "Astana Riverside Apartment",
  "description": "Modern 2-bedroom apartment near Ishim River.",
  "image": "https://example.com/apartment.jpg",
  "location": "Astana, Kazakhstan",
  "pricePerToken": 120,
  "totalSupply": 10000,
  "tokenMint": "7ZRXvN8QXG8xS1c2V9wQ4F3B4s8m4x2DzJp3n8xQ2sAk"
}
```

### Listings (optional secondary market metadata)

- `GET /listings`
- `POST /listings`
- `DELETE /listings/:id`

Listing payload:

```json
{
  "assetId": "asset_id_here",
  "sellerWallet": "wallet_public_key",
  "amount": 25,
  "pricePerToken": 140
}
```
