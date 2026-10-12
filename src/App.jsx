import React, { useEffect, useMemo, useState } from 'react';
import { COLUMNS, PEOPLE, TAGS, INITIAL_CARDS, SNAPSHOT_VERSION } from './data.js';

const STORE_KEY = 'smart-booking-board';

function loadCards() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      if (saved.version === SNAPSHOT_VERSION && Array.isArray(saved.cards)) return saved.cards;
    }
  } catch (e) { /* storage unavailable: fall back to the snapshot */ }
  return INITIAL_CARDS.map((c) => ({ ...c }));
}

function saveCards(cards) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify({ version: SNAPSHOT_VERSION, cards })); } catch (e) { /* ignore */ }
}

const fmtDate = (iso) => new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
const todayIso = () => new Date().toISOString().slice(0, 10);
const hoursSince = (iso) => (Date.now() - new Date(iso).getTime()) / 36e5;

// Working-agreement rules (evidence file, Section 4.2): blocked cards do not count towards WIP.
function checkMove(cards, card, toCol) {
  const col = COLUMNS.find((c) => c.id === toCol);
  if (!col || card.col === toCol) return null;
  const active = cards.filter((c) => c.col === toCol && !c.blocked && c.id !== card.id);
  if (col.limit && !card.blocked && active.length >= col.limit) {
    return `${col.title} is full (${col.limit}). Finish or review something first.`;
  }
  if (col.perPerson && !card.blocked && active.filter((c) => c.owner === card.owner).length >= col.perPerson) {
    return `${card.owner} already has a task in progress. One task per person.`;
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

  const move = (id, toCol) => {
    const card = cards.find((c) => c.id === id);
    if (!card) return;
    const problem = checkMove(cards, card, toCol);
    if (problem) { setToast(problem); return; }
    setCards((cs) => cs.map((c) => (c.id === id ? { ...c, col: toCol } : c)));
  };

  const toggleBlocked = (id) => {
    const card = cards.find((c) => c.id === id);
    if (card.blocked) {
      const problem = checkMove(cards.filter((c) => c.id !== id), { ...card, blocked: null, col: '__' }, card.col);
      if (problem) { setToast(`Unblocking would break the limit: ${problem}`); return; }
      setCards((cs) => cs.map((c) => (c.id === id ? { ...c, blocked: null } : c)));
      return;
    }
    const reason = window.prompt(`Why is ${id} blocked? (post it in the team chat too)`);
    if (reason === null) return;
    setCards((cs) => cs.map((c) => (c.id === id ? { ...c, blocked: { reason: reason || 'No reason given', since: new Date().toISOString() } } : c)));
  };

  const reset = () => {
    if (window.confirm('Reset the board to the 12 Oct planning snapshot? Your changes in this browser will be lost.')) {
      setCards(INITIAL_CARDS.map((c) => ({ ...c })));
    }
  };

  const stats = useMemo(() => {
    const active = (col) => cards.filter((c) => c.col === col && !c.blocked).length;
    const blocked = cards.filter((c) => c.blocked);
    return {
      doing: active('doing'), review: active('review'),
      done: cards.filter((c) => c.col === 'done').length, total: cards.length,
      blocked: blocked.length, longBlocked: blocked.filter((c) => hoursSince(c.blocked.since) > 48).length,
    };
  }, [cards]);

  const today = todayIso();
  const visible = (c) => who === 'All' || c.owner === who;

  return (
    <div className="app">
      <header className="top">
        <div>
          <p className="eyebrow">Centre Estetic · Smart Booking</p>
          <h1>Team board · Weeks 4–5</h1>
          <p className="sub">12–23 October 2026 · snapshot after Monday planning · review with the manager Fri 16 and Fri 23 Oct</p>
        </div>
        <div className="stats">
          <Stat label="In progress" value={`${stats.doing}/5`} warn={stats.doing >= 5} />
          <Stat label="Review" value={`${stats.review}/3`} warn={stats.review >= 3} />
          <Stat label="Blocked > 48 h" value={stats.longBlocked} warn={stats.longBlocked > 0} />
          <Stat label="Done" value={`${stats.done}/${stats.total}`} />
        </div>
      </header>

      <nav className="filters" aria-label="Filter by owner">
        {['All', ...PEOPLE].map((p) => (
          <button key={p} className={`chip ${who === p ? 'on' : ''}`} onClick={() => setWho(p)}>{p}</button>
        ))}
        <span className="spacer" />
        <button className="chip ghost" onClick={reset}>Reset to snapshot</button>
      </nav>

      <main className="board">
        {COLUMNS.map((col) => {
          const list = cards.filter((c) => c.col === col.id);
          const activeCount = list.filter((c) => !c.blocked).length;
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
                <span className={`count ${col.limit && activeCount >= col.limit ? 'full' : ''}`}>
                  {col.limit ? `${activeCount}/${col.limit}` : list.length}
                </span>
              </h2>
              {col.perPerson && <p className="rule">Limit 5 · one per person · blocked cards don’t count</p>}
              {col.id === 'review' && <p className="rule">Limit 3 · finish reviews before starting new work</p>}
              <div className="cards">
                {list.filter(visible).map((c) => (
                  <Card
                    key={c.id} card={c} today={today}
                    onDragStart={() => setDragId(c.id)}
                    onMove={(to) => move(c.id, to)}
                    onBlock={() => toggleBlocked(c.id)}
                  />
                ))}
                {list.filter(visible).length === 0 && <p className="empty">No cards</p>}
              </div>
            </section>
          );
        })}
      </main>

      <footer className="legend">
        {Object.entries(TAGS).map(([k, t]) => (
          <span key={k} className="leg"><i className={`dot t-${k}`} />{t.name}</span>
        ))}
        <span className="leg note">Blocker rule: ask for help after 2 h without progress or 24 h without movement · manager item waiting 48 h → async approval sheet</span>
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

function Card({ card, today, onDragStart, onMove, onBlock }) {
  const overdue = card.col !== 'done' && card.due < today;
  const longBlock = card.blocked && hoursSince(card.blocked.since) > 48;
  return (
    <article
      className={`card t-${card.tag} ${card.blocked ? 'is-blocked' : ''} ${card.deferred ? 'is-deferred' : ''} ${card.col === 'done' ? 'is-done' : ''}`}
      draggable
      onDragStart={onDragStart}
    >
      <div className="row">
        <span className="id">{card.id}</span>
        <span className={`tag t-${card.tag}`}>{TAGS[card.tag].label}</span>
        {card.risk && <span className="tag risk">{card.risk}</span>}
        {card.carried && <span className="tag carried">A3</span>}
        {card.deferred && <span className="tag carried">Deferred</span>}
      </div>
      <h3>{card.title}</h3>
      <p className="detail">{card.detail}</p>
      {card.blocked && (
        <p className={`blocked ${longBlock ? 'long' : ''}`}>
          BLOCKED{longBlock ? ' > 48 h' : ''}: {card.blocked.reason}
        </p>
      )}
      <div className="row meta">
        <span className="owner">{card.owner}</span>
        <span className={`due ${overdue ? 'overdue' : ''}`}>{fmtDate(card.due)}</span>
      </div>
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
