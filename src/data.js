// Sprint 2 task board, status at the close of Sprint 2: Fri 6 Nov 2026 (Day 10 of 10).
// Based on the team-approved Sprint 2 Daily Log (Assignment 10 project update). Total remaining 11 h (T10–T12, deferred to MVP 1).
// Update this file after each Daily Scrum and push.

export const SNAPSHOT_VERSION = '2026-11-06-sprint2-final';
export const REPORTING_DATE = 'Fri 6 Nov 2026 (Day 10 of 10, Sprint 2 closed)';

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
  {
    "id": "T2",
    "pbi": "US4",
    "col": "done",
    "title": "Approve / decline endpoints",
    "detail": "Approve / decline call the F3 slot guard and update the request status",
    "owner": "Assylzhan",
    "est": 6,
    "added": 0,
    "rem": 0,
    "due": "2026-11-02",
    "checker": "Alim",
    "log": [
      "26 Oct: In Progress, rem 5 h",
      "27 Oct: rem 4 h",
      "28 Oct: rem 3 h, Decline needs T13",
      "29 Oct: rem 2 h, blocked by T13",
      "30 Oct: rem 2 h, tracker refresh bug",
      "2 Nov: Done, checked by Alim"
    ],
    "doneOn": "2026-11-02",
    "note": "Tracker refresh and Approve/Decline path completed 2 Nov; checked by Alim on the sample-data request → Decline → status path (I-01 resolved)."
  },
  {
    "id": "T3",
    "pbi": "US4",
    "col": "done",
    "title": "Dashboard list + buttons",
    "detail": "Pending-requests list with Approve and Decline buttons; client phone and service columns",
    "owner": "Nazerke",
    "est": 6,
    "added": 1,
    "rem": 0,
    "due": "2026-11-02",
    "checker": "Saken",
    "note": "Dashboard list with client phone/service and manager actions; checked by Saken.",
    "log": [
      "27 Oct: In Progress, rem 5 h",
      "28 Oct: +1 h (phone + service columns), rem 4 h",
      "29 Oct: rem 3 h",
      "30 Oct: review fixes, rem 3 h",
      "2 Nov: rem 2 h",
      "3 Nov: Done, checked by Saken"
    ],
    "doneOn": "2026-11-03"
  },
  {
    "id": "T7",
    "pbi": "US5",
    "col": "done",
    "title": "Conflict badge + list",
    "detail": "\"Conflict\" badge and Requires-rescheduling list on the dashboard",
    "owner": "Alim",
    "est": 4,
    "added": 0,
    "rem": 0,
    "due": "2026-11-02",
    "checker": "Nazerke",
    "note": "Conflict badge and 'Requires rescheduling' list completed; checked by Nazerke.",
    "log": [
      "28 Oct: In Progress, rem 3 h",
      "29 Oct: waited for T6 data, rem 3 h",
      "30 Oct: rem 2 h",
      "4 Nov: In Progress, rem 1 h",
      "5 Nov: Done, checked by Nazerke"
    ],
    "doneOn": "2026-11-05"
  },
  {
    "id": "T4",
    "pbi": "US4",
    "col": "done",
    "title": "Check US4 AC1–AC2",
    "detail": "Run AC1 and AC2 plus one failure case; peer review",
    "owner": "Alim",
    "est": 3,
    "added": 0,
    "rem": 0,
    "due": "2026-11-03",
    "checker": "Danara",
    "note": "US4 acceptance and failure-path checks completed; checked by Danara.",
    "log": [
      "Not started",
      "3 Nov: In Progress, rem 2 h",
      "4 Nov: Done, checked by Danara"
    ],
    "doneOn": "2026-11-04"
  },
  {
    "id": "T8",
    "pbi": "US5",
    "col": "done",
    "title": "Check US5 AC1–AC2",
    "detail": "Run AC1 and AC2 on the sample scenarios (reviewer is not the author)",
    "owner": "Saken",
    "est": 3,
    "added": 0,
    "rem": 0,
    "due": "2026-11-03",
    "checker": "Alim",
    "note": "US5 acceptance scenarios checked; checked by Alim.",
    "log": [
      "Not started",
      "5 Nov: In Progress, rem 2 h",
      "6 Nov: Done, checked by Alim"
    ],
    "doneOn": "2026-11-06"
  },
  {
    "id": "T10",
    "pbi": "US6",
    "col": "todo",
    "title": "Propose-new-slot endpoint",
    "detail": "Endpoint that proposes a new slot, reusing the F3 guard",
    "owner": "Assylzhan",
    "est": 4,
    "added": 0,
    "rem": 4,
    "due": "2026-11-04",
    "checker": "—",
    "note": "Deferred to MVP 1 – not started (Sprint 2 closed 6 Nov).",
    "log": [
      "Not started",
      "6 Nov: deferred to MVP 1"
    ]
  },
  {
    "id": "T11",
    "pbi": "US6",
    "col": "todo",
    "title": "\"Propose new time\" form",
    "detail": "Form on the dashboard to propose a new time to the client",
    "owner": "Nazerke",
    "est": 4,
    "added": 0,
    "rem": 4,
    "due": "2026-11-04",
    "checker": "—",
    "note": "Deferred to MVP 1 – not started (Sprint 2 closed 6 Nov).",
    "log": [
      "Not started",
      "6 Nov: deferred to MVP 1"
    ]
  },
  {
    "id": "T12",
    "pbi": "US6",
    "col": "todo",
    "title": "Check US6 AC1–AC2",
    "detail": "Run AC1 and AC2; status change appears in the tracker within 5 s",
    "owner": "Alim",
    "est": 3,
    "added": 0,
    "rem": 3,
    "due": "2026-11-05",
    "checker": "—",
    "note": "Deferred to MVP 1 – not started (Sprint 2 closed 6 Nov).",
    "log": [
      "Not started",
      "6 Nov: deferred to MVP 1"
    ]
  },
  {
    "id": "T1",
    "pbi": "US4",
    "col": "done",
    "title": "Wireframe + AC walk-through",
    "detail": "Wireframe of the pending-requests list; acceptance criteria walked through with the manager",
    "owner": "Saken",
    "est": 3,
    "added": 0,
    "rem": 0,
    "due": "2026-10-27",
    "doneOn": "2026-10-28",
    "checker": "Manager (call 28 Oct)",
    "note": "Done 1 day late: manager call only possible on Wed 28 Oct 15:00.",
    "log": [
      "26 Oct: In Progress, rem 2 h",
      "27 Oct: waiting for manager, rem 1 h",
      "28 Oct: Done after manager call"
    ]
  },
  {
    "id": "T5",
    "pbi": "US5",
    "col": "done",
    "title": "Rescheduling rule + scenarios",
    "detail": "\"Requires rescheduling\" rule and 6 competing-request scenarios",
    "owner": "Danara",
    "est": 3,
    "added": 0,
    "rem": 0,
    "due": "2026-10-27",
    "doneOn": "2026-10-27",
    "checker": "Alim",
    "note": "6 sample scenarios saved in /docs/sprint2/scenarios.md.",
    "log": [
      "26 Oct: In Progress, rem 2 h",
      "27 Oct: Done, checked by Alim"
    ]
  },
  {
    "id": "T6",
    "pbi": "US5",
    "col": "done",
    "title": "Mark competing requests",
    "detail": "Mark competing Pending requests when one is confirmed",
    "owner": "Danara",
    "est": 5,
    "added": 0,
    "rem": 0,
    "due": "2026-10-29",
    "doneOn": "2026-10-29",
    "checker": "Assylzhan",
    "note": "Checked on the 6 sample scenarios.",
    "log": [
      "27 Oct: In Progress, rem 4 h",
      "28 Oct: rem 2 h",
      "29 Oct: Done, checked by Assylzhan"
    ]
  },
  {
    "id": "T9",
    "pbi": "US6",
    "col": "done",
    "title": "Reschedule flow + wording",
    "detail": "Reschedule flow and \"Rescheduled\" wording specified with the manager",
    "owner": "Saken",
    "est": 2,
    "added": 0,
    "rem": 0,
    "due": "2026-10-29",
    "doneOn": "2026-10-29",
    "checker": "Manager (message 29 Oct)",
    "note": "Wording confirmed by the manager in writing.",
    "log": [
      "28 Oct: In Progress, rem 1 h",
      "29 Oct: Done, wording confirmed by manager"
    ]
  },
  {
    "id": "T13",
    "pbi": "US4",
    "col": "done",
    "title": "Free slot on Decline",
    "detail": "Release the slot on Decline in the F3 slot guard (added 28 Oct)",
    "owner": "Danara",
    "est": 0,
    "added": 3,
    "rem": 0,
    "due": "2026-10-30",
    "doneOn": "2026-10-30",
    "checker": "Assylzhan",
    "note": "Added 28 Oct: Sprint 1 guard did not free the slot on Decline (US4 AC2). New estimate 3 h.",
    "log": [
      "28 Oct: added (3 h)",
      "29 Oct: In Progress, rem 2 h",
      "30 Oct: Done, checked by Assylzhan"
    ]
  }
];
