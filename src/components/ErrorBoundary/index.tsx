import React from 'react';
import { Button, ErrorBlock } from 'antd-mobile';

interface Props {
  children?: any;
}

interface State {
  error: any;
  errorInfo: any;
}

//类组件建立方式
class ErrorBoundary extends React.Component<Props, State> {
  //初始化生命周期
  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  //捕获错误边界，在render时错误会执行
  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <ErrorBlock
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            style={{
              '--image-height': '150px',
            }}
            description={
              <span>
                <p>{this.state.error && this.state.error.toString()}</p>
                {/* <p>{this.state.errorInfo.componentStack}</p> */}
              </span>
            }
          >
            <Button
              color="primary"
              onClick={() => {
                this.setState({ error: null, errorInfo: null });
              }}
            >
              首页
            </Button>
          </ErrorBlock>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
