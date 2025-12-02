# Erasmus Life Housing

 A booking platformthat connects tenants with rental options and also simplifies property management for landlords

🚀 Live Demo

🔗 URL: https://hotel-booking-jet-six.vercel.app/

## Table of Contents

- About the Project

- Features

- Tech Stack

- Usage



## About the Project

This project is a room-booking web application where users can search, view, and book apartments. Landlords can list their properties, and users can manage their accounts in real time.

## Features

### Tenant Features

- Sign up & log in (Email/Password)

- Browse available rooms

- Apply filters: location, budget, amenities, etc.

- View full room details

= Book a room (multi-step form)

- Manage account + update profile in real-time 

- View booking details

- Receive verification email upon sign up

### Landlord Features

- Dedicated landlord signup & login

- Add new property listings (room name, price, amenities)

- Edit and update existing listings

- Delete listings

- View booking applications from tenants

- Real-time updates using Firestore

- Protected dashboard (only logged-in landlords)

- Store listings in Firestore with landlordId reference for filtering

### General App Features

- Firebase Authentication + Firestore database

- Responsive UI (mobile → desktop → large screens)

- Secure protected routes

- Leaflet map integration

- Vercel deployment



## Tech Stack

- React + TypeScript

- Vite

- Chakra UI 

- Tailwind CSS

- React Router

- Leaflet Map

- Firebase Authentication

- Cloud Firestore

- Firebase Storage



## Usage

1. How to Sign Up

Users can create an account through a guided multi-step signup form.

Email verification is required before accessing protected features.

Both tenants and landlords have dedicated signup/login flows.

2. How to Search for Rooms

Tenants can browse available rooms directly from the Listings page.

Filters allow users to refine results by:

Location

Price range

Amenities

Room type

Detailed room pages include descriptions, availability, and landlord information.

3. How to Apply / Book a Room

Tenants can initiate an application from the room details page.

The app supports:

Contact information input

Payment or reservation steps

Uploading necessary documents

4. Landlord Features

Landlords have a dedicated portal where they can:

Create listings (add room details, amenities, images, pricing)

View incoming applications

Manage existing listings (edit, update availability, or delete)

5. How to Manage Your Account

Users can edit their personal details from the Account page.

Real-time updates ensure Firestore syncs changes automatically.

Users can:

Update profile information

Delete their account (requires recent login)



