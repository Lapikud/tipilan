export type ScheduleItem = {
  time?: string; // Aeg on ajutine praegu kuna pole 100% kindlalt paigas
  titleKey: string;
  locationKey: string;
  description?: string;
};

export const scheduleData: Record<string, ScheduleItem[]> = {
  oct24: [
    {
      titleKey: "schedule.events.doorsOpen",
      locationKey: "schedule.locations.registrationSetup",
      time: "17:00",
    },
    {
      titleKey: "schedule.events.preTournamentWarmup",
      locationKey: "schedule.locations.auditoriumAndStudentHouse",
      time: "18:00",
    },
    {
      titleKey: "schedule.events.killerInstinct",
      locationKey: "schedule.locations.studentHouse",
      time: "18:30",
    },
    {
      titleKey: "schedule.events.mainTournamentsStart",
      locationKey: "schedule.locations.auditorium",
      time: "20:00",
    },
    {
      titleKey: "schedule.events.doorsClose",
      locationKey: "schedule.locations.auditoriumAndStudentHouse",
      time: "*01:00",
    },
  ],
  oct25: [
    {
      titleKey: "schedule.events.doorsOpen",
      locationKey: "schedule.locations.auditoriumAndStudentHouse",
      time: "10:00",
    },
    {
      titleKey: "schedule.events.warmup",
      locationKey: "schedule.locations.auditoriumAndStudentHouse",
      time: "10:30",
    },
    {
      titleKey: "schedule.events.mainTournamentsContinue",
      locationKey: "schedule.locations.auditorium",
      time: "12:00",
    },
    {
      titleKey: "schedule.events.miniTournamentsStart",
      locationKey: "schedule.locations.studentHouse",
      time: "13:00",
    },
    {
      titleKey: "schedule.events.granblue",
      locationKey: "schedule.locations.studentHouse",
      time: "13:30",
    },
    {
      titleKey: "schedule.events.granTurismoFinal",
      locationKey: "schedule.locations.studentHouse",
      time: "20:00",
    },
    {
      titleKey: "schedule.events.doorsClose",
      locationKey: "schedule.locations.auditoriumAndStudentHouse",
      time: "*01:00",
    },
  ],
  oct26: [
    {
      titleKey: "schedule.events.expoClosed",
      locationKey: "schedule.locations.studentHouse",
      time: "all day",
    },
    {
      titleKey: "schedule.events.cs2FinalStart",
      locationKey: "schedule.locations.auditorium",
      time: "10:00",
    },
    {
      titleKey: "schedule.events.cs2Final",
      locationKey: "schedule.locations.auditorium",
      time: "18:00",
    },
    {
      titleKey: "schedule.events.awardCeremony",
      locationKey: "schedule.locations.auditorium",
      time: "18:30",
    },
  ],
};
