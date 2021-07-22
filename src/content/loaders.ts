import { makeRequest, HttpSuccessResponse } from '../utils/makeRequest';
import { FAQContent, SupportOverviewContent } from '../types/content';

const CONTENT_HOST = 'http://localhost:1337';
export const loadSupportOverviewContent = async (): Promise<SupportOverviewContent | null> => {
  const response = await makeRequest<SupportOverviewContent>(
    `${CONTENT_HOST}/support-overview`,
    { method: 'GET' },
  );

  if (response.ok) {
    return (response as HttpSuccessResponse<SupportOverviewContent>).body;
  }

  return null;
};

export const loadFAQContent = async (): Promise<FAQContent | null> => {
  const response = await makeRequest<FAQContent>(
    `${CONTENT_HOST}/faq`,
    { method: 'GET' },
  );

  if (response.ok) {
    return (response as HttpSuccessResponse<FAQContent>).body;
  }

  return null;
};

export const loadContent = async <T extends unknown>(contentKey: string): Promise<T | null> => {
  const response = await makeRequest<T>(
    `${CONTENT_HOST}/${contentKey}`,
    { method: 'GET' },
  );

  if (response.ok) {
    return (response as HttpSuccessResponse<T>).body;
  }

  return null;
};
