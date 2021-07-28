import zhPosts from '~/contents/zh/posts.yml'
import enPosts from '~/contents/en/posts.yml'
import config from '~/configs/config'

export const state = () => ({
  filled: false,
  docVersion: '',
  ghVersion: '',
  visibleAffix: false,
  homepage: {},
  adBlocked: false,
  focusMode: false,
  posts: {
    zh: zhPosts,
    en: enPosts
  },
  config: config
})

export const mutations = {
  toggle(state, key) {
    state[key] = !state[key]
  },
  setDocVersion(state, docVersion) {
    state.docVersion = docVersion
  },
  setGhVersion(state, ghVersion) {
    state.ghVersion = ghVersion
  },
  setHomepage(state, homepage) {
    state.homepage = homepage
  },
  setFilled(state) {
    state.filled = true
  },
  setAdBlocked(state, value) {
    state.adBlocked = value
  },
  setFocusMode(state, value) {
    state.focusMode = value
  }
}

let _focusTimeout = null

export const actions = {
  focusMode({ commit }) {
    if (_focusTimeout) {
      return
    }
    _focusTimeout = setTimeout(() => commit('setFocusMode', true), 1300)
  },
  clearFocusMode({ commit }) {
    if (_focusTimeout) {
      clearTimeout(_focusTimeout)
      _focusTimeout = null
    }
    commit('setFocusMode', false)
  }
}
