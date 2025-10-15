const sponsorCampaigns = {
  "campaign-mycollections": {
    cid: 1882,
    sid: 133,
    requiresLongForm: true,
    coregAnswerKey: "coreg_answer_campaign-mycollections",
    hasCoregFlow: false
  },
  "campaign-unitedconsumers-vraag": {
    forwardTo: [
    "campaign-unitedconsumers-man",
    "campaign-unitedconsumers-vrouw"
    ],
    requiresLongForm: true, // als je wilt dat long form verplicht is voor beide
    coregAnswerKey: "coreg_answer_campaign-unitedconsumers-vraag"
  },
  "campaign-unitedconsumers-man": {
    cid: 2905,
    sid: 34,
    requiresLongForm: true,
    coregAnswerKey: "coreg_answer_campaign-unitedconsumers-man",
    hasCoregFlow: false
  },
  "campaign-unitedconsumers-vrouw": {
    cid: 2906,
    sid: 34,
    requiresLongForm: true,
    coregAnswerKey: "coreg_answer_campaign-unitedconsumers-vrouw",
    hasCoregFlow: false
  },
  "campaign-destentor": {
    cid: 4199,
    sid: 34,
    requiresLongForm: false,
    hasCoregFlow: false,
    alwaysSend: true
  },
  "campaign-ercapital": {
    cid: 2245,
    sid: 34,
    requiresLongForm: false,
    hasCoregFlow: false,
    alwaysSend: true
  },
  "campaign-bndestem": {
    cid: 4120,
    sid: 34,
    requiresLongForm: false,
    hasCoregFlow: false,
    alwaysSend: true
  },
  "campaign-degelderlander": {
    cid: 4196,
    sid: 34,
    requiresLongForm: false,
    hasCoregFlow: false,
    alwaysSend: true
  },
  "campaign-brabantsdagblad": {
    cid: 4198,
    sid: 34,
    requiresLongForm: false,
    hasCoregFlow: false,
    alwaysSend: true
  },
  "campaign-tubantia": {
    cid: 4195,
    sid: 34,
    requiresLongForm: false,
    hasCoregFlow: false,
    alwaysSend: true
  },
  "campaign-einhovensdagblad": {
    cid: 4197,
    sid: 34,
    requiresLongForm: false,
    hasCoregFlow: false,
    alwaysSend: true
  },
  "campaign-pzc": {
    cid: 4197,
    sid: 34,
    requiresLongForm: false,
    hasCoregFlow: false,
    alwaysSend: true
  },
  "campaign-voordeelvanger": {
    cid: 5380,
    sid: 34,
    requiresLongForm: false,
    hasCoregFlow: false,
    alwaysSend: true
  },
    "campaign-aownu": {
    cid: 4423,
    sid: 397,
    requiresLongForm: true,
    tmcosponsor: true,
    hasCoregFlow: false
  },
  "campaign-trefzeker": {
    cid: 5017,
    sid: 496,
    requiresLongForm: true,
    coregAnswerKey: "coreg_answer_campaign-trefzeker",
    hasCoregFlow: true,
    answerFieldKey: "f_2575_coreg_answer_dropdown"
  },
  "campaign-beterabonnementeneco": {
    cid: 5116,
    sid: 34,
    requiresLongForm: true,
    coregAnswerKey: "coreg_answer_campaign-beterabonnementeneco",
    hasCoregFlow: true,
    answerFieldKey: "f_2575_coreg_answer_dropdown"
  },
    "campaign-groenen": {
    cid: 5446,
    sid: 34,
    requiresLongForm: true,
    coregAnswerKey: "coreg_answer_campaign-groenen",
    hasCoregFlow: false
  },
    "campaign-vastelasten": {
    cid: 4951,
    sid: 34,
    requiresLongForm: true,
    coregAnswerKey: "coreg_answer_campaign-vastelasten",
    hasCoregFlow: false
  },
  "campaign-kiosk": {
    cid: 3499,
    sid: 34,
    requiresLongForm: false,
    coregAnswerKey: "coreg_answer_campaign-kiosk",
    hasCoregFlow: false
  },
  "campaign-dealdonkey": {
    cid: 4819,
    sid: 34,
    requiresLongForm: false,
    coregAnswerKey: "coreg_answer_campaign-dealdonkey",
    hasCoregFlow: false
  },
  "campaign-ad": {
    cid: 3532,
    sid: 34,
    requiresLongForm: false,
    coregAnswerKey: "coreg_answer_campaign-ad",
    hasCoregFlow: false,
    alwaysSend: true
  },
  "campaign-volkskrant": {
    cid: 3534,
    sid: 34,
    requiresLongForm: false,
    coregAnswerKey: "coreg_answer_campaign-volkskrant",
    hasCoregFlow: false
  },
  "campaign-parool": {
    cid: 4192,
    sid: 34,
    requiresLongForm: false,
    coregAnswerKey: "coreg_answer_campaign-parool",
    hasCoregFlow: false
  },
  "campaign-trouw": {
    cid: 4193,
    sid: 34,
    requiresLongForm: false,
    coregAnswerKey: "coreg_answer_campaign-trouw",
    hasCoregFlow: false
  },
  "campaign-consubeheer": {
    cid: 4721,
    sid: 34,
    requiresLongForm: true,
    coregAnswerKey: "coreg_answer_campaign-consubeheer",
    hasCoregFlow: false
  },
  "campaign-beterabonnementkeuze": {
    cid: 5086,
    sid: 34,
    requiresLongForm: true,
    coregAnswerKey: "coreg_answer_campaign-beterabonnementkeuze",
    hasCoregFlow: false
  },
  "campaign-engie": {
    cid: 4985,
    sid: 34,
    requiresLongForm: true,
    coregAnswerKey: "coreg_answer_engie",
    hasCoregFlow: false
  },
  "campaign-generationzero": {
    cid: 4555,
    sid: 463,
    requiresLongForm: true,
    coregAnswerKey: "coreg_answer_campaign-generationzero",
    hasCoregFlow: true
  },
  "campaign-hotelspecials": {
    cid: 4621,
    sid: 34,
    requiresLongForm: false,
    coregAnswerKey: "coreg_answer_campaign-hotelspecials",
    hasCoregFlow: false
  },
  "campaign-raadselgids": {
    cid: 3697,
    sid: 265,
    requiresLongForm: true,
    coregAnswerKey: "coreg_answer_campaign-raadselgids",
    hasCoregFlow: false,
    splitGroup: "raadselgids",
    splitPercentage: 100
  },
  "campaign-raadselgids-b": {
    cid: 5314,
    sid: 529,
    requiresLongForm: true,
    coregAnswerKey: "coreg_answer_campaign-raadselgids",
    hasCoregFlow: false,
    splitGroup: "raadselgids",
    splitPercentage: 0
  },
  "campaign-tuinmanieren": {
    cid: 4852,
    sid: 34,
    requiresLongForm: false,
    coregAnswerKey: "coreg_answer_campaign-tuinmanieren",
    hasCoregFlow: true // deze heeft multi-step flow
  },
  "campaign-leadsnl": {
    cid: 925,
    sid: 34,
    requiresLongForm: false,
    coregAnswerKey: "coreg_answer_campaign-leadsnl",
    hasCoregFlow: false
  }
};

export default sponsorCampaigns;
