import PageHeader from '../../components/organisms/PageHeader'
import DataTable, { type TableRow } from '../../components/organisms/DataTable'
import Badge from '../../components/atoms/Badge'
import { useTranslation } from '../../i18n'
import { useHqNotices } from './useHqNotices'
import styles from './HqNotices.module.css'

/*
 * HqNotices (page) — 본사 소식지 · 전체공지
 * ------------------------------------------------------------------
 * 본사가 보낸 공지 목록 테이블. 행의 "상세"는 공지 상세 보기 액션.
 * (상세 화면은 작업 범위 밖이라 우선 배지 UI만 — 동작은 Figma 확인 후 협의)
 */
export default function HqNotices() {
  const { t } = useTranslation()
  const { columns, rows: rawRows } = useHqNotices()

  const rows: TableRow[] = rawRows.map((r) => ({
    id: r.no,
    cells: {
      no: r.no,
      author: r.author,
      target: r.target,
      title: r.title,
      sentDate: r.sentDate,
      read: r.read,
      action: <Badge accent="cyan" size="sm">{t('common.detail')}</Badge>,
    },
  }))

  return (
    <div className={styles.page}>
      <PageHeader title={t('hq.title')} />

      <DataTable
        title={t('hq.tableTitle')}
        columns={columns}
        rows={rows}
        toolbar={[t('common.search'), t('common.filter'), t('common.excel')]}
        fill
      />
    </div>
  )
}
