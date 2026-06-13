import type { NavGroup } from '../../../types'

/*
 * 리더 어드민 사이드바 메뉴 구조 (IA)
 * ------------------------------------------------------------------
 * 출처: Figma 사이드바(node 1:139) + "리더 어드민 - Description" 명세.
 *
 * [확정 사항] '거래 로그' 하위메뉴는 와이어프레임 내부가 서로 달랐다.
 *   - 대시보드 사이드바: "국가 거래 로그" 1개
 *   - 프로필 사이드바 / Description: 전체 / 오프라인 / 실패·취소·환불
 *   → 사용자 확정에 따라 Description 기준(3개)으로 통일함.
 *
 * 라우트 경로는 화면 분류표(docs/PROJECT_PLAN.md 8.2)와 일관되게 명명.
 * 아직 미구현 화면은 라우터에서 임시 Placeholder로 연결된다.
 */
export const LEADER_NAV: NavGroup[] = [
  {
    title: '대시보드',
    items: [{ label: '대시보드', path: '/dashboard' }],
  },
  {
    title: '요청 관리',
    items: [
      { label: '파트너 승인 요청 (본사)', path: '/requests/partner' },
      { label: '가맹점 승인 요청', path: '/requests/merchant' },
    ],
  },
  {
    title: '파트너 관리',
    items: [
      { label: '파트너 전체 목록', path: '/partners' },
      { label: '파트너별 매출', path: '/partners/sales' },
    ],
  },
  {
    title: '가맹점 관리',
    items: [
      { label: '가맹점 전체 목록', path: '/merchants' },
      { label: '가맹점별 매출', path: '/merchants/sales' },
    ],
  },
  {
    title: '거래 로그',
    items: [
      { label: '전체 거래 로그', path: '/transactions' },
      { label: '오프라인 거래 로그', path: '/transactions/offline' },
      { label: '실패·취소·환불 거래', path: '/transactions/failed' },
    ],
  },
  {
    title: '수수료 / 정산',
    items: [
      { label: '정산 신청', path: '/settlement/request' },
      { label: '정산 내역', path: '/settlement/history' },
    ],
  },
  {
    title: '본사 소식지',
    items: [{ label: '전체 공지', path: '/hq-notices' }],
  },
  {
    title: '알림 / 공지',
    items: [
      { label: '공지 보내기', path: '/notices/send' },
      { label: '발송 내역', path: '/notices/history' },
    ],
  },
  {
    title: '내 권한 / 설정',
    items: [
      { label: '프로필', path: '/settings/profile' },
      { label: '활동 로그', path: '/settings/activity-log' },
    ],
  },
]
