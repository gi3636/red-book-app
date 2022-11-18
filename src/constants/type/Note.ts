import { Page } from './Common'

export interface NoteFavoriteParam extends Page {
  userId: number
}

export interface NoteLikedParam extends Page {
  userId: number
}

export interface NoteQueryParam extends Page {
  userId: number
}
