import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from '../../../i18n'
import type { NavGroup } from '../../../types'
import type { ProfileLine } from '../../../roles/types'
import styles from './Sidebar.module.css'

interface SidebarProps {
  /** 라우트 prefix (예: '/leader', '/partner') — 메뉴 경로 결합에 사용 */
  basePath: string
  /** 역할 라벨 i18n 키 (예: 'common.role.leader') */
  roleLabelKey: string
  /** 프로필 카드 줄 (Figma 샘플 값) */
  profileLines: ProfileLine[]
  /** 메뉴 구조 (항목 path는 basePath 기준 상대 경로) */
  nav: NavGroup[]
}

/*
 * Sidebar (organism)
 * ------------------------------------------------------------------
 * 어드민 화면이 공유하는 좌측 고정 내비게이션. 역할별 메뉴/프로필/라벨은
 * 모두 props로 주입받아(리더/파트너 공용), 컴포넌트 자체는 역할을 모른다.
 * - 활성 표시: 현재 화면이 속한 "그룹 카드"가 보라로, 그 안의 해당 "항목"이 시안으로 강조.
 * - 활성 판정은 "가장 긴 접두 경로" 한 개만 선택(상세 등 하위 경로도 부모 메뉴 유지 +
 *   접두 중복 강조 방지).
 */
export default function Sidebar({ basePath, roleLabelKey, profileLines, nav }: SidebarProps) {
  const { pathname } = useLocation()
  const { t } = useTranslation()

  // 메뉴 항목의 풀경로 = basePath + '/' + 상대 path
  const fullPath = (itemPath: string) => `${basePath}/${itemPath}`

  // 현재 경로에 매칭되는 풀경로 중 가장 긴(가장 구체적인) 것 하나만 활성
  const allPaths = nav.flatMap((g) => g.items.map((i) => fullPath(i.path)))
  const activePath = allPaths
    .filter((p) => pathname === p || pathname.startsWith(p + '/'))
    .sort((a, b) => b.length - a.length)[0]

  return (
    <aside className={styles.sidebar}>
      {/* 상단 브랜드 + 역할 + 프로필 카드 (Figma상 모두 동일 간격 8의 형제 요소) */}
      <div className={styles.brand}>{t('common.brand')}</div>
      <div className={styles.role}>{t(roleLabelKey)}</div>

      <div className={styles.profileCard}>
        {profileLines.map((line) => (
          <div
            key={line.text}
            className={
              line.variant === 'title'
                ? styles.profileCountry
                : line.variant === 'parent'
                  ? styles.profileParent
                  : styles.profileCode
            }
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* "전체 목록" — 동작 미확정이라 우선 비클릭 라벨 */}
      <div className={styles.allLabel}>{t('common.allList')}</div>

      {/* 메뉴 그룹 목록 */}
      <nav className={styles.nav}>
        {nav.map((group) => {
          const isGroupActive = group.items.some((item) => fullPath(item.path) === activePath)

          return (
            <div
              key={group.titleKey}
              className={isGroupActive ? `${styles.group} ${styles.groupActive}` : styles.group}
            >
              <div
                className={
                  isGroupActive ? `${styles.groupTitle} ${styles.groupTitleActive}` : styles.groupTitle
                }
              >
                {t(group.titleKey)}
              </div>

              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={fullPath(item.path)}
                  // 활성 판정은 NavLink 내장 isActive 대신 위에서 계산한 activePath로 한다.
                  className={
                    fullPath(item.path) === activePath
                      ? `${styles.item} ${styles.itemActive}`
                      : styles.item
                  }
                >
                  {t(item.labelKey)}
                </NavLink>
              ))}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
