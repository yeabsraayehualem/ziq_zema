type Day = { id: number; name: string; };

type Schedule = { id: number; package: Package; days: Day[]; start_time: string; end_time: string; };


interface ScheduleSectionProps { schedules: Schedule[]; }