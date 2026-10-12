# Smart Booking — team board (Weeks 4–5)

Kanban board for the Centre Estetic Smart Booking team (IT PM Assignment 4).
Columns To do / In progress / Review / Done, with the working-agreement rules built in:

- **In progress ≤ 5, one task per person; Review ≤ 3.** A move that breaks a limit is refused.
- **Blocked** cards stay in their column, show the reason and do not count towards WIP; after 48 h they turn red (delivery signal).
- Filter by owner, drag cards between columns (or use the dropdown on each card).
- Changes are saved in your browser only. **Reset to snapshot** restores the 12 Oct planning board.
- To change the shared starting board, edit `src/data.js` and push.

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
