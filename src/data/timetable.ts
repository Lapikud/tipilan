export type ScheduleItem = {
  time?: string; // Aeg on ajutine praegu kuna pole 100% kindlalt paigas
  title: string;
  location: string;
  description?: string;
};

export const scheduleData: Record<string, ScheduleItem[]> = {
  "24. oktoober": [
    {
      title: "League of Legends põhiturniir",
      location: "Aula",
      time: "-",
    },
    {
      title: "Miniturniirid",
      location: "Tudengimaja",
      time: "-",
    },
  ],
  "25. oktoober": [
    {
      title: "Counter-Strike 2 põhiturniir",
      location: "Aula",
      time: "-",
    },
    {
      title: "Miniturniirid",
      location: "Tudengimaja",
      time: "-",
    },
  ],
};
