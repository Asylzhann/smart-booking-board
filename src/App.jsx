import React, { useEffect, useMemo, useState } from 'react';
import { COLUMNS, PEOPLE, PBIS, INITIAL_CARDS, SNAPSHOT_VERSION, REPORTING_DATE } from './data.js';

const STORE_KEY = 'smart-booking-board-sprint2';

function loadCards() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      if (saved.version === SNAPSHOT_VERSION && Array.isArray(saved.cards)) return saved.cards;
    }
  } catch (e) { /* storage unavailable: fall back to the snapshot */ }
  return INITIAL_CARDS.map((c) => ({ ...c, log: [...c.log] }));
}

function saveCards(cards) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify({ version: SNAPSHOT_VERSION, cards })); } catch (e) { /* ignore */ }
}

const fmtDate = (iso) => new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
const stamp = () => new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
const todayIso = () => new Date().toISOString().slice(0, 10);

// Working agreement: max one task In Progress per member (a blocked task still counts – it is still that member's work).
function checkMove(cards, card, toCol) {
  const col = COLUMNS.find((c) => c.id === toCol);
  if (!col || card.col === toCol) return null;
  if (col.perPerson && cards.some((c) => c.col === toCol && c.owner === card.owner && c.id !== card.id)) {
    return `${card.owner} already has a task In Progress. WIP limit: one task per member.`;
  }
  return null;
}

export default function App() {
  const [cards, setCards] = useState(loadCards);
  const [who, setWho] = useState('All');
  const [toast, setToast] = useState('');
  const [dragId, setDragId] = useState(null);
  const [overCol, setOverCol] = useState(null);

  useEffect(() => saveCards(cards), [cards]);
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(''), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const update = (id, patch, logLine) =>
    setCards((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch, log: logLine ? [...c.log, `${stamp()}: ${logLine}`] : c.log } : c)));

  const move = (id, toCol) => {
    const card = cards.find((c) => c.id === id);
    if (!card || card.col === toCol) return;
    const problem = checkMove(cards, card, toCol);
    if (problem) { setToast(problem); return; }
    if (toCol === 'done') {
      const checker = window.prompt(`Who checked ${id}? (Done only after a check by someone who is not the author)`, card.checker !== '—' ? card.checker : '');
      if (!checker) { setToast('Not moved: a task is Done only after it has been checked.'); return; }
      if (checker.trim().toLowerCase() === card.owner.toLowerCase()) { setToast('The checker must not be the author.'); return; }
      update(id, { col: 'done', rem: 0, blocked: null, checker, doneOn: todayIso() }, `Done, checked by ${checker}`);
      return;
    }
    const title = COLUMNS.find((c) => c.id === toCol).title;
    update(id, { col: toCol, doneOn: undefined }, `${title}, rem ${card.rem} h`);
  };

  const setRem = (id, value) => {
    const card = cards.find((c) => c.id === id);
    const rem = Math.max(0, Number(value));
    if (Number.isNaN(rem) || rem === card.rem) return;
    update(id, { rem }, `rem ${card.rem} → ${rem} h`);
  };

  const toggleBlocked = (id) => {
    const card = cards.find((c) => c.id === id);
    if (card.blocked) { update(id, { blocked: null }, 'blocker removed'); return; }
    const reason = window.prompt(`Why is ${id} blocked? Add the next action and its owner.`);
    if (!reason) return;
    update(id, { blocked: { reason, since: new Date().toISOString() } }, `BLOCKER: ${reason}`);
  };

  const reset = () => {
    if (window.confirm(`Reset the board to the saved snapshot (${REPORTING_DATE})? Changes in this browser will be lost.`)) {
      setCards(INITIAL_CARDS.map((c) => ({ ...c, log: [...c.log] })));
    }
  };

  const copySnapshot = async () => {
    const text = `export const INITIAL_CARDS = ${JSON.stringify(cards, null, 2)};\n`;
    try { await navigator.clipboard.writeText(text); setToast('Cards copied. Paste them into src/data.js and push to update the shared board.'); }
    catch (e) { setToast('Copy failed – your browser blocked the clipboard.'); }
  };

  const stats = useMemo(() => {
    const sum = (f) => cards.reduce((a, c) => a + f(c), 0);
    const count = (col) => cards.filter((c) => c.col === col).length;
    return {
      est: sum((c) => c.est), added: sum((c) => c.added), rem: sum((c) => c.rem),
      todo: count('todo'), doing: count('doing'), done: count('done'), total: cards.length,
      blocked: cards.filter((c) => c.blocked).length,
    };
  }, [cards]);

  const today = todayIso();
  const visible = (c) => who === 'All' || c.owner === who;

  return (
    <div className="app">
      <header className="top">
        <div>
          <p className="eyebrow">Centre Estetic · Smart Booking · Team 9</p>
          <h1>Sprint 2 task board</h1>
          <p className="sub">Sprint 2: Mon 26 Oct – Fri 6 Nov 2026 · snapshot {REPORTING_DATE} · same data as the Task Board sheet</p>
          <p className="goal"><b>Sprint Goal:</b> by 6 Nov, on sample data, a manager can open one dashboard, see pending requests with conflicts flagged, and approve, decline or reschedule them so that the client’s status changes accordingly.</p>
        </div>
        <div className="stats">
          <Stat label="Remaining h" value={stats.rem} />
          <Stat label="Estimate h" value={stats.added ? `${stats.est} + ${stats.added}` : stats.est} />
          <Stat label="Done" value={`${stats.done}/${stats.total}`} />
          <Stat label="Blocked" value={stats.blocked} warn={stats.blocked > 0} />
        </div>
      </header>

      <nav className="filters" aria-label="Filter by owner">
        {['All', ...PEOPLE].map((p) => (
          <button key={p} className={`chip ${who === p ? 'on' : ''}`} onClick={() => setWho(p)}>{p}</button>
        ))}
        <span className="spacer" />
        <button className="chip ghost" onClick={copySnapshot}>Copy cards for data.js</button>
        <button className="chip ghost" onClick={reset}>Reset to snapshot</button>
      </nav>

      <main className="board">
        {COLUMNS.map((col) => {
          const list = cards.filter((c) => c.col === col.id);
          const rem = list.reduce((a, c) => a + c.rem, 0);
          return (
            <section
              key={col.id}
              className={`column ${overCol === col.id ? 'over' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setOverCol(col.id); }}
              onDragLeave={() => setOverCol(null)}
              onDrop={(e) => { e.preventDefault(); setOverCol(null); if (dragId) move(dragId, col.id); setDragId(null); }}
            >
              <h2>
                {col.title}
                <span className="count">{list.length} · {rem} h</span>
              </h2>
              {col.perPerson && <p className="rule">WIP limit: one task per member</p>}
              {col.id === 'done' && <p className="rule">Done = result checked by someone who is not the author</p>}
              <div className="cards">
                {list.filter(visible).map((c) => (
                  <Card
                    key={c.id} card={c} today={today}
                    onDragStart={() => setDragId(c.id)}
                    onMove={(to) => move(c.id, to)}
                    onBlock={() => toggleBlocked(c.id)}
                    onRem={(v) => setRem(c.id, v)}
                  />
                ))}
                {list.filter(visible).length === 0 && <p className="empty">No cards</p>}
              </div>
            </section>
          );
        })}
      </main>

      <footer className="legend">
        {Object.entries(PBIS).map(([k, p]) => (
          <span key={k} className="leg"><i className={`dot t-${k}`} />{p.name}</span>
        ))}
        <span className="leg note">Owners move their own cards and update remaining hours before the 10:00 Daily Scrum. Remaining hours = work still needed, not hours spent.</span>
      </footer>

      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}

function Stat({ label, value, warn }) {
  return (
    <div className={`stat ${warn ? 'warn' : ''}`}>
      <span className="v">{value}</span>
      <span className="l">{label}</span>
    </div>
  );
}

function Card({ card, today, onDragStart, onMove, onBlock, onRem }) {
  const overdue = card.col !== 'done' && card.due < today;
  const estText = card.est === 0 ? `${card.added} h (added)` : card.added ? `${card.est}+${card.added} h` : `${card.est} h`;
  return (
    <article
      className={`card t-${card.pbi} ${card.blocked ? 'is-blocked' : ''} ${card.col === 'done' ? 'is-done' : ''}`}
      draggable
      onDragStart={onDragStart}
    >
      <div className="row">
        <span className="id">{card.id}</span>
        <span className={`tag t-${card.pbi}`}>{card.pbi}</span>
        {card.added > 0 && <span className="tag carried">+{card.added} h</span>}
      </div>
      <h3>{card.title}</h3>
      <p className="detail">{card.detail}</p>
      {card.blocked && <p className="blocked">BLOCKED: {card.blocked.reason}</p>}
      {card.note && !card.blocked && <p className="note-line">{card.note}</p>}

      <div className="hours">
        <span>Est <b>{estText}</b></span>
        <label>Rem{' '}
          {card.col === 'done'
            ? <b>0 h</b>
            : <input type="number" min="0" step="0.5" value={card.rem} aria-label={`Remaining hours for ${card.id}`} onChange={(e) => onRem(e.target.value)} />}
          {card.col !== 'done' && ' h'}
        </label>
      </div>

      <div className="row meta">
        <span className="owner">{card.owner}</span>
        <span className={`due ${overdue ? 'overdue' : ''}`}>
          {card.col === 'done' && card.doneOn ? `Done ${fmtDate(card.doneOn)}` : `Due ${fmtDate(card.due)}`}
        </span>
      </div>
      <p className="checker">Checked by: {card.checker || '—'}</p>

      <details className="log">
        <summary>Log ({card.log.length})</summary>
        <ul>{card.log.map((l, i) => <li key={i}>{l}</li>)}</ul>
      </details>

      <div className="row actions">
        <select aria-label={`Move ${card.id}`} value={card.col} onChange={(e) => onMove(e.target.value)}>
          {COLUMNS.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
        {card.col !== 'done' && (
          <button className="mini" onClick={onBlock}>{card.blocked ? 'Unblock' : 'Block'}</button>
        )}
      </div>
    </article>
  );
}
