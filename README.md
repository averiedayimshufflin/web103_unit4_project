# WEB103 Project 4 - Custom Item Builder

Submitted by: **Averie Ahn**

---

## About this web app

This web app is a full-stack customization platform where users can create, edit, and manage customizable items. Each item has multiple configurable features (such as style, color, or components), and selections dynamically update the UI and total price.

The app uses React for the frontend, a Node/Express API for the backend, and PostgreSQL for persistent storage of created items.

---

## Time spent

**9 hours**

---

## Required Features

- [X] The web app uses React to display data from the API.
- [X] The web app is connected to a PostgreSQL database with an appropriately structured `CustomItem` table.
- [X] Users can view multiple features of the `CustomItem` they can customize.
- [X] Each customizable feature has multiple selectable options.
- [X] Selecting options updates the displayed visual representation of the item.
- [X] The price updates dynamically as options are selected OR total price is displayed.
- [X] The UI visually changes in response to at least one customizable feature.
- [X] Users can submit their selections to save a `CustomItem`.
- [X] Invalid or impossible feature combinations are rejected with an error message and not saved.
- [X] Users can view a list of all created `CustomItem`s.
- [X] Users can edit a submitted `CustomItem`.
- [X] Users can delete a `CustomItem`.
- [X] Users can update or delete `CustomItem`s from the detail page.

---

## Optional Features

- [ ] Selecting incompatible options disables invalid combinations before submission

---

## Additional Features

- Real-time UI updates as users customize items
- Responsive design for improved usability across screen sizes

---

## Video Walkthrough

The walkthrough demonstrates:

link: https://imgur.com/a/cpbTws2

- Creating a new custom item with multiple feature selections
- Dynamic UI updates when selecting options
- Saving items to the PostgreSQL database
- Viewing all saved items
- Editing an existing item
- Deleting an item
- Render dashboard showing database is active
- Running SQL query:
  ```sql
  SELECT * FROM CustomItem;

## Notes

One of the main challenges was keeping frontend state synchronized with backend persistence while supporting multiple customizable options. Another challenge was validating invalid feature combinations both on the frontend and backend to ensure database consistency.

## License

Copyright 2026 Averie Ahn  
Licensed under the Apache License, Version 2.0