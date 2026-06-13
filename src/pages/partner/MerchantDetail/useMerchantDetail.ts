import { useTranslation } from '../../../i18n'
import data from './merchantDetailData.json'

export interface StatusItem { label: string; value: string; chip: string }
export interface DetailField { label: string; value: string; placeholder?: string; wide?: boolean }

interface StatusRaw { labelKey: string; value: string; chip: string }
interface FieldRaw { labelKey: string; value: string; placeholder?: string; wide?: boolean }

/*
 * useMerchantDetail — 파트너 · 가맹점 정보(상세) 데이터 훅
 * ------------------------------------------------------------------
 * 가맹점 가입 요청 행의 "상세"에서 진입하는 가맹점 정보 화면 데이터.
 * 라벨(UI)은 번역(상태/계정/소속은 profile.*, 매장은 auth.signup.f.* 재사용), 값은 데이터.
 */
export function useMerchantDetail() {
  const { t } = useTranslation()
  const toFields = (fields: FieldRaw[]): DetailField[] =>
    fields.map((f) => ({ label: t(f.labelKey), value: f.value, placeholder: f.placeholder, wide: f.wide }))

  return {
    statusItems: (data.statusItems as StatusRaw[]).map((s) => ({ label: t(s.labelKey), value: s.value, chip: s.chip })),
    code: data.code,
    accountFields: toFields(data.accountFields as FieldRaw[]),
    basicFields: toFields(data.basicFields as FieldRaw[]),
    storeFields: toFields(data.storeFields as FieldRaw[]),
  }
}
