import { clearRequestListeners } from '@/request';
import { requestDetail } from '@/request/api';
import { useStore } from '@/store';
import { Button } from 'antd-mobile';
import { useState } from 'react';

const Home = () => {
  const { userInfo, requestUserInfo, modifyUserInfo, count, changeCount } =
    useStore();
  const [movieData, setMovieData] = useState([]);

  const requestData = async () => {
    try {
      const res = await requestDetail();
      setMovieData(res.data.data.hot);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home">
      <span>Home</span>
      <main>
        <p>用户信息:</p>
        <p>
          <span>姓名: {userInfo.name}</span>
          <span>年龄: {userInfo.age}</span>
        </p>
      </main>
      <Button onClick={() => requestUserInfo()}>请求用户信息</Button>
      <Button onClick={() => modifyUserInfo()}>修改用户信息</Button>

      <div style={{ marginTop: 20 }}>
        <Button onClick={() => changeCount('reduce')}>减少</Button>
        <span>count: {count}</span>
        <Button onClick={() => changeCount('add')}>增加</Button>

        <Button onClick={() => requestData()}>请求电影数据</Button>
        <Button onClick={() => clearRequestListeners()}>取消请求</Button>
        <span>{JSON.stringify(movieData)}</span>
      </div>
    </div>
  );
};

export default Home;
