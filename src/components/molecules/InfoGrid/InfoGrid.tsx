import styles from './InfoGrid.module.css'

/** 라벨/값 한 쌍 */
export interface InfoItem {
  label: string
  value: string
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
          <span className={styles.value}>{it.value}</span>
        </div>
      ))}
    </div>
  )
}
