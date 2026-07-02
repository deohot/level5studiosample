import { SatelliteIcon, RocketIcon, TeamIcon } from '../components/icons'

/** Content for the three "About Us" glassmorphic cards. */
export const aboutCards = [
  {
    key: 'vision',
    title: 'Our Vision',
    body: 'We chart software the way explorers chart new worlds — building interfaces that feel a decade ahead while staying effortless to use today.',
    Icon: SatelliteIcon,
  },
  {
    key: 'mission',
    title: 'Our Mission',
    body: 'We bridge the gap between bold ideas and shipped product, engineering resilient systems and design systems that scale from launch to orbit.',
    Icon: RocketIcon,
  },
  {
    key: 'team',
    title: 'Our Team',
    body: 'A compact crew of engineers and designers who obsess over craft, velocity and the small details that make premium products feel alive.',
    Icon: TeamIcon,
  },
]

/** Labels for the orbital tech-dot row beneath the cards. */
export const orbitals = [
  'Global Reach',
  'Innovation Driven',
  'Secure Data',
  'Realtime Sync',
  'Typed Focus',
]
