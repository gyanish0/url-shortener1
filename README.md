# URL Shortener

A Next.js-based URL shortening service similar to Bitly or TinyURL, using MongoDB Atlas for storage and deployed on Vercel with serverless functions.

## Features

- Shorten long URLs to compact, shareable links
- Redirect short URLs to original destinations
- Track click counts for each shortened URL
- Copy shortened URLs to clipboard with one click
- Responsive design works on all devices

## Technologies Used

- **Frontend**: Next.js (React)
- **Backend**: Vercel Serverless Functions
- **Database**: MongoDB Atlas
- **Deployment**: Vercel
- **URL Hashing**: nanoid for short code generation

## Live Demo

[View deployed application on Vercel](https://url-shortener1-snowy.vercel.app)

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- MongoDB Atlas account (free tier)
- Vercel account (free tier)
- GitHub account

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/gyanish0/url-shortener1.git
   cd url-shortener