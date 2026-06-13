import RequestListPage from '../../components/templates/RequestListPage'
import ActionBadges from '../../components/molecules/ActionBadges'
import type { TableRow } from '../../components/organisms/DataTable'
import { useTranslation } from '../../i18n'
import { useTransactions, type TxVariant } from './useTransactions'

interface TransactionLogProps {
  /** 거래 로그 변형 (전체/오프라인/실패) */
  variant: TxVariant
}

/*
 * TransactionLog (page) — 거래 로그 (전체 / 오프라인 / 실패·취소·환불)
 * ------------------------------------------------------------------
 * 세 화면이 구조가 같아(헤더 + 지표 8 + 테이블 1) 변형 prop 하나로 처리한다.
 * RequestListPage 템플릿 재사용. 행 필드명이 컬럼 key와 같아 일반 매핑이 가능하다.
 */
export default function TransactionLog({ variant }: TransactionLogProps) {
  const { t } = useTranslation()
  const { title, tableTitle, stats, columns, rows: rawRows, actions } = useTransactions(variant)

  const rows: TableRow[] = rawRows.map((r) => ({
    id: `${variant}-${r.txNo}`,
    // 행 필드명이 컬럼 key와 일치하므로 그대로 펼치고, 액션 컬럼만 배지로 채운다
    cells: { ...r, action: <ActionBadges labels={actions} /> },
  }))

  return (
    <RequestListPage
      title={title}
      stats={stats}
      columns={columns}
      rows={rows}
      tableTitle={tableTitle}
      toolbar={[t('common.search'), t('common.filter'), t('common.excel')]}
    />
  )
}
