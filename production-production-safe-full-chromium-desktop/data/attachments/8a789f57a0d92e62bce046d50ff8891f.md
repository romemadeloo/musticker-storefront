# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke/storefront-smoke.spec.ts >> storefront v2 smoke >> MS-V2-001 homepage loads with critical public content
- Location: tests/e2e/smoke/storefront-smoke.spec.ts:9:3

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('body')
Timeout: 10000ms
Expected pattern: /\uc0ac\uc9c4 \ud6c4\uae30\s*225\uac1c|\d+\uac1c \uc0ac\uc9c4 \ud6c4\uae30/
Received string:  "스티커롤스티커시트 스티커스티커ㅋㅋㅋ, 이유가 있구나빠른데, 퀄리티까지 미쳤다빠른 주문스티커롤스티커판스티커홀로그램레터링급해서 맡겼는데, 퀄리티 때문에 기억나는 스티커파일만 첨부하면 시안이 전달되고, 승인 즉시 제작이 시작됩니다.·
급한 작업이어도 색감·라인·마감까지 정교해 “여기 또 써야겠다”는 말이 나올 거예요.·
우리는 빨리 만드는 게 아니라, 빠르게 ‘잘’ 만드는 것을 목표로 합니다.사진 후기 0개, 만족도는 이미 증명됐어요이전 리뷰로 이동다음 리뷰로 이동100% 품질 보장문제가 생기면 변명하지 않습니다
재인쇄 또는 환불까지 끝까지 책임집니다오늘 제작 · 내일 발송디자인 승인 후 바로 제작이 시작되며,
승인이 빠를수록 다음 날 바로 출고됩니다5만원 이상 무료배송기본 배송비는 3,000원이며,
5만원 이상 주문 시 무료배송입니다처음 주문해도 걱정할 필요 없어요바로 주문하기제작 문의하기카카오채널로 문의하기네이버 톡톡 으로 문의하기이메일로 문의하기카카오채널로 문의하기네이버 톡톡 으로 문의하기이메일로 문의하기👋 도움이 필요하세요?MUSTICKER / 머스티커상호명: (주)글로픽스사업자등록번호 :  877-88-03313  통신판매업신고 : 2026-부산해운대-0792호대표이사 : 여일석  주소 : 부산광역시  해운대구 해운대해변로 203 오션타워 1014호ⓒ 2026. All rights reserved.판매: sales@musticker.com이용약관개인정보처리방침사업자정보확인1899-5529오전 9시 ~ 오후 6시(토요일, 공휴일 휴무)1:1문의하기자주 묻는 질문MUSTICKER / 머스티커1899-5529상호명: (주)글로픽스오전 9시 ~ 오후 6시(토요일, 공휴일 휴무)사업자등록번호 :  877-88-03313  통신판매업신고 : 2026-부산해운대-0792호대표이사 : 여일석  주소 : 부산광역시  해운대구 해운대해변로 203 오션타워 1014호1:1문의하기자주 묻는 질문판매: sales@musticker.com이용약관개인정보처리방침사업자정보확인ⓒ 2026. All rights reserved.KR문의궁금한 점이 있으신가요? 제품이나 서비스에 대해 문의사항이 있으시면 언제든 메시지를 보내주세요.문의 유형선택상품디자인 파일 업로드결제배송교환/환불/취소회원가입/멤버십기타성함이메일 주소문의 내용첨부파일업로드할 파일을 이곳에 끌어서 올려주세요.허용되는 파일 :  .eps, .ai, .psd, .pdf, .tif, .tiff, .zip, .png, and .jpg. 최대 4개 파일 / 총 50MB까지 업로드 가능파일 선택취소문의하기"

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for locator('body')
    6 × locator resolved to <body>…</body>
      - unexpected value "스티커롤스티커시트 스티커스티커ㅋㅋㅋ, 이유가 있구나빠른데, 퀄리티까지 미쳤다빠른 주문스티커롤스티커판스티커홀로그램레터링급해서 맡겼는데, 퀄리티 때문에 기억나는 스티커파일만 첨부하면 시안이 전달되고, 승인 즉시 제작이 시작됩니다. 
급한 작업이어도 색감·라인·마감까지 정교해 “여기 또 써야겠다”는 말이 나올 거예요. 
우리는 빨리 만드는 게 아니라, 빠르게 ‘잘’ 만드는 것을 목표로 합니다.사진 후기 0개, 만족도는 이미 증명됐어요이전 리뷰로 이동다음 리뷰로 이동100% 품질 보장문제가 생기면 변명하지 않습니다
재인쇄 또는 환불까지 끝까지 책임집니다오늘 제작 · 내일 발송디자인 승인 후 바로 제작이 시작되며,
승인이 빠를수록 다음 날 바로 출고됩니다5만원 이상 무료배송기본 배송비는 3,000원이며,
5만원 이상 주문 시 무료배송입니다처음 주문해도 걱정할 필요 없어요바로 주문하기제작 문의하기카카오채널로 문의하기네이버 톡톡 으로 문의하기이메일로 문의하기카카오채널로 문의하기네이버 톡톡 으로 문의하기이메일로 문의하기👋 도움이 필요하세요?MUSTICKER / 머스티커상호명: (주)글로픽스사업자등록번호 :  877-88-03313  통신판매업신고 : 2026-부산해운대-0792호대표이사 : 여일석  주소 : 부산광역시  해운대구 해운대해변로 203 오션타워 1014호ⓒ 2026. All rights reserved.판매: sales@musticker.com이용약관개인정보처리방침사업자정보확인1899-5529오전 9시 ~ 오후 6시(토요일, 공휴일 휴무)1:1문의하기자주 묻는 질문MUSTICKER / 머스티커1899-5529상호명: (주)글로픽스오전 9시 ~ 오후 6시(토요일, 공휴일 휴무)사업자등록번호 :  877-88-03313  통신판매업신고 : 2026-부산해운대-0792호대표이사 : 여일석  주소 : 부산광역시  해운대구 해운대해변로 203 오션타워 1014호1:1문의하기자주 묻는 질문판매: sales@musticker.com이용약관개인정보처리방침사업자정보확인ⓒ 2026. All rights reserved.KR문의궁금한 점이 있으신가요? 제품이나 서비스에 대해 문의사항이 있으시면 언제든 메시지를 보내주세요.문의 유형선택성함이메일 주소문의 내용첨부파일업로드할 파일을 이곳에 끌어서 올려주세요.허용되는 파일 :  .eps, .ai, .psd, .pdf, .tif, .tiff, .zip, .png, and .jpg. 최대 4개 파일 / 총 50MB까지 업로드 가능파일 선택취소문의하기"
    8 × locator resolved to <body>…</body>
      - unexpected value "스티커롤스티커시트 스티커스티커ㅋㅋㅋ, 이유가 있구나빠른데, 퀄리티까지 미쳤다빠른 주문스티커롤스티커판스티커홀로그램레터링급해서 맡겼는데, 퀄리티 때문에 기억나는 스티커파일만 첨부하면 시안이 전달되고, 승인 즉시 제작이 시작됩니다. 
급한 작업이어도 색감·라인·마감까지 정교해 “여기 또 써야겠다”는 말이 나올 거예요. 
우리는 빨리 만드는 게 아니라, 빠르게 ‘잘’ 만드는 것을 목표로 합니다.사진 후기 0개, 만족도는 이미 증명됐어요이전 리뷰로 이동다음 리뷰로 이동100% 품질 보장문제가 생기면 변명하지 않습니다
재인쇄 또는 환불까지 끝까지 책임집니다오늘 제작 · 내일 발송디자인 승인 후 바로 제작이 시작되며,
승인이 빠를수록 다음 날 바로 출고됩니다5만원 이상 무료배송기본 배송비는 3,000원이며,
5만원 이상 주문 시 무료배송입니다처음 주문해도 걱정할 필요 없어요바로 주문하기제작 문의하기카카오채널로 문의하기네이버 톡톡 으로 문의하기이메일로 문의하기카카오채널로 문의하기네이버 톡톡 으로 문의하기이메일로 문의하기👋 도움이 필요하세요?MUSTICKER / 머스티커상호명: (주)글로픽스사업자등록번호 :  877-88-03313  통신판매업신고 : 2026-부산해운대-0792호대표이사 : 여일석  주소 : 부산광역시  해운대구 해운대해변로 203 오션타워 1014호ⓒ 2026. All rights reserved.판매: sales@musticker.com이용약관개인정보처리방침사업자정보확인1899-5529오전 9시 ~ 오후 6시(토요일, 공휴일 휴무)1:1문의하기자주 묻는 질문MUSTICKER / 머스티커1899-5529상호명: (주)글로픽스오전 9시 ~ 오후 6시(토요일, 공휴일 휴무)사업자등록번호 :  877-88-03313  통신판매업신고 : 2026-부산해운대-0792호대표이사 : 여일석  주소 : 부산광역시  해운대구 해운대해변로 203 오션타워 1014호1:1문의하기자주 묻는 질문판매: sales@musticker.com이용약관개인정보처리방침사업자정보확인ⓒ 2026. All rights reserved.KR문의궁금한 점이 있으신가요? 제품이나 서비스에 대해 문의사항이 있으시면 언제든 메시지를 보내주세요.문의 유형선택상품디자인 파일 업로드결제배송교환/환불/취소회원가입/멤버십기타성함이메일 주소문의 내용첨부파일업로드할 파일을 이곳에 끌어서 올려주세요.허용되는 파일 :  .eps, .ai, .psd, .pdf, .tif, .tiff, .zip, .png, and .jpg. 최대 4개 파일 / 총 50MB까지 업로드 가능파일 선택취소문의하기"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - link "Musticker" [ref=e7] [cursor=pointer]:
          - /url: /kr
          - img "musticker logo" [ref=e8]
        - generic [ref=e9]:
          - button "공지사항 열기" [ref=e11] [cursor=pointer]:
            - img [ref=e13]
          - button "layout.header.search" [ref=e15] [cursor=pointer]:
            - img [ref=e16]
          - button "장바구니" [ref=e19] [cursor=pointer]:
            - img [ref=e20]
          - button "계정" [ref=e23] [cursor=pointer]:
            - img [ref=e25]
      - navigation "Primary":
        - link "스티커" [ref=e27] [cursor=pointer]:
          - /url: /kr/stickers
        - link "롤스티커" [ref=e28] [cursor=pointer]:
          - /url: /kr/roll-stickers
        - link "시트 스티커" [ref=e29] [cursor=pointer]:
          - /url: /kr/sheet-stickers
  - main [ref=e30]:
    - main [ref=e31]:
      - generic [ref=e33]:
        - generic:
          - img "스티커ㅋㅋㅋ,"
        - generic [ref=e34]:
          - generic [ref=e35]:
            - heading "스티커ㅋㅋㅋ, 이유가 있구나" [level=1] [ref=e36]:
              - text: 스티커ㅋㅋㅋ,
              - generic [ref=e37]: 이유가 있구나
            - paragraph [ref=e38]: 빠른데, 퀄리티까지 미쳤다
          - button "빠른 주문" [ref=e39] [cursor=pointer]:
            - generic [ref=e40]: 빠른 주문
      - generic [ref=e41]:
        - generic [ref=e43]:
          - link "스티커" [ref=e44] [cursor=pointer]:
            - /url: /kr/stickers/die-cut-sticker
            - img [ref=e46]
            - paragraph [ref=e47]: 스티커
          - link "롤스티커" [ref=e48] [cursor=pointer]:
            - /url: /kr/roll-stickers/die-cut-roll
            - img [ref=e50]
            - paragraph [ref=e51]: 롤스티커
          - link "판스티커" [ref=e52] [cursor=pointer]:
            - /url: /kr/stickers/sticker-sheet
            - img [ref=e54]
            - paragraph [ref=e55]: 판스티커
          - link "홀로그램" [ref=e56] [cursor=pointer]:
            - /url: /kr/stickers/hologram-sticker
            - img [ref=e58]
            - paragraph [ref=e59]: 홀로그램
          - link "레터링" [ref=e60] [cursor=pointer]:
            - /url: /kr/stickers/vinyl-lettering
            - img [ref=e62]
            - paragraph [ref=e63]: 레터링
        - generic [ref=e65]:
          - generic [ref=e66]:
            - button "음소거 해제" [ref=e68] [cursor=pointer]:
              - img [ref=e69]
            - button "전체화면" [ref=e71] [cursor=pointer]:
              - img [ref=e72]
          - generic [ref=e74]:
            - heading "급해서 맡겼는데, 퀄리티 때문에 기억나는 스티커" [level=2] [ref=e75]:
              - text: 급해서 맡겼는데,
              - text: 퀄리티 때문에 기억나는 스티커
            - paragraph [ref=e76]: 파일만 첨부하면 시안이 전달되고, 승인 즉시 제작이 시작됩니다. 급한 작업이어도 색감·라인·마감까지 정교해 “여기 또 써야겠다”는 말이 나올 거예요. 우리는 빨리 만드는 게 아니라, 빠르게 ‘잘’ 만드는 것을 목표로 합니다.
        - region "고객 리뷰 캐러셀" [ref=e77]:
          - generic [ref=e78]:
            - generic [ref=e79]:
              - heading "사진 후기 0개, 만족도는 이미 증명됐어요" [level=2] [ref=e80]:
                - text: 사진 후기 0개,
                - text: 만족도는 이미 증명됐어요
              - generic [ref=e81]:
                - button "이전 리뷰로 이동" [disabled] [ref=e82]:
                  - img [ref=e83]
                  - generic [ref=e85]: 이전 리뷰로 이동
                - button "다음 리뷰로 이동" [disabled] [ref=e86]:
                  - img [ref=e87]
                  - generic [ref=e89]: 다음 리뷰로 이동
            - region "고객 리뷰 캐러셀"
        - generic [ref=e91]:
          - article [ref=e92]:
            - img "100% 품질 보장" [ref=e94]
            - generic [ref=e95]:
              - heading "100% 품질 보장" [level=3] [ref=e96]
              - paragraph [ref=e97]: 문제가 생기면 변명하지 않습니다 재인쇄 또는 환불까지 끝까지 책임집니다
          - article [ref=e98]:
            - img "오늘 제작 · 내일 발송" [ref=e100]
            - generic [ref=e101]:
              - heading "오늘 제작 · 내일 발송" [level=3] [ref=e102]
              - paragraph [ref=e103]: 디자인 승인 후 바로 제작이 시작되며, 승인이 빠를수록 다음 날 바로 출고됩니다
          - article [ref=e104]:
            - img "5만원 이상 무료배송" [ref=e106]
            - generic [ref=e107]:
              - heading "5만원 이상 무료배송" [level=3] [ref=e108]
              - paragraph [ref=e109]: 기본 배송비는 3,000원이며, 5만원 이상 주문 시 무료배송입니다
        - generic [ref=e112]:
          - heading "처음 주문해도 걱정할 필요 없어요" [level=2] [ref=e113]:
            - text: 처음 주문해도
            - text: 걱정할 필요 없어요
          - generic [ref=e114]:
            - button "바로 주문하기" [ref=e115] [cursor=pointer]:
              - generic [ref=e116]: 바로 주문하기
            - button "제작 문의하기" [ref=e117] [cursor=pointer]:
              - generic [ref=e118]: 제작 문의하기
    - navigation "네이버 톡톡으로 문의하기" [ref=e119]:
      - link "카카오채널로 문의하기" [ref=e120] [cursor=pointer]:
        - /url: https://pf.kakao.com/_nJxnTX/chat
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 카카오채널로 문의하기
        - img [ref=e122]
      - link "네이버 톡톡 으로 문의하기" [ref=e123] [cursor=pointer]:
        - /url: https://talk.naver.com/ct/w2luxqo
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 네이버 톡톡 으로 문의하기
        - img [ref=e125]
      - generic "이메일로 문의하기" [ref=e126] [cursor=pointer]:
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 이메일로 문의하기
        - img [ref=e128]
  - contentinfo [ref=e129]:
    - generic [ref=e130]:
      - generic [ref=e131]:
        - heading "MUSTICKER / 머스티커" [level=2] [ref=e132]
        - paragraph [ref=e133]: "상호명: (주)글로픽스"
        - paragraph [ref=e134]: "사업자등록번호 : 877-88-03313 통신판매업신고 : 2026-부산해운대-0792호"
        - paragraph [ref=e135]: "대표이사 : 여일석 주소 : 부산광역시 해운대구 해운대해변로 203 오션타워 1014호"
        - paragraph [ref=e136]:
          - generic [ref=e137]: ⓒ 2026. All rights reserved.
          - generic [ref=e138]: "판매: sales@musticker.com"
          - link "이용약관" [ref=e139] [cursor=pointer]:
            - /url: /kr/terms-of-use
          - link "개인정보처리방침" [ref=e140] [cursor=pointer]:
            - /url: /kr/privacy-policy
          - generic [ref=e141] [cursor=pointer]: 사업자정보확인
      - generic [ref=e142]:
        - paragraph [ref=e143]: 1899-5529
        - paragraph [ref=e145]: 오전 9시 ~ 오후 6시(토요일, 공휴일 휴무)
        - generic [ref=e146]:
          - button "1:1문의하기" [ref=e147] [cursor=pointer]
          - link "자주 묻는 질문" [ref=e148] [cursor=pointer]:
            - /url: /kr/faq
```

# Test source

```ts
  1  | import type { Locator, Page } from '@playwright/test';
  2  | import { expect } from '@playwright/test';
  3  | 
  4  | import { appPath } from '../fixtures/env.js';
  5  | import { ko } from '../fixtures/storefront-data.js';
  6  | import { HeaderComponent } from './header-component.js';
  7  | 
  8  | export class HomeV2Page {
  9  |   readonly page: Page;
  10 |   readonly header: HeaderComponent;
  11 | 
  12 |   constructor(page: Page) {
  13 |     this.page = page;
  14 |     this.header = new HeaderComponent(page);
  15 |   }
  16 | 
  17 |   async goto(): Promise<void> {
  18 |     await this.page.goto(appPath());
  19 |     await this.header.expectVisible();
  20 |   }
  21 | 
  22 |   async expectCriticalContent(): Promise<void> {
  23 |     await expect(this.page).toHaveTitle(/\uba38\uc2a4\ud2f0\ucee4/);
  24 |     await expect(this.page.getByRole('heading', { name: ko.homeHero })).toBeVisible();
  25 |     await expect(this.page.getByRole('link', { name: ko.stickers, exact: true }).first()).toBeVisible();
  26 |     await expect(this.page.getByRole('link', { name: ko.rollStickers, exact: true }).first()).toBeVisible();
  27 |     await expect(this.page.getByRole('link', { name: ko.sheetStickers, exact: true }).first()).toBeVisible();
  28 |     await expect(this.page.getByRole('button', { name: ko.fastOrder })).toBeVisible();
  29 |     await expect(this.page.getByRole('button', { name: ko.orderNow })).toBeVisible();
  30 |     await expect(this.page.getByRole('button', { name: ko.inquiryCta })).toBeVisible();
> 31 |     await expect(this.page.locator('body')).toContainText(ko.reviews225);
     |                                             ^ Error: expect(locator).toContainText(expected) failed
  32 |     await this.expectFooterContent();
  33 |   }
  34 | 
  35 |   async expectFooterContent(): Promise<void> {
  36 |     const footer = this.footer();
  37 | 
  38 |     await expect(footer).toContainText(ko.footerBrand);
  39 |     await expect(footer).toContainText('1899-5529');
  40 |     await expect(footer).toContainText('sales@musticker.com');
  41 |     await expect(this.page.getByRole('link', { name: ko.terms }).first()).toBeVisible();
  42 |     await expect(this.page.getByRole('link', { name: ko.privacy }).first()).toBeVisible();
  43 |     await expect(this.page.getByRole('link', { name: ko.faq }).first()).toBeVisible();
  44 |   }
  45 | 
  46 |   async expectLocaleControlStable(): Promise<void> {
  47 |     const localeButton = this.page.getByRole('button', { name: 'KR' }).last();
  48 | 
  49 |     if ((await localeButton.count()) === 0) {
  50 |       await expect(this.header.root).toBeVisible();
  51 |       return;
  52 |     }
  53 | 
  54 |     await expect(localeButton).toBeVisible();
  55 |     await localeButton.click();
  56 |     await expect(localeButton).toBeVisible();
  57 |     await this.page.keyboard.press('Escape').catch(() => undefined);
  58 |   }
  59 | 
  60 |   async goToCategory(linkName: string, expectedPath: RegExp): Promise<void> {
  61 |     await this.page.getByRole('link', { name: linkName, exact: true }).first().click();
  62 |     await expect(this.page).toHaveURL(expectedPath);
  63 |   }
  64 | 
  65 |   async openAccountEntry(): Promise<void> {
  66 |     await this.header.chooseLoginFromAccountMenu();
  67 |     await expect(this.page).toHaveURL(/\/kr\/auth\/login/);
  68 |   }
  69 | 
  70 |   private footer(): Locator {
  71 |     return this.page.getByRole('contentinfo').first().or(this.page.locator('footer').first()).first();
  72 |   }
  73 | }
  74 | 
```