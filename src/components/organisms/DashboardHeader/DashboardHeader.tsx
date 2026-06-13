import { useState } from 'react'
import styles from './DashboardHeader.module.css'

/** 기간 필터 탭 목록 (Figma 표기 그대로). 기본 선택은 30D. */
const RANGE_TABS = ['1D', '7D', '14D', '30D', '90D', '180D', '365D'] as const

/*
 * DashboardHeader (organism)
 * ------------------------------------------------------------------
 * 대시보드 상단 영역: 제목 + 언어/로그아웃 + 기간 선택 탭.
 *
 * [인터랙션 범위] 기간 탭은 클릭 시 "선택 상태(하이라이트)"만 로컬 state로 토글한다.
 * 데이터는 Figma 샘플 값으로 하드코딩돼 있어 기간을 바꿔도 수치는 변하지 않는다.
 * (실제 기간별 데이터 조회는 서버 연동 영역으로, 현재 작업 범위 밖)
 */
export default function DashboardHeader() {
  const [activeRange, setActiveRange] = useState<string>('30D')

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <h1 className={styles.title}>리더 관리자 - 국가 운영 대시보드</h1>

        <div className={styles.controls}>
          {/* 언어 선택 버튼 — 표기만(토글 동작은 범위 밖) */}
          <button type="button" className={styles.headerButton}>
            KR · 한국어
          </button>
          <button type="button" className={styles.headerButton}>
            Log out
          </button>
        </div>
      </div>

      {/* 기간 선택 탭 */}
      <div className={styles.tabs} role="tablist" aria-label="기간 선택">
        {RANGE_TABS.map((range) => {
          const isActive = range === activeRange
          return (
            <button
              key={range}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab}
              onClick={() => setActiveRange(range)}
            >
              {range}
            </button>
          )
        })}
      </div>
    </header>
  )
}
