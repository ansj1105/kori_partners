import type { NavGroup } from '../types'

/*
 * 파트너(세일즈 파트너) 어드민 사이드바 메뉴 구조 (IA)
 * ------------------------------------------------------------------
 * 출처: Figma 파트너 어드민 사이드바(43:2358 하위).
 * 리더의 부분집합/변형이다:
 *   - 파트너 관리·거래 로그 그룹 없음
 *   - 요청 관리는 "가맹점 가입 요청 (리더)" 1개
 *   - "본사 소식지" 대신 "리더 소식지"
 * 경로(path)는 basePath('/partner') 기준 상대 경로. 공통 화면은 리더와 같은
 * 상대 경로를 써서 컴포넌트/레이아웃을 그대로 재사용한다.
 */
export const PARTNER_NAV: NavGroup[] = [
  {
    titleKey: 'nav.group.dashboard',
    items: [{ labelKey: 'nav.item.dashboard', path: 'dashboard' }],
  },
  {
    titleKey: 'nav.group.requests',
    items: [{ labelKey: 'nav.item.partnerReqMerchant', path: 'requests/merchant' }],
  },
  {
    titleKey: 'nav.group.merchants',
    items: [
      { labelKey: 'nav.item.merchantsList', path: 'merchants' },
      { labelKey: 'nav.item.merchantsSales', path: 'merchants/sales' },
    ],
  },
  {
    titleKey: 'nav.group.settlement',
    items: [
      { labelKey: 'nav.item.settlementRequest', path: 'settlement/request' },
      { labelKey: 'nav.item.settlementHistory', path: 'settlement/history' },
    ],
  },
  {
    titleKey: 'nav.group.leaderNotices',
    items: [{ labelKey: 'nav.item.hqNoticesAll', path: 'hq-notices' }],
  },
  {
    titleKey: 'nav.group.notices',
    items: [
      { labelKey: 'nav.item.noticeSend', path: 'notices/send' },
      { labelKey: 'nav.item.noticeHistory', path: 'notices/history' },
    ],
  },
  {
    titleKey: 'nav.group.settings',
    items: [
      { labelKey: 'nav.item.profile', path: 'settings/profile' },
      { labelKey: 'nav.item.activityLog', path: 'settings/activity-log' },
    ],
  },
]
