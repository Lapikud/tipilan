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
      titleKey: "schedule.events.smashBrosUltimate",
      locationKey: "schedule.locations.studentHouse",
      time: "18:30",
    },
    {
      titleKey: "schedule.events.cs2LolTournaments",
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
      titleKey: "schedule.events.doorsOpenSimple",
      locationKey: "schedule.locations.auditorium",
      time: "09:30",
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
      titleKey: "schedule.events.expoOpens",
      locationKey: "schedule.locations.entranceHall",
      time: "12:00",
    },
    {
      titleKey: "schedule.events.2xkoTournament",
      locationKey: "schedule.locations.studentHouse",
      time: "13:30",
    },
    {
      titleKey: "schedule.events.lolFinale",
      locationKey: "schedule.locations.auditorium",
      time: "19:30",
    },
    {
      titleKey: "schedule.events.cs2lbsemifinals",
      locationKey: "schedule.locations.auditorium",
      time: "19:30",
    },
    {
      titleKey: "schedule.events.cs2lbfinals",
      locationKey: "schedule.locations.auditorium",
      time: "21:30",
    },
    {
      titleKey: "schedule.events.granTurismoFinale",
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
      titleKey: "schedule.events.cs2semifinals",
      locationKey: "schedule.locations.auditorium",
      time: "11:00",
    },
    {
      titleKey: "schedule.events.Cs2finals",
      locationKey: "schedule.locations.auditorium",
      time: "15:30",
    },
    {

      titleKey: "schedule.events.AwardsCeremony",
      locationKey: "schedule.locations.auditorium",
      time: "18:00",
    },
    {
      titleKey: "schedule.events.doorsClose",
      locationKey: "schedule.locations.auditorium",
      time: "19:00",
    },
  ],
};
