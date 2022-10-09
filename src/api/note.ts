/** @format */
import { api } from './api'

export function add(param) {
  return api.post('api/note/add', param)
}

export function list(param) {
  return api.post('api/note/list', {
    size: 10,
    currentPage: 1,
    isPublic: true,
    ...param
  })
}

export function getRecommendNoteList() {
  return api.get('api/note/recommend')
}

export function like(noteId) {
  return api.post(`api/note/like/${noteId}`)
}

export function unlike(noteId) {
  return api.post(`api/note/unlike/${noteId}`)
}
