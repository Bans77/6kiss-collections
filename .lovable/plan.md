# Plan: Remove duplicate Archive link

## What
The header nav currently shows "Archive" twice (src/routes/index.tsx nav links). Remove the duplicate entry so only one "Archive" link remains, pointing to #archive as before.

## Files
- src/routes/index.tsx — delete the duplicated Archive `<a>` line in the nav.

## Verification
- Confirm the header shows a single "Archive" link and the page still builds cleanly.