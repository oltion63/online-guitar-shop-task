# Online Guitar Shop Project Submission

This is my completed Next.js project for the "Online Guitar Shop" task.

## Project Overview

This is a 3-page guitar shop application built with Next.js and Apollo Client to fetch data from the provided GraphQL API.

- Page 1 – Guitar Brands: Displays all guitar brands fetched from the API. Clicking a brand navigates to the models page.
- Page 2 – Guitar Models: Shows models of the selected brand with a search bar to filter by name, a type filter, and pagination.
- Page 3 – Guitar Details: Displays detailed specs and musicians using the selected guitar with a tabbed interface and paginated musicians list.

### Additional Features
- Styled with Tailwind CSS for a clean and responsive design.
- Dynamic translations in English, Macedonian (MK), and Albanian (SQ) done with "react-i18next".
- Error Pages and Loading pages.
## Setup Instructions

1. Clone the repository:

git clone https://github.com/oltion63/online-guitar-shop-task.git

2. Navigate into the project directory:

cd online-guitar-shop-task

3. Install dependencies:

npm install

4. Run the development server:

npm run dev

5. Open [http://localhost:3000](http://localhost:3000) in your browser.



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
