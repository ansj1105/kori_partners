import styles from './Placeholder.module.css'

interface PlaceholderProps {
  /** 아직 구현되지 않은 화면의 이름 (사이드바 메뉴명과 동일) */
  title: string
}

/*
 * Placeholder (page)
 * ------------------------------------------------------------------
 * 아직 구현하지 않은 화면을 위한 임시 페이지.
 * 라우팅·사이드바 네비게이션을 먼저 동작시키되, 내용은 임의로 채우지 않고
 * "구현 예정"임을 정직하게 표시한다. (화면별로 순차 구현하며 실제 페이지로 교체)
 */
export default function Placeholder({ title }: PlaceholderProps) {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.note}>이 화면은 구현 예정입니다.</p>
    </div>
  )
}
