import appConfig from "@/config/appConfig";

export default {
  namespace: 'myCreateFlowRecord',
  state: {
    flowRecordList: [],
    total: 0,
    current: 1,
    pageSize: 15,
  },
  effects: {

  },

  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
