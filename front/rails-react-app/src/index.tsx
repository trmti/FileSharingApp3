import { createRoot } from 'react-dom/client';
import { App } from './App';
import 'antd/dist/antd.less';
import './index.css';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
let root;
if (container) {
  root = createRoot(container);
  root.render(<App />);
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
