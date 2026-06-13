import { Fragment, useState } from 'react'
import PageHeader from '../../components/organisms/PageHeader'
import Card from '../../components/atoms/Card'
import Badge from '../../components/atoms/Badge'
import Button from '../../components/atoms/Button'
import StatSection from '../../components/organisms/StatSection'
import StatCard from '../../components/molecules/StatCard'
import InfoGrid from '../../components/molecules/InfoGrid'
import ActionBadges from '../../components/molecules/ActionBadges'
import DataTable, { type TableRow } from '../../components/organisms/DataTable'
import { useTranslation } from '../../i18n'
import { useSettlementRequest } from './useSettlementRequest'
import styles from './SettlementRequest.module.css'

/** 정산 계산 수식의 항(라벨 + 값 + 단위) */
function FormulaTerm({ label, value, unit, final }: { label: string; value: string; unit: string; final?: boolean }) {
  return (
    <div className={final ? `${styles.formulaTerm} ${styles.formulaFinal}` : styles.formulaTerm}>
      <span className={styles.formulaLabel}>{label}</span>
      <span className={styles.formulaValue}>
        {value}
        <span className={styles.formulaUnit}>{unit}</span>
      </span>
    </div>
  )
}

/*
 * SettlementRequest (page) — 수수료/정산 · 정산 신청
 * ------------------------------------------------------------------
 * 플로우:
 *   1) 기본(긴) 화면: 요약 배너 + 지표 + 정산 계산 + 자동정산 안내 + 테이블 3 + 요청 폼
 *      → 하단 "본사 정산 요청" 버튼
 *   2) 확인 폼(가운데 정렬): "본사에 정산 요청 보내시겠습니까?" + 취소/보내기
 *      → "본사 정산 요청 보내기" 클릭 시
 *   3) 완료 토스트 표시
 * (데이터는 훅에서, UI 라벨은 t(). 동작은 화면 내 상태 전환만 — 서버 통신 없음)
 */
export default function SettlementRequest() {
  const { t } = useTranslation()
  const [step, setStep] = useState<'default' | 'form'>('default')
  const [submitted, setSubmitted] = useState(false)

  const {
    banner, stats, calc, feeStructure, autoDesc, autoStats,
    partnerTable, directTable, heldTable, summary, checks, formFields,
  } = useSettlementRequest()

  // 테이블 행 — "보기" 상세 액션 포함
  const detailCell = <ActionBadges labels={['보기']} />
  const ptRows: TableRow[] = partnerTable.rows.map((r) => ({ id: r.code, cells: { ...r, detail: detailCell } }))
  const dtRows: TableRow[] = directTable.rows.map((r) => ({ id: r.code, cells: { ...r, detail: detailCell } }))
  const htRows: TableRow[] = heldTable.rows.map((r) => ({ id: r.txNo, cells: { ...r, detail: detailCell } }))

  // ===== 플로우 2·3: 확인 폼 + 완료 토스트 (가운데 정렬) =====
  if (step === 'form') {
    return (
      <div className={styles.page}>
        <PageHeader title={t('settle.req.title')} />
        <div className={styles.formWrap}>
          <section className={styles.formCard}>
            <h2 className={styles.formTitle}>{t('settle.req.cardTitle')}</h2>
            <p className={styles.formDesc}>{t('settle.req.cardDesc')}</p>
            <div className={styles.formFields}>
              {formFields.map((f) => (
                <Fragment key={f.label}>
                  <span className={styles.fieldLabel}>{f.label}</span>
                  <span className={styles.fieldValue}>{f.value}</span>
                </Fragment>
              ))}
            </div>
            <div className={styles.formButtons}>
              <Button variant="secondary" onClick={() => setStep('default')}>
                {t('settle.req.cancel')}
              </Button>
              <Button variant="primary" onClick={() => setSubmitted(true)}>
                {t('settle.req.submit')}
              </Button>
            </div>
          </section>

          {/* 완료 토스트 — "본사 정산 요청 보내기" 클릭 후 표시 */}
          {submitted && <div className={styles.toast}>{t('settle.req.toast')}</div>}
        </div>
      </div>
    )
  }

  // ===== 플로우 1: 기본(긴) 화면 =====
  return (
    <div className={styles.page}>
      <PageHeader title={t('settle.req.title')} />

      {/* 요약 배너 */}
      <Card className={styles.sectionCard}>
        <div className={styles.bannerHead}>
          <p className={styles.notice}>{banner.notice}</p>
          <Badge accent="green">{t('settle.req.statusOk')}</Badge>
        </div>
        <InfoGrid
          items={[
            { label: t('settle.req.banner.lastDate'), value: banner.lastDate },
            { label: t('settle.req.banner.period'), value: banner.period },
            { label: t('settle.req.banner.exclude'), value: banner.exclude },
            { label: t('settle.req.banner.method'), value: banner.method },
          ]}
        />
      </Card>

      {/* 지표 8개 */}
      <StatSection stats={stats} />

      {/* 정산 가능 금액 계산 + 수수료 구조 */}
      <Card className={styles.sectionCard}>
        <h3 className={styles.sectionTitle}>{t('settle.req.calc.title')}</h3>
        <p className={styles.sectionDesc}>{t('settle.req.calc.desc')}</p>
        <div className={styles.formula}>
          <FormulaTerm label={t('settle.req.calc.partnerProfit')} value={calc.partnerProfit} unit={calc.unit} />
          <span className={styles.formulaOp}>+</span>
          <FormulaTerm label={t('settle.req.calc.directProfit')} value={calc.directProfit} unit={calc.unit} />
          <span className={styles.formulaOp}>−</span>
          <FormulaTerm label={t('settle.req.calc.held')} value={calc.held} unit={calc.unit} />
          <span className={styles.formulaOp}>=</span>
          <FormulaTerm label={t('settle.req.calc.final')} value={calc.final} unit={calc.unit} final />
        </div>

        <h3 className={styles.sectionTitle}>{t('settle.req.fee.title')}</h3>
        <div className={styles.feeStruct}>
          {feeStructure.map((row, i) => (
            <div key={i} className={styles.feeRow}>
              <span className={styles.feeCat}>{row[0]}</span>
              {row.slice(1).map((stepLabel, j) => (
                <Fragment key={j}>
                  {j > 0 && <span className={styles.feeArrow}>→</span>}
                  <span className={styles.feeStep}>{stepLabel}</span>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </Card>

      {/* 본사 정산 요청 후 자동 정산 처리 */}
      <Card className={styles.sectionCard}>
        <h3 className={styles.sectionTitle}>{t('settle.req.auto.title')}</h3>
        <p className={styles.sectionDesc}>{autoDesc}</p>
        <div className={styles.statGrid4}>
          {autoStats.map((s) => (
            <StatCard key={s.id} {...s} />
          ))}
        </div>
      </Card>

      {/* 파트너별 수수료 수익 */}
      <Card className={styles.sectionCard}>
        <h3 className={styles.sectionTitle}>{t('settle.req.pt.title')}</h3>
        <p className={styles.sectionDesc}>{partnerTable.desc}</p>
        <DataTable columns={partnerTable.columns} rows={ptRows} bare />
      </Card>

      {/* 직계약 가맹점 수수료 수익 */}
      <Card className={styles.sectionCard}>
        <h3 className={styles.sectionTitle}>{t('settle.req.dt.title')}</h3>
        <p className={styles.sectionDesc}>{directTable.desc}</p>
        <DataTable columns={directTable.columns} rows={dtRows} bare />
      </Card>

      {/* 보류 / 제외 거래 */}
      <Card className={styles.sectionCard}>
        <h3 className={styles.sectionTitle}>{t('settle.req.ht.title')}</h3>
        <p className={styles.sectionDesc}>{heldTable.desc}</p>
        <DataTable columns={heldTable.columns} rows={htRows} bare />
      </Card>

      {/* 본사 정산 요청 (최종 요청 폼) */}
      <Card className={styles.sectionCard}>
        <h3 className={styles.sectionTitle}>{t('settle.req.final.title')}</h3>
        <p className={styles.sectionDesc}>{t('settle.req.final.desc')}</p>
        <InfoGrid
          items={[
            { label: t('settle.req.final.period'), value: summary.period },
            { label: t('settle.req.final.lastDate'), value: summary.lastDate },
            { label: t('settle.req.final.finalAmount'), value: summary.finalAmount },
            { label: t('settle.req.final.autoSettle'), value: summary.autoSettle },
            { label: t('settle.req.final.held'), value: summary.held },
            { label: t('settle.req.final.requestAmount'), value: summary.requestAmount },
          ]}
        />
        <div className={styles.walletRow}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>{t('settle.req.final.wallet')}</span>
            <span className={styles.fieldValue}>{summary.wallet}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>{t('settle.req.final.currency')}</span>
            <span className={styles.fieldValue}>{summary.currency}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>{t('settle.req.final.memo')}</span>
            <textarea className={styles.memo} placeholder={summary.memoPlaceholder} />
          </div>
        </div>

        {/* 확인 체크박스 (UI만) */}
        <div className={styles.checks}>
          {checks.map((c, i) => (
            <label key={i} className={styles.check}>
              <input type="checkbox" defaultChecked /> {c}
            </label>
          ))}
        </div>

        <div className={styles.requestBtnRow}>
          <Button variant="primary" onClick={() => setStep('form')}>
            {t('settle.req.requestBtn')}
          </Button>
        </div>
      </Card>
    </div>
  )
}
