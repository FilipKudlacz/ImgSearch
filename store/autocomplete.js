export const state = () => ({
  autocomplete: [],
})

export const mutations = {
  setAutocomplete(state, data) {
    state.autocomplete = data
  },
}
