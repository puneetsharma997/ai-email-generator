import { Spin } from 'antd';

const Loader = ({ style }) => {
  return (
    <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Spin size="large" />
    </div>
  );
}

export default Loader;
