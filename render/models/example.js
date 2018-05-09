
export default {

  namespace: 'example',
  // data
  state: {

  },
  // route setup
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
  // actions
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },
  // reducers
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
