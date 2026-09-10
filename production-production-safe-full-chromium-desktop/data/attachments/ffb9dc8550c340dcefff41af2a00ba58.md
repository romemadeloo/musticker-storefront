# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: purchasing/money-path.spec.ts >> storefront v2 money path >> MS-V2-099 an order at or above the free-shipping threshold ships free
- Location: tests/e2e/purchasing/money-path.spec.ts:106:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('dialog').getByRole('button', { name: '장바구니 담기' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('dialog').getByRole('button', { name: '장바구니 담기' })

```

```
Error: Unexpected browser console errors or warnings

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "[error] Failed to load resource: net::ERR_HTTP2_PROTOCOL_ERROR",
+   "[error] Failed to load resource: net::ERR_HTTP2_PROTOCOL_ERROR",
+   "[error] Failed to load resource: net::ERR_HTTP2_PROTOCOL_ERROR",
+   "[error] Failed to load resource: net::ERR_HTTP2_PROTOCOL_ERROR",
+   "[error] Failed to load resource: net::ERR_HTTP2_PROTOCOL_ERROR",
+   "[error] Failed to load resource: net::ERR_HTTP2_PROTOCOL_ERROR",
+ ]
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - dialog "어떻게 주문하시겠어요?" [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e5]:
        - img [ref=e6]
        - heading "어떻게 주문하시겠어요?" [level=3] [ref=e7]
      - button "모달 닫기" [active] [ref=e9] [cursor=pointer]:
        - img [ref=e11]
    - generic [ref=e14]:
      - region "파일 업로드하기" [ref=e15]:
        - generic [ref=e16]:
          - generic [ref=e17]: "1"
          - generic [ref=e18]:
            - heading "파일 업로드하기" [level=3] [ref=e19]
            - paragraph [ref=e20]: 내가 가진 디자인 파일로 주문하기
        - generic [ref=e21]:
          - img [ref=e22]
          - generic [ref=e27]:
            - paragraph [ref=e28]: 파일을 여기로 드래그하세요
            - paragraph [ref=e29]: ai · psd · pdf · eps · tif · png · jpg
          - button "+ 파일 선택하기" [ref=e30] [cursor=pointer]
        - generic [ref=e31]:
          - generic [ref=e32]: 기타 요청 사항 (옵션)
          - textbox "기타 요청 사항 (옵션)" [ref=e34]:
            - /placeholder: 여기에 상세 주문 요청 사항을 입력해 주세요
        - button "파일로 주문하기" [ref=e35] [cursor=pointer]:
          - img [ref=e36]
          - text: 파일로 주문하기
      - generic [ref=e42]: 또는
      - region "직접 디자인하기 추천" [ref=e44]:
        - generic [ref=e45]:
          - generic [ref=e46]: "2"
          - generic [ref=e47]:
            - heading "직접 디자인하기" [level=3] [ref=e48]
            - paragraph [ref=e49]: PDF · AI · PNG · JPG · SVG도 웹에서 바로 편집
          - generic [ref=e50]: 추천
        - img "웹 스튜디오에서 자유형 스티커를 자유롭게 디자인해 보세요." [ref=e51]:
          - generic [ref=e52]:
            - generic [ref=e53]:
              - img [ref=e63]
              - generic [ref=e65]:
                - generic [ref=e66]:
                  - generic [ref=e67]:
                    - generic [ref=e68]:
                      - img
                      - img
                      - generic [ref=e70]:
                        - img [ref=e71]
                        - generic [ref=e73]: 배경 제거 중
                    - generic [ref=e74]:
                      - generic [ref=e75]: 55mm
                      - generic [ref=e76]: 90mm
                  - generic [ref=e81]:
                    - generic [ref=e82]:
                      - img
                      - img
                      - img
                      - img
                      - generic [ref=e84]: ❤️박서아❤️
                      - generic [ref=e88]:
                        - img [ref=e89]
                        - generic [ref=e91]: 배경 제거 중
                    - generic [ref=e92]:
                      - generic [ref=e93]: 90mm
                      - generic [ref=e94]: 88mm
                - generic [ref=e104]:
                  - img [ref=e105]
                  - img [ref=e107]
            - generic [ref=e119]: T
        - button "스튜디오 이동" [ref=e141] [cursor=pointer]:
          - img [ref=e142]
          - text: 스튜디오 이동
      - generic [ref=e144]:
        - button "이 단계를 건너뛰고 나중에 파일 보내기" [ref=e145] [cursor=pointer]:
          - img [ref=e146]
          - generic [ref=e149]: 이 단계를 건너뛰고 나중에 파일 보내기
        - generic [ref=e150]: 주문을 먼저 접수하고 이메일·카카오톡으로 보내셔도 됩니다.
  - generic [ref=e152]:
    - banner [ref=e153]:
      - generic [ref=e154]:
        - generic [ref=e155]:
          - link "Musticker" [ref=e156] [cursor=pointer]:
            - /url: /kr
            - img "musticker logo" [ref=e157]
          - generic [ref=e158]:
            - button "공지사항 열기" [ref=e160] [cursor=pointer]:
              - img [ref=e162]
            - button "layout.header.search" [ref=e163] [cursor=pointer]:
              - img [ref=e164]
            - button "장바구니" [ref=e166] [cursor=pointer]:
              - img [ref=e167]
            - button "계정" [ref=e169] [cursor=pointer]:
              - img [ref=e171]
        - navigation "Primary":
          - link "스티커" [ref=e172] [cursor=pointer]:
            - /url: /kr/stickers
          - link "롤스티커" [ref=e173] [cursor=pointer]:
            - /url: /kr/roll-stickers
          - link "시트 스티커" [ref=e174] [cursor=pointer]:
            - /url: /kr/sheet-stickers
    - main [ref=e175]:
      - generic [ref=e176]:
        - generic [ref=e178]:
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
          - generic [ref=e181]:
            - generic [ref=e184]:
              - generic [ref=e185]:
                - heading "자유형 스티커" [level=1] [ref=e186]
                - paragraph [ref=e187]: 두텁고 강력한 내구성을 가진 소재를 자랑해요
              - img "자유형 스티커 preview poster" [ref=e189]
              - generic [ref=e191]:
                - button "소형 30x30 A6 105x148 작고 귀여운 크기로 휴대폰 케이스나 헬멧에 딱!" [ref=e192] [cursor=pointer]:
                  - heading "소형 30x30" [level=4] [ref=e193]
                  - img "A6 105x148" [ref=e194]
                  - paragraph [ref=e195]: 작고 귀여운 크기로 휴대폰 케이스나 헬멧에 딱!
                - button "중형 75x75 A5 148x210 텀블러·노트북에 잘 어울려요. 가장 인기 있는 사이즈예요." [ref=e196] [cursor=pointer]:
                  - heading "중형 75x75" [level=4] [ref=e197]
                  - img "A5 148x210" [ref=e198]
                  - paragraph [ref=e199]: 텀블러·노트북에 잘 어울려요. 가장 인기 있는 사이즈예요.
                - button "대형 100x100 A4 210x297 보드나 캐리어에 붙이면 눈에 잘 띄는 크기예요." [ref=e200] [cursor=pointer]:
                  - heading "대형 100x100" [level=4] [ref=e201]
                  - img "A4 210x297" [ref=e202]
                  - paragraph [ref=e203]: 보드나 캐리어에 붙이면 눈에 잘 띄는 크기예요.
                - button "초대형 125x125 72x170 차·아이스박스·공구함에도 딱 맞는 넉넉한 크기예요." [ref=e204] [cursor=pointer]:
                  - heading "초대형 125x125" [level=4] [ref=e205]
                  - img "72x170" [ref=e206]
                  - paragraph [ref=e207]: 차·아이스박스·공구함에도 딱 맞는 넉넉한 크기예요.
            - complementary [ref=e210]:
              - generic [ref=e211]:
                - generic [ref=e212]:
                  - heading "사이즈를 선택하세요" [level=3] [ref=e213]
                  - generic [ref=e214]: (단위:mm)
                - generic [ref=e215]:
                  - button "소형 30x30" [ref=e216] [cursor=pointer]:
                    - generic [ref=e217]: 소형
                    - generic [ref=e218]: 30x30
                  - button "중형 75x75" [ref=e219] [cursor=pointer]:
                    - generic [ref=e220]: 중형
                    - generic [ref=e221]: 75x75
                  - button "대형 100x100" [ref=e222] [cursor=pointer]:
                    - generic [ref=e223]: 대형
                    - generic [ref=e224]: 100x100
                  - button "초대형 125x125" [ref=e225] [cursor=pointer]:
                    - generic [ref=e226]: 초대형
                    - generic [ref=e227]: 125x125
                  - 'button "원하는 크기 입력 주문 가능 크기: 25-1500mm" [ref=e228] [cursor=pointer]':
                    - generic [ref=e229]:
                      - img [ref=e230]
                      - paragraph [ref=e232]: 원하는 크기 입력
                    - generic [ref=e233]: "주문 가능 크기: 25-1500mm"
              - generic [ref=e234]:
                - heading "수량을 선택하세요" [level=3] [ref=e235]
                - generic [ref=e236]:
                  - button "10개 6,600원" [ref=e237] [cursor=pointer]:
                    - generic [ref=e238]: 10개
                    - generic [ref=e239]: 6,600원
                  - button "20개 12,500원" [ref=e240] [cursor=pointer]:
                    - generic [ref=e241]: 20개
                    - generic [ref=e242]: 12,500원
                  - button "30개 18,700원" [ref=e243] [cursor=pointer]:
                    - generic [ref=e244]: 30개
                    - generic [ref=e245]: 18,700원
                  - button "50개 29,600원" [ref=e246] [cursor=pointer]:
                    - generic [ref=e247]: 50개
                    - generic [ref=e248]: 29,600원
                  - button "100개 36,100원" [ref=e249] [cursor=pointer]:
                    - generic [ref=e250]: 100개
                    - generic [ref=e251]: 36,100원
                  - button "300개 72,200원" [ref=e252] [cursor=pointer]:
                    - generic [ref=e253]: 300개
                    - generic [ref=e254]: 72,200원
                  - button "500개 88,400원" [ref=e255] [cursor=pointer]:
                    - generic [ref=e256]: 500개
                    - generic [ref=e257]: 88,400원
                  - button "1,000개 106,000원" [ref=e258] [cursor=pointer]:
                    - generic [ref=e259]: 1,000개
                    - generic [ref=e260]: 106,000원
                  - 'button "원하는 수량 입력 주문 가능 수량: 10-100,000개" [ref=e261] [cursor=pointer]':
                    - generic [ref=e262]:
                      - img [ref=e263]
                      - paragraph [ref=e265]: 원하는 수량 입력
                    - generic [ref=e266]: "주문 가능 수량: 10-100,000개"
              - generic [ref=e269]:
                - generic [ref=e270]:
                  - paragraph [ref=e271]:
                    - generic [ref=e272]: "-84%"
                    - generic [ref=e273]: 660,000원
                  - paragraph [ref=e274]:
                    - strong [ref=e275]: 106,000원
                - paragraph [ref=e276]: (1매당 106원)
              - button "다음 단계" [ref=e278] [cursor=pointer]:
                - generic [ref=e279]: 다음 단계
              - list [ref=e281]:
                - listitem [ref=e282]: 5만원 이상 무료배송
                - listitem [ref=e283]: 3시 이전 시안 확정 시 당일배송
                - listitem [ref=e284]: "도착 예정일: 09.15 (화) · CJ 대한통운"
                - listitem [ref=e285]: 시안 승인 후 평균 1~3일 내 배송됩니다. (주말·공휴일 제외)
        - generic [ref=e287]:
          - article [ref=e288]:
            - img "오늘제작, 내일발송" [ref=e289]
            - heading "오늘제작, 내일발송" [level=4] [ref=e290]
            - paragraph [ref=e291]: 디자인 승인 즉시 제작이 시작됩니다 평균 1~2일 안에 당신의 손에 도착하죠
          - article [ref=e292]:
            - img "빠른 시안 피드백" [ref=e293]
            - heading "빠른 시안 피드백" [level=4] [ref=e294]
            - paragraph [ref=e295]: 결제 후 곧바로 시안을 받아보세요 마음이 ‘예스’ 할 때까지 수정 가능합니다
          - article [ref=e296]:
            - img "뛰어난 내구성과 내수성" [ref=e297]
            - heading "뛰어난 내구성과 내수성" [level=4] [ref=e298]
            - paragraph [ref=e299]: 두꺼운 프리미엄 재질로 색상, 접착력 그대로 오래갑니다
        - generic [ref=e301]:
          - article [ref=e302]:
            - generic [ref=e305]:
              - heading "색감은 생생하게, 내구성은 완벽하게" [level=3] [ref=e306]
              - paragraph [ref=e307]: 고품질 인쇄와 두꺼운 소재로 구현한 화려하고 선명한 색감. 비, 햇빛, 고온에도 쉽게 흐려지지 않는 뛰어난 내구성. 붙이는 순간부터 오래도록 변하지 않는 품질을 느껴보세요.
          - article [ref=e308]:
            - generic [ref=e311]:
              - heading "쉽게 붙이고, 깔끔하게 제거" [level=3] [ref=e312]
              - paragraph [ref=e313]: 매끄럽게 부착되고, 흔적 없이 깔끔하게 떨어집니다. 접착은 강력하지만, 표면은 안전하게 보호합니다. 필요할 땐 단번에 제거되고, 남는 건 깔끔함뿐입니다.
          - article [ref=e314]:
            - generic [ref=e317]:
              - heading "디자인에 맞게 정확하게 컷팅" [level=3] [ref=e318]
              - paragraph [ref=e319]: 로고, 일러스트, 사진을 업로드하면 칼선에 맞춰 정밀하게 스티커로 제작됩니다. 복잡한 패턴도 머스티커의 고유한 절단 기술로 완벽하게 표현됩니다.
        - generic [ref=e321]:
          - generic [ref=e322]:
            - generic [ref=e323]:
              - generic [ref=e324]: 좋아요 😀
              - generic [ref=e325]:
                - img [ref=e326]
                - img [ref=e327]
                - img [ref=e328]
                - img [ref=e329]
                - img [ref=e330]
              - generic [ref=e331]: "5.0"
            - heading "225개 사진 후기가 보장해요" [level=2] [ref=e332]
            - paragraph [ref=e333]: 직접 사용한 고객들의 생생한 리뷰를 확인해보세요. 리얼 사용 이미지와 함께 실제 만족도를 보여드립니다.
            - generic [ref=e334]:
              - button "이전 리뷰" [ref=e335] [cursor=pointer]:
                - img [ref=e336]
                - generic [ref=e337]: 이전 리뷰
              - button "다음 리뷰" [ref=e338] [cursor=pointer]:
                - img [ref=e339]
                - generic [ref=e340]: 다음 리뷰
          - generic [ref=e342]:
            - article [ref=e344]:
              - generic [ref=e345]:
                - img "tkop****" [ref=e347]
                - paragraph [ref=e349]: 빨리오고 너무 이쁘게 만들어주셔서 감사합니다 그리고 서비스도 20장 더 주셔서 감사합니다
              - generic [ref=e350]:
                - generic [ref=e351]:
                  - img "tkop**** avatar" [ref=e352]
                  - generic [ref=e353]:
                    - strong [ref=e354]: tkop****
                    - generic [ref=e355]: 2026-03-25
                - generic [ref=e356]:
                  - img [ref=e357]
                  - img [ref=e358]
                  - img [ref=e359]
                  - img [ref=e360]
                  - img [ref=e361]
            - article [ref=e363]:
              - generic [ref=e364]:
                - img "oozz******" [ref=e366]
                - paragraph [ref=e368]: 잘나와서 만족합니다 잘쓰겠습니다
              - generic [ref=e369]:
                - generic [ref=e370]:
                  - img "oozz****** avatar" [ref=e371]
                  - generic [ref=e372]:
                    - strong [ref=e373]: oozz******
                    - generic [ref=e374]: 2026-03-22
                - generic [ref=e375]:
                  - img [ref=e376]
                  - img [ref=e377]
                  - img [ref=e378]
                  - img [ref=e379]
                  - img [ref=e380]
            - article [ref=e382]:
              - generic [ref=e383]:
                - img "aktm********" [ref=e385]
                - paragraph [ref=e387]: 만족하면서 사용중입니다
              - generic [ref=e388]:
                - generic [ref=e389]:
                  - img "aktm******** avatar" [ref=e390]
                  - generic [ref=e391]:
                    - strong [ref=e392]: aktm********
                    - generic [ref=e393]: 2026-03-04
                - generic [ref=e394]:
                  - img [ref=e395]
                  - img [ref=e396]
                  - img [ref=e397]
                  - img [ref=e398]
                  - img [ref=e399]
            - article [ref=e401]:
              - generic [ref=e402]:
                - img "aktm********" [ref=e404]
                - paragraph [ref=e406]: 잘 받았어요 잘쓸게요.
              - generic [ref=e407]:
                - generic [ref=e408]:
                  - img "aktm******** avatar" [ref=e409]
                  - generic [ref=e410]:
                    - strong [ref=e411]: aktm********
                    - generic [ref=e412]: 2026-01-31
                - generic [ref=e413]:
                  - img [ref=e414]
                  - img [ref=e415]
                  - img [ref=e416]
                  - img [ref=e417]
                  - img [ref=e418]
            - article [ref=e420]:
              - generic [ref=e421]:
                - img "aktm********" [ref=e423]
                - paragraph [ref=e425]: 아주 잘쓰고있습니다.
              - generic [ref=e426]:
                - generic [ref=e427]:
                  - img "aktm******** avatar" [ref=e428]
                  - generic [ref=e429]:
                    - strong [ref=e430]: aktm********
                    - generic [ref=e431]: 2026-01-06
                - generic [ref=e432]:
                  - img [ref=e433]
                  - img [ref=e434]
                  - img [ref=e435]
                  - img [ref=e436]
                  - img [ref=e437]
            - article [ref=e439]:
              - generic [ref=e440]:
                - img "aktm********" [ref=e442]
                - paragraph [ref=e444]: 아주 잘쓰고있습니다.
              - generic [ref=e445]:
                - generic [ref=e446]:
                  - img "aktm******** avatar" [ref=e447]
                  - generic [ref=e448]:
                    - strong [ref=e449]: aktm********
                    - generic [ref=e450]: 2026-01-06
                - generic [ref=e451]:
                  - img [ref=e452]
                  - img [ref=e453]
                  - img [ref=e454]
                  - img [ref=e455]
                  - img [ref=e456]
            - article [ref=e458]:
              - generic [ref=e459]:
                - img "jiwn****" [ref=e461]
                - paragraph [ref=e463]: 아 정말 너무 좋아연ㅎㅎ
              - generic [ref=e464]:
                - generic [ref=e465]:
                  - img "jiwn**** avatar" [ref=e466]
                  - generic [ref=e467]:
                    - strong [ref=e468]: jiwn****
                    - generic [ref=e469]: 2025-12-29
                - generic [ref=e470]:
                  - img [ref=e471]
                  - img [ref=e472]
                  - img [ref=e473]
                  - img [ref=e474]
                  - img [ref=e475]
            - article [ref=e477]:
              - generic [ref=e478]:
                - img "koj3***" [ref=e480]
                - paragraph [ref=e482]: 방수도 잘되고 오염에도 잘 버티고 좋아요. 적극 추천합니다.^^
              - generic [ref=e483]:
                - generic [ref=e484]:
                  - img "koj3*** avatar" [ref=e485]
                  - generic [ref=e486]:
                    - strong [ref=e487]: koj3***
                    - generic [ref=e488]: 2025-12-24
                - generic [ref=e489]:
                  - img [ref=e490]
                  - img [ref=e491]
                  - img [ref=e492]
                  - img [ref=e493]
                  - img [ref=e494]
            - article [ref=e496]:
              - generic [ref=e497]:
                - img "aktm********" [ref=e499]
                - paragraph [ref=e501]: 이쁘네요 잘쓸게요.!!
              - generic [ref=e502]:
                - generic [ref=e503]:
                  - img "aktm******** avatar" [ref=e504]
                  - generic [ref=e505]:
                    - strong [ref=e506]: aktm********
                    - generic [ref=e507]: 2025-12-03
                - generic [ref=e508]:
                  - img [ref=e509]
                  - img [ref=e510]
                  - img [ref=e511]
                  - img [ref=e512]
                  - img [ref=e513]
            - article [ref=e515]:
              - generic [ref=e516]:
                - img "aktm********" [ref=e518]
                - paragraph [ref=e520]: 이쁘게 잘뽑혔네요.
              - generic [ref=e521]:
                - generic [ref=e522]:
                  - img "aktm******** avatar" [ref=e523]
                  - generic [ref=e524]:
                    - strong [ref=e525]: aktm********
                    - generic [ref=e526]: 2025-11-30
                - generic [ref=e527]:
                  - img [ref=e528]
                  - img [ref=e529]
                  - img [ref=e530]
                  - img [ref=e531]
                  - img [ref=e532]
            - article [ref=e534]:
              - generic [ref=e535]:
                - img "circ*****" [ref=e537]
                - paragraph [ref=e539]: 품질도 좋고 응대도 잘해주셔서 이쁘게 나왔네요
              - generic [ref=e540]:
                - generic [ref=e541]:
                  - img "circ***** avatar" [ref=e542]
                  - generic [ref=e543]:
                    - strong [ref=e544]: circ*****
                    - generic [ref=e545]: 2025-11-20
                - generic [ref=e546]:
                  - img [ref=e547]
                  - img [ref=e548]
                  - img [ref=e549]
                  - img [ref=e550]
                  - img [ref=e551]
            - article [ref=e553]:
              - generic [ref=e554]:
                - img "pina******" [ref=e556]
                - paragraph [ref=e558]: 부착 잘되고 제거할때 끈적임 없이 깔끔하게 떨어져서 좋아요
              - generic [ref=e559]:
                - generic [ref=e560]:
                  - img "pina****** avatar" [ref=e561]
                  - generic [ref=e562]:
                    - strong [ref=e563]: pina******
                    - generic [ref=e564]: 2025-08-22
                - generic [ref=e565]:
                  - img [ref=e566]
                  - img [ref=e567]
                  - img [ref=e568]
                  - img [ref=e569]
                  - img [ref=e570]
            - article [ref=e572]:
              - generic [ref=e573]:
                - img "qcyc*****" [ref=e575]
                - paragraph [ref=e577]: 덕분에 넘넘 잘썼습니다
              - generic [ref=e578]:
                - generic [ref=e579]:
                  - img "qcyc***** avatar" [ref=e580]
                  - generic [ref=e581]:
                    - strong [ref=e582]: qcyc*****
                    - generic [ref=e583]: 2025-08-15
                - generic [ref=e584]:
                  - img [ref=e585]
                  - img [ref=e586]
                  - img [ref=e587]
                  - img [ref=e588]
                  - img [ref=e589]
            - article [ref=e591]:
              - generic [ref=e592]:
                - img "rlad*******" [ref=e594]
                - paragraph [ref=e596]: 꼼꼼하게 체크해주셔서 너무좋았습니다!
              - generic [ref=e597]:
                - generic [ref=e598]:
                  - img "rlad******* avatar" [ref=e599]
                  - generic [ref=e600]:
                    - strong [ref=e601]: rlad*******
                    - generic [ref=e602]: 2025-07-17
                - generic [ref=e603]:
                  - img [ref=e604]
                  - img [ref=e605]
                  - img [ref=e606]
                  - img [ref=e607]
                  - img [ref=e608]
            - article [ref=e610]:
              - generic [ref=e611]:
                - img "csbn*****" [ref=e613]
                - paragraph [ref=e615]: 배송도 빠르고 재질도 좋고 너무 좋아요 감사합니다!
              - generic [ref=e616]:
                - generic [ref=e617]:
                  - img "csbn***** avatar" [ref=e618]
                  - generic [ref=e619]:
                    - strong [ref=e620]: csbn*****
                    - generic [ref=e621]: 2025-07-14
                - generic [ref=e622]:
                  - img [ref=e623]
                  - img [ref=e624]
                  - img [ref=e625]
                  - img [ref=e626]
                  - img [ref=e627]
            - article [ref=e629]:
              - generic [ref=e630]:
                - img "pina******" [ref=e632]
                - paragraph [ref=e634]: 생각한대로 너무 깔끔하게 나왔어요! 다음에도 주문하겠습니다!!
              - generic [ref=e635]:
                - generic [ref=e636]:
                  - img "pina****** avatar" [ref=e637]
                  - generic [ref=e638]:
                    - strong [ref=e639]: pina******
                    - generic [ref=e640]: 2025-07-09
                - generic [ref=e641]:
                  - img [ref=e642]
                  - img [ref=e643]
                  - img [ref=e644]
                  - img [ref=e645]
                  - img [ref=e646]
        - generic [ref=e648]:
          - generic [ref=e649]:
            - img "text" [ref=e650]
            - generic [ref=e651]:
              - heading "자유형 스티커 FAQ" [level=2] [ref=e652]
              - paragraph [ref=e653]:
                - text: 멤버십, 주문, 디자인 파일 업로드, 인쇄, 결제, 반품·환불에 대한 자세한 내용은 자주 묻는
                - link "질문(FAQ) 페이지에서 확인해 주세요" [ref=e654] [cursor=pointer]:
                  - /url: https://www.musticker.com/faq
                - text: .
          - generic [ref=e655]:
            - generic [ref=e656]:
              - generic [ref=e657] [cursor=pointer]:
                - heading "자유형 스티커란 무엇인가요?" [level=3] [ref=e658]
                - paragraph [ref=e661]: 자유형 스티커는 원형이나 사각형 같은 규격 모양이 아닌, 디자인의 외곽선을 따라 제작되는 스티커입니다. 로고, 일러스트, 캐릭터, 텍스트 등 다양한 디자인을 원하는 모양으로 제작할 수 있습니다.
              - button [ref=e662] [cursor=pointer]:
                - img [ref=e663]
            - generic [ref=e664]:
              - generic [ref=e665] [cursor=pointer]:
                - heading "자유형 스티커는 방수 및 내구성이 있나요?" [level=3] [ref=e666]
                - paragraph [ref=e667]: 머스티커의 자유형 스티커는 내구성이 뛰어난 PVC 용지에 인쇄되어 물, 햇빛, 일상적인 마모에 강합니다. 실내외 다양한 환경에서도 선명한 색감을 오래 유지합니다. 다만 날카로운 물체나 강한 마찰에는 긁힘이 생길 수 있으니 주의해 주세요
              - button [ref=e668] [cursor=pointer]:
                - img [ref=e669]
            - generic [ref=e670]:
              - generic [ref=e671] [cursor=pointer]:
                - heading "칼선은 직접 만들어야 하나요?" [level=3] [ref=e672]
                - paragraph [ref=e673]: 디자인 파일만 업로드해 주시면 머스티커에서 디자인에 맞게 칼선을 제작해 드립니다. 이미 칼선이 포함된 파일이 있다면 함께 업로드할 수 있으며, 보다 깔끔한 제작을 위해 디자인 외곽선을 따라 칼선을 작업하는 것을 권장합니다.
              - button [ref=e674] [cursor=pointer]:
                - img [ref=e675]
            - generic [ref=e676]:
              - generic [ref=e677] [cursor=pointer]:
                - heading "인쇄 색상은 화면과 동일하게 나오나요?" [level=3] [ref=e678]
                - paragraph [ref=e679]: 모니터와 인쇄물은 색상을 표현하는 방식이 달라 실제 색상이 다소 다르게 보일 수 있습니다. 또한 모니터의 밝기, 색상 설정, 사용 환경에 따라서도 차이가 발생할 수 있습니다. 머스티커는 고품질 인쇄를 통해 원본 디자인과 최대한 가까운 색상으로 제작해 드립니다.
              - button [ref=e680] [cursor=pointer]:
                - img [ref=e681]
            - generic [ref=e682]:
              - generic [ref=e683] [cursor=pointer]:
                - heading "자유형 스티커는 어떤 사이즈를 선택하는 것이 좋나요?" [level=3] [ref=e684]
                - paragraph [ref=e685]: 디자인에 따라 적합한 사이즈가 달라집니다. 간단한 로고나 아이콘은 소형 사이즈를, 디테일이 많은 일러스트나 텍스트가 포함된 디자인은 대형 사이즈를 추천합니다. 작은 글씨나 얇은 선이 있는 경우에는 큰 사이즈를 선택하면 더욱 선명하고 깔끔하게 제작할 수 있습니다.
              - button [ref=e686] [cursor=pointer]:
                - img [ref=e687]
          - generic [ref=e688]:
            - generic [ref=e689]:
              - heading "궁금한 점이 더 있으신가요?" [level=4] [ref=e690]
              - paragraph [ref=e691]: 원하시는 답변을 찾지 못하셨다면 언제든지 문의해 주세요.
            - button "문의하기" [ref=e692] [cursor=pointer]:
              - generic [ref=e693]: 문의하기
      - navigation "네이버 톡톡으로 문의하기" [ref=e694]:
        - link "카카오채널로 문의하기" [ref=e695] [cursor=pointer]:
          - /url: https://pf.kakao.com/_nJxnTX/chat
          - generic:
            - generic:
              - generic:
                - img
              - paragraph: 카카오채널로 문의하기
          - img [ref=e697]
        - link "네이버 톡톡 으로 문의하기" [ref=e698] [cursor=pointer]:
          - /url: https://talk.naver.com/ct/w2luxqo
          - generic:
            - generic:
              - generic:
                - img
              - paragraph: 네이버 톡톡 으로 문의하기
          - img [ref=e700]
        - generic "이메일로 문의하기" [ref=e701] [cursor=pointer]:
          - generic:
            - generic:
              - generic:
                - img
              - paragraph: 이메일로 문의하기
          - img [ref=e703]
    - contentinfo [ref=e704]:
      - generic [ref=e705]:
        - generic [ref=e706]:
          - heading "MUSTICKER / 머스티커" [level=2] [ref=e707]
          - paragraph [ref=e708]: "상호명: (주)글로픽스"
          - paragraph [ref=e709]: "사업자등록번호 : 877-88-03313 통신판매업신고 : 2026-부산해운대-0792호"
          - paragraph [ref=e710]: "대표이사 : 여일석 주소 : 부산광역시 해운대구 해운대해변로 203 오션타워 1014호"
          - paragraph [ref=e711]: "호스팅사업자 : 아마존웹서비시즈(Amazon Web Services)"
          - paragraph [ref=e712]:
            - generic [ref=e713]: ⓒ 2026. All rights reserved.
            - generic [ref=e714]: "판매: sales@musticker.com"
            - link "이용약관" [ref=e715] [cursor=pointer]:
              - /url: /kr/terms-of-use
            - link "개인정보처리방침" [ref=e716] [cursor=pointer]:
              - /url: /kr/privacy-policy
            - generic [ref=e717] [cursor=pointer]: 사업자정보확인
            - link "오픈소스 라이선스" [ref=e718] [cursor=pointer]:
              - /url: /kr/open-source-licenses
            - link "회사소개" [ref=e719] [cursor=pointer]:
              - /url: /kr/about
        - generic [ref=e720]:
          - paragraph [ref=e721]: 1899-5529
          - paragraph [ref=e723]: 오전 9시 ~ 오후 6시(토요일, 공휴일 휴무)
          - generic [ref=e724]:
            - button "1:1문의하기" [ref=e725] [cursor=pointer]
            - link "자주 묻는 질문" [ref=e726] [cursor=pointer]:
              - /url: /kr/faq
          - generic [ref=e727]:
            - generic [ref=e728]: "Follow us at:"
            - generic [ref=e729]:
              - link "instagram icon" [ref=e730] [cursor=pointer]:
                - /url: https://www.instagram.com/musticker_official/
                - img "instagram icon"
              - link "youtube icon" [ref=e731] [cursor=pointer]:
                - /url: https://www.youtube.com/@MustickerOfficial
                - img "youtube icon"
```

# Test source

```ts
  356 |         allowTransientApiCorsFailures &&
  357 |         pendingTransientApiNetworkFailures > 0 &&
  358 |         text === 'Failed to load resource: net::ERR_FAILED'
  359 |       ) {
  360 |         return;
  361 |       }
  362 | 
  363 |       if (allowTransientApiCorsFailures && isTransientApiFetchFailure(text)) {
  364 |         pendingTransientApiNetworkFailures = Math.max(0, pendingTransientApiNetworkFailures - 1);
  365 |         return;
  366 |       }
  367 | 
  368 |       if (allowTransientCartCreateFailures && isCartCreateCorsFailure(text)) {
  369 |         pendingCartCreateNetworkFailures += 1;
  370 |         return;
  371 |       }
  372 | 
  373 |       if (
  374 |         allowTransientCartCreateFailures &&
  375 |         pendingCartCreateNetworkFailures > 0 &&
  376 |         text === 'Failed to load resource: net::ERR_FAILED'
  377 |       ) {
  378 |         return;
  379 |       }
  380 | 
  381 |       if (allowTransientCartCreateFailures && isCartCreateFetchFailure(text)) {
  382 |         pendingCartCreateNetworkFailures = Math.max(0, pendingCartCreateNetworkFailures - 1);
  383 |         return;
  384 |       }
  385 | 
  386 |       if (allowKnownPriceWarnings && isSupersededPricingRequest(text)) {
  387 |         hadSupersededPricingRequest = true;
  388 |         return;
  389 |       }
  390 | 
  391 |       if (allowKnownPriceWarnings && hadSupersededPricingRequest && text === 'Unable to retrieve prices.') {
  392 |         hadSupersededPricingRequest = false;
  393 |         return;
  394 |       }
  395 | 
  396 |       if (isKnownConsoleMessage(text, guardOptions)) {
  397 |         return;
  398 |       }
  399 | 
  400 |       consoleFailures.push(`[${message.type()}] ${text}`);
  401 |     });
  402 | 
  403 |     page.on('response', (response) => {
  404 |       const status = response.status();
  405 |       if (status < 400) {
  406 |         return;
  407 |       }
  408 | 
  409 |       const url = response.url();
  410 |       if (allowGuestUserMe401 && isExpectedGuestUserMe401(status, url)) {
  411 |         return;
  412 |       }
  413 | 
  414 |       if (allowExpectedAuthFailures && isExpectedAuthFailure(status, url)) {
  415 |         return;
  416 |       }
  417 | 
  418 |       if (allowKnownNuxtPayloadFailures && isKnownNuxtPayloadFailure(status, url)) {
  419 |         return;
  420 |       }
  421 | 
  422 |       if (allowTransientProductPageFailures && isTransientProductPageServerFailure(status, url)) {
  423 |         pendingTransientProductPageFailures += 1;
  424 |         return;
  425 |       }
  426 | 
  427 |       if (allowExpectedNotFound && isExpectedStorefrontNotFound(status, url)) {
  428 |         pendingExpectedNotFoundResponses += 1;
  429 |         return;
  430 |       }
  431 | 
  432 |       if (allowGuestCheckoutBootstrap401 && isExpectedGuestCheckoutBootstrap401(status, url)) {
  433 |         return;
  434 |       }
  435 | 
  436 |       if (allowPostLogout401 && isPostLogoutMemberDataUnauthorized(status, url)) {
  437 |         return;
  438 |       }
  439 | 
  440 |       responseFailures.push(`${status} ${url}`);
  441 |     });
  442 | 
  443 |     await applyInternalOriginHeader(page);
  444 |     await use(page);
  445 | 
  446 |     // gotoStorefront() retries past WAF 403s, but the listeners above have already recorded each
  447 |     // blocked attempt by the time it does. Forgive exactly as many as it navigated past -- a 403
  448 |     // that nothing retried still fails the run.
  449 |     const throttleBlocks = retriedThrottleBlockCount(page);
  450 | 
  451 |     expect
  452 |       .soft(
  453 |         dropForgiven(consoleFailures, throttleBlocks, isThrottleBlockConsoleFailure),
  454 |         'Unexpected browser console errors or warnings'
  455 |       )
> 456 |       .toEqual([]);
      |        ^ Error: Unexpected browser console errors or warnings
  457 |     expect
  458 |       .soft(
  459 |         dropForgiven(responseFailures, throttleBlocks, isThrottleBlockResponseFailure),
  460 |         'Unexpected failed HTTP responses'
  461 |       )
  462 |       .toEqual([]);
  463 |   }
  464 | });
  465 | 
  466 | export { expect };
  467 | 
```