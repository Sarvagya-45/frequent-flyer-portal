# Project Design and Engineering Rules

## Product

Frequent Flyer Portal.

The application allows a user to enter an authorized frequent flyer member ID and retrieve available account information.

## Visual direction

The interface should look like a real airline or passenger-service application.

Avoid:

- Purple gradients
- Pill-shaped buttons
- Fake reviews
- Fake user counts
- Fake statistics
- Fake testimonials
- Emoji icons
- Vague marketing copy
- Excessive animations
- Artificial glassmorphism
- Decorative AI-generated imagery
- Cursor animations
- Fake trust badges

## Accessibility

The application must provide:

- Semantic headings
- Explicit form labels
- Keyboard accessibility
- Visible focus states
- Useful error messages
- Loading status announcements
- Reduced-motion support

## Security

Client-side validation is not a replacement for server-side validation.

The backend must:

- Validate member IDs
- Authenticate users where required
- Authorize account access
- Validate request parameters
- Apply rate limiting
- Sanitize and encode output appropriately

Never expose secrets in frontend environment variables.

## Data

Never invent customer records, reviews, metrics, or account information.

## Code

Keep API services separate from UI components.

Keep reusable UI components separate from feature-specific logic.

Tests should verify behavior rather than implementation details.
