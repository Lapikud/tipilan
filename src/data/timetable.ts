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
    },
    {
      title: "Miniturniirid",
      location: "Tudengimaja",
    },
  ],
  "25. oktoober": [
    {
      title: "Counter-Strike 2 põhiturniir",
      location: "Aula",
    },
    {
      title: "Miniturniirid",
      location: "Tudengimaja",
    },
  ],
};
