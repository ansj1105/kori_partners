import type { CSSProperties } from 'react'
import type { AccentKey } from '../../../types'
import { ACCENT_VAR } from '../../../utils/accent'
import Badge from '../../atoms/Badge'
import styles from './KpiCard.module.css'

/** KPI 카드 한 장의 데이터 모델 (대시보드에서 배열로 주입) */
export interface KpiCardData {
  /** React 리스트 key 및 식별용 */
  id: string
  /** 지표 이름 (예: "세일즈 파트너") */
  label: string
  /** 표시 값 (예: "148", "1.28M", "18,420 KORI") — 포맷은 Figma 표기 그대로 */
  value: string
  /** 증감 표기 (예: "+10"). 없으면 미표시 */
  delta?: string
  /** 구분 태그 (예: "관리", "본사", "주의"). 없으면 미표시 */
  tag?: string
  /** 카드 강조색 (하단 줄·뱃지 색) */
  accent: AccentKey
}

/*
 * KpiCard (molecule)
 * ------------------------------------------------------------------
 * 라벨 + 값 + (증감 뱃지) + (구분 태그) + 하단 색줄로 구성된 지표 카드.
 * 데이터는 전적으로 props로 주입받아 재사용·이식이 쉽도록 한다(로직 없음).
 */
export default function KpiCard({ label, value, delta, tag, accent }: KpiCardData) {
  // 하단 색줄/뱃지가 사용할 강조색을 CSS 변수로 주입
  const style = { '--accent': ACCENT_VAR[accent] } as CSSProperties

  return (
    <article className={styles.card} style={style}>
      <div className={styles.head}>
        <span className={styles.label}>{label}</span>
        {/* 구분 태그 (관리/본사/정산가능/주의 등) */}
        {tag && <Badge accent={accent}>{tag}</Badge>}
      </div>

      <div className={styles.valueRow}>
        <span className={styles.value}>{value}</span>
        {/* 증감 수치 */}
        {delta && <Badge accent={accent}>{delta}</Badge>}
      </div>

      {/* 장식용 색줄 (차트 아님 — KpiCard.module.css 주석 참고) */}
      <div className={styles.accentLine} aria-hidden="true" />
    </article>
  )
}
