/** @format */
import { api } from './api'
import { NoteQueryParam } from '../constants/type/Note'

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

export function getRecommendNoteList(currentPage, size) {
  return api.get(`api/note/recommend?currentPage=${currentPage}&size=${size}`)
}

export function like(noteId) {
  return api.post(`api/note/like/${noteId}`)
}

export function unlike(noteId) {
  return api.post(`api/note/unlike/${noteId}`)
}

export function favorite(noteId) {
  return api.post(`api/note/favorite/${noteId}`)
}

export function cancelFavorite(noteId) {
  return api.post(`api/note/cancelFavorite/${noteId}`)
}

/**
 * 获取收藏过的笔记
 * @param param
 */
export function getFavoriteNoteList(param: NoteQueryParam) {
  return api.post('api/note/favorite/list', param)
}

/**
 * 获取点赞过的笔记
 * @param param
 */
export function getLikedNoteList(param: NoteQueryParam) {
  return api.post('api/note/like/list', param)
}

/**
 * 获取点赞过的笔记
 * @param param
 */
export function getPersonalNoteList(param: NoteQueryParam) {
  return api.post('api/note/list', param)
}
