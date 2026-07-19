export interface EventConfig {
  name: string;
  shortName: string;
  organizer: string;
  location: string;
  venue: string;
  date: string;
  displayDate: string;
  fullDisplayDate: string;
  startDateISO: string;
  endDateISO: string;
  timezone: string;
  targetTimestamp: number;
}

export const EVENT_CONFIG: EventConfig = {
  name: "AWS Student Community Day Yavatmal 2026",
  shortName: "SCD Yavatmal 2026",
  organizer: "AWS Student Builder Group JDIET & AWS Cloud Club JDIET",
  location: "Yavatmal, Maharashtra, India",
  venue: "Venue to be announced",
  date: "23 August 2026",
  displayDate: "Aug 23, 2026",
  fullDisplayDate: "August 23, 2026",
  startDateISO: "2026-08-23T09:00:00+05:30",
  endDateISO: "2026-08-23T18:00:00+05:30",
  timezone: "Asia/Kolkata",
  // Target start time: 23 August 2026 at 09:00:00 AM IST (+05:30)
  targetTimestamp: new Date("2026-08-23T09:00:00+05:30").getTime(),
};
