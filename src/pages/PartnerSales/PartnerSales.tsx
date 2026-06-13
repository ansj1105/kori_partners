import PageHeader from '../../components/organisms/PageHeader'
import StatSection from '../../components/organisms/StatSection'
import DataTable, { type TableRow } from '../../components/organisms/DataTable'
import ActionBadges from '../../components/molecules/ActionBadges'
import { useTranslation } from '../../i18n'
import { usePartnerSales } from './usePartnerSales'
import styles from './PartnerSales.module.css'

/*
 * PartnerSales (page) — 파트너 관리 · 파트너별 매출
 * ------------------------------------------------------------------
 * 지표 섹션(8개) + 테이블 3개(파트너별 매출 / 하위 가맹점 매출 / 가맹점 매출).
 * 공통 컴포넌트(PageHeader, StatSection, DataTable)를 재사용한다.
 */
export default function PartnerSales() {
  const { t } = useTranslation()
  const { stats, t1, t2Title, t3Title, merchantColumns, merchantRows } = usePartnerSales()

  const toolbar = [t('common.search'), t('common.filter'), t('common.excel')]

  // 테이블 1: 파트너별 매출 (행마다 "상세" 액션)
  const t1Rows: TableRow[] = t1.rows.map((r) => ({
    id: r.code,
    cells: {
      no: r.no,
      code: r.code,
      name: r.name,
      telegram: r.telegram,
      region: r.region,
      subCount: r.subCount,
      monthRevenue: r.monthRevenue,
      monthCount: r.monthCount,
      unsettledFee: r.unsettledFee,
      recentActivity: r.recentActivity,
      action: <ActionBadges labels={['상세']} />,
    },
  }))

  // 테이블 2·3 공용 행 (하위 가맹점 매출 / 가맹점 매출 — 동일 데이터, 액션 없음)
  const merchantTableRows: TableRow[] = merchantRows.map((r) => ({
    id: r.merchantCode,
    cells: {
      no: r.no,
      partner: r.partner,
      merchantCode: r.merchantCode,
      merchantName: r.merchantName,
      monthRevenue: r.monthRevenue,
      monthCount: r.monthCount,
      recentPay: r.recentPay,
      fee: r.fee,
      unsettledFee: r.unsettledFee,
      recentPay2: r.recentPay2,
      qrUsage: r.qrUsage,
    },
  }))

  return (
    <div className={styles.page}>
      <PageHeader title={t('partnerList.title')} />

      {/* 지표 8개 섹션 */}
      <StatSection title={t('partnerSales.section')} stats={stats} />

      {/* 테이블 3개 */}
      <DataTable title={t1.title} columns={t1.columns} rows={t1Rows} toolbar={toolbar} />
      <DataTable title={t2Title} columns={merchantColumns} rows={merchantTableRows} toolbar={toolbar} />
      <DataTable title={t3Title} columns={merchantColumns} rows={merchantTableRows} toolbar={toolbar} />
    </div>
  )
}
