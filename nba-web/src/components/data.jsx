export default [
  {
    "@id": "1",
    id: "20c907d1-52cf-4c99-bbf7-1860847cd77e",
    version: 51,
    scheduled: 0,
    //scheduled: 1493340400000,
    durationMinutes: null,
    accountUserEventData: [],
    accountEventData: [],
    name: "East Quarterfinals",
    externalId: "17U-PB:3-PA:2",

    ignoreStandings: false,

    sides: {
      visitor: {
        team: {
          "@id": "11",
          id: "6ba0bba3-c7b7-4216-850d-ca0b2dffb14d",
          name: "West Salem Panthers",
          externalId: "17U-WestSalemPanthers",
          numGames: 2,
          standing: {
            rank: 3,
            note: null,
            stats: { gamesPlayed: 0, wins: 0, ties: 0, pointDifferential: 0 },
          },
        },
        score: { score: 21, notes: null },
        seed: {
          sourceGame: null,
          sourcePool: { "@ref": "12" },
          rank: 3,
          displayName: "3rd place of B",
        },
      },
      home: {
        team: {
          "@id": "13",
          id: "3ecec587-9646-4050-b3b8-ff9ad8711f5e",

          name: "Cochrane Fountain City Pirates",
          externalId: "17U-CochraneFountainCityPirates",
          numGames: 3,
          standing: {
            rank: 2,
            note: null,
            stats: { gamesPlayed: 0, wins: 0, ties: 0, pointDifferential: 0 },
          },
        },
        score: { score: 42, notes: null },
        seed: {
          sourceGame: null,
          sourcePool: { "@ref": "14" },
          rank: 2,
          displayName: "2nd place of A",
        },
      },
    },
    homeSeed: {
      sourceGame: null,
      sourcePool: { "@ref": "14" },
      rank: 2,
      displayName: "2nd place of A",
    },
    visitorSeed: {
      sourceGame: null,
      sourcePool: { "@ref": "12" },
      rank: 3,
      displayName: "3rd place of B",
    },
    recruits: [],
    homeTeam: { "@ref": "13" },
    visitorTeam: { "@ref": "11" },
    homeScore: { score: 42, notes: null },
    visitorScore: { score: 21, notes: null },
    eventType: "Game",
  },

  {
    "@id": "15",
    id: "35b0745d-ef13-4255-8c40-c9daa95e4cc4",
    version: 10,
    created: 1465591789000,
    updated: 1488233111519,
    scheduled: 1499551200000,
    durationMinutes: null,
    localDate: "2017-07-08",
    accountUserEventData: [],
    accountEventData: [],
    name: "B5",
    externalId: "17U-GB4:W-GB3:W",
    gameGroup: { "@ref": "2" },
    ignoreStandings: false,
    court: {
      "@id": "16",
      id: "ec7c9d92-c59a-450d-83df-2034d232f7b9",
      version: 0,
      created: 1465591789000,
      updated: 1465591789000,
      venue: { "@ref": "9" },
      name: "COURT 1",
    },
    sides: {
      visitor: {
        team: null,
        score: null,
        seed: {
          sourceGame: {
            "@id": "17",
            id: "5dd25794-429b-4a1b-9926-bca93438a799",
            version: 9,
            created: 1465591789000,
            updated: 1488233111466,
            scheduled: 1499547600000,
            durationMinutes: null,
            localDate: "2017-07-08",
            accountUserEventData: [],
            accountEventData: [],
            name: "B4",
            externalId: "17U-PA:1-GB2:W",
            gameGroup: { "@ref": "2" },
            ignoreStandings: false,
            court: { "@ref": "8" },
            sides: {
              visitor: {
                team: null,
                score: null,
                seed: {
                  sourceGame: {
                    "@id": "18",
                    id: "b43e7160-9a6a-4fef-8d6a-1dfb73473653",
                    version: 10,
                    created: 1465591789000,
                    updated: 1488233148564,
                    scheduled: 1499540400000,
                    name: "B2",
                    externalId: "17U-PB:2-PA:3",
                    // gameGroup: { "@ref": "2" },
                    ignoreStandings: false,
                    court: { "@ref": "16" },
                    sides: {
                      visitor: {
                        team: null,
                        score: null,
                        seed: {
                          sourceGame: null,
                          sourcePool: { "@ref": "14" },
                          rank: 3,
                          displayName: "3rd place of A",
                        },
                      },
                      home: {
                        team: null,
                        score: null,
                        seed: {
                          sourceGame: null,
                          sourcePool: { "@ref": "12" },
                          rank: 2,
                          displayName: "2nd place of B",
                        },
                      },
                    },
                    cancelled: false,
                    accountRecruits: [],
                    accountFollowedTeams: [],
                    lastScraped: null,
                    homeSeed: {
                      sourceGame: null,
                      sourcePool: { "@ref": "12" },
                      rank: 2,
                      displayName: "2nd place of B",
                    },
                    visitorSeed: {
                      sourceGame: null,
                      sourcePool: { "@ref": "14" },
                      rank: 3,
                      displayName: "3rd place of A",
                    },
                    recruits: [],
                    homeTeam: null,
                    visitorTeam: null,
                    homeScore: null,
                    visitorScore: null,
                    eventType: "Game",
                  },
                  sourcePool: null,
                  rank: 1,
                  displayName: "Winner of B2",
                },
              },
              home: {
                team: {
                  "@id": "19",
                  id: "7237ea20-b342-46be-9148-4b57e990be76",
                  version: 3,
                  created: 1465591788000,
                  updated: 1484587054000,
                  pool: { "@ref": "14" },
                  name: "Whitehall Norse",
                  externalId: "17U-WhitehallNorse",
                  numGames: 2,
                  standing: {
                    rank: 1,
                    note: null,
                    stats: {
                      gamesPlayed: 0,
                      wins: 0,
                      ties: 0,
                      pointDifferential: 0,
                    },
                  },
                },
                score: null,
                seed: {
                  sourceGame: null,
                  sourcePool: { "@ref": "14" },
                  rank: 1,
                  displayName: "1st place of A",
                },
              },
            },
            cancelled: false,
            accountRecruits: [],
            accountFollowedTeams: [],
            lastScraped: null,
            homeSeed: {
              sourceGame: null,
              sourcePool: { "@ref": "14" },
              rank: 1,
              displayName: "1st place of A",
            },
            visitorSeed: {
              sourceGame: { "@ref": "18" },
              sourcePool: null,
              rank: 1,
              displayName: "Winner of B2",
            },
            recruits: [],
            homeTeam: { "@ref": "19" },
            visitorTeam: null,
            homeScore: null,
            visitorScore: null,
            eventType: "Game",
          },
          sourcePool: null,
          rank: 1,
          displayName: "Winner of B4",
        },
      },
      home: {
        team: null,
        score: null,
        seed: {
          sourceGame: {
            "@id": "20",
            id: "b6e869cc-e6ad-4151-9186-5df828b45802",
            version: 46,
            created: 1465591789000,
            updated: 1488233131232,
            scheduled: 1499547600000,
            durationMinutes: null,
            localDate: "2017-07-08",
            accountUserEventData: [],
            accountEventData: [],
            name: "B3",
            externalId: "17U-PB:1-GB1:W",
            gameGroup: { "@ref": "2" },
            ignoreStandings: false,
            court: { "@ref": "16" },
            sides: {
              visitor: {
                team: { "@ref": "13" },
                score: null,
                seed: {
                  sourceGame: { "@ref": "1" },
                  sourcePool: null,
                  rank: 1,
                  displayName: "Winner of B1",
                },
              },
              home: {
                team: {
                  "@id": "21",
                  id: "cf2cb3a0-3659-4bda-9a60-4ec9b373aa25",
                  version: 3,
                  created: 1465591788000,
                  updated: 1486394002000,
                  pool: { "@ref": "12" },
                  name: "Westby Norsemen",
                  externalId: "17U-WestbyNorsemen",
                  numGames: 2,
                  standing: {
                    rank: 1,
                    note: null,
                    stats: {
                      gamesPlayed: 0,
                      wins: 0,
                      ties: 0,
                      pointDifferential: 0,
                    },
                  },
                },
                score: null,
                seed: {
                  sourceGame: null,
                  sourcePool: { "@ref": "12" },
                  rank: 1,
                  displayName: "1st place of B",
                },
              },
            },
            cancelled: false,
            accountRecruits: [],
            accountFollowedTeams: [],
            lastScraped: null,
            homeSeed: {
              sourceGame: null,
              sourcePool: { "@ref": "12" },
              rank: 1,
              displayName: "1st place of B",
            },
            visitorSeed: {
              sourceGame: { "@ref": "1" },
              sourcePool: null,
              rank: 1,
              displayName: "Winner of B1",
            },
            recruits: [],
            homeTeam: { "@ref": "21" },
            visitorTeam: { "@ref": "13" },
            homeScore: null,
            visitorScore: null,
            eventType: "Game",
          },
          sourcePool: null,
          rank: 1,
          displayName: "Winner of B3",
        },
      },
    },
    cancelled: false,
    accountRecruits: [],
    accountFollowedTeams: [],
    lastScraped: null,
    homeSeed: {
      sourceGame: { "@ref": "20" },
      sourcePool: null,
      rank: 1,
      displayName: "Winner of B3",
    },
    visitorSeed: {
      sourceGame: { "@ref": "17" },
      sourcePool: null,
      rank: 1,
      displayName: "Winner of B4",
    },
    recruits: [],
    homeTeam: null,
    visitorTeam: null,
    homeScore: null,
    visitorScore: null,
    eventType: "Game",
  },
];