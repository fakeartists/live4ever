export var faceTracksDictionary = {
  mouthOpen: 'BS_OpenMouth',
  mouthRound: 'BS_RoundMouth',
  leftEyeBlink: 'BS_LeftBlink',
  rightEyeBlink: 'BS_RighBlink',
  leftEyeBrow: 'BS_LeftBrowDown',
  rightEyeBrow: 'BS_RightBrowDown',
  leftSmile: 'BS_LeftSmile',
  rightSmile: 'BS_RightSmile'
};

export var orderDefaults = ['skins', 'eyes', 'hairs', 'facialHairs', 'glasses', 'accessories', 'clothes'];

export var blendShapeDefaults = {
  BS_OpenMouth: 0,
  BS_RoundMouth: 0,
  BS_LeftBlink: 0,
  BS_RighBlink: 0,
  BS_LeftBrowDown: 0.6,
  BS_RightBrowDown: 0.6,
  BS_LeftSmile: 0.3,
  BS_RightSmile: 0.3
};

export var characterDefaults = [
  {
    skins: { type: 0, color: 5 },
    eyes: { type: 0, color: 1 },
    hairs: { type: 0, color: 2 },
    facialHairs: { type: 1, color: 1 },
    accessories: { type: 0, color: 2 },
    glasses: { type: 1, color: 0 },
    clothes: { type: 2, color: 2 }
  },
  {
    skins: { type: 0, color: 6 },
    eyes: { type: 1, color: 3 },
    hairs: { type: 3, color: 4 },
    facialHairs: { type: 0, color: 0 },
    accessories: { type: 0, color: 0 },
    glasses: { type: 2, color: 3 },
    clothes: { type: 3, color: 2 }
  },
  {
    skins: { type: 0, color: 2 },
    eyes: { type: 1, color: 1 },
    hairs: { type: 1, color: 1 },
    facialHairs: { type: 0, color: 0 },
    accessories: { type: 0, color: 0 },
    glasses: { type: 3, color: 4 },
    clothes: { type: 5, color: 4 }
  },
  {
    skins: { type: 0, color: 1 },
    eyes: { type: 0, color: 0 },
    hairs: { type: 2, color: 0 },
    facialHairs: { type: 2, color: 0 },
    accessories: { type: 3, color: 5 },
    glasses: { type: 0, color: 0 },
    clothes: { type: 1, color: 5 }
  },
  {
    skins: { type: 0, color: 8 },
    eyes: { type: 1, color: 3 },
    hairs: { type: 4, color: 6 },
    facialHairs: { type: 0, color: 0 },
    accessories: { type: 0, color: 0 },
    glasses: { type: 0, color: 0 },
    clothes: { type: 2, color: 4 }
  }
];

export var blendShapesPhoto = [
  {
    mouthOpen: 1,
    mouthRound: 0,
    leftEyeBlink: 0,
    rightEyeBlink: 0,
    leftEyeBrow: 0,
    rightEyeBrow: 0.6,
    leftSmile: 0.3,
    rightSmile: 0.3
  },
  {
    mouthOpen: 0.5,
    mouthRound: 1,
    leftEyeBlink: 0,
    rightEyeBlink: 1,
    leftEyeBrow: 0,
    rightEyeBrow: 0.6,
    leftSmile: 0.3,
    rightSmile: 0.3
  },
  {
    mouthOpen: 0,
    mouthRound: 0,
    leftEyeBlink: 0,
    rightEyeBlink: 1,
    leftEyeBrow: 0.6,
    rightEyeBrow: 0,
    leftSmile: 1,
    rightSmile: 0.3
  },
  {
    mouthOpen: 1,
    mouthRound: 0,
    leftEyeBlink: 0,
    rightEyeBlink: 0,
    leftEyeBrow: 0.6,
    rightEyeBrow: 0.6,
    leftSmile: 1,
    rightSmile: 1
  },
  {
    mouthOpen: 0,
    mouthRound: 1,
    leftEyeBlink: 1,
    rightEyeBlink: 1,
    leftEyeBrow: 0.6,
    rightEyeBrow: 0.6,
    leftSmile: 0.3,
    rightSmile: 0.3
  },
  {
    mouthOpen: 1,
    mouthRound: 0,
    leftEyeBlink: 0,
    rightEyeBlink: 1,
    leftEyeBrow: 0.8,
    rightEyeBrow: 0.6,
    leftSmile: 0.3,
    rightSmile: 0.3
  },
  {
    mouthOpen: 1,
    mouthRound: 0,
    leftEyeBlink: 0,
    rightEyeBlink: 0,
    leftEyeBrow: 0,
    rightEyeBrow: 0,
    leftSmile: 0.3,
    rightSmile: 0.3
  },
  {
    mouthOpen: 0.5,
    mouthRound: 0.5,
    leftEyeBlink: 1,
    rightEyeBlink: 1,
    leftEyeBrow: 0.6,
    rightEyeBrow: 0.6,
    leftSmile: 0.3,
    rightSmile: 0.3
  }
];
