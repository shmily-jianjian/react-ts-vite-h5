import { useNavigate } from 'react-router-dom';
import { useKeepOutlets } from '@/components/KeepAlive/useKeepOutlets';
import { Button } from 'antd-mobile';

const Layout = () => {
  const navigate = useNavigate();
  const element = useKeepOutlets();

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#eee',
        overflow: 'hidden',
      }}
    >
      <div className="fixed w-100vw z-10 h-60px bg-cyan-200">
        <div className="flex justify-around">
          <Button color="primary" onClick={() => navigate('/')}>
            重定向
          </Button>
          <Button color="primary" onClick={() => navigate('/home')}>
            首页
          </Button>
          <Button color="primary" onClick={() => navigate('/list')}>
            列表
          </Button>
          <Button color="primary" onClick={() => navigate('/error')}>
            错误处理
          </Button>
          <Button color="primary" onClick={() => navigate('/403')}>
            403
          </Button>
          <Button color="success" onClick={() => navigate('/404')}>
            404
          </Button>
        </div>
      </div>
      <div style={{ marginTop: 30 }}>{element}</div>
    </div>
  );
};

export default Layout;
