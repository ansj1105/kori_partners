import type { CSSProperties, ReactNode } from 'react'
import styles from './Panel.module.css'

interface PanelProps {
  /** 패널 제목 */
  title: string
  /** 제목 아래 보조 설명줄 (디자인에 있는 경우만). 없으면 미표시. */
  subtitle?: string
  /** 본문 내용. 비워두면 "내용이 들어올 빈 공간"으로 표시된다. */
  children?: ReactNode
  /** 본문 최소 높이(px). 패널마다 확보할 공간 크기를 조절할 때 사용. */
  bodyMinHeight?: number
}

/*
 * Panel (molecule)
 * ------------------------------------------------------------------
 * 제목 + 본문으로 구성된 범용 패널.
 * 대시보드 하단의 순위/활동/요청/공지 패널은 현재 디자인상 내용이 비어 있으므로,
 * 제목만 두고 본문은 빈 공간으로 남긴다. (사용처 JSX에 "무엇이 들어갈 자리"인지 주석으로 명시)
 */
export default function Panel({ title, subtitle, children, bodyMinHeight }: PanelProps) {
  const style = bodyMinHeight
    ? ({ '--panel-body-min-height': `${bodyMinHeight}px` } as CSSProperties)
    : undefined

  return (
    <section className={styles.panel}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.body} style={style}>
        {children}
      </div>
    </section>
  )
}
