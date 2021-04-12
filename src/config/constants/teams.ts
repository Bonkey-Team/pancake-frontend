import { Team } from './types'

const teams: Team[] = [
  {
    id: 1,
    name: 'Painters',
    description: "An artist who paints pictures.",
    images: {
      lg: 'painter-lg.png',
      md: 'painter-md.png',
      sm: 'painter-sm.png',
      alt: 'painter-alt.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmXKzSojwzYjtDCVgR6mVx7w7DbyYpS7zip4ovJB9fQdMG/syrup-storm.png',
    },
    background: 'syrup-storm-bg.svg',
    textColor: '#191326',
    users: 0,
    points: 0,
  },
  {
    id: 2,
    name: 'Sculptors',
    description: "A sculptor is an artist who specializes in sculpture.",
    images: {
      lg: 'sculpture-lg.png',
      md: 'sculpture-md.png',
      sm: 'sculpture-sm.png',
      alt: 'sculpture-alt.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmXKzSojwzYjtDCVgR6mVx7w7DbyYpS7zip4ovJB9fQdMG/fearsome-flippers.png',
    },
    background: 'fearsome-flippers-bg.svg',
    textColor: '#FFFFFF',
    users: 0,
    points: 0,
  },
  {
    id: 3,
    name: 'Photographers',
    description: 'A person who takes photographs, especially as a job.',
    images: {
      lg: 'photographer-lg.png',
      md: 'photographer-md.png',
      sm: 'photographer-sm.png',
      alt: 'photographer-alt.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmXKzSojwzYjtDCVgR6mVx7w7DbyYpS7zip4ovJB9fQdMG/chaotic-cakers.png',
    },
    background: 'chaotic-cakers-bg.svg',
    textColor: '#191326',
    users: 0,
    points: 0,
  },
]

export default teams
