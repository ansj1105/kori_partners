import PageHeader from '../../../components/organisms/PageHeader'
import Card from '../../../components/atoms/Card'
import Button from '../../../components/atoms/Button'
import InfoGrid from '../../../components/molecules/InfoGrid'
import ActionBadges from '../../../components/molecules/ActionBadges'
import DataTable, { type TableRow } from '../../../components/organisms/DataTable'
import { useTranslation } from '../../../i18n'
import { usePartnerSettlementDetail } from './usePartnerSettlementDetail'
import styles from './PartnerSettlementDetail.module.css'

/*
 * PartnerSettlementDetail (page) — 파트너 · 수수료/정산 · 정산 상세
 * ------------------------------------------------------------------
 * 리더 상세와 달리 4개 섹션(A 기본정보 / B 금액요약 / C 가맹점별 자동정산 / D 보류·제외).
 * 공통 컴포넌트(Card·InfoGrid·DataTable bare·Badge·Button) 재사용.
 */
export default function PartnerSettlementDetail() {
  const { t } = useTranslation()
  const { no, status, basicInfo, amountSummary, merchantColumns, merchantRows, heldColumns, heldRows } =
    usePartnerSettlementDetail()

  const merchantTableRows: TableRow[] = merchantRows.map((r) => ({
    id: r.code,
    cells: { ...r, detail: <ActionBadges labels={['보기']} /> },
  }))
  const heldTableRows: TableRow[] = heldRows.map((r) => ({ id: r.txNo, cells: { ...r } }))

  return (
    <div className={styles.page}>
      <PageHeader title={t('pdetail.title')} />

      <Card className={styles.panel}>
        {/* 패널 헤더: 정산번호(좌) + 상태 토글 배지(우 끝) */}
        <div className={styles.panelHead}>
          <h2 className={styles.panelTitle}>
            {no} {t('pdetail.detailWord')}
          </h2>
          <span className={styles.reviewBadge}>{status}</span>
        </div>

        {/* A. 정산 기본 정보 */}
        <section className={`${styles.section} ${styles.sectionBox}`}>
          <h3 className={styles.sectionTitle}>{t('pdetail.a.title')}</h3>
          <InfoGrid items={basicInfo} />
        </section>

        {/* B. 정산 금액 요약 */}
        <section className={`${styles.section} ${styles.sectionBox}`}>
          <h3 className={styles.sectionTitle}>{t('pdetail.b.title')}</h3>
          <InfoGrid items={amountSummary} />
        </section>

        {/* C. 가맹점별 자동 정산 내역 */}
        <section className={`${styles.section} ${styles.sectionBoxTable}`}>
          <h3 className={styles.sectionTitleLg}>{t('pdetail.c.title')}</h3>
          <p className={styles.sectionDesc}>{t('pdetail.c.desc')}</p>
          <DataTable columns={merchantColumns} rows={merchantTableRows} bare />
        </section>

        {/* D. 보류 / 제외 거래 */}
        <section className={`${styles.section} ${styles.sectionBoxTable}`}>
          <h3 className={styles.sectionTitleLg}>{t('pdetail.d.title')}</h3>
          <p className={styles.sectionDesc}>{t('pdetail.d.desc')}</p>
          <DataTable columns={heldColumns} rows={heldTableRows} bare />
        </section>

        {/* 확인 버튼 */}
        <div className={styles.confirmRow}>
          <Button variant="primary">{t('pdetail.confirm')}</Button>
        </div>
      </Card>
    </div>
  )
}
