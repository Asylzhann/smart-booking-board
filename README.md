# Smart Booking — Sprint 2 task board (Team 9, IT PM Assignments 8–9)

Online task board for Centre Estetic Smart Booking, Sprint 2 (26 Oct – 6 Nov 2026).
Same tasks, owners, estimates and remaining hours as the Task Board sheet of `IT_PM_A8_A9_Team9.xlsx`.

- Three columns: **To Do / In Progress / Done**. Each card shows task ID, linked PBI (US4–US6), owner, estimated and remaining hours, due date, checker, blocker note and a dated log.
- **WIP limit:** one task In Progress per member; a move that breaks it is refused.
- **Done** only after a check by someone who is not the author (the board asks who checked it).
- Changes made in the browser are saved in that browser only. To update the shared board after the Daily Scrum,
  click **Copy cards for data.js**, paste over `INITIAL_CARDS` in `src/data.js`, change `SNAPSHOT_VERSION` and `REPORTING_DATE`, and push.

## Deploy to GitHub Pages

1. Put these files in a GitHub repository (the `main` branch). For example, create a repo
   `smart-booking-board`, then from this folder run:
   ```
   git init && git add . && git commit -m "Team board"
   git branch -M main
   git remote add origin https://github.com/<your-user>/smart-booking-board.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Open the **Actions** tab and wait for "Deploy board to GitHub Pages" to finish (about 1 minute).
4. The board is live at `https://<your-user>.github.io/smart-booking-board/`.

## Run locally

```
npm install
npm run dev
```
