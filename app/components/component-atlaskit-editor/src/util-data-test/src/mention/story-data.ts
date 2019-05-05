import { MockMentionResource as MentionResource } from './MockMentionResource';
import { MockMentionResourceWithInfoHints as MentionResourceWithInfoHints } from './MockMentionResourceWithInfoHints';
import { enableLogger } from '../logger';

enableLogger(true);

export const sampleAvatarUrl =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/2wCEAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRQBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIACAAIAMBIgACEQEDEQH/xAB1AAEAAwEAAAAAAAAAAAAAAAAHAgUGCBAAAQMCBQMDAgcAAAAAAAAAAQIDBAURAAYSIUEHEzEUImEVcSMyQlGBweEBAAMBAAAAAAAAAAAAAAAAAAMEBwURAAICAgMBAQEAAAAAAAAAAAECAxEABBIhIkExgf/aAAwDAQACEQMRAD8AxWVci1ipwmJdT7seKFbIMgLKrGxTYkkH4NsMH1D0UFwsqsAACom1zbxvje9QMoU6BVnnFPswkqBX71JQkj7nnBFmwNx6JJmw5zUtkKUlCmFhaCAkG+21/IxCZ2keQ2KA6/uWzyF5X2cs1T1To62n3jYoWUuDfyLf3gUzhl/MuUI06fDLjdMBGh5EtCyQogBOm2q9+L+MJ1Ep0p1SFd5lptwqSe6sJCRpBvvySQP4xoqZlFt6QluQ4iSUL1eQQP8AcG1pHieqsHFHcVyv8xB6l0hnNOUrzGPUKlsBBXYa0FJ/MkkEbEA253GB/I/SeH0wy1PocFtoU6pOeqbbUjthp3TY8nyPngbADHT1ejCi02LGaShx6GlJKFH2rPlV/ub4H85yI+bSqPGdRSZjThdbYeSUNlRFlAnwQfixGNTZn4zSRq3hjdYprRK0cbyD2ABeBHULpiOo8ymrluBNMpai4lgoU5+MFg6zpULWtbkEXww5Ey/EpFOhoYQtllsDVqPudI5V9/OI0ZNMyahuI4tqsy/euykak90nlXgC9hsNv3xd0xuTMImylLaSE3S3+kE8cYHJslwsQbyvzADXRHaSuz9z/9k=';

export const mentions = [
  {
    id: '666',
    avatarUrl: sampleAvatarUrl,
    name: 'Craig Petchell',
    mentionName: 'petch',
    lozenge: 'teammate',
    accessLevel: 'CONTAINER',
    presence: {
      status: 'online',
      time: '11:57am',
    },
  },
  {
    id: '2234',
    avatarUrl: 'https://cdn-img.fimfiction.net/user/xb2v-1431833233-195398-64',
    name: 'Jack Sparrow',
    mentionName: 'captainjack',
    lozenge: 'teammate',
    accessLevel: 'SITE',
    presence: {
      status: 'offline',
    },
  },
  {
    id: '55',
    avatarUrl:
      '//www.dystopianmovies.org/wp-content/uploads/malcolm-reynolds-serenity-nathon-fillion-64x64.jpg',
    name: 'Captain Mal',
    mentionName: 'captaintightpants',
    presence: {
      status: 'offline',
      time: '12:57pm',
    },
  },
  {
    id: '11',
    avatarUrl: '//66.media.tumblr.com/avatar_2072eeb45575_64.png',
    name: 'Doctor Who',
    mentionName: 'thedoctor',
    nickname: 'doctor',
    lozenge: 'teammate',
    accessLevel: 'CONTAINER',
    presence: {
      status: 'busy',
    },
  },
  {
    id: '27',
    avatarUrl:
      '//seatfleet.io/system/users/pictures/54a7/6630/7365/6111/ba00/0000/thumb/picard_s5hq_pbvariant.jpg?1420256904',
    name: 'Jean Luc Picard',
    mentionName: 'makeitso',
    lozenge: 'teammate',
    accessLevel: 'APPLICATION',
    presence: {
      status: 'none',
      time: '1:57am',
    },
  },
  {
    id: '1701',
    avatarUrl:
      '//cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/ab/abee9ce4fbd1c9c94b695b16062b8fdf57a21de7_medium.jpg',
    name: 'James T. Kirk',
    mentionName: 'wheresmyshirt',
    nickname: 'jim',
    accessLevel: 'NONE',
    presence: {
      status: 'focus',
    },
  },
  {
    id: '12312312',
    avatarUrl:
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/cf/cf845e576741bd2db28c079b279c6a81dcc33666_medium.jpg',
    name: "Dude with long name that doesn't seem to stop and should overflow",
    mentionName: "Dudewithlongnamethatdoesn'tseemtostopandshouldoverflow",
    nickname: 'Dude',
  },
  {
    id: '12312412',
    name:
      "Dude with long name and time that doesn't seem to stop and should overflow",
    mentionName:
      "Dudewithlongnamethatdoesn'tseemtostopandshouldoverflowwithtime",
    presence: {
      time: '1:57pm',
    },
  },
  {
    id: '12312428',
    avatarUrl: 'https://api.adorable.io/avatars/64/monkeytrousers.png',
    name: 'Monkey Trousers',
    lozenge: 'TEAM',
    mentionName: 'Monkey Trousers',
  },
];

export const slowResourceProvider = new MentionResource({
  minWait: 10,
  maxWait: 100,
});

export const resourceProvider = new MentionResource({
  minWait: 10,
  maxWait: 25,
});

export const resourceProviderWithInfoHints = new MentionResourceWithInfoHints({
  minWait: 10,
  maxWait: 25,
});
