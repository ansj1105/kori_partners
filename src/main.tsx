import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'

// 앱 진입점. BrowserRouter로 감싸 사이드바 네비게이션 라우팅을 활성화한다.
// (라우팅 범위: 화면 간 이동만 담당. 서버 통신·인증은 범위 외)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
