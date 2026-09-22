# Front and back product image switcher

## What will change
- Prepare the newly uploaded front-view shirt and hoodie photos with transparent backgrounds so they match the existing product presentation.
- Give each product a front and back image, with the front selected whenever the site opens or a product is moved into the featured area.
- Add a small alternate-view thumbnail in the upper-left of the featured image area, positioned with the existing `SERIES 01` treatment.
- Make the thumbnail clickable: it swaps with the large image, so the former large view becomes the thumbnail.
- Apply the same behavior to both the short-sleeve tee and hoodie without changing cart, pricing, sizing, or checkout behavior.

## Verification
- Confirm the tee opens front-first and swaps between front/back.
- Confirm selecting the hoodie resets it to front-first and swaps between front/back.
- Check desktop and mobile layouts for clipping or overlap.
- Confirm the preview builds without errors.

## Technical details
- Extend the shared product data with separate front and back image fields.
- Keep the current back-view cutouts and generate matching transparent front-view assets from the two uploads.
- Track the selected product view in the storefront and reset it when the featured product changes.
