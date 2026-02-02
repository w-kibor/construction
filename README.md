
  # ProShield Construction

  This project is a professional website developed for ProShield Construction by Brandon, a company that specializes in waterproofing, epoxy flooring, and terrazzo flooring.
The goal of the website is to provide clients with an easy way to learn about the company’s services, view past projects, and get in touch for quotes or consultations.

## Overview

The website highlights Brandon’s expertise in building and construction, focusing on quality, durability, and precision.
It’s designed to be simple, visually appealing, and responsive across all devices.

## Features

Home Page: Introduces the company, services, and a call-to-action for inquiries.

About Page: Shares the company’s background, mission, and core values.

Services Page: Details the main offerings—waterproofing, epoxy flooring, and terrazzo flooring.

Projects Page: Showcases completed works with images and short descriptions.

Testimonials Page: Displays client feedback and experiences.

Contact Page: Includes a contact form, business information, and an optional WhatsApp link for quick communication.

## Technologies Used

HTML

CSS

JavaScript

Bootstrap or Tailwind CSS 

Vercel for deployment

## Media Management (Sanity)

This project supports client-managed media uploads via Sanity. The Projects page will load media from Sanity when the environment variables are set; otherwise it falls back to local assets.

### 1) Create a Sanity project
- Create a project at https://www.sanity.io/manage
- Note the Project ID and Dataset name

### 2) Configure the frontend (Vite)
- Copy [.env.example](.env.example) to .env
- Fill in:
  - VITE_SANITY_PROJECT_ID
  - VITE_SANITY_DATASET
  - VITE_SANITY_API_VERSION (keep default unless you need a different date)

### 3) Run the Studio (for uploads)
The Studio lives in the [sanity](sanity) folder.

From the sanity folder:
- npm install
- npm run dev

Create the media entries under the Project Media type and choose the category (epoxy, waterproofing, terrazzo).

### 4) Deploy Studio (optional)
You can deploy the Studio so the client can log in and upload media online:
- npm run deploy (from the sanity folder)
