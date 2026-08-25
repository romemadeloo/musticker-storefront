export const ko = {
  homeHero: '\uc2a4\ud2f0\ucee4\u314b\u314b\u314b, \uc774\uc720\uac00 \uc788\uad6c\ub098',
  notFoundHeading: '\uc557! \ud398\uc774\uc9c0\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.',
  backToHome: '\ud648\uc73c\ub85c \ub3cc\uc544\uac00\uae30',
  stickers: '\uc2a4\ud2f0\ucee4',
  rollStickers: '\ub864\uc2a4\ud2f0\ucee4',
  sheetStickers: '\uc2dc\ud2b8 \uc2a4\ud2f0\ucee4',
  fastOrder: '\ube60\ub978 \uc8fc\ubb38',
  orderNow: '\ubc14\ub85c \uc8fc\ubb38\ud558\uae30',
  inquiryCta: '\uc81c\uc791 \ubb38\uc758\ud558\uae30',
  reviews225: /\uc0ac\uc9c4 \ud6c4\uae30\s*\d+\uac1c|\d+\uac1c \uc0ac\uc9c4 \ud6c4\uae30/,
  footerBrand: 'MUSTICKER / \uba38\uc2a4\ud2f0\ucee4',
  terms: '\uc774\uc6a9\uc57d\uad00',
  privacy: '\uac1c\uc778\uc815\ubcf4\ucc98\ub9ac\ubc29\uce68',
  faq: '\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38',
  account: '\uacc4\uc815',
  cart: '\uc7a5\ubc14\uad6c\ub2c8',
  nextStep: '\ub2e4\uc74c \ub2e8\uacc4',
  customSize: '\uc6d0\ud558\ub294 \ud06c\uae30 \uc785\ub825',
  customQuantity: '\uc6d0\ud558\ub294 \uc218\ub7c9 \uc785\ub825',
  medium75: '\uc911\ud615 75x75',
  transparent: '\ud22c\uba85',
  faqHero: '\ub3c4\uc6c0\uc774 \ud544\uc694\ud558\uc2e0\uac00\uc694?',
  faqSearchPlaceholder: '\uad81\uae08\ud55c \uc0ac\ud56d\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.',
  orderTopic: '\uc8fc\ubb38',
  guestOrderQuestion: '\ube44\ud68c\uc6d0\uc73c\ub85c\ub3c4 \uc8fc\ubb38\uc774 \uac00\ub2a5\ud55c\uac00\uc694?',
  coupon: '\ucfe0\ud3f0',
  inquiry: '\ubb38\uc758',
  oneToOneInquiry: '1:1\ubb38\uc758\ud558\uae30',
  namePlaceholder: '\uc131\ud568\uc744 \uc785\ub825\ud574 \uc8fc\uc138\uc694.',
  emailPlaceholder: '\uc774\uba54\uc77c \uc8fc\uc18c\ub97c \uc785\ub825\ud574 \uc8fc\uc138\uc694.',
  messagePlaceholder: '\uc5ec\uae30\uc5d0 \ubb38\uc758\ud558\uc2e4 \ub0b4\uc6a9\uc744 \uc785\ub825\ud574 \uc8fc\uc138\uc694.',
  fileSelect: '\ud30c\uc77c \uc120\ud0dd',
  cancel: '\ucde8\uc18c',
  kakaoInquiry: '\uce74\uce74\uc624\ucc44\ub110\ub85c \ubb38\uc758\ud558\uae30',
  naverInquiry: '\ub124\uc774\ubc84 \ud1a1\ud1a1 \uc73c\ub85c \ubb38\uc758\ud558\uae30',
  addToCart: '\uc7a5\ubc14\uad6c\ub2c8 \ub2f4\uae30',
  secureCheckout: '\uc548\uc804 \uacb0\uc81c',
  payNow: '\uacb0\uc81c\ud558\uae30',
  checkoutEmailPlaceholder: '\uc774\uba54\uc77c \uc8fc\uc18c\ub97c \uc785\ub825\ud574 \uc8fc\uc138\uc694.',
  checkoutNamePlaceholder: '\uc131\ud568\uc744 \uc785\ub825\ud558\uc138\uc694',
  checkoutPostalCodePlaceholder: '\uc6b0\ud3b8\ubc88\ud638\ub97c \uc785\ub825\ud558\uc138\uc694',
  hologram: '\ud640\ub85c\uadf8\ub7a8',
  pvcMatte: 'PVC \ub9e4\ud2b8',
  sizeChangeAction: '\uc0ac\uc774\uc988 \ubcc0\uacbd',
  addImageLink: '\uc774\ubbf8\uc9c0 \ucd94\uac00',
  changeImageLink: '\uc774\ubbf8\uc9c0 \ubcc0\uacbd',
  black: '\uac80\uc815',
  fullColor: '\ud480 \uceec\ub7ec',
  kakaoPay: '\uce74\uce74\uc624\ud398\uc774',
  otpConfirm: '\ud655\uc778',
  orderCompletedHeading: '\uc8fc\ubb38\uc774 \uc644\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4!'
} as const;

// Verified working guest checkout profile for full-payment tests (see checkout-destructive.spec.ts).
// Hardcoded rather than sourced from the CHECKOUT_* vars in .env.example: those were never wired up
// by anything, and this data only needs to pass client-side validation, not represent a real person.
export const guestCheckoutProfile = {
  fullName: '\ud14c\uc2a4\ud2b8 \uc0ac\uc6a9\uc790',
  postalCode: '06168',
  phone: ['010', '1234', '5678'] as const,
  province: '\uc11c\uc6b8\ud2b9\ubcc4\uc2dc',
  city: '\uac15\ub0a8\uad6c',
  streetAddress: '\ud14c\ud5e4\ub780\ub85c 152',
  detailAddress: '101\ud638'
} as const;

export const aboutPage = {
  heroHeading: '\uc6b0\ub9ac\uac00 \ub9cc\ub4dc\ub294 \uac83\uc740',
  subNav: [
    '\uc65c \ub9cc\ub4e4\uc5c8\ub098',
    '\uc6b0\ub9ac\uc758 \ucca0\ud559',
    '\uc65c \ube60\ub978\uac00',
    '\uc6b0\ub9ac\uac00 \uac00\ub294 \uae38'
  ],
  viewStoryCta: '\uc6b0\ub9ac\uc758 \uc774\uc57c\uae30 \ubcf4\uae30',
  statYears: '10\ub144+',
  statOrders: '\uc218\uc2ed\ub9cc \uac74'
} as const;

export const categoryLinks = {
  stickers: [
    '\uc790\uc720\ud615 \uc2a4\ud2f0\ucee4',
    '\uc6d0\ud615 \uc2a4\ud2f0\ucee4',
    '\uc9c1\uc0ac\uac01\ud615 \uc2a4\ud2f0\ucee4',
    '\uc815\uc0ac\uac01\ud615 \uc2a4\ud2f0\ucee4',
    '\ud0c0\uc6d0\ud615 \uc2a4\ud2f0\ucee4',
    '\ub465\uadfc \uc0ac\uac01 \uc2a4\ud2f0\ucee4',
    '\ud0a4\uc2a4\ucef7 \uc2a4\ud2f0\ucee4',
    '\ucee4\uc2a4\ud140 \uc2dc\ud2b8 \uc2a4\ud2f0\ucee4',
    '\ud22c\uba85 \uc2a4\ud2f0\ucee4',
    '\ud640\ub85c\uadf8\ub7a8 \uc2a4\ud2f0\ucee4',
    '\ud480 \uceec\ub7ec \ub808\ud130\ub9c1 \uc2a4\ud2f0\ucee4',
    '\ub808\ud130\ub9c1 \uc2a4\ud2f0\ucee4'
  ],
  rollStickers: [
    '\uc790\uc720\ud615 \ub864 \uc2a4\ud2f0\ucee4',
    '\ud22c\uba85 \ub864 \uc2a4\ud2f0\ucee4',
    '\uc6d0\ud615 \ub864 \uc2a4\ud2f0\ucee4',
    '\uc815\uc0ac\uac01\ud615 \ub864 \uc2a4\ud2f0\ucee4',
    '\uc9c1\uc0ac\uac01\ud615 \ub864 \uc2a4\ud2f0\ucee4',
    '\ub465\uadfc \uc0ac\uac01 \ub864 \uc2a4\ud2f0\ucee4',
    '\ud0c0\uc6d0\ud615 \ub864 \uc2a4\ud2f0\ucee4',
    '\uc544\ud2b8\uc9c0 \ub864 \uc2a4\ud2f0\ucee4'
  ],
  sheetStickers: [
    '\uc790\uc720\ud615 \uc2dc\ud2b8 \uc2a4\ud2f0\ucee4',
    '\uc6d0\ud615 \uc2dc\ud2b8 \uc2a4\ud2f0\ucee4',
    '\ud0c0\uc6d0\ud615 \uc2dc\ud2b8 \uc2a4\ud2f0\ucee4',
    '\uc815\uc0ac\uac01\ud615 \uc2dc\ud2b8 \uc2a4\ud2f0\ucee4',
    '\uc9c1\uc0ac\uac01\ud615 \uc2dc\ud2b8 \uc2a4\ud2f0\ucee4',
    '\ub465\uadfc \uc0ac\uac01 \uc2dc\ud2b8 \uc2a4\ud2f0\ucee4'
  ]
} as const;

export const v2Products = {
  dieCutSticker: {
    path: './stickers/die-cut-sticker',
    heading: '\uc790\uc720\ud615 \uc2a4\ud2f0\ucee4',
    size: ko.medium75,
    quantity: 100
  },
  dieCutRoll: {
    path: './roll-stickers/die-cut-roll',
    heading: '\uc790\uc720\ud615 \ub864 \uc2a4\ud2f0\ucee4',
    size: ko.medium75,
    quantity: 300
  },
  dieCutSheet: {
    path: './sheet-stickers/die-cut-sheet',
    heading: '\uc790\uc720\ud615 \uc2dc\ud2b8 \uc2a4\ud2f0\ucee4',
    material: ko.transparent,
    sheetSize: 'A5',
    quantity: 50
  }
} as const;

// Product detail pages from sitemap.xml not already deep-tested via v2Products. Also crawled here
// for render-only smoke coverage (heading + options panel visible) even where a deeper config+cart
// flow exists elsewhere (dieCutShapeStickers, dieCutRollStickers, stickerSheetProduct,
// vinylLetteringProduct, transferStickerProduct, sheetStickerConfiguratorProducts) -- the two
// layers aren't mutually exclusive.
export const catalogPaths = [
  './stickers/sticker-sheet',
  './stickers/hologram-sticker',
  './stickers/vinyl-lettering',
  './stickers/circle-sticker',
  './stickers/rectangle-sticker',
  './stickers/square-sticker',
  './stickers/oval-sticker',
  './stickers/rounded-sticker',
  './stickers/kiss-cut-sticker',
  './stickers/clear-sticker',
  './stickers/transfer-sticker',
  './roll-stickers/clear-roll',
  './roll-stickers/circle-roll',
  './roll-stickers/square-roll',
  './roll-stickers/rectangle-roll',
  './roll-stickers/rounded-roll',
  './roll-stickers/oval-roll',
  './roll-stickers/paper-roll',
  './sheet-stickers/circle-sheet',
  './sheet-stickers/oval-sheet',
  './sheet-stickers/square-sheet',
  './sheet-stickers/rectangle-sheet',
  './sheet-stickers/rounded-sheet'
] as const;

// Plain size+quantity die-cut shape variants under ./stickers/, distinct from
// v2Products.dieCutSticker (./stickers/die-cut-sticker) only by heading/size-label/price. Verified
// live against development-3 on 2026-08-13: none of these expose a material selector.
export const dieCutShapeStickers = [
  { path: './stickers/hologram-sticker', heading: '홀로그램 스티커', size: ko.medium75, quantity: 100 },
  { path: './stickers/circle-sticker', heading: '원형 스티커', size: '중형 60x60', quantity: 100 },
  { path: './stickers/rectangle-sticker', heading: '직사각형 스티커', size: '중형 75x50', quantity: 100 },
  { path: './stickers/square-sticker', heading: '정사각형 스티커', size: ko.medium75, quantity: 100 },
  { path: './stickers/oval-sticker', heading: '타원형 스티커', size: '중형 75x50', quantity: 100 },
  { path: './stickers/rounded-sticker', heading: '둥근 사각 스티커', size: ko.medium75, quantity: 100 },
  { path: './stickers/kiss-cut-sticker', heading: '키스컷 스티커', size: ko.medium75, quantity: 100 },
  { path: './stickers/clear-sticker', heading: '투명 스티커', size: ko.medium75, quantity: 100 }
] as const;

// Plain size+quantity die-cut roll variants under ./roll-stickers/, same shape as
// v2Products.dieCutRoll (./roll-stickers/die-cut-roll). Verified live against development-3 on
// 2026-08-13: none expose a material selector or sheet-size controls.
export const dieCutRollStickers = [
  { path: './roll-stickers/clear-roll', heading: '투명 롤 스티커', size: ko.medium75, quantity: 100 },
  { path: './roll-stickers/circle-roll', heading: '원형 롤 스티커', size: '중형 60x60', quantity: 100 },
  { path: './roll-stickers/square-roll', heading: '정사각형 롤 스티커', size: ko.medium75, quantity: 100 },
  { path: './roll-stickers/rectangle-roll', heading: '직사각형 롤 스티커', size: '중형 75x50', quantity: 100 },
  { path: './roll-stickers/rounded-roll', heading: '둥근 사각 롤 스티커', size: ko.medium75, quantity: 100 },
  { path: './roll-stickers/oval-roll', heading: '타원형 롤 스티커', size: '중형 75x50', quantity: 100 },
  { path: './roll-stickers/paper-roll', heading: '아트지 롤 스티커', size: ko.medium75, quantity: 100 }
] as const;

// Sheet-template flow (material + sheet size + quantity) like v2Products.dieCutSheet, but a
// distinct product under ./stickers/. Verified live against development-3 on 2026-08-13.
export const stickerSheetProduct = {
  path: './stickers/sticker-sheet',
  heading: '커스텀 시트 스티커',
  material: ko.pvcMatte,
  sheetSize: 'A5',
  quantity: 10
} as const;

// Live-text lettering flow: a color swatch (accessible name is the English color name, e.g.
// aria-label="Black", with the Korean label only in a child tooltip span) plus a contenteditable
// text canvas, no design-file upload. Verified live against development-3 on 2026-08-13.
export const vinylLetteringProduct = {
  path: './stickers/vinyl-lettering',
  heading: '레터링 스티커',
  colorLabel: ko.black,
  text: 'MUSTICKER QA',
  quantity: 1
} as const;

// Despite the "레터링" name this behaves like a plain die-cut shape page (color swatch + size +
// quantity + design-file upload), not a live-text tool. Verified live against development-3 on
// 2026-08-13.
export const transferStickerProduct = {
  path: './stickers/transfer-sticker',
  heading: '풀 컬러 레터링 스티커',
  colorLabel: ko.fullColor,
  size: ko.medium75,
  quantity: 1
} as const;

// Per-shape individual-sticker sheet configurators (material + individual size + sheet quantity,
// distinct from the die-cut sheet's A5-template flow above). categoryLinks.sheetStickers[0] is the
// freeform/die-cut variant already covered by v2Products.dieCutSheet, so it is skipped here.
export const sheetStickerConfiguratorProducts = [
  {
    path: './sheet-stickers/circle-sheet',
    heading: categoryLinks.sheetStickers[1]
  },
  {
    path: './sheet-stickers/oval-sheet',
    heading: categoryLinks.sheetStickers[2]
  },
  {
    path: './sheet-stickers/square-sheet',
    heading: categoryLinks.sheetStickers[3]
  },
  {
    path: './sheet-stickers/rectangle-sheet',
    heading: categoryLinks.sheetStickers[4]
  },
  {
    path: './sheet-stickers/rounded-sheet',
    heading: categoryLinks.sheetStickers[5]
  }
] as const;
