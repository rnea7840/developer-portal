import { makeRequest, HttpSuccessResponse } from '../utils/makeRequest';
import { SupportOverviewContent } from '../types/content';

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
