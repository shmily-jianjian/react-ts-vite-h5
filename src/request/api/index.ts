import request from '@/request';
export const requestDetail = async (params?: any) => {
  return await request.GET('/api/v3/list/hot.json', params);
};
