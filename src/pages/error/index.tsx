import { Button } from 'antd-mobile';
import { useState } from 'react';

const Error = () => {
  const [data, setData] = useState<any>({ userInfo: { name: 'jianjian' } });

  return (
    <div>
      <span>信息: {data.userInfo.name}</span>
      <Button onClick={() => setData({})}>切换错误信息</Button>
    </div>
  );
};
export default Error;
