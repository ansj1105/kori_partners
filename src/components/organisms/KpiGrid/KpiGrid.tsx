import KpiCard, { type KpiCardData } from '../../molecules/KpiCard'
import styles from './KpiGrid.module.css'

interface KpiGridProps {
  /** 표시할 KPI 카드 데이터 목록 */
  items: KpiCardData[]
}

/*
 * KpiGrid (organism)
 * ------------------------------------------------------------------
 * KPI 카드들을 반응형 격자로 배치하는 컨테이너.
 * 데이터는 상위(페이지)에서 주입받는다.
 */
export default function KpiGrid({ items }: KpiGridProps) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <KpiCard key={item.id} {...item} />
      ))}
    </div>
  )
}
