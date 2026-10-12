// Board snapshot after Monday planning, 12 Oct 2026 (same cards as Figure 4.1 in the evidence file).
// Edit this file to change the starting board. Changes made in the browser are saved per browser.

export const SNAPSHOT_VERSION = '2026-10-12-v1';

export const COLUMNS = [
  { id: 'todo', title: 'To do', limit: null },
  { id: 'doing', title: 'In progress', limit: 5, perPerson: 1 },
  { id: 'review', title: 'Review', limit: 3 },
  { id: 'done', title: 'Done', limit: null },
];

export const PEOPLE = ['Danara', 'Assylzhan', 'Nazerke', 'Alim', 'Saken'];

// tag: F3 = conflict prevention, F14 = request & status, F6 = FAQ assistant, K = learning backlog, OPS = stakeholder / review work
export const TAGS = {
  F3: { label: 'F3', name: 'Conflict prevention' },
  F14: { label: 'F1/F4', name: 'Request & status' },
  F6: { label: 'F6', name: 'FAQ assistant' },
  K: { label: 'K', name: 'Learning backlog' },
  OPS: { label: 'Review', name: 'Stakeholder / review' },
};

export const INITIAL_CARDS = [
  // ---- To do
  { id: 'T13', col: 'todo', tag: 'F3', title: 'F3 confirmation-time guard', detail: 'AC1 block second confirmation (Wed 14); AC2 "requires rescheduling" (Fri 16)', owner: 'Assylzhan', due: '2026-10-14', risk: 'G1' },
  { id: 'T22', col: 'todo', tag: 'F3', title: 'F5 conflict display', detail: 'Show "Conflict" result and the "requires rescheduling" list', owner: 'Alim', due: '2026-10-19' },
  { id: 'T15', col: 'todo', tag: 'F6', title: 'Approved-FAQ content draft', detail: '≥ 20 entries, labelled DRAFT until the manager approves', owner: 'Danara', due: '2026-10-14' },
  { id: 'T16', col: 'todo', tag: 'F6', title: 'FAQ test set', detail: '20 questions: 15 in scope, 5 out of scope (incl. medical)', owner: 'Nazerke', due: '2026-10-15' },
  { id: 'T17', col: 'todo', tag: 'F6', title: 'FAQ assistant', detail: 'Answer only from an approved entry, otherwise escalate', owner: 'Saken', due: '2026-10-20', risk: 'G2' },
  { id: 'T18', col: 'todo', tag: 'F6', title: 'FAQ accuracy run', detail: 'Target ≥ 18/20 correct, 5/5 out-of-scope escalated', owner: 'Nazerke', due: '2026-10-21' },
  { id: 'T21', col: 'todo', tag: 'OPS', title: 'End-to-end walkthrough', detail: 'Full loop vs baseline process map; Plan/Fact update', owner: 'Danara', due: '2026-10-22' },
  { id: 'T19b', col: 'todo', tag: 'OPS', title: 'Manager review 23 Oct', detail: 'FAQ assistant + full loop demo (run by Danara under K7)', owner: 'Saken', due: '2026-10-23' },
  { id: 'K4', col: 'todo', tag: 'K', title: 'C2 backup pairing', detail: 'Pair on T13, then fix a planted defect alone', owner: 'Danara', due: '2026-10-15', risk: 'G1' },
  { id: 'K5', col: 'todo', tag: 'K', title: 'C6 structured output', detail: 'JSON {answer, source_id, escalate} + schema validation', owner: 'Saken', due: '2026-10-19', risk: 'G2' },
  { id: 'K6', col: 'todo', tag: 'K', title: 'C6 backup pairing', detail: 'Pair on T17, then add 3 entries alone', owner: 'Nazerke', due: '2026-10-21', risk: 'G2' },
  { id: 'K7', col: 'todo', tag: 'K', title: 'C8 backup review', detail: 'Danara sends the invite and runs the 23 Oct review', owner: 'Danara', due: '2026-10-23', risk: 'G3' },
  { id: 'K8', col: 'todo', tag: 'K', title: 'C2 backup to independent (deferred)', detail: 'Deferred to Week 6: one new rescheduling edge case alone', owner: 'Danara', due: '2026-10-28', risk: 'G1', deferred: true },
  // ---- carried from Assignment 3 (status confirmed at planning)
  { id: 'T7', col: 'todo', tag: 'F14', title: 'F1 request form UI', detail: 'Carried from A3 · fixes after review', owner: 'Alim', due: '2026-10-16', carried: true },
  { id: 'T8', col: 'todo', tag: 'F14', title: 'Request lifecycle API', detail: 'Carried from A3 · status endpoint for F4', owner: 'Assylzhan', due: '2026-10-16', carried: true },
  { id: 'T9', col: 'todo', tag: 'OPS', title: 'Doctor permissions row', detail: 'Carried from A3 (T3) · needs the manager decision on doctor visibility', owner: 'Nazerke', due: '2026-10-16', carried: true },
  { id: 'T10', col: 'todo', tag: 'OPS', title: 'Manager feedback on schedule rules', detail: 'Carried from A3 (T6) · on the 16 Oct agenda', owner: 'Saken', due: '2026-10-16', carried: true },
  // ---- In progress (one per person)
  { id: 'T20', col: 'doing', tag: 'F3', title: 'Migration + seed data', detail: 'Partial unique index on APPOINTMENT(slot_id) WHERE status = Confirmed; fictional data for 20 scenarios', owner: 'Danara', due: '2026-10-13' },
  { id: 'K1', col: 'doing', tag: 'K', title: 'C2 guard spike → PR', detail: 'Spike met on 10 Oct (EV8); PR into T13 by Wed 14', owner: 'Assylzhan', due: '2026-10-14', risk: 'G1' },
  { id: 'T12', col: 'doing', tag: 'F14', title: 'F4 status view', detail: 'Pending / Confirmed / Cancelled / Rescheduled from the API', owner: 'Nazerke', due: '2026-10-15' },
  { id: 'K2', col: 'doing', tag: 'K', title: 'K2 / T14 · 20 conflict tests', detail: 'Cases met after changes on 10 Oct (EV9); run on T13 build Thu 15', owner: 'Alim', due: '2026-10-15', risk: 'G1' },
  { id: 'K3', col: 'doing', tag: 'K', title: 'K3 / T19a · Manager invite', detail: 'Confirmed ≥ 48 h ahead by Wed 14, 17:00; agenda with 3 decisions', owner: 'Saken', due: '2026-10-16', risk: 'G3' },
  // ---- Done (A3 Week 1, criteria met)
  { id: 'T1', col: 'done', tag: 'F3', title: 'Shared schedule ERD (F2)', detail: 'data-model.png / .md · reviewed 22 Sep (EV1)', owner: 'Danara', due: '2026-09-22' },
  { id: 'T2', col: 'done', tag: 'F3', title: 'Booking-status rules', detail: 'booking-status-rules.md · approved 23 Sep (EV2)', owner: 'Alim', due: '2026-09-23' },
  { id: 'T4', col: 'done', tag: 'OPS', title: 'Baseline process map', detail: 'baseline-process-map.pdf (EV3)', owner: 'Assylzhan', due: '2026-09-24' },
  { id: 'T5', col: 'done', tag: 'OPS', title: 'Repository and environment', detail: 'GitHub repo + initial commits (EV4)', owner: 'Saken', due: '2026-09-25' },
];
