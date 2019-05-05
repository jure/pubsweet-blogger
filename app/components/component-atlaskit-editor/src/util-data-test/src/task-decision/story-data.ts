import {
  MockTaskDecisionResource,
  MockTaskDecisionResourceConfig,
} from './MockTaskDecisionResource';

declare var require: {
  <T>(path: string): T;
};

// ServiceDecisionResponse
export const getServiceDecisionsResponse = () =>
  require('../json-data/sample-decisions.json') as any;

// ServiceTaskResponse
export const getServiceTasksResponse = () =>
  require('../json-data/sample-tasks.json') as any;

// ServiceItemResponse
export const getServiceItemsResponse = () =>
  require('../json-data/sample-elements.json') as any;

export const getMockTaskDecisionResource = (
  config?: MockTaskDecisionResourceConfig,
) => new MockTaskDecisionResource(config);

export const document = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Hello world',
        },
        { type: 'hardBreak' },
        {
          type: 'text',
          text: 'This is a some content ',
        },
        {
          type: 'emoji',
          attrs: {
            shortName: ':wink:',
            id: '1f609',
            text: '😉',
          },
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'mention',
          attrs: {
            id: '0',
            text: '@Carolyn',
            accessLevel: 'CONTAINER',
          },
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'text',
          text: 'was',
          marks: [{ type: 'strong' }],
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'text',
          text: 'here',
          marks: [{ type: 'em' }, { type: 'strong' }],
        },
        {
          type: 'text',
          text: '. ',
        },
      ],
    },
  ],
};

export const participants = [
  {
    displayName: 'Craig Petchell',
    nickname: 'petch',
    id: '666',
    avatarUrl:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/2wCEAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRQBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIACAAIAMBIgACEQEDEQH/xAB1AAEAAwEAAAAAAAAAAAAAAAAHAgUGCBAAAQMCBQMDAgcAAAAAAAAAAQIDBAURAAYSIUEHEzEUImEVcSMyQlGBweEBAAMBAAAAAAAAAAAAAAAAAAMEBwURAAICAgMBAQEAAAAAAAAAAAECAxEABBIhIkExgf/aAAwDAQACEQMRAD8AxWVci1ipwmJdT7seKFbIMgLKrGxTYkkH4NsMH1D0UFwsqsAACom1zbxvje9QMoU6BVnnFPswkqBX71JQkj7nnBFmwNx6JJmw5zUtkKUlCmFhaCAkG+21/IxCZ2keQ2KA6/uWzyF5X2cs1T1To62n3jYoWUuDfyLf3gUzhl/MuUI06fDLjdMBGh5EtCyQogBOm2q9+L+MJ1Ep0p1SFd5lptwqSe6sJCRpBvvySQP4xoqZlFt6QluQ4iSUL1eQQP8AcG1pHieqsHFHcVyv8xB6l0hnNOUrzGPUKlsBBXYa0FJ/MkkEbEA253GB/I/SeH0wy1PocFtoU6pOeqbbUjthp3TY8nyPngbADHT1ejCi02LGaShx6GlJKFH2rPlV/ub4H85yI+bSqPGdRSZjThdbYeSUNlRFlAnwQfixGNTZn4zSRq3hjdYprRK0cbyD2ABeBHULpiOo8ymrluBNMpai4lgoU5+MFg6zpULWtbkEXww5Ey/EpFOhoYQtllsDVqPudI5V9/OI0ZNMyahuI4tqsy/euykak90nlXgC9hsNv3xd0xuTMImylLaSE3S3+kE8cYHJslwsQbyvzADXRHaSuz9z/9k=',
  },
  {
    displayName: 'Jack Sparrow',
    nickname: 'captainjack',
    id: '2234',
    avatarUrl: 'https://cdn-img.fimfiction.net/user/xb2v-1431833233-195398-64',
  },
  {
    displayName: 'Captain Mal',
    nickname: 'captaintightpants',
    id: '55',
    avatarUrl:
      '//www.dystopianmovies.org/wp-content/uploads/malcolm-reynolds-serenity-nathon-fillion-64x64.jpg',
  },
  {
    displayName: 'Doctor Who',
    nickname: 'thedoctor',
    id: '11',
    avatarUrl: '//66.media.tumblr.com/avatar_2072eeb45575_64.png',
  },
  {
    displayName: 'Jean Luc Picard',
    nickname: 'makeitso',
    id: '27',
    avatarUrl:
      '//seatfleet.io/system/users/pictures/54a7/6630/7365/6111/ba00/0000/thumb/picard_s5hq_pbvariant.jpg?1420256904',
  },
  {
    displayName: 'James T. Kirk',
    nickname: 'wheresmyshirt',
    id: '1701',
    avatarUrl:
      '//cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/ab/abee9ce4fbd1c9c94b695b16062b8fdf57a21de7_medium.jpg',
  },
  {
    displayName:
      "Dude with long name that doesn't seem to stop and should overflow",
    nickname: "Dudewithlongnamethatdoesn'tseemtostopandshouldoverflow",
    id: '12312312',
    avatarUrl:
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/cf/cf845e576741bd2db28c079b279c6a81dcc33666_medium.jpg',
  },
];

export const getParticipants = (count: number) => participants.slice(0, count);
