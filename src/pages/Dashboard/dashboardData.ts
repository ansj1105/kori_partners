import type { KpiCardData } from '../../components/molecules/KpiCard'

/*
 * 대시보드 KPI 카드 데이터
 * ------------------------------------------------------------------
 * Figma "국가 운영 대시보드"(node 1:208)에서 추출한 값 그대로 하드코딩.
 * (라벨/값/증감/태그/색 모두 디자인 시안 기준 — 실데이터 연동은 범위 밖)
 * UI와 데이터를 분리해 두어, 추후 실제 데이터로 교체하기 쉽게 한다.
 */
export const DASHBOARD_KPIS: KpiCardData[] = [
  { id: 'sales-partner', label: '세일즈 파트너', value: '148', delta: '+10', tag: '관리', accent: 'cyan' },
  { id: 'sub-merchant', label: '하부 가맹점', value: '2,840', delta: '+18', tag: '관리', accent: 'green' },
  { id: 'total-members', label: '국가 전체 회원수', value: '1.28M', delta: '+21k', accent: 'cyan' },
  { id: 'active-members', label: '활성 회원수', value: '1.28M', delta: '+21k', accent: 'cyan' },
  { id: 'monthly-volume', label: '월 거래량', value: '$1.28M', delta: '+21k', accent: 'cyan' },
  { id: 'monthly-count', label: '월 거래 건수', value: '1.28M', delta: '+30k', accent: 'green' },
  { id: 'pending-approval', label: '가맹점/파트너 승인 대기', value: '36', tag: '본사', accent: 'orange' },
  { id: 'unread-notice', label: '공지 미확인', value: '4건', accent: 'orange' },
  { id: 'total-fee', label: '총 수수료', value: '18,420 KORI', tag: '정산가능', accent: 'purple' },
  { id: 'risk', label: '리스크', value: '17건', tag: '주의', accent: 'red' },
]
