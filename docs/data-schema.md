# Dog-Friendly Patios Data Schema

This document defines the schema for structured data used in the Dog-Friendly Patios project. It reflects the Firestore-compatible structure after transformation by the import script.

## Top-Level Fields

Each record in the dataset is a patio venue with the following structure:

---

## 🔹 Name (string)
- **Description:** Full name of the venue.
- **Example:** `"Uncle Abe’s"`

## 🔹 Address (string)
- **Description:** Full civic address.
- **Example:** `"3032 Main St, Vancouver, BC"`

## 🔹 Neighbourhood (string)
- **Description:** Local neighborhood for UX and filtering.
- **Example:** `"Mount Pleasant"`

## 🔹 City (string)
- **Default:** `"Vancouver"`

## 🔹 FoodType (string)
- **Description:** General venue type (used for filters and Schema.org mapping).
- **Examples:** `"Brewery"`, `"Restaurant"`, `"Cafe"`, `"Pub"`

## 🔹 DogPolicyVerified (boolean)
- **Description:** Whether the dog-friendly status was verified.
- **Example:** `true`

## 🔹 WaterBowl, CoveredPatio, HeatedPatio (boolean)
- **Description:** Specific dog amenities available.
- **Example:** `true`

## 🔹 SpaceRating (string)
- **Description:** Relative space quality for dogs (e.g., `"Large"`, `"Cramped"`)

## 🔹 PetAmenities (array of strings)
- **Examples:** `["Treats", "Play Area", "Toys"]`

## 🔹 Notes (string)
- **Description:** Freeform notes about experience, rules, or quirks.

## 🔹 UserRating (number)
- **Description:** Average rating (out of 5).
- **Default:** `0`

## 🔹 reviewCount (number)
- **Description:** Number of user reviews gathered.
- **Default:** `0`

---

## 🔸 Geo (object)

```json
{
  "Location": { "_lat": 49.262, "_lng": -123.0987 },
  "GoogleMapsURL": "https://maps.google.com/?q=..."
}
