# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: purchasing/sticker-catalog-configurator.spec.ts >> storefront v2 catalog: plain die-cut shape stickers >> MS-V2-062 circle sticker: custom individual size recalculates the price
- Location: tests/e2e/purchasing/sticker-catalog-configurator.spec.ts:57:3

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: Unexpected browser console errors or warnings

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "[warning] There are missing data that is required in pricing.",
+ ]
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('product-category-options').or(getByRole('complementary').filter({ hasText: /\uc0ac\uc774\uc988|\uc218\ub7c9|Size|Quantity/i })).first().getByRole('button', { name: '원하는 크기 입력' }).first()

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
    - generic [ref=e31]:
      - generic [ref=e33]:
        - generic:
          - navigation:
            - link "자유형 스티커 자유형 스티커":
              - /url: /kr/stickers/die-cut-sticker
              - generic:
                - img "자유형 스티커"
              - generic:
                - heading "자유형 스티커" [level=4]
            - link "원형 스티커 원형 스티커":
              - /url: /kr/stickers/circle-sticker
              - generic:
                - img "원형 스티커"
              - generic:
                - heading "원형 스티커" [level=4]
            - link "직사각형 스티커 직사각형 스티커":
              - /url: /kr/stickers/rectangle-sticker
              - generic:
                - img "직사각형 스티커"
              - generic:
                - heading "직사각형 스티커" [level=4]
            - link "정사각형 스티커 정사각형 스티커":
              - /url: /kr/stickers/square-sticker
              - generic:
                - img "정사각형 스티커"
              - generic:
                - heading "정사각형 스티커" [level=4]
            - link "타원형 스티커 타원형 스티커":
              - /url: /kr/stickers/oval-sticker
              - generic:
                - img "타원형 스티커"
              - generic:
                - heading "타원형 스티커" [level=4]
            - link "둥근 사각 스티커 둥근 사각 스티커":
              - /url: /kr/stickers/rounded-sticker
              - generic:
                - img "둥근 사각 스티커"
              - generic:
                - heading "둥근 사각 스티커" [level=4]
            - link "키스컷 스티커 키스컷 스티커":
              - /url: /kr/stickers/kiss-cut-sticker
              - generic:
                - img "키스컷 스티커"
              - generic:
                - heading "키스컷 스티커" [level=4]
            - link "커스텀 시트 스티커 커스텀 시트 스티커":
              - /url: /kr/stickers/sticker-sheet
              - generic:
                - img "커스텀 시트 스티커"
              - generic:
                - heading "커스텀 시트 스티커" [level=4]
            - link "투명 스티커 투명 스티커":
              - /url: /kr/stickers/clear-sticker
              - generic:
                - img "투명 스티커"
              - generic:
                - heading "투명 스티커" [level=4]
            - link "홀로그램 스티커 홀로그램 스티커":
              - /url: /kr/stickers/hologram-sticker
              - generic:
                - img "홀로그램 스티커"
              - generic:
                - heading "홀로그램 스티커" [level=4]
            - link "풀 컬러 레터링 스티커 풀 컬러 레터링 스티커":
              - /url: /kr/stickers/transfer-sticker
              - generic:
                - img "풀 컬러 레터링 스티커"
              - generic:
                - heading "풀 컬러 레터링 스티커" [level=4]
            - link "레터링 스티커 레터링 스티커":
              - /url: /kr/stickers/vinyl-lettering
              - generic:
                - img "레터링 스티커"
              - generic:
                - heading "레터링 스티커" [level=4]
        - generic [ref=e36]:
          - generic [ref=e37]:
            - generic [ref=e38]:
              - heading "원형 스티커" [level=1] [ref=e39]
              - paragraph [ref=e40]: 도톰한 프리미엄 소재와 매끄러운 곡선 커팅으로 완성한 깔끔한 원형 스티커
            - img "원형 스티커 preview poster" [ref=e42]
            - generic [ref=e44]:
              - button "소형 40x40 product.sizes.small40x40.label 작고 귀여운 크기로 휴대폰 케이스나 헬멧에 딱!" [ref=e45] [cursor=pointer]:
                - heading "소형 40x40" [level=4] [ref=e46]
                - img "product.sizes.small40x40.label" [ref=e47]
                - paragraph [ref=e48]: 작고 귀여운 크기로 휴대폰 케이스나 헬멧에 딱!
              - button "중형 60x60 product.sizes.medium60x60.label 텀블러·노트북에 잘 어울려요. 가장 인기 있는 사이즈예요." [ref=e49] [cursor=pointer]:
                - heading "중형 60x60" [level=4] [ref=e50]
                - img "product.sizes.medium60x60.label" [ref=e51]
                - paragraph [ref=e52]: 텀블러·노트북에 잘 어울려요. 가장 인기 있는 사이즈예요.
              - button "대형 80x80 product.sizes.large80x80.label 보드나 캐리어에 붙이면 눈에 잘 띄는 크기예요." [ref=e53] [cursor=pointer]:
                - heading "대형 80x80" [level=4] [ref=e54]
                - img "product.sizes.large80x80.label" [ref=e55]
                - paragraph [ref=e56]: 보드나 캐리어에 붙이면 눈에 잘 띄는 크기예요.
              - button "초대형 100x100 product.sizes.extraLarge100x100.label 차·아이스박스·공구함에도 딱 맞는 넉넉한 크기예요." [ref=e57] [cursor=pointer]:
                - heading "초대형 100x100" [level=4] [ref=e58]
                - img "product.sizes.extraLarge100x100.label" [ref=e59]
                - paragraph [ref=e60]: 차·아이스박스·공구함에도 딱 맞는 넉넉한 크기예요.
          - complementary [ref=e61]:
            - generic [ref=e62]:
              - generic [ref=e63]:
                - heading "사이즈를 선택하세요" [level=3] [ref=e64]
                - generic [ref=e65]: (단위:mm)
              - generic [ref=e66]:
                - button "소형 40x40" [ref=e67] [cursor=pointer]:
                  - generic [ref=e68]: 소형
                  - generic [ref=e69]: 40x40
                - button "중형 60x60" [ref=e70] [cursor=pointer]:
                  - generic [ref=e71]: 중형
                  - generic [ref=e72]: 60x60
                - button "대형 80x80" [ref=e73] [cursor=pointer]:
                  - generic [ref=e74]: 대형
                  - generic [ref=e75]: 80x80
                - button "초대형 100x100" [ref=e76] [cursor=pointer]:
                  - generic [ref=e77]: 초대형
                  - generic [ref=e78]: 100x100
                - generic [ref=e79] [cursor=pointer]:
                  - generic [ref=e80]:
                    - generic [ref=e81]:
                      - generic [ref=e82]: 너비
                      - spinbutton [active] [ref=e83]
                    - generic [ref=e84]: x
                    - generic [ref=e85]:
                      - generic [ref=e86]: 높이
                      - spinbutton [ref=e87]
                  - paragraph [ref=e88]: 가로·세로 각각 10~1500mm 사이로 입력해 주세요.
            - generic [ref=e89]:
              - heading "수량을 선택하세요" [level=3] [ref=e90]
              - generic [ref=e91]:
                - button "10개 0원" [ref=e92] [cursor=pointer]:
                  - generic [ref=e93]: 10개
                  - generic [ref=e94]: 0원
                - button "20개 0원" [ref=e95] [cursor=pointer]:
                  - generic [ref=e96]: 20개
                  - generic [ref=e97]: 0원
                - button "30개 0원" [ref=e98] [cursor=pointer]:
                  - generic [ref=e99]: 30개
                  - generic [ref=e100]: 0원
                - button "50개 0원" [ref=e101] [cursor=pointer]:
                  - generic [ref=e102]: 50개
                  - generic [ref=e103]: 0원
                - button "100개 0원" [ref=e104] [cursor=pointer]:
                  - generic [ref=e105]: 100개
                  - generic [ref=e106]: 0원
                - button "300개 0원" [ref=e107] [cursor=pointer]:
                  - generic [ref=e108]: 300개
                  - generic [ref=e109]: 0원
                - button "500개 0원" [ref=e110] [cursor=pointer]:
                  - generic [ref=e111]: 500개
                  - generic [ref=e112]: 0원
                - button "1,000개 0원" [ref=e113] [cursor=pointer]:
                  - generic [ref=e114]: 1,000개
                  - generic [ref=e115]: 0원
                - 'button "원하는 수량 입력 주문 가능 수량: 10-10,000개" [ref=e116] [cursor=pointer]':
                  - generic [ref=e117]:
                    - img [ref=e118]
                    - paragraph [ref=e120]: 원하는 수량 입력
                  - generic [ref=e121]: "주문 가능 수량: 10-10,000개"
            - generic [ref=e124]:
              - paragraph [ref=e126]:
                - strong [ref=e127]: 0원
              - paragraph [ref=e128]: (1매당 0원)
            - button "다음 단계" [disabled] [ref=e130]:
              - generic [ref=e131]: 다음 단계
            - list [ref=e133]:
              - listitem [ref=e134]: 5만원 이상 무료배송
              - listitem [ref=e135]: 3시 이전 시안 확정 시 당일배송
              - listitem [ref=e136]: "도착 예정일: 09.01 (화) · CJ 대한통운"
              - listitem [ref=e137]: 시안 승인 후 평균 1~3일 내 배송됩니다. (주말·공휴일 제외)
      - generic [ref=e139]:
        - article [ref=e140]:
          - img "오늘제작, 내일발송" [ref=e141]
          - heading "오늘제작, 내일발송" [level=4] [ref=e142]
          - paragraph [ref=e143]: 디자인 승인 즉시 제작이 시작됩니다 평균 1~2일 안에 당신의 손에 도착하죠
        - article [ref=e144]:
          - img "빠른 시안 피드백" [ref=e145]
          - heading "빠른 시안 피드백" [level=4] [ref=e146]
          - paragraph [ref=e147]: 결제 후 곧바로 시안을 받아보세요 마음이 ‘예스’ 할 때까지 수정 가능합니다
        - article [ref=e148]:
          - img "뛰어난 내구성과 내수성" [ref=e149]
          - heading "뛰어난 내구성과 내수성" [level=4] [ref=e150]
          - paragraph [ref=e151]: 두꺼운 프리미엄 재질로 색상, 접착력 그대로 오래갑니다
      - generic [ref=e153]:
        - article [ref=e154]:
          - generic [ref=e157]:
            - heading "색감은 생생하게, 내구성은 완벽하게" [level=3] [ref=e158]
            - paragraph [ref=e159]: 고품질 인쇄와 두꺼운 소재로 구현한 화려하고 선명한 색감. 비, 햇빛, 고온에도 쉽게 흐려지지 않는 뛰어난 내구성. 붙이는 순간부터 오래도록 변하지 않는 품질을 느껴보세요.
        - article [ref=e160]:
          - generic [ref=e163]:
            - heading "쉽게 붙이고, 깔끔하게 제거" [level=3] [ref=e164]
            - paragraph [ref=e165]: 매끄럽게 부착되고, 흔적 없이 깔끔하게 떨어집니다. 접착은 강력하지만, 표면은 안전하게 보호합니다. 필요할 땐 단번에 제거되고, 남는 건 깔끔함뿐입니다.
        - article [ref=e166]:
          - generic [ref=e169]:
            - heading "디자인에 맞게 정확하게 컷팅" [level=3] [ref=e170]
            - paragraph [ref=e171]: 로고, 일러스트, 사진을 업로드하면 칼선에 맞춰 정밀하게 스티커로 제작됩니다. 복잡한 패턴도 머스티커의 고유한 절단 기술로 완벽하게 표현됩니다.
      - generic [ref=e173]:
        - generic [ref=e174]:
          - generic [ref=e175]:
            - generic [ref=e176]: 좋아요 😀
            - generic [ref=e177]:
              - img [ref=e178]
              - img [ref=e180]
              - img [ref=e182]
              - img [ref=e184]
              - img [ref=e186]
            - generic [ref=e188]: "5.0"
          - heading "225개 사진 후기가 보장해요" [level=2] [ref=e189]
          - paragraph [ref=e190]: 직접 사용한 고객들의 생생한 리뷰를 확인해보세요. 리얼 사용 이미지와 함께 실제 만족도를 보여드립니다.
          - generic [ref=e191]:
            - button "이전 리뷰" [ref=e192] [cursor=pointer]:
              - img [ref=e193]
              - generic [ref=e195]: 이전 리뷰
            - button "다음 리뷰" [ref=e196] [cursor=pointer]:
              - img [ref=e197]
              - generic [ref=e199]: 다음 리뷰
        - generic [ref=e201]:
          - article [ref=e203]:
            - generic [ref=e204]:
              - img "tkop****" [ref=e206]
              - paragraph [ref=e208]: 빨리오고 너무 이쁘게 만들어주셔서 감사합니다 그리고 서비스도 20장 더 주셔서 감사합니다
            - generic [ref=e209]:
              - generic [ref=e210]:
                - img "tkop**** avatar" [ref=e211]
                - generic [ref=e212]:
                  - strong [ref=e213]: tkop****
                  - generic [ref=e214]: 2026-03-25
              - generic [ref=e215]:
                - img [ref=e216]
                - img [ref=e218]
                - img [ref=e220]
                - img [ref=e222]
                - img [ref=e224]
          - article [ref=e227]:
            - generic [ref=e228]:
              - img "oozz******" [ref=e230]
              - paragraph [ref=e232]: 잘나와서 만족합니다 잘쓰겠습니다
            - generic [ref=e233]:
              - generic [ref=e234]:
                - img "oozz****** avatar" [ref=e235]
                - generic [ref=e236]:
                  - strong [ref=e237]: oozz******
                  - generic [ref=e238]: 2026-03-22
              - generic [ref=e239]:
                - img [ref=e240]
                - img [ref=e242]
                - img [ref=e244]
                - img [ref=e246]
                - img [ref=e248]
          - article [ref=e251]:
            - generic [ref=e252]:
              - img "aktm********" [ref=e254]
              - paragraph [ref=e256]: 만족하면서 사용중입니다
            - generic [ref=e257]:
              - generic [ref=e258]:
                - img "aktm******** avatar" [ref=e259]
                - generic [ref=e260]:
                  - strong [ref=e261]: aktm********
                  - generic [ref=e262]: 2026-03-04
              - generic [ref=e263]:
                - img [ref=e264]
                - img [ref=e266]
                - img [ref=e268]
                - img [ref=e270]
                - img [ref=e272]
          - article [ref=e275]:
            - generic [ref=e276]:
              - img "aktm********" [ref=e278]
              - paragraph [ref=e280]: 잘 받았어요 잘쓸게요.
            - generic [ref=e281]:
              - generic [ref=e282]:
                - img "aktm******** avatar" [ref=e283]
                - generic [ref=e284]:
                  - strong [ref=e285]: aktm********
                  - generic [ref=e286]: 2026-01-31
              - generic [ref=e287]:
                - img [ref=e288]
                - img [ref=e290]
                - img [ref=e292]
                - img [ref=e294]
                - img [ref=e296]
          - article [ref=e299]:
            - generic [ref=e300]:
              - img "aktm********" [ref=e302]
              - paragraph [ref=e304]: 아주 잘쓰고있습니다.
            - generic [ref=e305]:
              - generic [ref=e306]:
                - img "aktm******** avatar" [ref=e307]
                - generic [ref=e308]:
                  - strong [ref=e309]: aktm********
                  - generic [ref=e310]: 2026-01-06
              - generic [ref=e311]:
                - img [ref=e312]
                - img [ref=e314]
                - img [ref=e316]
                - img [ref=e318]
                - img [ref=e320]
          - article [ref=e323]:
            - generic [ref=e324]:
              - img "aktm********" [ref=e326]
              - paragraph [ref=e328]: 아주 잘쓰고있습니다.
            - generic [ref=e329]:
              - generic [ref=e330]:
                - img "aktm******** avatar" [ref=e331]
                - generic [ref=e332]:
                  - strong [ref=e333]: aktm********
                  - generic [ref=e334]: 2026-01-06
              - generic [ref=e335]:
                - img [ref=e336]
                - img [ref=e338]
                - img [ref=e340]
                - img [ref=e342]
                - img [ref=e344]
          - article [ref=e347]:
            - generic [ref=e348]:
              - img "jiwn****" [ref=e350]
              - paragraph [ref=e352]: 아 정말 너무 좋아연ㅎㅎ
            - generic [ref=e353]:
              - generic [ref=e354]:
                - img "jiwn**** avatar" [ref=e355]
                - generic [ref=e356]:
                  - strong [ref=e357]: jiwn****
                  - generic [ref=e358]: 2025-12-29
              - generic [ref=e359]:
                - img [ref=e360]
                - img [ref=e362]
                - img [ref=e364]
                - img [ref=e366]
                - img [ref=e368]
          - article [ref=e371]:
            - generic [ref=e372]:
              - img "koj3***" [ref=e374]
              - paragraph [ref=e376]: 방수도 잘되고 오염에도 잘 버티고 좋아요. 적극 추천합니다.^^
            - generic [ref=e377]:
              - generic [ref=e378]:
                - img "koj3*** avatar" [ref=e379]
                - generic [ref=e380]:
                  - strong [ref=e381]: koj3***
                  - generic [ref=e382]: 2025-12-24
              - generic [ref=e383]:
                - img [ref=e384]
                - img [ref=e386]
                - img [ref=e388]
                - img [ref=e390]
                - img [ref=e392]
          - article [ref=e395]:
            - generic [ref=e396]:
              - img "aktm********" [ref=e398]
              - paragraph [ref=e400]: 이쁘네요 잘쓸게요.!!
            - generic [ref=e401]:
              - generic [ref=e402]:
                - img "aktm******** avatar" [ref=e403]
                - generic [ref=e404]:
                  - strong [ref=e405]: aktm********
                  - generic [ref=e406]: 2025-12-03
              - generic [ref=e407]:
                - img [ref=e408]
                - img [ref=e410]
                - img [ref=e412]
                - img [ref=e414]
                - img [ref=e416]
          - article [ref=e419]:
            - generic [ref=e420]:
              - img "aktm********" [ref=e422]
              - paragraph [ref=e424]: 이쁘게 잘뽑혔네요.
            - generic [ref=e425]:
              - generic [ref=e426]:
                - img "aktm******** avatar" [ref=e427]
                - generic [ref=e428]:
                  - strong [ref=e429]: aktm********
                  - generic [ref=e430]: 2025-11-30
              - generic [ref=e431]:
                - img [ref=e432]
                - img [ref=e434]
                - img [ref=e436]
                - img [ref=e438]
                - img [ref=e440]
          - article [ref=e443]:
            - generic [ref=e444]:
              - img "circ*****" [ref=e446]
              - paragraph [ref=e448]: 품질도 좋고 응대도 잘해주셔서 이쁘게 나왔네요
            - generic [ref=e449]:
              - generic [ref=e450]:
                - img "circ***** avatar" [ref=e451]
                - generic [ref=e452]:
                  - strong [ref=e453]: circ*****
                  - generic [ref=e454]: 2025-11-20
              - generic [ref=e455]:
                - img [ref=e456]
                - img [ref=e458]
                - img [ref=e460]
                - img [ref=e462]
                - img [ref=e464]
          - article [ref=e467]:
            - generic [ref=e468]:
              - img "pina******" [ref=e470]
              - paragraph [ref=e472]: 부착 잘되고 제거할때 끈적임 없이 깔끔하게 떨어져서 좋아요
            - generic [ref=e473]:
              - generic [ref=e474]:
                - img "pina****** avatar" [ref=e475]
                - generic [ref=e476]:
                  - strong [ref=e477]: pina******
                  - generic [ref=e478]: 2025-08-22
              - generic [ref=e479]:
                - img [ref=e480]
                - img [ref=e482]
                - img [ref=e484]
                - img [ref=e486]
                - img [ref=e488]
          - article [ref=e491]:
            - generic [ref=e492]:
              - img "qcyc*****" [ref=e494]
              - paragraph [ref=e496]: 덕분에 넘넘 잘썼습니다
            - generic [ref=e497]:
              - generic [ref=e498]:
                - img "qcyc***** avatar" [ref=e499]
                - generic [ref=e500]:
                  - strong [ref=e501]: qcyc*****
                  - generic [ref=e502]: 2025-08-15
              - generic [ref=e503]:
                - img [ref=e504]
                - img [ref=e506]
                - img [ref=e508]
                - img [ref=e510]
                - img [ref=e512]
          - article [ref=e515]:
            - generic [ref=e516]:
              - img "rlad*******" [ref=e518]
              - paragraph [ref=e520]: 꼼꼼하게 체크해주셔서 너무좋았습니다!
            - generic [ref=e521]:
              - generic [ref=e522]:
                - img "rlad******* avatar" [ref=e523]
                - generic [ref=e524]:
                  - strong [ref=e525]: rlad*******
                  - generic [ref=e526]: 2025-07-17
              - generic [ref=e527]:
                - img [ref=e528]
                - img [ref=e530]
                - img [ref=e532]
                - img [ref=e534]
                - img [ref=e536]
          - article [ref=e539]:
            - generic [ref=e540]:
              - img "csbn*****" [ref=e542]
              - paragraph [ref=e544]: 배송도 빠르고 재질도 좋고 너무 좋아요 감사합니다!
            - generic [ref=e545]:
              - generic [ref=e546]:
                - img "csbn***** avatar" [ref=e547]
                - generic [ref=e548]:
                  - strong [ref=e549]: csbn*****
                  - generic [ref=e550]: 2025-07-14
              - generic [ref=e551]:
                - img [ref=e552]
                - img [ref=e554]
                - img [ref=e556]
                - img [ref=e558]
                - img [ref=e560]
          - article [ref=e563]:
            - generic [ref=e564]:
              - img "pina******" [ref=e566]
              - paragraph [ref=e568]: 생각한대로 너무 깔끔하게 나왔어요! 다음에도 주문하겠습니다!!
            - generic [ref=e569]:
              - generic [ref=e570]:
                - img "pina****** avatar" [ref=e571]
                - generic [ref=e572]:
                  - strong [ref=e573]: pina******
                  - generic [ref=e574]: 2025-07-09
              - generic [ref=e575]:
                - img [ref=e576]
                - img [ref=e578]
                - img [ref=e580]
                - img [ref=e582]
                - img [ref=e584]
          - article [ref=e587]:
            - generic [ref=e588]:
              - img "jay8***" [ref=e590]
              - paragraph [ref=e592]: 이쁘게 뽑아주셔서 감사합니다
            - generic [ref=e593]:
              - generic [ref=e594]:
                - img "jay8*** avatar" [ref=e595]
                - generic [ref=e596]:
                  - strong [ref=e597]: jay8***
                  - generic [ref=e598]: 2025-06-21
              - generic [ref=e599]:
                - img [ref=e600]
                - img [ref=e602]
                - img [ref=e604]
                - img [ref=e606]
                - img [ref=e608]
          - article [ref=e611]:
            - generic [ref=e612]:
              - img "rlad****" [ref=e614]
              - paragraph [ref=e616]: 재주문인데 대응도 빠르고 편했습니다 감사합니다
            - generic [ref=e617]:
              - generic [ref=e618]:
                - img "rlad**** avatar" [ref=e619]
                - generic [ref=e620]:
                  - strong [ref=e621]: rlad****
                  - generic [ref=e622]: 2025-06-13
              - generic [ref=e623]:
                - img [ref=e624]
                - img [ref=e626]
                - img [ref=e628]
                - img [ref=e630]
                - img [ref=e632]
          - article [ref=e635]:
            - generic [ref=e636]:
              - img "jiwn****" [ref=e638]
              - paragraph [ref=e640]: 스티커 잘 만들어줘요 고급 자재쓰는거 같습니다
            - generic [ref=e641]:
              - generic [ref=e642]:
                - img "jiwn**** avatar" [ref=e643]
                - generic [ref=e644]:
                  - strong [ref=e645]: jiwn****
                  - generic [ref=e646]: 2025-04-30
              - generic [ref=e647]:
                - img [ref=e648]
                - img [ref=e650]
                - img [ref=e652]
                - img [ref=e654]
                - img [ref=e656]
          - article [ref=e659]:
            - generic [ref=e660]:
              - img "xm****" [ref=e662]
              - paragraph [ref=e664]: 작아서 어쩌나 했는데 생각보다 괜찮네요~
            - generic [ref=e665]:
              - generic [ref=e666]:
                - img "xm**** avatar" [ref=e667]
                - generic [ref=e668]:
                  - strong [ref=e669]: xm****
                  - generic [ref=e670]: 2025-04-07
              - generic [ref=e671]:
                - img [ref=e672]
                - img [ref=e674]
                - img [ref=e676]
                - img [ref=e678]
                - img [ref=e680]
          - article [ref=e683]:
            - generic [ref=e684]:
              - img "rkf4***" [ref=e686]
              - paragraph [ref=e688]: 최고이니 계속 제작 구매하죠^^
            - generic [ref=e689]:
              - generic [ref=e690]:
                - img "rkf4*** avatar" [ref=e691]
                - generic [ref=e692]:
                  - strong [ref=e693]: rkf4***
                  - generic [ref=e694]: 2025-04-01
              - generic [ref=e695]:
                - img [ref=e696]
                - img [ref=e698]
                - img [ref=e700]
                - img [ref=e702]
                - img [ref=e704]
          - article [ref=e707]:
            - generic [ref=e708]:
              - img "rkf4***" [ref=e710]
              - paragraph [ref=e712]: 복잡한주문 잘처리해주셔서 만족입니다 단골이 되었습니다 최고에요
            - generic [ref=e713]:
              - generic [ref=e714]:
                - img "rkf4*** avatar" [ref=e715]
                - generic [ref=e716]:
                  - strong [ref=e717]: rkf4***
                  - generic [ref=e718]: 2025-03-27
              - generic [ref=e719]:
                - img [ref=e720]
                - img [ref=e722]
                - img [ref=e724]
                - img [ref=e726]
                - img [ref=e728]
          - article [ref=e731]:
            - generic [ref=e732]:
              - img "rkf4***" [ref=e734]
              - paragraph [ref=e736]: 주문을 여러개로해서....ㅋ 마치 리뷰 도배같네요...ㅠㅠ 품질 최고입니다
            - generic [ref=e737]:
              - generic [ref=e738]:
                - img "rkf4*** avatar" [ref=e739]
                - generic [ref=e740]:
                  - strong [ref=e741]: rkf4***
                  - generic [ref=e742]: 2025-03-27
              - generic [ref=e743]:
                - img [ref=e744]
                - img [ref=e746]
                - img [ref=e748]
                - img [ref=e750]
                - img [ref=e752]
          - article [ref=e755]:
            - generic [ref=e756]:
              - img "rkf4***" [ref=e758]
              - paragraph [ref=e760]: 주문을 조금 복잡하게 드렸는데도 잘처리해주시고... 품질은 말할것도 없이 최고입니다.. 여분도 챙겨주시고 단골이 되었네요^^
            - generic [ref=e761]:
              - generic [ref=e762]:
                - img "rkf4*** avatar" [ref=e763]
                - generic [ref=e764]:
                  - strong [ref=e765]: rkf4***
                  - generic [ref=e766]: 2025-03-27
              - generic [ref=e767]:
                - img [ref=e768]
                - img [ref=e770]
                - img [ref=e772]
                - img [ref=e774]
                - img [ref=e776]
          - article [ref=e779]:
            - generic [ref=e780]:
              - img "rkf4***" [ref=e782]
              - paragraph [ref=e784]: 복잡한주문 잘처리해주셔서 만족입니다 단골이 되었습니다 최고에요
            - generic [ref=e785]:
              - generic [ref=e786]:
                - img "rkf4*** avatar" [ref=e787]
                - generic [ref=e788]:
                  - strong [ref=e789]: rkf4***
                  - generic [ref=e790]: 2025-03-27
              - generic [ref=e791]:
                - img [ref=e792]
                - img [ref=e794]
                - img [ref=e796]
                - img [ref=e798]
                - img [ref=e800]
          - article [ref=e803]:
            - generic [ref=e804]:
              - img "rkf4***" [ref=e806]
              - paragraph [ref=e808]: 복잡한주문 잘처리해주셔서 만족입니다 단골이 되었습니다 최고에요
            - generic [ref=e809]:
              - generic [ref=e810]:
                - img "rkf4*** avatar" [ref=e811]
                - generic [ref=e812]:
                  - strong [ref=e813]: rkf4***
                  - generic [ref=e814]: 2025-03-27
              - generic [ref=e815]:
                - img [ref=e816]
                - img [ref=e818]
                - img [ref=e820]
                - img [ref=e822]
                - img [ref=e824]
          - article [ref=e827]:
            - generic [ref=e828]:
              - img "rkf4***" [ref=e830]
              - paragraph [ref=e832]: 원하는디자인 원하는 모양대로 제작할수 있어 좋와요 사용해보고 좋와서 계속 이용합니다
            - generic [ref=e833]:
              - generic [ref=e834]:
                - img "rkf4*** avatar" [ref=e835]
                - generic [ref=e836]:
                  - strong [ref=e837]: rkf4***
                  - generic [ref=e838]: 2025-03-27
              - generic [ref=e839]:
                - img [ref=e840]
                - img [ref=e842]
                - img [ref=e844]
                - img [ref=e846]
                - img [ref=e848]
          - article [ref=e851]:
            - generic [ref=e852]:
              - img "rkf4***" [ref=e854]
              - paragraph [ref=e856]: 단골되었습니다^^ 최고에요
            - generic [ref=e857]:
              - generic [ref=e858]:
                - img "rkf4*** avatar" [ref=e859]
                - generic [ref=e860]:
                  - strong [ref=e861]: rkf4***
                  - generic [ref=e862]: 2025-03-27
              - generic [ref=e863]:
                - img [ref=e864]
                - img [ref=e866]
                - img [ref=e868]
                - img [ref=e870]
                - img [ref=e872]
          - article [ref=e875]:
            - generic [ref=e876]:
              - img "rkf4***" [ref=e878]
              - paragraph [ref=e880]: 복잡한주문 잘처리해주셔서 만족입니다
            - generic [ref=e881]:
              - generic [ref=e882]:
                - img "rkf4*** avatar" [ref=e883]
                - generic [ref=e884]:
                  - strong [ref=e885]: rkf4***
                  - generic [ref=e886]: 2025-03-27
              - generic [ref=e887]:
                - img [ref=e888]
                - img [ref=e890]
                - img [ref=e892]
                - img [ref=e894]
                - img [ref=e896]
          - article [ref=e899]:
            - generic [ref=e900]:
              - img "jiwn****" [ref=e902]
              - paragraph [ref=e904]: 미쳐쬬…퀄리티 너무 좋습니다
            - generic [ref=e905]:
              - generic [ref=e906]:
                - img "jiwn**** avatar" [ref=e907]
                - generic [ref=e908]:
                  - strong [ref=e909]: jiwn****
                  - generic [ref=e910]: 2025-03-26
              - generic [ref=e911]:
                - img [ref=e912]
                - img [ref=e914]
                - img [ref=e916]
                - img [ref=e918]
                - img [ref=e920]
          - article [ref=e923]:
            - generic [ref=e924]:
              - img "togs***" [ref=e926]
              - paragraph [ref=e928]: 깔끔하게 잘 나왔습니다. 서비스도 여러장 챙겨주셔서 고맙습니다~
            - generic [ref=e929]:
              - generic [ref=e930]:
                - img "togs*** avatar" [ref=e931]
                - generic [ref=e932]:
                  - strong [ref=e933]: togs***
                  - generic [ref=e934]: 2025-03-20
              - generic [ref=e935]:
                - img [ref=e936]
                - img [ref=e938]
                - img [ref=e940]
                - img [ref=e942]
                - img [ref=e944]
          - article [ref=e947]:
            - generic [ref=e948]:
              - img "rkf4***" [ref=e950]
              - paragraph [ref=e952]: 엳시나 빠르고 품질 좋와요...서비스로 여유분도 많이 챙겨주셨네요??
            - generic [ref=e953]:
              - generic [ref=e954]:
                - img "rkf4*** avatar" [ref=e955]
                - generic [ref=e956]:
                  - strong [ref=e957]: rkf4***
                  - generic [ref=e958]: 2025-02-20
              - generic [ref=e959]:
                - img [ref=e960]
                - img [ref=e962]
                - img [ref=e964]
                - img [ref=e966]
                - img [ref=e968]
      - generic [ref=e971]:
        - generic [ref=e972]:
          - img "text" [ref=e973]
          - generic [ref=e974]:
            - heading "원형 스티커 FAQ" [level=2] [ref=e975]
            - paragraph [ref=e976]:
              - text: 멤버십, 주문, 디자인 파일 업로드, 인쇄, 결제, 반품·환불에 대한 자세한 내용은 자주 묻는
              - link "질문(FAQ) 페이지에서 확인해 주세요" [ref=e977] [cursor=pointer]:
                - /url: https://www.musticker.com/faq
              - text: .
        - generic [ref=e978]:
          - generic [ref=e979]:
            - generic [ref=e980] [cursor=pointer]:
              - heading "원형 스티커에는 어떤 디자인이 잘 어울리나요?" [level=3] [ref=e981]
              - paragraph [ref=e984]: 원형 스티커는 원형 로고, 아이콘, 심플한 그래픽과 잘 어울립니다. 디자인을 중앙에 배치하면 더욱 균형감 있고 깔끔한 느낌을 연출할 수 있습니다.
            - button [ref=e985] [cursor=pointer]:
              - img [ref=e986]
          - generic [ref=e988]:
            - generic [ref=e989] [cursor=pointer]:
              - heading "원형 스티커는 주로 어디에 사용되나요?" [level=3] [ref=e990]
              - paragraph [ref=e991]: 원형 스티커는 제품 라벨, 패키지 씰, 홍보용 스티커 등 다양한 용도로 많이 사용됩니다. 심플한 디자인부터 디테일한 그래픽까지 모두 잘 어울립니다.
            - button [ref=e992] [cursor=pointer]:
              - img [ref=e993]
          - generic [ref=e995]:
            - generic [ref=e996] [cursor=pointer]:
              - heading "원형 스티커는 어떤 사이즈가 가장 많이 사용되나요?" [level=3] [ref=e997]
              - paragraph [ref=e998]: 사용 목적에 따라 적합한 사이즈가 달라집니다. 중형 사이즈는 제품 포장과 홍보용으로 많이 사용되며, 용도에 맞게 다양한 사이즈로 제작할 수 있습니다.
            - button [ref=e999] [cursor=pointer]:
              - img [ref=e1000]
          - generic [ref=e1002]:
            - generic [ref=e1003] [cursor=pointer]:
              - heading "원형 스티커는 심플한 디자인에도 잘 어울리나요?" [level=3] [ref=e1004]
              - paragraph [ref=e1005]: 네. 원형 스티커는 심플한 디자인과 여백을 살린 레이아웃에 잘 어울립니다. 브랜드 로고, 제품 패키지, 홍보용 스티커 등 다양한 용도로 활용할 수 있습니다.
            - button [ref=e1006] [cursor=pointer]:
              - img [ref=e1007]
          - generic [ref=e1009]:
            - generic [ref=e1010] [cursor=pointer]:
              - heading "원형 스티커는 실외에서도 사용할 수 있나요?" [level=3] [ref=e1011]
              - paragraph [ref=e1012]: 네. 머스티커의 원형 스티커는 방수 기능이 있고 내구성이 뛰어나 실내외에서 사용할 수 있으며, 습기와 햇빛, 일상적인 마모에도 강합니다. 깨끗한 표면에 부착하면 더욱 오래 사용할 수 있습니다. 다만 날카로운 물체나 강한 마찰에는 긁힘이 생길 수 있으니 주의해 주세요.
            - button [ref=e1013] [cursor=pointer]:
              - img [ref=e1014]
        - generic [ref=e1016]:
          - generic [ref=e1017]:
            - heading "궁금한 점이 더 있으신가요?" [level=4] [ref=e1018]
            - paragraph [ref=e1019]: 원하시는 답변을 찾지 못하셨다면 언제든지 문의해 주세요.
          - button "문의하기" [ref=e1020] [cursor=pointer]:
            - generic [ref=e1021]: 문의하기
    - navigation "네이버 톡톡으로 문의하기" [ref=e1022]:
      - link "카카오채널로 문의하기" [ref=e1023] [cursor=pointer]:
        - /url: https://pf.kakao.com/_nJxnTX/chat
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 카카오채널로 문의하기
        - img [ref=e1025]
      - link "네이버 톡톡 으로 문의하기" [ref=e1026] [cursor=pointer]:
        - /url: https://talk.naver.com/ct/w2luxqo
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 네이버 톡톡 으로 문의하기
        - img [ref=e1028]
      - generic "이메일로 문의하기" [ref=e1029] [cursor=pointer]:
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 이메일로 문의하기
        - img [ref=e1031]
  - contentinfo [ref=e1032]:
    - generic [ref=e1033]:
      - generic [ref=e1034]:
        - heading "MUSTICKER / 머스티커" [level=2] [ref=e1035]
        - paragraph [ref=e1036]: "상호명: (주)글로픽스"
        - paragraph [ref=e1037]: "사업자등록번호 : 877-88-03313 통신판매업신고 : 2026-부산해운대-0792호"
        - paragraph [ref=e1038]: "대표이사 : 여일석 주소 : 부산광역시 해운대구 해운대해변로 203 오션타워 1014호"
        - paragraph [ref=e1039]: "호스팅사업자 : 아마존웹서비시즈(Amazon Web Services)"
        - paragraph [ref=e1040]:
          - generic [ref=e1041]: ⓒ 2026. All rights reserved.
          - generic [ref=e1042]: "판매: sales@musticker.com"
          - link "이용약관" [ref=e1043] [cursor=pointer]:
            - /url: /kr/terms-of-use
          - link "개인정보처리방침" [ref=e1044] [cursor=pointer]:
            - /url: /kr/privacy-policy
          - generic [ref=e1045] [cursor=pointer]: 사업자정보확인
          - link "회사소개" [ref=e1046] [cursor=pointer]:
            - /url: /kr/about
      - generic [ref=e1047]:
        - paragraph [ref=e1048]: 1899-5529
        - paragraph [ref=e1050]: 오전 9시 ~ 오후 6시(토요일, 공휴일 휴무)
        - generic [ref=e1051]:
          - button "1:1문의하기" [ref=e1052] [cursor=pointer]
          - link "자주 묻는 질문" [ref=e1053] [cursor=pointer]:
            - /url: /kr/faq
        - generic [ref=e1054]:
          - generic [ref=e1055]: "Follow us at:"
          - generic [ref=e1056]:
            - link "instagram icon" [ref=e1057] [cursor=pointer]:
              - /url: https://www.instagram.com/musticker_official/
              - img "instagram icon"
            - link "youtube icon" [ref=e1058] [cursor=pointer]:
              - /url: https://www.youtube.com/@MustickerOfficial
              - img "youtube icon"
```

# Test source

```ts
  1   | import type { Locator, Page } from '@playwright/test';
  2   | import { expect } from '@playwright/test';
  3   | 
  4   | import { appPath } from '../fixtures/env.js';
  5   | import { parseWon } from '../fixtures/money.js';
  6   | import { gotoStorefront } from '../fixtures/navigation.js';
  7   | import { ko } from '../fixtures/storefront-data.js';
  8   | 
  9   | const wonAmountPattern = /[\d,]+\uc6d0/u;
  10  | 
  11  | export class ProductV2Page {
  12  |   readonly page: Page;
  13  |   readonly optionsPanel: Locator;
  14  | 
  15  |   constructor(page: Page) {
  16  |     this.page = page;
  17  |     this.optionsPanel = page
  18  |       .getByTestId('product-category-options')
  19  |       .or(page.getByRole('complementary').filter({ hasText: /\uc0ac\uc774\uc988|\uc218\ub7c9|Size|Quantity/i }))
  20  |       .first();
  21  |   }
  22  | 
  23  |   async goto(path: string, heading: string): Promise<void> {
  24  |     await gotoStorefront(this.page, appPath(path));
  25  |     await expect(this.page.getByRole('heading', { name: heading, exact: true }).first()).toBeVisible();
  26  |     await expect(this.optionsPanel).toBeVisible();
  27  |   }
  28  | 
  29  |   async expectCatalogEntryRenders(path: string): Promise<void> {
  30  |     await gotoStorefront(this.page, appPath(path));
  31  |     await expect(this.page).toHaveURL(new RegExp(`${escapeRegExp(path.replace(/^\.\//, ''))}/?$`));
  32  |     await expect(this.page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  33  |     await expect(this.optionsPanel).toBeVisible();
  34  |   }
  35  | 
  36  |   async addToCart(): Promise<void> {
  37  |     await this.nextStepButton().click();
  38  | 
  39  |     const addToCartButton = this.page.getByRole('dialog').getByRole('button', { name: ko.addToCart });
  40  |     await expect(addToCartButton).toBeVisible();
  41  |     await addToCartButton.click();
  42  |   }
  43  | 
  44  |   async selectSize(sizeName: string): Promise<void> {
  45  |     await this.optionsPanel.getByRole('button', { name: new RegExp(escapeRegExp(sizeName)) }).first().click();
  46  |   }
  47  | 
  48  |   async selectMaterial(materialName: string): Promise<void> {
  49  |     await this.optionsPanel.getByRole('button', { name: materialName }).click();
  50  |   }
  51  | 
  52  |   // vinyl-lettering and transfer-sticker expose color choices as `.color-swatch` buttons whose
  53  |   // accessible name (aria-label) is the English color name (e.g. "Black"); the Korean label used
  54  |   // elsewhere in this suite only exists in a child `.color-swatch-tooltip` span, so this can't use
  55  |   // the getByRole name-matching that selectMaterial relies on.
  56  |   async selectSwatchColor(koreanColorLabel: string): Promise<void> {
  57  |     await this.optionsPanel.locator('.color-swatch').filter({ hasText: koreanColorLabel }).first().click();
  58  |   }
  59  | 
  60  |   async selectSheetSize(sizeName: string): Promise<void> {
  61  |     await this.optionsPanel.getByRole('button', { name: new RegExp(`^${escapeRegExp(sizeName)}`) }).first().click();
  62  |   }
  63  | 
  64  |   async selectQuantity(quantity: number): Promise<void> {
  65  |     const quantityLabel = new RegExp(`^${quantity.toLocaleString('en-US')}\\s*(?:\\S+)?\\s*${wonAmountPattern.source}`, 'u');
  66  |     await this.optionsPanel.getByRole('button', { name: quantityLabel }).first().click();
  67  |   }
  68  | 
  69  |   async selectCustomIndividualSize(widthMm: number, heightMm: number): Promise<void> {
  70  |     const widthInput = this.optionsPanel.getByPlaceholder('가로');
  71  | 
  72  |     // Clicking the custom-size pill before Vue has hydrated silently does nothing (and a blind
  73  |     // retry can toggle a row that mounted late straight back off). A priced quantity tier is the
  74  |     // signal that the page's own bootstrap pricing round-trip has rendered -- it lands seconds
  75  |     // after the options panel first becomes visible -- so gate on that, then re-check visibility
  76  |     // before every click rather than clicking blind.
  77  |     await this.optionsPanel
  78  |       .locator('.qty-pill-price')
  79  |       .filter({ hasNotText: /^0원$/ })
  80  |       .first()
  81  |       .waitFor({ state: 'visible', timeout: 20_000 })
  82  |       .catch(() => undefined);
  83  | 
  84  |     for (let attempt = 0; attempt < 5; attempt += 1) {
  85  |       if (await widthInput.isVisible().catch(() => false)) {
  86  |         break;
  87  |       }
  88  | 
> 89  |       await this.optionsPanel.getByRole('button', { name: ko.customSize }).first().click();
      |                                                                                    ^ Error: locator.click: Test timeout of 60000ms exceeded.
  90  |       await widthInput.waitFor({ state: 'visible', timeout: 4_000 }).catch(() => undefined);
  91  |     }
  92  | 
  93  |     await expect(widthInput, 'custom individual size inputs never mounted').toBeVisible();
  94  | 
  95  |     await widthInput.fill(String(widthMm));
  96  |     await this.optionsPanel.getByPlaceholder('세로').fill(String(heightMm));
  97  |     await this.optionsPanel.getByPlaceholder('세로').blur();
  98  |   }
  99  | 
  100 |   // vinyl-lettering's design surface is a contenteditable canvas, not an input/textarea, and
  101 |   // pricing stays at 0원 with the next-step button disabled until text is entered.
  102 |   async fillVinylLetteringText(text: string): Promise<void> {
  103 |     const canvas = this.page.getByTestId('product-category-vinyl-designer-textarea');
  104 |     await canvas.click();
  105 |     await this.page.keyboard.type(text);
  106 |   }
  107 | 
  108 |   /**
  109 |    * The price the chosen quantity tier advertises, as a number.
  110 |    *
  111 |    * This is the figure the shopper is quoted and the one that must survive into the cart and the
  112 |    * checkout summary unchanged -- it is already the discounted price, not the struck-through one
  113 |    * (verified on development-1: the 30개 tier reads 18,700원 against a 19,800원 list price, and
  114 |    * 18,700원 is what the cart line and the checkout 소계 then show).
  115 |    *
  116 |    * Waits out the bootstrap pricing round-trip, during which every tier reads 0원.
  117 |    */
  118 |   async captureQuantityTierPrice(quantity: number): Promise<number> {
  119 |     const price = this.quantityTier(quantity).locator('.qty-pill-price');
  120 | 
  121 |     await expect(price).toBeVisible({ timeout: 20_000 });
  122 |     await expect(price, 'quantity tier is still unpriced -- the pricing call has not landed').not.toHaveText('0원', {
  123 |       timeout: 20_000
  124 |     });
  125 | 
  126 |     return parseWon(await price.innerText());
  127 |   }
  128 | 
  129 |   private quantityTier(quantity: number): Locator {
  130 |     const quantityLabel = new RegExp(
  131 |       `^${quantity.toLocaleString('en-US')}\\s*(?:\\S+)?\\s*${wonAmountPattern.source}`,
  132 |       'u'
  133 |     );
  134 | 
  135 |     return this.optionsPanel.getByRole('button', { name: quantityLabel }).first();
  136 |   }
  137 | 
  138 |   async expectVisiblePrice(): Promise<void> {
  139 |     await expect(this.optionsPanel.getByText(wonAmountPattern).last()).toBeVisible();
  140 |   }
  141 | 
  142 |   async expectBulkDiscountVisible(): Promise<void> {
  143 |     await expect(this.optionsPanel.getByText(/^-\d+%$/).first()).toBeVisible();
  144 |   }
  145 | 
  146 |   async expectNoBulkDiscountVisible(): Promise<void> {
  147 |     await expect(this.optionsPanel.getByText(/^-\d+%$/)).toHaveCount(0);
  148 |   }
  149 | 
  150 |   async expectSizeGuideImagesLocalized(): Promise<void> {
  151 |     const images = this.page.locator('.mini-feature-image');
  152 |     const count = await images.count();
  153 |     expect(count, 'Expected size-guide illustration images to be present').toBeGreaterThan(0);
  154 | 
  155 |     for (let index = 0; index < count; index += 1) {
  156 |       const alt = (await images.nth(index).getAttribute('alt')) ?? '';
  157 |       expect(alt, `Size guide image ${index} alt text is a raw, untranslated i18n key: "${alt}"`).not.toMatch(
  158 |         /^product\.sizes\./
  159 |       );
  160 |       expect(
  161 |         alt,
  162 |         `Size guide image ${index} alt text looks like an unrelated sheet/paper size label: "${alt}"`
  163 |       ).not.toMatch(/^A\d+\s|^\d+\s*x\s*\d+$/i);
  164 |     }
  165 |   }
  166 | 
  167 |   async expectDesignUploadModal(): Promise<void> {
  168 |     const dialog = this.page.getByRole('dialog');
  169 |     await expect(dialog.getByTestId('product-category-upload-dropzone')).toContainText(
  170 |       '.eps, .ai, .psd, .pdf, .tif, .png'
  171 |     );
  172 |     await expect(dialog.getByTestId('product-category-upload-select-files-button')).toBeVisible();
  173 |   }
  174 | 
  175 |   async fillDesignOrderNote(note: string): Promise<void> {
  176 |     await this.page.getByTestId('product-category-upload-special-instructions').locator('textarea').fill(note);
  177 |   }
  178 | 
  179 |   async uploadDesignFile(filePath: string): Promise<void> {
  180 |     await this.page.getByRole('dialog').locator('input[type="file"]').setInputFiles(filePath);
  181 |   }
  182 | 
  183 |   async expectDesignFileAccepted(fileName: string): Promise<void> {
  184 |     await expect(this.page.getByRole('dialog').getByTestId('product-category-upload-dropzone')).toContainText(
  185 |       fileName
  186 |     );
  187 |   }
  188 | 
  189 |   // --- individual-sticker sheet size rules (see sheet-sticker-size-rules.spec.ts) ---
```