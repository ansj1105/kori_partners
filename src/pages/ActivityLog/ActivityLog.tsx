import PageHeader from '../../components/organisms/PageHeader'
import DataTable, { type TableRow } from '../../components/organisms/DataTable'
import MetricCard from '../../components/molecules/MetricCard'
import { useTranslation } from '../../i18n'
import { useActivityLog } from './useActivityLog'
import styles from './ActivityLog.module.css'

/*
 * ActivityLog (page) — 내 권한 / 설정 · 활동 로그
 * ------------------------------------------------------------------
 * 상단 KPI 카드 4개(최근 로그인/접속 횟수/공지 발송/실패 로그인) + 활동 로그 테이블.
 * 액션 컬럼 없음(조회 전용). 컬럼명은 번역, 행 값은 데이터 그대로.
 */
export default function ActivityLog() {
  const { t } = useTranslation()
  const { metrics, columns, rows: rawRows } = useActivityLog()

  const rows: TableRow[] = rawRows.map((r) => ({
    id: r.logId,
    cells: {
      no: r.no,
      logId: r.logId,
      datetime: r.datetime,
      type: r.type,
      menu: r.menu,
      task: r.task,
      target: r.target,
      ip: r.ip,
      device: r.device,
      status: r.status,
    },
  }))

  return (
    <div className={styles.page}>
      <PageHeader title={t('act.title')} />

      {/* 상단 KPI 카드 */}
      <div className={styles.metrics}>
        {metrics.map((m) => (
          <MetricCard key={m.id} {...m} />
        ))}
      </div>

      <DataTable
        title={t('act.tableTitle')}
        columns={columns}
        rows={rows}
        toolbar={[t('common.search'), t('common.filter'), t('common.excel')]}
        fill
      />
    </div>
  )
}
