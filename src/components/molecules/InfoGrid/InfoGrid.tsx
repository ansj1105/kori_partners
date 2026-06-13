import styles from './InfoGrid.module.css'

/** 라벨/값 한 쌍 */
export interface InfoItem {
  label: string
  value: string
  /** 값 색 (강조 항목만 지정 — 예: 청록 #24e6b8). 없으면 기본 흰색 */
  valueColor?: string
}

/*
 * InfoGrid (molecule)
 * ------------------------------------------------------------------
 * 라벨/값 쌍들을 4열 격자로 배치. 상세 화면의 기본정보·금액요약 섹션에서 사용.
 */
export default function InfoGrid({ items }: { items: InfoItem[] }) {
  return (
    <div className={styles.grid}>
      {items.map((it) => (
        <div key={it.label} className={styles.item}>
          <span className={styles.label}>{it.label}</span>
          <span className={styles.value} style={it.valueColor ? { color: it.valueColor } : undefined}>
            {it.value}
          </span>
        </div>
      ))}
    </div>
  )
}
