import { useStore } from '@/store';
import { Button } from 'antd-mobile';
import { useEffect, useState } from 'react';

const List = () => {
  const { count, changeCount } = useStore();
  const [listData, setListData] = useState<any[]>([]);

  useEffect(() => {
    const data = new Array(100)
      .fill(Math.random().toFixed(2))
      .map((item, index) => ({
        title: 'item' + index,
        nth: index,
      }));
    setTimeout(() => {
      setListData(data);
    }, 2000);
  }, []);

  return (
    <div>
      <span style={{ fontSize: 30 }}>keepalive</span>
      <Button onClick={() => changeCount('reduce')}>减少</Button>
      <span>count: {count}</span>
      <Button onClick={() => changeCount('add')}>增加</Button>
      <div>
        <input style={{ border: '1px solid red', fontSize: 20 }} />
      </div>
      <div
        style={{
          height: 'calc(100vh - 100px)',
          overflowY: 'scroll',
        }}
      >
        {listData.map((item, index) => (
          <div key={index} className="flex justify-between items-center h-30px">
            <span>{item.title}</span>
            <span>{item.nth}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
