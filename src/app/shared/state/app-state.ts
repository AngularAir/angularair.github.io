export interface AppState {
  episodes: Episode[],
  people: Person[],
  currentHostsIds: number[],
  currentPanelistsIds: number[]
}

export interface Episode {
  id: number,
  title: string,
  dateTimeUtc: number,
  url: string,
  hostIds: number[],
  guestIds: number[],
  panelistIds: number[]
}

export interface Person {
  id: number,
  fullName: string,
  twitterHandle: string
}
