import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../../../components/organisms/PageHeader'
import DataTable, { type TableRow } from '../../../components/organisms/DataTable'
import Badge from '../../../components/atoms/Badge'
import { useTranslation } from '../../../i18n'
import { usePartnerSettlementHistory } from './usePartnerSettlementHistory'
import styles from './PartnerSettlementHistory.module.css'

/*
 * PartnerSettlementHistory (page) — 파트너 · 수수료/정산 · 정산 내역
 * ------------------------------------------------------------------
 * 리더 정산 내역과 동일 골격(요약 카드 2개 + 상태 토글 + 테이블).
 * 다른 점은 테이블에 '리더 신청금액' 열이 없다는 것뿐.
 * 카드 우측 상단 상태 토글과 배지는 단일 status로 동기화(리더와 동일).
 */
export default function PartnerSettlementHistory() {
  const { t } = useTranslation()
  const { lastSettleDate, thisRequestAmount, tabs, columns, rows: rawRows } = usePartnerSettlementHistory()
  const [status, setStatus] = useState(tabs[0])

  const rows: TableRow[] = rawRows.map((r) => ({
    id: r.period,
    cells: {
      no: r.no,
      appliedDate: r.appliedDate,
      period: r.period,
      totalAmount: r.totalAmount,
      partnerAmount: r.partnerAmount,
      held: r.held,
      status: r.status,
      paidDate: r.paidDate,
      action: (
        <Link to="detail">
          <Badge accent="cyan" size="sm">상세</Badge>
        </Link>
      ),
    },
  }))

  return (
    <div className={styles.page}>
      <PageHeader title={t('settle.hist.title')} />

      <div className={styles.topRow}>
        <div className={styles.sCard}>
          <span className={`${styles.sChip} ${styles.sChipGray}`}>{t('settle.hist.lastDate')}</span>
          <span className={styles.sValue}>{lastSettleDate}</span>
        </div>
        <div className={`${styles.sCard} ${styles.sCardCurrent}`}>
          <div className={styles.sCardHead}>
            <span className={`${styles.sChip} ${styles.sChipTeal}`}>{t('settle.hist.thisRequest')}</span>
            <select
              className={styles.statusSelect}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label="정산 상태 선택"
            >
              {tabs.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <span className={`${styles.sValue} ${styles.sValueTeal}`}>{thisRequestAmount}</span>
        </div>
      </div>

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
