import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/organisms/Sidebar'
import styles from './LeaderLayout.module.css'

/*
 * LeaderLayout (template)
 * ------------------------------------------------------------------
 * 모든 리더 어드민 화면의 공통 골격: [사이드바] + [콘텐츠 영역].
 * 라우터에서 이 레이아웃을 부모 라우트로 두고, 각 화면은 <Outlet /> 자리에 렌더링된다.
 * → 사이드바를 화면마다 반복 작성하지 않고 한 번만 둔다. (재사용/일관성)
 */
export default function LeaderLayout() {
  return (
    <div className={styles.layout}>
      {/* 배경 장식(네온 글로우) — 기능 없음 */}
      <div className={styles.glow} aria-hidden="true" />

      <Sidebar />

      <main className={styles.content}>
        <div className={styles.contentInner}>
          {/* 현재 라우트에 해당하는 화면이 여기에 렌더링됨 */}
          <Outlet />
        </div>
      </main>
    </div>
  )
}
