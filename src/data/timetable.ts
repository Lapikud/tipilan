export type ScheduleItem = {
  time?: string; // Aeg on ajutine praegu kuna pole 100% kindlalt paigas
  titleKey: string;
  locationKey: string | string[];
  description?: string;
};

export const scheduleData: Record<string, ScheduleItem[]> = {
  sep11: [
    {
      titleKey: "schedule.events.doorsOpen",
      locationKey: [
        "schedule.locations.auditorium",
        "schedule.locations.studentHouse",
        "schedule.locations.lobbyAndLanArea"
      ],
      time: "17:00",
    },
    {
      titleKey: "schedule.events.gamersSetup",
      locationKey: [
        "schedule.locations.auditorium",
        "schedule.locations.studentHouse"
      ],
      time: "17:00-19:00",
    },
    {
      titleKey: "schedule.events.exploring",
      locationKey: [
        "schedule.locations.auditorium",
        "schedule.locations.studentHouse"
      ],
      time: "17:00-18:00",
    },
    {
      titleKey: "schedule.events.gameDevShowcasing",
      locationKey: "schedule.locations.lobbyAndLanArea",
      time: "17:00-00:00",
    },
    {
      titleKey: "schedule.events.miniTournaments",
      locationKey: "schedule.locations.studentHouse",
      time: "18:00",
    },
    {
      titleKey: "schedule.events.lanAreaTournaments",
      locationKey: "schedule.locations.lobbyAndLanArea",
      time: "18:00-00:00",
    },
    {
      titleKey: "schedule.events.minigamesAndTournaments",
      locationKey: "schedule.locations.lobbyAndLanArea",
      time: "18:00-00:00",
    },
    {
      titleKey: "schedule.events.blueCarpet",
      locationKey: [
        "schedule.locations.auditorium",
        "schedule.locations.studentHouse"
      ],
      time: "19:00",
    },
    {
      titleKey: "schedule.events.day1Begins",
      locationKey: [
        "schedule.locations.auditorium",
        "schedule.locations.studentHouse"
      ],
      time: "19:30",
    },
    {
      titleKey: "schedule.events.cs2SwissR1",
      locationKey: "schedule.locations.auditorium",
      time: "20:00-21:00",
    },
    {
      titleKey: "schedule.events.lolGame1",
      locationKey: "schedule.locations.auditorium",
      time: "20:00-21:00",
    },
    {
      titleKey: "schedule.events.cs2SwissR2",
      locationKey: "schedule.locations.auditorium",
      time: "21:00-22:00",
    },
    {
      titleKey: "schedule.events.lolGame2",
      locationKey: "schedule.locations.auditorium",
      time: "21:00-22:00",
    },
    {
      titleKey: "schedule.events.cs2SwissR3",
      locationKey: "schedule.locations.auditorium",
      time: "22:00-23:00",
    },
    {
      titleKey: "schedule.events.lolGame3",
      locationKey: "schedule.locations.auditorium",
      time: "22:00-23:00",
    },
    {
      titleKey: "schedule.events.cs2SwissR4",
      locationKey: "schedule.locations.auditorium",
      time: "23:00-00:00",
    },
    {
      titleKey: "schedule.events.lolGame4",
      locationKey: "schedule.locations.auditorium",
      time: "23:00-00:00",
    },
    {
      titleKey: "schedule.events.cs2SwissR5",
      locationKey: "schedule.locations.auditorium",
      time: "00:00-01:00",
    },
    {
      titleKey: "schedule.events.lolGame5",
      locationKey: "schedule.locations.auditorium",
      time: "00:00-01:00",
    },
    {
      titleKey: "schedule.events.doorsClose",
      locationKey: [
        "schedule.locations.auditorium",
        "schedule.locations.studentHouse",
        "schedule.locations.lobbyAndLanArea"
      ],
      time: "*01:00",
    },
  ],
  sep12: [
    {
      titleKey: "schedule.events.doorsOpenSimple",
      locationKey: [
        "schedule.locations.auditorium",
        "schedule.locations.studentHouse",
        "schedule.locations.lobbyAndLanArea"
      ],
      time: "09:00",
    },
    {
      titleKey: "schedule.events.gamersSetup",
      locationKey: "schedule.locations.auditorium",
      time: "09:00-10:30",
    },
    {
      titleKey: "schedule.events.gamersSetup",
      locationKey: "schedule.locations.studentHouse",
      time: "09:00-11:30",
    },
    {
      titleKey: "schedule.events.cs2WbR1",
      locationKey: "schedule.locations.auditorium",
      time: "10:30-13:00",
    },
    {
      titleKey: "schedule.events.cs2ScWbR1",
      locationKey: "schedule.locations.auditorium",
      time: "10:30-11:30",
    },
    {
      titleKey: "schedule.events.cs2ScLbR1",
      locationKey: "schedule.locations.auditorium",
      time: "11:30-12:30",
    },
    {
      titleKey: "schedule.events.lolTournamentQuarters",
      locationKey: "schedule.locations.auditorium",
      time: "11:30-14:30",
    },
    {
      titleKey: "schedule.events.expoOpens",
      locationKey: "schedule.locations.lobbyAndLanArea",
      time: "12:00",
    },
    {
      titleKey: "schedule.events.gamedevExpo",
      locationKey: "schedule.locations.lobbyAndLanArea",
      time: "12:00-19:00",
    },
    {
      titleKey: "schedule.events.miniTournaments",
      locationKey: "schedule.locations.lobbyAndLanArea",
      time: "13:00-19:00",
    },
    {
      titleKey: "schedule.events.cs2LbR1",
      locationKey: "schedule.locations.auditorium",
      time: "13:00-14:00",
    },
    {
      titleKey: "schedule.events.cs2ScWbR2",
      locationKey: "schedule.locations.auditorium",
      time: "12:30-13:30",
    },
    {
      titleKey: "schedule.events.cs2ScLbR2",
      locationKey: "schedule.locations.auditorium",
      time: "13:30-14:30",
    },
    {
      titleKey: "schedule.events.cs2WbR2",
      locationKey: "schedule.locations.auditorium",
      time: "14:00-16:00",
    },
    {
      titleKey: "schedule.events.cs2ScWbR3",
      locationKey: "schedule.locations.auditorium",
      time: "14:30-15:30",
    },
    {
      titleKey: "schedule.events.lolBreak",
      locationKey: "schedule.locations.auditorium",
      time: "14:30-15:00",
    },
    {
      titleKey: "schedule.events.lolSemiFinals",
      locationKey: "schedule.locations.auditorium",
      time: "15:00-18:00",
    },
    {
      titleKey: "schedule.events.cs2ScLbR3",
      locationKey: "schedule.locations.auditorium",
      time: "15:45-16:30",
    },
    {
      titleKey: "schedule.events.cs2LbR2",
      locationKey: "schedule.locations.auditorium",
      time: "16:30-17:30",
    },
    {
      titleKey: "schedule.events.cs2ScLbR4",
      locationKey: "schedule.locations.auditorium",
      time: "16:30-17:30",
    },
    {
      titleKey: "schedule.events.break",
      locationKey: "schedule.locations.auditorium",
      time: "17:30-19:30",
    },
    {
      titleKey: "schedule.events.break",
      locationKey: "schedule.locations.studentHouse",
      time: "18:00-19:00",
    },
    {
      titleKey: "schedule.events.avatarLegendsFinal",
      locationKey: "schedule.locations.lobbyAndLanArea",
      time: "19:00-19:30",
    },
    {
      titleKey: "schedule.events.gamedevAwardCeremony",
      locationKey: "schedule.locations.lobbyAndLanArea",
      time: "19:00-20:00",
    },
    {
      titleKey: "schedule.events.lolFinalsAndThirdPlace",
      locationKey: "schedule.locations.auditorium",
      time: "19:00-00:00",
    },
    {
      titleKey: "schedule.events.cs2WbR3",
      locationKey: "schedule.locations.auditorium",
      time: "19:30-22:00",
    },
    {
      titleKey: "schedule.events.cs2ScSemiFinal",
      locationKey: "schedule.locations.auditorium",
      time: "19:30-20:30",
    },
    {
      titleKey: "schedule.events.tekken8Final",
      locationKey: "schedule.locations.lobbyAndLanArea",
      time: "19:30-20:00",
    },
    {
      titleKey: "schedule.events.streetFighter6Final",
      locationKey: "schedule.locations.lobbyAndLanArea",
      time: "20:00-20:30",
    },
    {
      titleKey: "schedule.events.gamedevExpo",
      locationKey: "schedule.locations.lobbyAndLanArea",
      time: "20:00-00:00",
    },
    {
      titleKey: "schedule.events.twoXkoFinal",
      locationKey: "schedule.locations.lobbyAndLanArea",
      time: "20:30-21:00",
    },
    {
      titleKey: "schedule.events.cs2ScLbR5",
      locationKey: "schedule.locations.auditorium",
      time: "20:30-21:30",
    },
    {
      titleKey: "schedule.events.ssbuFinal",
      locationKey: "schedule.locations.lobbyAndLanArea",
      time: "21:00-21:30",
    },
    {
      titleKey: "schedule.events.cs2ScTournamentFinal",
      locationKey: "schedule.locations.auditorium",
      time: "21:30-23:30",
    },
    {
      titleKey: "schedule.events.invincibleVsFinal",
      locationKey: "schedule.locations.lobbyAndLanArea",
      time: "21:30-22:00",
    },
    {
      titleKey: "schedule.events.cs2LbR3",
      locationKey: "schedule.locations.auditorium",
      time: "22:00-23:00",
    },
    {
      titleKey: "schedule.events.miniTournamentsAwardCeremony",
      locationKey: "schedule.locations.lobbyAndLanArea",
      time: "22:00-22:30",
    },
    {
      titleKey: "schedule.events.cs2LbR4",
      locationKey: "schedule.locations.auditorium",
      time: "23:00-00:00",
    },
    {
      titleKey: "schedule.events.awardCeremony",
      locationKey: "schedule.locations.lobbyAndLanArea",
      time: "00:00-00:30",
    },
    {
      titleKey: "schedule.events.doorsClose",
      locationKey: "schedule.locations.auditorium",
      time: "*01:30",
    },
  ],
  sep13: [
    {
      titleKey: "schedule.events.noEventsScheduled",
      locationKey: [
        "schedule.locations.studentHouse",
        "schedule.locations.lobbyAndLanArea"
      ],
      time: "-",
    },
    {
      titleKey: "schedule.events.doorsOpenSimple",
      locationKey: "schedule.locations.auditorium",
      time: "09:00",
    },
    {
      titleKey: "schedule.events.gamersSetup",
      locationKey: "schedule.locations.auditorium",
      time: "09:30-10:30",
    },
    {
      titleKey: "schedule.events.cs2WbR4",
      locationKey: "schedule.locations.auditorium",
      time: "10:30-13:00",
    },
    {
      titleKey: "schedule.events.cs2LbR5",
      locationKey: "schedule.locations.auditorium",
      time: "13:00-14:00",
    },
    {
      titleKey: "schedule.events.cs2LbR6",
      locationKey: "schedule.locations.auditorium",
      time: "14:00-16:00",
    },
    {
      titleKey: "schedule.events.cs2GrandFinal",
      locationKey: "schedule.locations.auditorium",
      time: "16:00-18:00",
    },
    {
      titleKey: "schedule.events.awardCeremony",
      locationKey: "schedule.locations.auditorium",
      time: "18:30",
    },
    {
      titleKey: "schedule.events.closingCeremony",
      locationKey: "schedule.locations.auditorium",
      time: "19:00",
    },
    {
      titleKey: "schedule.events.doorsClose",
      locationKey: "schedule.locations.auditorium",
      time: "19:30",
    },
  ],
};
