import { useNavigate } from 'react-router-dom'
import SalesPage, { type SalesTable } from '../../components/templates/SalesPage'
import ActionBadges from '../../components/molecules/ActionBadges'
import type { TableRow } from '../../components/organisms/DataTable'
import { useTranslation } from '../../i18n'
import { usePartnerSales } from './usePartnerSales'

/*
 * PartnerSales (page) — 파트너 관리 · 파트너별 매출
 * ------------------------------------------------------------------
 * 공통 SalesPage 템플릿(헤더 + 지표 섹션 + 테이블 N개)에 데이터를 주입한다.
 * 테이블 3개: 파트너별 매출(상세 액션) / 하위 가맹점 매출 / 가맹점 매출.
 */
export default function PartnerSales() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { stats, t1, t2Title, t3Title, merchantColumns, merchantRows } = usePartnerSales()
  const toolbar = [t('common.search'), t('common.filter'), t('common.excel')]

  // 파트너 코드 → 파트너명 (행 클릭 시 가맹점별 매출로 파트너명을 전달하기 위함)
  const nameByCode = new Map(t1.rows.map((r) => [r.code, r.name]))

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

  const tables: SalesTable[] = [
    {
      id: 't1',
      title: t1.title,
      columns: t1.columns,
      rows: t1Rows,
      toolbar,
      // 파트너 행 클릭 → 가맹점별 매출 페이지로 이동(선택 파트너명 전달)
      onRowClick: (code) =>
        navigate(`/leader/merchants/sales?partner=${encodeURIComponent(nameByCode.get(code) ?? '')}`),
    },
    { id: 't2', title: t2Title, columns: merchantColumns, rows: merchantTableRows, toolbar },
    { id: 't3', title: t3Title, columns: merchantColumns, rows: merchantTableRows, toolbar },
  ]

  return <SalesPage title={t('partnerList.title')} sectionTitle={t('partnerSales.section')} stats={stats} tables={tables} />
}
