import { Link } from 'react-router-dom'
import PageHeader from '../../components/organisms/PageHeader'
import FilterTabs from '../../components/molecules/FilterTabs'
import DataTable, { type TableRow } from '../../components/organisms/DataTable'
import Badge from '../../components/atoms/Badge'
import { useTranslation } from '../../i18n'
import { useSettlementHistory } from './useSettlementHistory'
import styles from './SettlementHistory.module.css'

/*
 * SettlementHistory (page) — 수수료/정산 · 정산 내역
 * ------------------------------------------------------------------
 * 상단 요약 칩(마지막 정산일/이번 요청액) + 상태 필터 탭 + 정산 내역 테이블.
 * 행의 "상세"는 정산 상세 화면(/settlement/history/detail)으로 연결.
 */
export default function SettlementHistory() {
  const { t } = useTranslation()
  const { lastSettleDate, thisRequestAmount, tabs, columns, rows: rawRows } = useSettlementHistory()

  const rows: TableRow[] = rawRows.map((r) => ({
    id: r.period, // 정산번호가 모두 동일해 기간을 식별자로 사용
    cells: {
      no: r.no,
      appliedDate: r.appliedDate,
      period: r.period,
      totalAmount: r.totalAmount,
      leaderAmount: r.leaderAmount,
      partnerAmount: r.partnerAmount,
      held: r.held,
      status: r.status,
      paidDate: r.paidDate,
      // 상세 → 정산 상세 화면으로 이동
      action: (
        <Link to="/settlement/history/detail">
          <Badge accent="cyan" size="sm">상세</Badge>
        </Link>
      ),
    },
  }))

  return (
    <div className={styles.page}>
      <PageHeader title={t('settle.hist.title')} />

      {/* 요약 칩 */}
      <div className={styles.pills}>
        <div className={styles.pill}>
          <span className={styles.pillLabel}>{t('settle.hist.lastDate')}</span>
          <span className={styles.pillValue}>{lastSettleDate}</span>
        </div>
        <div className={`${styles.pill} ${styles.pillGreen}`}>
          <span className={styles.pillLabel}>{t('settle.hist.thisRequest')}</span>
          <span className={styles.pillValue}>{thisRequestAmount}</span>
        </div>
      </div>

      {/* 상태 필터 탭 */}
      <FilterTabs labels={tabs} />

      {/* 정산 내역 테이블 */}
      <DataTable
        title={t('settle.hist.tableTitle')}
        columns={columns}
        rows={rows}
        toolbar={[t('common.search'), t('common.filter'), t('common.excel')]}
        fill
      />
    </div>
  )
}
