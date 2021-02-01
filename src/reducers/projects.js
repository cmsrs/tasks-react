import { PROJECTS_GET_PROJECTS, PROJECTS_SAVE_PROJECT, PROJECTS_CHANGE_PROJECT, PROJECTS_DELETE_PROJECT, PROJECTS_RES } from '../actions/types';

const INITIAL_STATE = {
  projects: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PROJECTS_RES:
      return { ...state, projects_res: action.payload };
    case PROJECTS_GET_PROJECTS:
      const projects1 = { ...state, projects: action.payload, projects_res:{} };
      return projects1;

    default:
      return state;
  }
}
