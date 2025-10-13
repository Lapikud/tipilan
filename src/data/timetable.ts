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
      titleKey: "schedule.events.miniTournaments",
      locationKey: "schedule.locations.studentHouse",
      time: "18:00",
    },
    {
      titleKey: "schedule.events.tournamentRegistration",
      locationKey: "schedule.locations.auditorium",
      time: "18:00",
    },
    {
      titleKey: "schedule.events.streetFighter6",
      locationKey: "schedule.locations.studentHouse",
      time: "18:00",
    },
    {
      titleKey: "schedule.events.smashBrosUltimate",
      locationKey: "schedule.locations.studentHouse",
      time: "18:30",
    },
    {
      titleKey: "schedule.events.cs2Tournament",
      locationKey: "schedule.locations.auditorium",
      time: "20:00",
    },
    {
      titleKey: "schedule.events.lolTournament",
      locationKey: "schedule.locations.auditorium",
      time: "20:00",
    },
    {
      titleKey: "schedule.events.sf6SsbuFinale",
      locationKey: "schedule.locations.studentHouse",
      time: "22:00",
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
      titleKey: "schedule.events.cs2Continue",
      locationKey: "schedule.locations.auditorium",
      time: "11:00",
    },
    {
      titleKey: "schedule.events.lolContinue",
      locationKey: "schedule.locations.auditorium",
      time: "12:00",
    },
    {
      titleKey: "schedule.events.2xkoTournament",
      locationKey: "schedule.locations.studentHouse",
      time: "12:00",
    },
    {
      titleKey: "schedule.events.tekken8Tournament",
      locationKey: "schedule.locations.studentHouse",
      time: "12:30",
    },
    {
      titleKey: "schedule.events.2xkoTekken8Finale",
      locationKey: "schedule.locations.studentHouse",
      time: "18:00",
    },
    {
      titleKey: "schedule.events.lolFinale",
      locationKey: "schedule.locations.auditorium",
      time: "18:30",
    },
    {
      titleKey: "schedule.events.granTurismoFinale",
      locationKey: "schedule.locations.studentHouse",
      time: "20:00",
    },
    {
      titleKey: "schedule.events.lolTournamentSemifinals",
      locationKey: "schedule.locations.auditorium",
      time: "*01:00",
    },
    {
      titleKey: "schedule.events.doorsClose",
      locationKey: "schedule.locations.auditoriumAndStudentHouse",
      time: "*01:00",
    },
  ],
  oct26: [
    {
      titleKey: "schedule.events.cs2Finale",
      locationKey: "schedule.locations.auditorium",
      time: "10:00",
    },
    {
      titleKey: "schedule.events.cs2FinalMatch",
      locationKey: "schedule.locations.auditorium",
      time: "15:30",
    },
    {
      titleKey: "schedule.events.cs2TournamentFinale",
      locationKey: "schedule.locations.auditorium",
      time: "18:00",
    },
    {
      titleKey: "schedule.events.doorsClose",
      locationKey: "schedule.locations.auditorium",
      time: "18:30",
    },
  ],
};
