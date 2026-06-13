import { type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../../components/organisms/PageHeader'
import Button from '../../../components/atoms/Button'
import { useTranslation } from '../../../i18n'
import { useMerchantDetail, type DetailField } from './useMerchantDetail'
import styles from './MerchantDetail.module.css'

/* 파트너 검토 체크 11항 + 최종 확인 1항 */
const REVIEW_CHECKS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']

/*
 * MerchantDetail (page) — 파트너 · 가맹점 정보(가입 요청 상세)
 * ------------------------------------------------------------------
 * 가맹점 가입 요청 리스트의 "상세"에서 진입(Figma 43:354 "가맹점 정보").
 * 상태 요약 + 파트너 코드 + A.계정 / B.소속 / C.매장 / D.리더 승인 요청 + 검토 체크.
 * 닫기(X)·취소·리더 승인 요청은 모두 목록으로 복귀(UI 상태만, 백엔드 범위 밖).
 */
export default function MerchantDetail() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { statusItems, code, accountFields, basicFields, storeFields } = useMerchantDetail()

  const back = () => navigate('/partner/requests/merchant')

  const renderField = (f: DetailField) => (
    <div key={f.label} className={`${styles.field} ${f.wide ? styles.wide : ''}`}>
      <span className={styles.fieldLabel}>{f.label}</span>
      <input
        className={styles.input}
        type="text"
        defaultValue={f.value || undefined}
        placeholder={f.placeholder}
      />
    </div>
  )

  return (
    <div className={styles.page}>
      <PageHeader title={t('requests.title')} />

      <section className={styles.panel}>
        {/* 헤더: 제목 + 닫기 */}
        <div className={styles.head}>
          <div>
            <h2 className={styles.headTitle}>{t('minfo.title')}</h2>
            <p className={styles.headDesc}>{t('minfo.desc')}</p>
          </div>
          <button type="button" className={styles.close} onClick={back} aria-label="닫기">
            ✕
          </button>
        </div>

        {/* 상태 요약 바 */}
        <div className={styles.statusBar}>
          {statusItems.map((s) => (
            <div key={s.label} className={styles.statusItem}>
              <span className={styles.statusLabel}>{s.label}</span>
              <span className={styles.statusChip} style={{ '--chip': s.chip } as CSSProperties}>
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* 파트너 코드 히어로 */}
        <div className={styles.codeHero}>
          <span className={styles.codeLabel}>{t('minfo.codeLabel')}</span>
          <span className={styles.codeValue}>{code}</span>
          <span className={styles.codeDesc}>{t('minfo.codeDesc')}</span>
        </div>

        {/* A. 계정 정보 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{t('profile.acc.title')}</h3>
          <div className={styles.grid}>{accountFields.map(renderField)}</div>
        </div>

        {/* B. 기본 / 소속 정보 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{t('profile.basic.title')}</h3>
          <div className={styles.grid}>{basicFields.map(renderField)}</div>
        </div>

        {/* C. 매장 기본 정보 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{t('minfo.sec.store')}</h3>
          <div className={styles.grid}>{storeFields.map(renderField)}</div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>{t('auth.signup.f.storeImage')}</span>
            <div className={styles.uploadRow}>
              <input className={styles.input} type="text" readOnly placeholder="사진" />
              <button type="button" className={styles.uploadBtn}>
                {t('profile.req.upload')}
              </button>
            </div>
          </div>
        </div>

        {/* D. 리더 승인 요청 정보 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{t('minfo.sec.request')}</h3>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>{t('minfo.req.memo')}</span>
              <textarea className={styles.textarea} placeholder={t('minfo.req.memoPlaceholder')} />
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>{t('minfo.req.answer')}</span>
              <textarea className={styles.textarea} placeholder={t('minfo.req.answerPlaceholder')} />
            </div>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>{t('minfo.req.attach')}</span>
            <div className={styles.uploadRow}>
              <input className={styles.input} type="text" readOnly />
              <button type="button" className={styles.uploadBtn}>
                {t('profile.req.upload')}
              </button>
            </div>
          </div>
        </div>

        {/* 파트너 검토 체크 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{t('minfo.sec.review')}</h3>
          <label className={`${styles.agree} ${styles.agreeAll}`}>
            <input type="checkbox" /> {t('minfo.checkAll')}
          </label>
          {REVIEW_CHECKS.map((n) => (
            <label key={n} className={styles.agree}>
              <input type="checkbox" /> {t(`minfo.check.${n}`)}
            </label>
          ))}
        </div>

        {/* 리더 승인 요청 전 최종 확인 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{t('minfo.sec.final')}</h3>
          <label className={styles.agree}>
            <input type="checkbox" /> {t('minfo.finalCheck')}
          </label>
        </div>

        {/* 버튼 */}
        <div className={styles.buttons}>
          <Button variant="secondary" onClick={back}>{t('minfo.cancel')}</Button>
          <Button variant="primary" onClick={back}>{t('minfo.submit')}</Button>
        </div>
      </section>
    </div>
  )
}
