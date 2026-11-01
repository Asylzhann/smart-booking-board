// Sprint 2 task board, status at the end of Fri 30 Oct 2026, 18:00 (Day 5 of 10).
// Same data as the Task Board sheet of IT_PM_A8_A9_Team9.xlsx: statuses and remaining hours
// must match the Daily Report (total remaining 24 h). Update this file after each Daily Scrum and push.

export const SNAPSHOT_VERSION = '2026-10-30-sprint2-day5';
export const REPORTING_DATE = 'Fri 30 Oct 2026, 18:00 (Day 5 of 10)';

export const COLUMNS = [
  { id: 'todo', title: 'To Do' },
  { id: 'doing', title: 'In Progress', perPerson: 1 },
  { id: 'done', title: 'Done' },
];

export const PEOPLE = ['Danara', 'Assylzhan', 'Nazerke', 'Alim', 'Saken'];

export const PBIS = {
  US4: { name: 'US4 · Approve / decline pending requests' },
  US5: { name: 'US5 · Flag competing requests' },
  US6: { name: 'US6 · Reschedule: propose a new time' },
};

// est = original estimate, added = hours added after Sprint Planning, rem = remaining hours (work still needed)
export const INITIAL_CARDS = [
  // ---- In Progress (one per person)
  { id: 'T2', pbi: 'US4', col: 'doing', title: 'Approve / decline endpoints', detail: 'Approve / decline call the F3 slot guard and update the request status', owner: 'Assylzhan', est: 6, added: 0, rem: 2, due: '2026-11-02', checker: 'Alim (T4)',
    blocked: { reason: 'After Decline the client tracker shows the old status until page reload. Fix by Mon 2 Nov 12:00.', since: '2026-10-30T10:15:00+05:00' },
    log: ['26 Oct: In Progress, rem 5 h', '27 Oct: rem 4 h', '28 Oct: rem 3 h, Decline needs T13', '29 Oct: rem 2 h, blocked by T13', '30 Oct: rem 2 h, tracker refresh bug'] },
  { id: 'T3', pbi: 'US4', col: 'doing', title: 'Dashboard list + buttons', detail: 'Pending-requests list with Approve and Decline buttons; client phone and service columns', owner: 'Nazerke', est: 6, added: 1, rem: 3, due: '2026-11-02', checker: 'Saken',
    note: '+1 h on 28 Oct: manager asked to show client phone and service in the list. Review fixes in progress.',
    log: ['27 Oct: In Progress, rem 5 h', '28 Oct: +1 h (phone + service columns), rem 4 h', '29 Oct: rem 3 h', '30 Oct: review fixes, rem 3 h'] },
  { id: 'T7', pbi: 'US5', col: 'doing', title: 'Conflict badge + list', detail: '"Conflict" badge and Requires-rescheduling list on the dashboard', owner: 'Alim', est: 4, added: 0, rem: 2, due: '2026-11-02', checker: 'Nazerke',
    note: 'Waited for conflict data from T6 until Thu 29 Oct midday.',
    log: ['28 Oct: In Progress, rem 3 h', '29 Oct: waited for T6 data, rem 3 h', '30 Oct: rem 2 h'] },

  // ---- To Do
  { id: 'T4', pbi: 'US4', col: 'todo', title: 'Check US4 AC1–AC2', detail: 'Run AC1 and AC2 plus one failure case; peer review', owner: 'Alim', est: 3, added: 0, rem: 3, due: '2026-11-03', checker: '—',
    note: 'Waits for T2 and T3.', log: ['Not started'] },
  { id: 'T8', pbi: 'US5', col: 'todo', title: 'Check US5 AC1–AC2', detail: 'Run AC1 and AC2 on the sample scenarios (reviewer is not the author)', owner: 'Saken', est: 3, added: 0, rem: 3, due: '2026-11-03', checker: '—',
    note: 'Starts Mon 2 Nov after T7.', log: ['Not started'] },
  { id: 'T10', pbi: 'US6', col: 'todo', title: 'Propose-new-slot endpoint', detail: 'Endpoint that proposes a new slot, reusing the F3 guard', owner: 'Assylzhan', est: 4, added: 0, rem: 4, due: '2026-11-04', checker: '—',
    note: 'Starts after T2 is Done (WIP limit 1).', log: ['Not started'] },
  { id: 'T11', pbi: 'US6', col: 'todo', title: '"Propose new time" form', detail: 'Form on the dashboard to propose a new time to the client', owner: 'Nazerke', est: 4, added: 0, rem: 4, due: '2026-11-04', checker: '—',
    note: 'Starts after T3 is Done (WIP limit 1).', log: ['Not started'] },
  { id: 'T12', pbi: 'US6', col: 'todo', title: 'Check US6 AC1–AC2', detail: 'Run AC1 and AC2; status change appears in the tracker within 5 s', owner: 'Alim', est: 3, added: 0, rem: 3, due: '2026-11-05', checker: '—',
    note: 'Depends on T10 and T11.', log: ['Not started'] },

  // ---- Done (result checked by someone who is not the author)
  { id: 'T1', pbi: 'US4', col: 'done', title: 'Wireframe + AC walk-through', detail: 'Wireframe of the pending-requests list; acceptance criteria walked through with the manager', owner: 'Saken', est: 3, added: 0, rem: 0, due: '2026-10-27', doneOn: '2026-10-28', checker: 'Manager (call 28 Oct)',
    note: 'Done 1 day late: manager call only possible on Wed 28 Oct 15:00.',
    log: ['26 Oct: In Progress, rem 2 h', '27 Oct: waiting for manager, rem 1 h', '28 Oct: Done after manager call'] },
  { id: 'T5', pbi: 'US5', col: 'done', title: 'Rescheduling rule + scenarios', detail: '"Requires rescheduling" rule and 6 competing-request scenarios', owner: 'Danara', est: 3, added: 0, rem: 0, due: '2026-10-27', doneOn: '2026-10-27', checker: 'Alim',
    note: '6 sample scenarios saved in /docs/sprint2/scenarios.md.',
    log: ['26 Oct: In Progress, rem 2 h', '27 Oct: Done, checked by Alim'] },
  { id: 'T6', pbi: 'US5', col: 'done', title: 'Mark competing requests', detail: 'Mark competing Pending requests when one is confirmed', owner: 'Danara', est: 5, added: 0, rem: 0, due: '2026-10-29', doneOn: '2026-10-29', checker: 'Assylzhan',
    note: 'Checked on the 6 sample scenarios.',
    log: ['27 Oct: In Progress, rem 4 h', '28 Oct: rem 2 h', '29 Oct: Done, checked by Assylzhan'] },
  { id: 'T9', pbi: 'US6', col: 'done', title: 'Reschedule flow + wording', detail: 'Reschedule flow and "Rescheduled" wording specified with the manager', owner: 'Saken', est: 2, added: 0, rem: 0, due: '2026-10-29', doneOn: '2026-10-29', checker: 'Manager (message 29 Oct)',
    note: 'Wording confirmed by the manager in writing.',
    log: ['28 Oct: In Progress, rem 1 h', '29 Oct: Done, wording confirmed by manager'] },
  { id: 'T13', pbi: 'US4', col: 'done', title: 'Free slot on Decline', detail: 'Release the slot on Decline in the F3 slot guard (added 28 Oct)', owner: 'Danara', est: 0, added: 3, rem: 0, due: '2026-10-30', doneOn: '2026-10-30', checker: 'Assylzhan',
    note: 'Added 28 Oct: Sprint 1 guard did not free the slot on Decline (US4 AC2). New estimate 3 h.',
    log: ['28 Oct: added (3 h)', '29 Oct: In Progress, rem 2 h', '30 Oct: Done, checked by Assylzhan'] },
];
