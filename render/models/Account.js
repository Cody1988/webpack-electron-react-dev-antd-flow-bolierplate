
export default {

  namespace: 'account',
  // data
  state: {
    user: null,
    h: 'hello world'
  },
  // route setup
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      console.log(history);
    },
  },
  // actions
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      console.log('get user');
      // call get user async
      // const user = yield call(service.func,params)；
      const user = {name: 'cody'}
      yield put({
        type: 'save', // call save reducer
        payload: { user }
      })
    },
  },
  // reducers
  reducers: {
    // gen new state
    save(state, {payload: {user}}) {
      return {
        ... state,
        user,
      }
    },
  },

};
