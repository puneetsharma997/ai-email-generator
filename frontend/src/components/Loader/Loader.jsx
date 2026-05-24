import { Spin } from 'antd';

// Loader component to display a loading spinner
const Loader = ({ style }) => {
  return (
    <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Spin size="large" />
    </div>
  );
}

export default Loader;
