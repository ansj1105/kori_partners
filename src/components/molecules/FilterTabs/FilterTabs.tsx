import { useState } from 'react'
import styles from './FilterTabs.module.css'

interface FilterTabsProps {
  /** 탭 라벨 목록 */
  labels: string[]
  /** 기본 선택 인덱스 (기본 0) */
  defaultIndex?: number
}

/*
 * FilterTabs (molecule)
 * ------------------------------------------------------------------
 * 상태/구분 필터 탭. 클릭 시 선택 상태(하이라이트)만 로컬로 토글한다.
 * 데이터가 하드코딩이라 실제 필터링은 하지 않는다. (작업 범위: UI 인터랙션만)
 */
export default function FilterTabs({ labels, defaultIndex = 0 }: FilterTabsProps) {
  const [active, setActive] = useState(defaultIndex)

  return (
    <div className={styles.tabs} role="tablist">
      {labels.map((label, i) => (
        <button
          key={label}
          type="button"
          role="tab"
          aria-selected={i === active}
          className={i === active ? `${styles.tab} ${styles.tabActive}` : styles.tab}
          onClick={() => setActive(i)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
