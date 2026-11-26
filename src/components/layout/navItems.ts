export interface NavItem {
  to: string;
  /** English display label (GNB). */
  label: string;
  /** Korean sub-label (mobile menu, footer). */
  labelKo: string;
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/champions', label: 'Champions', labelKo: '챔피언' },
  { to: '/skins', label: 'Skins', labelKo: '스킨' },
  { to: '/discover', label: 'Discover', labelKo: '세계관' },
  { to: '/collection', label: 'My Collection', labelKo: '내 컬렉션' },
];
