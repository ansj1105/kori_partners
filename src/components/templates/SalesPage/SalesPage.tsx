import type { ReactNode } from 'react'
import PageHeader from '../../organisms/PageHeader'
import StatSection from '../../organisms/StatSection'
import DataTable, { type Column, type TableRow } from '../../organisms/DataTable'
import type { StatCardData } from '../../molecules/StatCard'
import styles from './SalesPage.module.css'

/** 매출 화면의 테이블 한 개 정의 */
export interface SalesTable {
  /** React 리스트 key */
  id: string
  /** 테이블 제목 */
  title: string
  /** 제목 우측 부가요소 (예: 선택된 파트너명) */
  titleRight?: ReactNode
  columns: Column[]
  rows: TableRow[]
  toolbar?: string[]
  /** 행 클릭 콜백 (지정 시 행 전체 클릭 가능) */
  onRowClick?: (id: string) => void
}

interface SalesPageProps {
  /** 페이지 헤더 제목 */
  title: string
  /** 지표 섹션 제목 */
  sectionTitle: string
  /** 지표 카드 목록 */
  stats: StatCardData[]
  /** 표시할 테이블들 (1개 이상) */
  tables: SalesTable[]
}

/*
 * SalesPage (template)
 * ------------------------------------------------------------------
 * 매출 계열 화면(파트너별 매출, 가맹점별 매출 등)의 공통 레이아웃.
 *   [공통 헤더] + [지표 섹션(StatSection)] + [데이터 테이블 N개]
 * 테이블 수만 다를 뿐 구조가 같아 데이터만 주입하면 된다.
 */
export default function SalesPage({ title, sectionTitle, stats, tables }: SalesPageProps) {
  return (
    <div className={styles.page}>
      <PageHeader title={title} />
      <StatSection title={sectionTitle} stats={stats} />
      {tables.map((tbl) => (
        <DataTable
          key={tbl.id}
          title={tbl.title}
          titleRight={tbl.titleRight}
          columns={tbl.columns}
          rows={tbl.rows}
          toolbar={tbl.toolbar}
          onRowClick={tbl.onRowClick}
        />
      ))}
    </div>
  )
}
