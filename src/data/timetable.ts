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
      titleKey: "schedule.events.mainTournamentsStart",
      locationKey: "schedule.locations.auditorium",
      time: "20:00",
    },
    {
      titleKey: "schedule.events.miniTournamentsKickoff",
      locationKey: "schedule.locations.studentHouse",
      time: "18:00",
    },
    {
      titleKey: "schedule.events.fightingGamesStart",
      locationKey: "schedule.locations.studentHouse",
      time: "18:30",
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
      titleKey: "schedule.events.miniTournamentsStart",
      locationKey: "schedule.locations.studentHouse",
      time: "11:00",
    },
    {
      titleKey: "schedule.events.granblue",
      locationKey: "schedule.locations.studentHouse",
      time: "11:30",
    },
    {
      titleKey: "schedule.events.mainTournamentsStart",
      locationKey: "schedule.locations.auditorium",
      time: "12:00",
    },
    {
      titleKey: "schedule.events.granTurismo",
      locationKey: "schedule.locations.studentHouse",
      time: "20:00",
    },
    {
      titleKey: "schedule.events.doorsClose",
      locationKey: "schedule.locations.auditoriumAndStudentHouse",
      time: "*01:00",
    },
  ],
};
