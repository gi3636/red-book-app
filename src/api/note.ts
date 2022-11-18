/** @format */
import { api } from './api'
import { NoteFavoriteParam, NoteLikedParam } from '../constants/type/Note'

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
export function getFavoriteNoteList(param: NoteFavoriteParam) {
  return api.post('api/note/favorite/list', param)
}

/**
 * 获取点赞过的笔记
 * @param param
 */
export function getLikedNoteList(param: NoteLikedParam) {
  return api.post('api/note/like/list', param)
}
