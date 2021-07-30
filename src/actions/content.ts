import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { loadContent } from '../content/loaders';
import { RootState } from '../types';
import * as constants from '../types/constants';
import {
  APICategoryContent,
  APIContent,
} from '../types/content';

export interface LoadCategoryContent extends Action {
  type: constants.LOAD_CATEGORY_CONTENT;
}

export interface SetCategoryContent extends Action {
  type: constants.SET_CATEGORY_CONTENT;
  content: APICategoryContent[];
}

export type LoadCategoryContentThunk = ThunkAction<
  Promise<SetCategoryContent | null>,
  RootState,
  unknown,
  SetCategoryContent
>;

export const setCategoryContent: ActionCreator<SetCategoryContent> = (content: APICategoryContent[]) => ({
  content,
  type: constants.SET_CATEGORY_CONTENT_VALUE,
});

export const loadCategoryContent: ActionCreator<LoadCategoryContentThunk> = () => async (
  dispatch,
  getState,
): Promise<SetCategoryContent | null> => {
  if (getState().content.categories) {
    return null;
  }

  const content = await loadContent<APICategoryContent[]>('api-categories');
  // console.log('loadCategoryContent', content);
  return dispatch(setCategoryContent(content));
};

export interface LoadAPIContent extends Action {
  type: constants.LOAD_API_CONTENT;
}

export interface SetAPIContent extends Action {
  type: constants.SET_API_CONTENT;
  content: APIContent[];
}

export type LoadAPIContentThunk = ThunkAction<
  Promise<SetAPIContent | null>,
  RootState,
  unknown,
  SetAPIContent
>;

export const setAPIContent: ActionCreator<SetAPIContent> = (content: APIContent[]) => ({
  content,
  type: constants.SET_API_CONTENT_VALUE,
});

export const loadAPIContent: ActionCreator<LoadAPIContentThunk> = () => async (
  dispatch,
  getState,
): Promise<SetAPIContent | null> => {
  if (getState().content.categories) {
    return null;
  }

  const content = await loadContent<APICategoryContent[]>('apis');
  // console.log('loadAPIContent', content);
  return dispatch(setAPIContent(content));
};
