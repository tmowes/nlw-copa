export const poolsData = [
  {
    code: 'JD5P69',
    poolName: 'Bolão do Julius',
    createdBy: 'Julio M.',
    participants: [
      {
        uri: 'https://github.com/tmowes.png',
        initials: 'JM',
      },
      {
        uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        initials: 'TE',
      },
      {
        uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        initials: 'AN',
      },
      {
        uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        initials: 'TS',
      },
      {
        uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        initials: 'AJ',
      },
      {
        uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        initials: 'TE',
      },
      {
        uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        initials: 'JB',
      },
      {
        uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        initials: 'TS',
      },
    ],
  },
  {
    code: 'KW1F32',
    poolName: 'Um bolão recém criado',
    createdBy: 'Julio M.',
    participants: [],
  },
]

export const sampleGuesses = [
  {
    gameId: '1',
    homeTeam: 'Brasil',
    awayTeam: 'Argentina',
    guess: {
      homeTeam: 3,
      awayTeam: 0,
    },
    homeTeamLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/188px-Flag_of_Brazil.svg.png',
    awayTeamLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/188px-Flag_of_Argentina.svg.png',
    date: '2022-11-22T16:00:00.000Z',
    status: 'pristine',
  },
  {
    gameId: '2',
    homeTeam: 'Alemanha',
    awayTeam: 'Bélgica',
    guess: {
      homeTeam: 0,
      awayTeam: 0,
    },
    homeTeamLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/188px-Flag_of_Germany.svg.png',
    awayTeamLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Belgium.svg/188px-Flag_of_Belgium.svg.png',
    date: '2022-11-22T19:00:00.000Z',
    status: 'pending',
  },
  {
    gameId: '3',
    homeTeam: 'Japão',
    awayTeam: 'Uruguai',
    guess: {
      homeTeam: 0,
      awayTeam: 0,
    },
    homeTeamLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/188px-Flag_of_Japan.svg.png',
    awayTeamLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Uruguay.svg/188px-Flag_of_Uruguay.svg.png',
    date: '2022-11-20T12:00:00.000Z',
    status: 'expired',
  },
] as const
