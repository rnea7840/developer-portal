import { APICategoryContent, APIContent } from 'src/types/content';
import { SetAPIContent, SetCategoryContent } from '../actions/content';
import { APIsContent, AppContent, CategoriesContent } from '../types';
import * as constants from '../types/constants';

export const content = (
  state: AppContent = { apis: null, categories: null },
  action: SetAPIContent | SetCategoryContent,
): AppContent => {
  switch (action.type) {
    case constants.SET_CATEGORY_CONTENT_VALUE:
      const categories: CategoriesContent = {};
      action.content.forEach((categoryContent: APICategoryContent) => {
        categories[categoryContent.friendlyId] = categoryContent;
      });

      return {
        ...state,
        categories,
      };
    case constants.SET_API_CONTENT_VALUE:
      const apis: APIsContent = {};
      action.content.forEach((apiContent: APIContent) => {
        apis[apiContent.friendlyId] = apiContent;
      });

      return {
        ...state,
        apis,
      };
    default:
      return state;
  }
};
