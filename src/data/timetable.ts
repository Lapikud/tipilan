export type ScheduleItem = {
  time?: string; // Aeg on ajutine praegu kuna pole 100% kindlalt paigas
  title: string;
  location: string;
  description?: string;
};

export const scheduleData: Record<string, ScheduleItem[]> = {
  "24. oktoober": [
    {
      title: "Uksed avatakse",
      location: "Registreerimine ja setup aulas",
      time: "17:00",
    },
    {
      title: "Põhiturniirid algavad",
      location: "Aula",
      time: "20:00",
    },
    {
      title: "Miniturniiride kick-off",
      location: "Tudengimaja",
      time: "18:00",
    },
    {
      title: "Fighting games turniiride algus",
      location: "Tudengimaja",
      time: "18:30",
    },
    {
      title: "Uksed suletakse",
      location: "Aula ja Tudengimaja",
      time: "*01:00",
    },
    
  ],
  "25. oktoober": [
    {
      title: "Uksed avatakse",
      location: "Aula ja Tudengimaja",
      time: "10:00",
    },
    {
      title: "Miniturniirid algavad",
      location: "Tudengimaja",
      time: "11:00",
    },
    {
      title: "Granblue turniir",
      location: "Tudengimaja",
      time: "11:30",
    },
    {
      title: "Põhiturniirid algavad",
      location: "Aula",
      time: "12:00",
    },
    {
      title: " Gran Turismo turniir",
      location: "Tudengimaja",
      time: "20:00",
    },
    {
      title: "Uksed suletakse",
      location: "Aula ja Tudengimaja",
      time: "*01:00",
    },
  ],
};
