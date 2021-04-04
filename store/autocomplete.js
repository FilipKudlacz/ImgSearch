export const state = () => ({
  autocomplete: [],
})

export const mutations = {
  setAutocomplete(state, data) {
    state.autocomplete = data
  },
  updateAutocompleter(state, data) {
    data.forEach((suggestion) => {
      if (!state.autocomplete.includes(suggestion)) {
        state.autocomplete.push(suggestion)
      }
    })
  },
}
