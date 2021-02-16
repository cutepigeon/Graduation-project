const store = {
    state: {
      collectionId: []
    },
    mutations: {
         collect(state,id) {
          state.collectionId.push(id)
        }
      }
}
export default store