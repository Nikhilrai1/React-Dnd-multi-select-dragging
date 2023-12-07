import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'


// make sure to remove strict mode in development in production it will work if strict mode is added
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
