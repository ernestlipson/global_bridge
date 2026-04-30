You are a senior full-stack Next.js 16 + TypeScript engineer working on the GlobalBridge Edu Consult SaaS web application.

Project context:
GlobalBridge Edu Consult is an AI-powered study abroad platform for Ghanaian and West African students. One core feature is Smart University Matching, where students can search and filter universities by country, region/state/province, tuition, location, and other school details.

Tech stack:

- Next.js 16 App Router
- TypeScript
- React 19
- Tailwind CSS 4
- Server-side API route handlers
- Clean feature-based structure
- No API keys should ever be exposed to the frontend

Goal:
Implement university/school fetching using the API Ninjas University API.

Important API details:

- Base URL: <https://api.api-ninjas.com/v1/university>
- API key header: X-Api-Key
- Environment variable: API_NINJAS_KEY
- Free search supports country/name.
- Advanced filters such as state/province, city, tuition, enrollment may require premium access, so implement the code defensively.
- The API mainly supports USA and Canada, so make the UI clear about supported countries for now.

Implementation requirements:

1. Add environment variable support
Create or update `.env.local.example` with:

API_NINJAS_KEY=your_api_ninjas_key_here

Do not expose this key using NEXT_PUBLIC.
Use server-side Route Handlers only.

1. Create a typed API service
Create:

services/api-ninjas-university.service.ts

Implement:

- A TypeScript interface for the raw API response.
- A normalized `University` interface used by our app.
- A function named `fetchUniversitiesFromApiNinjas(params)`.

The params should support:

- country: string
- name?: string
- state?: string
- city?: string
- limit?: number

The function should:

- Build URLSearchParams safely.
- Send the request to API Ninjas with `X-Api-Key`.
- Throw a clear error if API_NINJAS_KEY is missing.
- Handle failed responses with useful error messages.
- Normalize the response into our app’s format.

Normalized university format:

export interface University {
  id: string;
  name: string;
  country: string;
  regionCode?: string | null;
  regionName?: string | null;
  city?: string | null;
  website?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  tuitionMin?: number | null;
  tuitionMax?: number | null;
  enrollment?: number | null;
  source: "api_ninjas";
}

Create stable IDs using a slug from name + country + city/state.

1. Create a Next.js API route
Create:

app/api/universities/route.ts

Implement a GET endpoint:

GET /api/universities?country=USA&state=CA&name=stanford
GET /api/universities?country=Canada&state=ON
GET /api/universities?country=USA

The route should:

- Read query params from `request.nextUrl.searchParams`.
- Require `country`.
- Validate supported countries: USA, Canada.
- Pass filters to the service.
- Return JSON in this format:

{
  "success": true,
  "data": [...],
  "meta": {
    "count": 10,
    "source": "api_ninjas",
    "filters": {
      "country": "USA",
      "state": "CA",
      "name": "stanford"
    }
  }
}

On error:

{
  "success": false,
  "message": "Human readable error message"
}

Use appropriate HTTP status codes:

- 400 for missing/invalid country
- 500 for server/API errors

1. Create frontend fetch helper
Create:

features/universities/api/getUniversities.ts

Implement:

export async function getUniversities(params: {
  country: "USA" | "Canada";
  state?: string;
  name?: string;
}) {
  ...
}

This function should call `/api/universities` from the browser and return normalized universities.

1. Update or create university types
Create or update:

features/universities/types.ts

Export:

- University
- UniversitySearchParams
- UniversitySearchResponse

1. Build the universities page UI
Update or create:

app/(dashboard)/universities/page.tsx

Requirements:

- Use a client component for the interactive search area.
- Search form fields:
  - Country dropdown: USA, Canada
  - State/Province input or dropdown
  - University name search input
  - Search button
- Show loading state.
- Show empty state.
- Show error state.
- Render results using UniversityCard.
- Make UI match GlobalBridge design:
  - Blue primary color
  - White background
  - Green accent badges
  - Rounded-xl cards
  - Clean SaaS dashboard layout
  - Mobile responsive

1. Create or update UniversityCard
Create or update:

features/universities/UniversityCard.tsx

Card should show:

- University name
- Country
- City
- State/province/region
- Website link if available
- Tuition if available
- Enrollment if available
- Source badge: API Ninjas

Use graceful fallbacks:

- “Location not available”
- “Tuition not available”
- “Enrollment not available”

1. Add country region constants
Create:

lib/regions.ts

Add arrays for:

- US states: code + name
- Canadian provinces/territories: code + name

Example:
USA:
CA - California
NY - New York
TX - Texas
MA - Massachusetts

Canada:
ON - Ontario
BC - British Columbia
AB - Alberta
QC - Quebec

The UI should switch the region dropdown depending on selected country.

1. Defensive behavior for API limitations
Because API Ninjas may require premium access for state/city filtering:

- Still include state and city params in the backend service.
- If the API returns an error related to plan limits, show a helpful UI message:
  “Advanced location filtering may require an upgraded API Ninjas plan. Try searching by country or university name.”

1. Security requirements

- Never call API Ninjas directly from the frontend.
- Never expose API_NINJAS_KEY to browser code.
- Use the Next.js Route Handler as the backend proxy.
- Keep `.env.local` out of git.
- Add `.env.local.example`.

1. Acceptance criteria
The feature is complete when:

- `/api/universities?country=USA` returns universities.
- `/api/universities?country=Canada` returns universities.
- `/api/universities?country=USA&name=harvard` works.
- Frontend page can search and display results.
- Missing API key gives a clear server error.
- Invalid country gives a 400 response.
- UI handles loading, error, empty, and success states.
- TypeScript has no errors.
- ESLint passes.
- API key is never exposed in client-side code.

1. Suggested file structure

services/
  api-ninjas-university.service.ts

app/
  api/
    universities/
      route.ts
  (dashboard)/
    universities/
      page.tsx

features/
  universities/
    api/
      getUniversities.ts
    UniversityCard.tsx
    UniversitySearchClient.tsx
    types.ts

lib/
  regions.ts

.env.local.example

1. After implementation
Provide:

- Summary of files created/updated.
- How to test locally.
- Example API calls.
- Any limitations discovered from API Ninjas.
