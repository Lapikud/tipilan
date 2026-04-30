export const roomNameKeys = [
  "boardGames",
  "bar",
  "eval",
  "simRacing",
  "fighting",
  "lvlup",
  "redbull",
  "kspace",
  "photowall",
  "buckshotroulette",
  "chillArea",
  "estoniagamedev",
  "info",
  "tartuyk",
  "tly",
  "gameup",
  "ittk",
  "wc",
  "alzgamer",
  "studentformula",
] as const;

export type RoomNameKey = (typeof roomNameKeys)[number];

/**
 * Static room names that do not require translation.
 * Centralizing here allows easy management and expansion.
 */
export const staticRoomNames: Partial<Record<RoomNameKey, string>> = {
  eval: "EVAL",
  redbull: "Red Bull",
  kspace: "K-space.ee",
  buckshotroulette: "Buckshot Roulette",
  gameup: "GameUP! Academy",
  wc: "WC",
  alzgamer: "Alzgamer",
};

/**
 * Room metadata for tudengimaja and fuajee rooms.
 * Centralizes size, position, and color for easier management.
 */
export interface RoomMeta {
  color: number;
  size: { width: number; height: number; depth: number };
  position: { x: number; y: number; z: number };
  view: "tudengimaja" | "fuajee";
}

export const roomMeta: Partial<Record<RoomNameKey, RoomMeta[]>> = {
  // tudengimaja rooms
  lvlup: [
    {
      color: 0xd34e35,
      size: { width: 7, height: 0.7, depth: 2 },
      position: { x: 2.8, y: 0, z: 4.75 },
      view: "tudengimaja",
    },
  ],
  kspace: [
    {
      color: 0x2c5da3,
      size: { width: 5, height: 0.7, depth: 2 },
      position: { x: -3.2, y: 0, z: 4.75 },
      view: "tudengimaja",
    },
  ],
  bar: [
    {
      color: 0x4ecdc4,
      size: { width: 2, height: 0.7, depth: 0.7 },
      position: { x: -0.5, y: 0, z: 1 },
      view: "tudengimaja",
    },
  ],
  eval: [
    {
      color: 0x4d86f7,
      size: { width: 2, height: 0.7, depth: 1.5 },
      position: { x: 1.7, y: 0, z: -3.8 },
      view: "tudengimaja",
    },
  ],
  simRacing: [
    {
      color: 0xd8b43c,
      size: { width: 1.5, height: 0.7, depth: 5 },
      position: { x: -6.8, y: 0, z: -2.2 },
      view: "tudengimaja",
    },
  ],
  redbull: [
    {
      color: 0xc02841,
      size: { width: 2, height: 0.7, depth: 1.5 },
      position: { x: -3.9, y: 0, z: -3.8 },
      view: "tudengimaja",
    },
  ],
  fighting: [
    {
      color: 0xa8f494,
      size: { width: 3.5, height: 0.7, depth: 1.5 },
      position: { x: -1.1, y: 0, z: -3.8 },
      view: "tudengimaja",
    },
  ],
  photowall: [
    {
      color: 0xd12e7d,
      size: { width: 2, height: 0.7, depth: 1 },
      position: { x: -6.6, y: 0, z: 1.9 },
      view: "tudengimaja",
    },
  ],
  buckshotroulette: [
    {
      color: 0xedb4b1,
      size: { width: 2, height: 0.7, depth: 1.5 },
      position: { x: 3.7, y: 0, z: -3.8 },
      view: "tudengimaja",
    },
  ],
  chillArea: [
    {
      color: 0x05512e,
      size: { width: 1.5, height: 0.7, depth: 5 },
      position: { x: 5.5, y: 0, z: -2.1 },
      view: "tudengimaja",
    },
    {
      color: 0x05512e,
      size: { width: 3.8, height: 0.7, depth: 1.5 },
      position: { x: 0.4, y: 0, z: -0.2 },
      view: "tudengimaja",
    },
  ],
  alzgamer: [
    {
      color: 0xd08331,
      size: { width: 3.5, height: 0.7, depth: 1.5 },
      position: { x: -3.3, y: 0, z: -0.2 },
      view: "tudengimaja",
    },
  ],
  wc: [
    {
      color: 0x332b5d,
      size: { width: 2, height: 0.7, depth: 2 },
      position: { x: 5.3, y: 0, z: 1.5 },
      view: "tudengimaja",
    },
  ],
  // fuajee rooms
  ittk: [
    {
      color: 0xd12e7d,
      size: { width: 4.5, height: 0.5, depth: 3 },
      position: { x: -3.8, y: 0, z: 3.3 },
      view: "fuajee",
    },
  ],
  tartuyk: [
    {
      color: 0x365591,
      size: { width: 5, height: 0.5, depth: 2.5 },
      position: { x: 2.7, y: 0, z: -1.7 },
      view: "fuajee",
    },
  ],
  estoniagamedev: [
    {
      color: 0x183bbf,
      size: { width: 6, height: 0.5, depth: 2.5 },
      position: { x: -5.8, y: 0, z: -1.7 },
      view: "fuajee",
    },
    {
      color: 0x183bbf,
      size: { width: 2, height: 0.5, depth: 5.5 },
      position: { x: -7.7, y: 0, z: 2.1 },
      view: "fuajee",
    },
  ],
  info: [
    {
      color: 0xff6347,
      size: { width: 2, height: 0.5, depth: 2 },
      position: { x: -1, y: 0, z: -2 },
      view: "fuajee",
    },
  ],
  tly: [
    {
      color: 0xa82838,
      size: { width: 4, height: 0.5, depth: 2 },
      position: { x: 7.5, y: 0, z: -1.8 },
      view: "fuajee",
    },
  ],
  gameup: [
    {
      color: 0x228b22,
      size: { width: 2, height: 0.5, depth: 1.5 },
      position: { x: 10.7, y: 0, z: -2 },
      view: "fuajee",
    },
  ],
  studentformula: [
    {
      color: 0x20b2aa,
      size: { width: 2.5, height: 0.5, depth: 1.5 },
      position: { x: 13, y: 0, z: -2 },
      view: "fuajee",
    },
  ],
};
