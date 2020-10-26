// 示例文档
import { Effect, Reducer, Subscription } from 'umi';
import Api from "../Api";

// 数据类型

export interface Question {
  question: string;
  answer: string;
}
export interface ProblemClassifies {
  classifyIcon: string;
  classifyId: number;
  classifyName: string;
  problems: Question[];
}
export interface ProblemsModelState {
  commonProblems: Question[];
  problemClassifies: ProblemClassifies[];
  list: Question[],
  details: Question
}

// dva模型
export interface HeroModelType {
  namespace: 'problems';
  state: ProblemsModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<ProblemsModelState>,
    updateDetails: Reducer<ProblemsModelState>,
    updateList: Reducer<ProblemsModelState>
  };
  subscriptions: {
    setup: Subscription
  };
}


// dva实例
const HeroModel: HeroModelType = {
  namespace: 'problems',
  state: {
    commonProblems: [],
    problemClassifies: [],
    list: [],
    details: { question: '', answer: '' }
  },
  effects: {
    *fetch({ type, payload }, { put, call, select }) {
      // const data = yield Api.config.problems();
      // yield put({
      //   type: 'save',
      //   payload: data.data ,
      // });
    },
  },
  reducers: {
    save(state = HeroModel.state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    updateDetails(state = HeroModel.state, { payload }) {
      return {
        ...state,
        details: payload
      }
    },
    updateList(state = HeroModel.state, { payload }) {
      return {
        ...state,
        list: payload
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '页面路由') {
          setTimeout(() => {
            dispatch({
              type: 'fetch'
            })
          }, 500);
        }
      })
    }
  }
};

export default HeroModel;