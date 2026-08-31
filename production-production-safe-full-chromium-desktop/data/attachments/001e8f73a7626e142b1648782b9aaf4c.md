# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: purchasing/sheet-sticker-size-rules.spec.ts >> storefront v2 sheet sticker size rules (minimum two stickers per sheet) >> MS-V2-076 circle sheet sticker: both cart edit dialogs reject a one-per-sheet custom size
- Location: tests/e2e/purchasing/sheet-sticker-size-rules.spec.ts:135:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('dialog', { name: /\uc0ac\uc774\uc988 \ubc0f \uc218\ub7c9 \uc218\uc815|\uc5c5\ub370\uc774\ud2b8|Update/i }).last().first().getByText('더 작은 사이즈를 입력해 주세요. 한 시트에 최소 2개의 스티커가 들어가야 합니다.')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('dialog', { name: /\uc0ac\uc774\uc988 \ubc0f \uc218\ub7c9 \uc218\uc815|\uc5c5\ub370\uc774\ud2b8|Update/i }).last().first().getByText('더 작은 사이즈를 입력해 주세요. 한 시트에 최소 2개의 스티커가 들어가야 합니다.')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
            - generic [ref=e18]:
              - button "장바구니" [ref=e19] [cursor=pointer]:
                - img [ref=e20]
              - generic: "1"
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
              - link "자유형 시트 스티커 자유형 시트 스티커":
                - /url: /kr/sheet-stickers/die-cut-sheet
                - generic:
                  - img "자유형 시트 스티커"
                - generic:
                  - heading "자유형 시트 스티커" [level=4]
              - link "원형 시트 스티커 원형 시트 스티커":
                - /url: /kr/sheet-stickers/circle-sheet
                - generic:
                  - img "원형 시트 스티커"
                - generic:
                  - heading "원형 시트 스티커" [level=4]
              - link "타원형 시트 스티커 타원형 시트 스티커":
                - /url: /kr/sheet-stickers/oval-sheet
                - generic:
                  - img "타원형 시트 스티커"
                - generic:
                  - heading "타원형 시트 스티커" [level=4]
              - link "정사각형 시트 스티커 정사각형 시트 스티커":
                - /url: /kr/sheet-stickers/square-sheet
                - generic:
                  - img "정사각형 시트 스티커"
                - generic:
                  - heading "정사각형 시트 스티커" [level=4]
              - link "직사각형 시트 스티커 직사각형 시트 스티커":
                - /url: /kr/sheet-stickers/rectangle-sheet
                - generic:
                  - img "직사각형 시트 스티커"
                - generic:
                  - heading "직사각형 시트 스티커" [level=4]
              - link "둥근 사각 시트 스티커 둥근 사각 시트 스티커":
                - /url: /kr/sheet-stickers/rounded-sheet
                - generic:
                  - img "둥근 사각 시트 스티커"
                - generic:
                  - heading "둥근 사각 시트 스티커" [level=4]
          - generic [ref=e36]:
            - generic [ref=e37]:
              - generic [ref=e38]:
                - heading "원형 시트 스티커" [level=1] [ref=e39]
                - paragraph [ref=e40]: 사용과 보관이 편리하도록 시트 한 장에 담긴 원형 시트 스티커
              - img "원형 시트 스티커 preview poster" [ref=e42]
              - generic [ref=e44]:
                - button "소형 30x30 A6 105x148 작고 귀여운 크기로 휴대폰 케이스나 헬멧에 딱!" [ref=e45] [cursor=pointer]:
                  - heading "소형 30x30" [level=4] [ref=e46]
                  - img "A6 105x148" [ref=e47]
                  - paragraph [ref=e48]: 작고 귀여운 크기로 휴대폰 케이스나 헬멧에 딱!
                - button "중형 50x50 product.sizes.medium50x50.label 텀블러·노트북에 잘 어울려요. 가장 인기 있는 사이즈예요." [ref=e49] [cursor=pointer]:
                  - heading "중형 50x50" [level=4] [ref=e50]
                  - img "product.sizes.medium50x50.label" [ref=e51]
                  - paragraph [ref=e52]: 텀블러·노트북에 잘 어울려요. 가장 인기 있는 사이즈예요.
                - button "대형 75x75 product.sizes.large75x75.label 보드나 캐리어에 붙이면 눈에 잘 띄는 크기예요." [ref=e53] [cursor=pointer]:
                  - heading "대형 75x75" [level=4] [ref=e54]
                  - img "product.sizes.large75x75.label" [ref=e55]
                  - paragraph [ref=e56]: 보드나 캐리어에 붙이면 눈에 잘 띄는 크기예요.
                - button "초대형 90x90 product.sizes.extraLarge90x90.label 차·아이스박스·공구함에도 딱 맞는 넉넉한 크기예요." [ref=e57] [cursor=pointer]:
                  - heading "초대형 90x90" [level=4] [ref=e58]
                  - img "product.sizes.extraLarge90x90.label" [ref=e59]
                  - paragraph [ref=e60]: 차·아이스박스·공구함에도 딱 맞는 넉넉한 크기예요.
            - complementary [ref=e61]:
              - generic [ref=e62]:
                - heading "원하시는 소재를 선택하세요" [level=3] [ref=e63]
                - generic [ref=e64]:
                  - button "PVC 매트" [ref=e65] [cursor=pointer]:
                    - paragraph [ref=e66]: PVC 매트
                  - button "투명" [ref=e67] [cursor=pointer]:
                    - paragraph [ref=e68]: 투명
                  - button "홀로그램" [ref=e69] [cursor=pointer]:
                    - paragraph [ref=e70]: 홀로그램
              - generic [ref=e71]:
                - generic [ref=e72]:
                  - heading "개별 스티커 사이즈를 선택하세요" [level=3] [ref=e73]
                  - generic [ref=e74]: (단위:mm)
                - generic [ref=e75]:
                  - button "소형 30x30" [ref=e76] [cursor=pointer]:
                    - generic [ref=e77]: 소형
                    - generic [ref=e78]: 30x30
                  - button "중형 50x50" [ref=e79] [cursor=pointer]:
                    - generic [ref=e80]: 중형
                    - generic [ref=e81]: 50x50
                  - button "대형 75x75" [ref=e82] [cursor=pointer]:
                    - generic [ref=e83]: 대형
                    - generic [ref=e84]: 75x75
                  - button "초대형 90x90" [ref=e85] [cursor=pointer]:
                    - generic [ref=e86]: 초대형
                    - generic [ref=e87]: 90x90
                  - 'button "원하는 크기 입력 주문 가능 크기: 10-200mm" [ref=e88] [cursor=pointer]':
                    - generic [ref=e89]:
                      - img [ref=e90]
                      - paragraph [ref=e92]: 원하는 크기 입력
                    - generic [ref=e93]: "주문 가능 크기: 10-200mm"
              - generic [ref=e94]:
                - heading "수량을 선택하세요" [level=3] [ref=e95]
                - generic [ref=e96]:
                  - button "5시트 3,450원" [ref=e97] [cursor=pointer]:
                    - generic [ref=e98]: 5시트
                    - generic [ref=e99]: 3,450원
                  - button "10시트 6,600원" [ref=e100] [cursor=pointer]:
                    - generic [ref=e101]: 10시트
                    - generic [ref=e102]: 6,600원
                  - button "20시트 12,800원" [ref=e103] [cursor=pointer]:
                    - generic [ref=e104]: 20시트
                    - generic [ref=e105]: 12,800원
                  - button "50시트 31,000원" [ref=e106] [cursor=pointer]:
                    - generic [ref=e107]: 50시트
                    - generic [ref=e108]: 31,000원
                  - button "100시트 60,600원" [ref=e109] [cursor=pointer]:
                    - generic [ref=e110]: 100시트
                    - generic [ref=e111]: 60,600원
                  - button "200시트 105,300원" [ref=e112] [cursor=pointer]:
                    - generic [ref=e113]: 200시트
                    - generic [ref=e114]: 105,300원
                  - button "500시트 185,000원" [ref=e115] [cursor=pointer]:
                    - generic [ref=e116]: 500시트
                    - generic [ref=e117]: 185,000원
                  - button "1,000시트 250,000원" [ref=e118] [cursor=pointer]:
                    - generic [ref=e119]: 1,000시트
                    - generic [ref=e120]: 250,000원
                  - 'button "원하는 수량 입력 주문 가능 수량: 5-1,000시트" [ref=e121] [cursor=pointer]':
                    - generic [ref=e122]:
                      - img [ref=e123]
                      - paragraph [ref=e125]: 원하는 수량 입력
                    - generic [ref=e126]: "주문 가능 수량: 5-1,000시트"
              - region "Sheet summary" [ref=e127]:
                - img "A5 sheet" [ref=e128]
                - generic [ref=e129]:
                  - paragraph [ref=e130]: 1시트 = 스티커 20개
                  - paragraph [ref=e131]: "총 스티커 수량 : 100개"
              - generic [ref=e134]:
                - paragraph [ref=e136]:
                  - strong [ref=e137]: 3,450원
                - paragraph [ref=e138]: (1시트당 690원)
              - generic [ref=e139]:
                - button "다음 단계" [ref=e140] [cursor=pointer]:
                  - generic [ref=e141]: 다음 단계
                - generic [ref=e142]:
                  - paragraph [ref=e143]: 스티커는 A5 시트(148×210mm)에 인쇄됩니다. 아래 가이드를 통해 사이즈별 배치 수량을 확인하고, 가장 적합한 옵션을 선택해 보세요.
                  - generic [ref=e145] [cursor=pointer]:
                    - generic [ref=e146]: 배치 가이드 보기
                    - img [ref=e147]
              - list [ref=e150]:
                - listitem [ref=e151]: 5만원 이상 무료배송
                - listitem [ref=e152]: 3시 이전 시안 확정 시 당일배송
                - listitem [ref=e153]: "도착 예정일: 09.02 (수) · CJ 대한통운"
                - listitem [ref=e154]: 시안 승인 후 평균 1~3일 내 배송됩니다. (주말·공휴일 제외)
        - generic [ref=e156]:
          - article [ref=e157]:
            - img "오늘제작, 내일발송" [ref=e158]
            - heading "오늘제작, 내일발송" [level=4] [ref=e159]
            - paragraph [ref=e160]: 디자인 승인 즉시 제작이 시작됩니다 평균 1~2일 안에 당신의 손에 도착하죠
          - article [ref=e161]:
            - img "빠른 시안 피드백" [ref=e162]
            - heading "빠른 시안 피드백" [level=4] [ref=e163]
            - paragraph [ref=e164]: 결제 후 곧바로 시안을 받아보세요 마음이 ‘예스’ 할 때까지 수정 가능합니다
          - article [ref=e165]:
            - img "뛰어난 내구성과 내수성" [ref=e166]
            - heading "뛰어난 내구성과 내수성" [level=4] [ref=e167]
            - paragraph [ref=e168]: 두꺼운 프리미엄 재질로 색상, 접착력 그대로 오래갑니다
        - generic [ref=e170]:
          - article [ref=e171]:
            - generic [ref=e174]:
              - heading "색감은 생생하게, 내구성은 완벽하게" [level=3] [ref=e175]
              - paragraph [ref=e176]: 고품질 인쇄와 두꺼운 소재로 구현한 화려하고 선명한 색감. 비, 햇빛, 고온에도 쉽게 흐려지지 않는 뛰어난 내구성. 붙이는 순간부터 오래도록 변하지 않는 품질을 느껴보세요.
          - article [ref=e177]:
            - generic [ref=e180]:
              - heading "쉽게 붙이고, 깔끔하게 제거" [level=3] [ref=e181]
              - paragraph [ref=e182]: 매끄럽게 부착되고, 흔적 없이 깔끔하게 떨어집니다. 접착은 강력하지만, 표면은 안전하게 보호합니다. 필요할 땐 단번에 제거되고, 남는 건 깔끔함뿐입니다.
          - article [ref=e183]:
            - generic [ref=e186]:
              - heading "디자인에 맞게 정확하게 컷팅" [level=3] [ref=e187]
              - paragraph [ref=e188]: 로고, 일러스트, 사진을 업로드하면 칼선에 맞춰 정밀하게 스티커로 제작됩니다. 복잡한 패턴도 머스티커의 고유한 절단 기술로 완벽하게 표현됩니다.
        - generic [ref=e190]:
          - generic [ref=e191]:
            - generic [ref=e192]:
              - generic [ref=e193]: 좋아요 😀
              - generic [ref=e194]:
                - img [ref=e195]
                - img [ref=e197]
                - img [ref=e199]
                - img [ref=e201]
                - img [ref=e203]
              - generic [ref=e205]: "5.0"
            - heading "225개 사진 후기가 보장해요" [level=2] [ref=e206]
            - paragraph [ref=e207]: 직접 사용한 고객들의 생생한 리뷰를 확인해보세요. 리얼 사용 이미지와 함께 실제 만족도를 보여드립니다.
            - generic [ref=e208]:
              - button "이전 리뷰" [ref=e209] [cursor=pointer]:
                - img [ref=e210]
                - generic [ref=e212]: 이전 리뷰
              - button "다음 리뷰" [ref=e213] [cursor=pointer]:
                - img [ref=e214]
                - generic [ref=e216]: 다음 리뷰
          - generic [ref=e218]:
            - article [ref=e220]:
              - generic [ref=e221]:
                - img "tkop****" [ref=e223]
                - paragraph [ref=e225]: 빨리오고 너무 이쁘게 만들어주셔서 감사합니다 그리고 서비스도 20장 더 주셔서 감사합니다
              - generic [ref=e226]:
                - generic [ref=e227]:
                  - img "tkop**** avatar" [ref=e228]
                  - generic [ref=e229]:
                    - strong [ref=e230]: tkop****
                    - generic [ref=e231]: 2026-03-25
                - generic [ref=e232]:
                  - img [ref=e233]
                  - img [ref=e235]
                  - img [ref=e237]
                  - img [ref=e239]
                  - img [ref=e241]
            - article [ref=e244]:
              - generic [ref=e245]:
                - img "oozz******" [ref=e247]
                - paragraph [ref=e249]: 잘나와서 만족합니다 잘쓰겠습니다
              - generic [ref=e250]:
                - generic [ref=e251]:
                  - img "oozz****** avatar" [ref=e252]
                  - generic [ref=e253]:
                    - strong [ref=e254]: oozz******
                    - generic [ref=e255]: 2026-03-22
                - generic [ref=e256]:
                  - img [ref=e257]
                  - img [ref=e259]
                  - img [ref=e261]
                  - img [ref=e263]
                  - img [ref=e265]
            - article [ref=e268]:
              - generic [ref=e269]:
                - img "aktm********" [ref=e271]
                - paragraph [ref=e273]: 만족하면서 사용중입니다
              - generic [ref=e274]:
                - generic [ref=e275]:
                  - img "aktm******** avatar" [ref=e276]
                  - generic [ref=e277]:
                    - strong [ref=e278]: aktm********
                    - generic [ref=e279]: 2026-03-04
                - generic [ref=e280]:
                  - img [ref=e281]
                  - img [ref=e283]
                  - img [ref=e285]
                  - img [ref=e287]
                  - img [ref=e289]
            - article [ref=e292]:
              - generic [ref=e293]:
                - img "aktm********" [ref=e295]
                - paragraph [ref=e297]: 잘 받았어요 잘쓸게요.
              - generic [ref=e298]:
                - generic [ref=e299]:
                  - img "aktm******** avatar" [ref=e300]
                  - generic [ref=e301]:
                    - strong [ref=e302]: aktm********
                    - generic [ref=e303]: 2026-01-31
                - generic [ref=e304]:
                  - img [ref=e305]
                  - img [ref=e307]
                  - img [ref=e309]
                  - img [ref=e311]
                  - img [ref=e313]
            - article [ref=e316]:
              - generic [ref=e317]:
                - img "aktm********" [ref=e319]
                - paragraph [ref=e321]: 아주 잘쓰고있습니다.
              - generic [ref=e322]:
                - generic [ref=e323]:
                  - img "aktm******** avatar" [ref=e324]
                  - generic [ref=e325]:
                    - strong [ref=e326]: aktm********
                    - generic [ref=e327]: 2026-01-06
                - generic [ref=e328]:
                  - img [ref=e329]
                  - img [ref=e331]
                  - img [ref=e333]
                  - img [ref=e335]
                  - img [ref=e337]
            - article [ref=e340]:
              - generic [ref=e341]:
                - img "aktm********" [ref=e343]
                - paragraph [ref=e345]: 아주 잘쓰고있습니다.
              - generic [ref=e346]:
                - generic [ref=e347]:
                  - img "aktm******** avatar" [ref=e348]
                  - generic [ref=e349]:
                    - strong [ref=e350]: aktm********
                    - generic [ref=e351]: 2026-01-06
                - generic [ref=e352]:
                  - img [ref=e353]
                  - img [ref=e355]
                  - img [ref=e357]
                  - img [ref=e359]
                  - img [ref=e361]
            - article [ref=e364]:
              - generic [ref=e365]:
                - img "jiwn****" [ref=e367]
                - paragraph [ref=e369]: 아 정말 너무 좋아연ㅎㅎ
              - generic [ref=e370]:
                - generic [ref=e371]:
                  - img "jiwn**** avatar" [ref=e372]
                  - generic [ref=e373]:
                    - strong [ref=e374]: jiwn****
                    - generic [ref=e375]: 2025-12-29
                - generic [ref=e376]:
                  - img [ref=e377]
                  - img [ref=e379]
                  - img [ref=e381]
                  - img [ref=e383]
                  - img [ref=e385]
            - article [ref=e388]:
              - generic [ref=e389]:
                - img "koj3***" [ref=e391]
                - paragraph [ref=e393]: 방수도 잘되고 오염에도 잘 버티고 좋아요. 적극 추천합니다.^^
              - generic [ref=e394]:
                - generic [ref=e395]:
                  - img "koj3*** avatar" [ref=e396]
                  - generic [ref=e397]:
                    - strong [ref=e398]: koj3***
                    - generic [ref=e399]: 2025-12-24
                - generic [ref=e400]:
                  - img [ref=e401]
                  - img [ref=e403]
                  - img [ref=e405]
                  - img [ref=e407]
                  - img [ref=e409]
            - article [ref=e412]:
              - generic [ref=e413]:
                - img "aktm********" [ref=e415]
                - paragraph [ref=e417]: 이쁘네요 잘쓸게요.!!
              - generic [ref=e418]:
                - generic [ref=e419]:
                  - img "aktm******** avatar" [ref=e420]
                  - generic [ref=e421]:
                    - strong [ref=e422]: aktm********
                    - generic [ref=e423]: 2025-12-03
                - generic [ref=e424]:
                  - img [ref=e425]
                  - img [ref=e427]
                  - img [ref=e429]
                  - img [ref=e431]
                  - img [ref=e433]
            - article [ref=e436]:
              - generic [ref=e437]:
                - img "aktm********" [ref=e439]
                - paragraph [ref=e441]: 이쁘게 잘뽑혔네요.
              - generic [ref=e442]:
                - generic [ref=e443]:
                  - img "aktm******** avatar" [ref=e444]
                  - generic [ref=e445]:
                    - strong [ref=e446]: aktm********
                    - generic [ref=e447]: 2025-11-30
                - generic [ref=e448]:
                  - img [ref=e449]
                  - img [ref=e451]
                  - img [ref=e453]
                  - img [ref=e455]
                  - img [ref=e457]
            - article [ref=e460]:
              - generic [ref=e461]:
                - img "circ*****" [ref=e463]
                - paragraph [ref=e465]: 품질도 좋고 응대도 잘해주셔서 이쁘게 나왔네요
              - generic [ref=e466]:
                - generic [ref=e467]:
                  - img "circ***** avatar" [ref=e468]
                  - generic [ref=e469]:
                    - strong [ref=e470]: circ*****
                    - generic [ref=e471]: 2025-11-20
                - generic [ref=e472]:
                  - img [ref=e473]
                  - img [ref=e475]
                  - img [ref=e477]
                  - img [ref=e479]
                  - img [ref=e481]
            - article [ref=e484]:
              - generic [ref=e485]:
                - img "pina******" [ref=e487]
                - paragraph [ref=e489]: 부착 잘되고 제거할때 끈적임 없이 깔끔하게 떨어져서 좋아요
              - generic [ref=e490]:
                - generic [ref=e491]:
                  - img "pina****** avatar" [ref=e492]
                  - generic [ref=e493]:
                    - strong [ref=e494]: pina******
                    - generic [ref=e495]: 2025-08-22
                - generic [ref=e496]:
                  - img [ref=e497]
                  - img [ref=e499]
                  - img [ref=e501]
                  - img [ref=e503]
                  - img [ref=e505]
            - article [ref=e508]:
              - generic [ref=e509]:
                - img "qcyc*****" [ref=e511]
                - paragraph [ref=e513]: 덕분에 넘넘 잘썼습니다
              - generic [ref=e514]:
                - generic [ref=e515]:
                  - img "qcyc***** avatar" [ref=e516]
                  - generic [ref=e517]:
                    - strong [ref=e518]: qcyc*****
                    - generic [ref=e519]: 2025-08-15
                - generic [ref=e520]:
                  - img [ref=e521]
                  - img [ref=e523]
                  - img [ref=e525]
                  - img [ref=e527]
                  - img [ref=e529]
            - article [ref=e532]:
              - generic [ref=e533]:
                - img "rlad*******" [ref=e535]
                - paragraph [ref=e537]: 꼼꼼하게 체크해주셔서 너무좋았습니다!
              - generic [ref=e538]:
                - generic [ref=e539]:
                  - img "rlad******* avatar" [ref=e540]
                  - generic [ref=e541]:
                    - strong [ref=e542]: rlad*******
                    - generic [ref=e543]: 2025-07-17
                - generic [ref=e544]:
                  - img [ref=e545]
                  - img [ref=e547]
                  - img [ref=e549]
                  - img [ref=e551]
                  - img [ref=e553]
            - article [ref=e556]:
              - generic [ref=e557]:
                - img "csbn*****" [ref=e559]
                - paragraph [ref=e561]: 배송도 빠르고 재질도 좋고 너무 좋아요 감사합니다!
              - generic [ref=e562]:
                - generic [ref=e563]:
                  - img "csbn***** avatar" [ref=e564]
                  - generic [ref=e565]:
                    - strong [ref=e566]: csbn*****
                    - generic [ref=e567]: 2025-07-14
                - generic [ref=e568]:
                  - img [ref=e569]
                  - img [ref=e571]
                  - img [ref=e573]
                  - img [ref=e575]
                  - img [ref=e577]
            - article [ref=e580]:
              - generic [ref=e581]:
                - img "pina******" [ref=e583]
                - paragraph [ref=e585]: 생각한대로 너무 깔끔하게 나왔어요! 다음에도 주문하겠습니다!!
              - generic [ref=e586]:
                - generic [ref=e587]:
                  - img "pina****** avatar" [ref=e588]
                  - generic [ref=e589]:
                    - strong [ref=e590]: pina******
                    - generic [ref=e591]: 2025-07-09
                - generic [ref=e592]:
                  - img [ref=e593]
                  - img [ref=e595]
                  - img [ref=e597]
                  - img [ref=e599]
                  - img [ref=e601]
        - generic [ref=e604]:
          - generic [ref=e605]:
            - img "text" [ref=e606]
            - generic [ref=e607]:
              - heading "원형 시트 스티커 FAQ" [level=2] [ref=e608]
              - paragraph [ref=e609]:
                - text: 멤버십, 주문, 디자인 파일 업로드, 인쇄, 결제, 반품·환불에 대한 자세한 내용은 자주 묻는
                - link "질문(FAQ) 페이지에서 확인해 주세요" [ref=e610] [cursor=pointer]:
                  - /url: https://www.musticker.com/faq
                - text: .
          - generic [ref=e611]:
            - generic [ref=e612]:
              - generic [ref=e613] [cursor=pointer]:
                - heading "원형 시트 스티커란 무엇인가요?" [level=3] [ref=e614]
                - paragraph [ref=e617]: 원형 시트 스티커는 여러 개의 원형 스티커를 한 장의 시트에 배치해 제작하는 스티커입니다. 각 스티커는 키스컷 방식으로 제작되어 시트는 그대로 유지되며, 스티커를 한 장씩 쉽게 떼어 사용할 수 있습니다.
              - button [ref=e618] [cursor=pointer]:
                - img [ref=e619]
            - generic [ref=e621]:
              - generic [ref=e622] [cursor=pointer]:
                - heading "원형 시트 스티커는 방수 및 내구성이 있나요?" [level=3] [ref=e623]
                - paragraph [ref=e624]: 네. 머스티커의 원형 시트 스티커는 방수 기능이 있는 PVC 소재로 제작됩니다. 둥근 형태로 가장자리가 깔끔하게 마감되어 다양한 용도로 편리하게 사용할 수 있습니다. 다만 날카로운 물체나 강한 마찰에는 긁힘이 생길 수 있으니 주의해 주세요.
              - button [ref=e625] [cursor=pointer]:
                - img [ref=e626]
            - generic [ref=e628]:
              - generic [ref=e629] [cursor=pointer]:
                - heading "한 장의 시트에 여러 가지 원형 디자인을 넣을 수 있나요?" [level=3] [ref=e630]
                - paragraph [ref=e631]: 아니요. 원형 시트 스티커는 하나의 디자인이 시트 전체에 반복 배치되어 제작됩니다. 모든 스티커가 동일한 크기와 간격으로 배치되어 깔끔하게 제작됩니다.
              - button [ref=e632] [cursor=pointer]:
                - img [ref=e633]
            - generic [ref=e635]:
              - generic [ref=e636] [cursor=pointer]:
                - heading "원형 스티커는 정확한 원형으로 제작되나요?" [level=3] [ref=e637]
                - paragraph [ref=e638]: 네. 모든 원형 스티커는 깔끔한 원형으로 제작됩니다. 디자인이 중앙에 맞게 배치되어 좌우 균형이 잘 잡힌 형태로 완성됩니다.
              - button [ref=e639] [cursor=pointer]:
                - img [ref=e640]
            - generic [ref=e642]:
              - generic [ref=e643] [cursor=pointer]:
                - heading "원형 시트 스티커는 어떤 소재를 선택할 수 있나요?" [level=3] [ref=e644]
                - paragraph [ref=e645]: 원형 시트 스티커는 PVC(백색), 투명, 홀로그램 소재로 제작할 수 있습니다. 선명한 색감을 원한다면 PVC(백색), 깔끔하고 자연스러운 느낌을 원한다면 투명, 반짝이는 효과를 원한다면 홀로그램을 추천합니다.
              - button [ref=e646] [cursor=pointer]:
                - img [ref=e647]
          - generic [ref=e649]:
            - generic [ref=e650]:
              - heading "궁금한 점이 더 있으신가요?" [level=4] [ref=e651]
              - paragraph [ref=e652]: 원하시는 답변을 찾지 못하셨다면 언제든지 문의해 주세요.
            - button "문의하기" [ref=e653] [cursor=pointer]:
              - generic [ref=e654]: 문의하기
      - navigation "네이버 톡톡으로 문의하기" [ref=e655]:
        - link "카카오채널로 문의하기" [ref=e656] [cursor=pointer]:
          - /url: https://pf.kakao.com/_nJxnTX/chat
          - generic:
            - generic:
              - generic:
                - img
              - paragraph: 카카오채널로 문의하기
          - img [ref=e658]
        - link "네이버 톡톡 으로 문의하기" [ref=e659] [cursor=pointer]:
          - /url: https://talk.naver.com/ct/w2luxqo
          - generic:
            - generic:
              - generic:
                - img
              - paragraph: 네이버 톡톡 으로 문의하기
          - img [ref=e661]
        - generic "이메일로 문의하기" [ref=e662] [cursor=pointer]:
          - generic:
            - generic:
              - generic:
                - img
              - paragraph: 이메일로 문의하기
          - img [ref=e664]
    - contentinfo [ref=e665]:
      - generic [ref=e666]:
        - generic [ref=e667]:
          - heading "MUSTICKER / 머스티커" [level=2] [ref=e668]
          - paragraph [ref=e669]: "상호명: (주)글로픽스"
          - paragraph [ref=e670]: "사업자등록번호 : 877-88-03313 통신판매업신고 : 2026-부산해운대-0792호"
          - paragraph [ref=e671]: "대표이사 : 여일석 주소 : 부산광역시 해운대구 해운대해변로 203 오션타워 1014호"
          - paragraph [ref=e672]: "호스팅사업자 : 아마존웹서비시즈(Amazon Web Services)"
          - paragraph [ref=e673]:
            - generic [ref=e674]: ⓒ 2026. All rights reserved.
            - generic [ref=e675]: "판매: sales@musticker.com"
            - link "이용약관" [ref=e676] [cursor=pointer]:
              - /url: /kr/terms-of-use
            - link "개인정보처리방침" [ref=e677] [cursor=pointer]:
              - /url: /kr/privacy-policy
            - generic [ref=e678] [cursor=pointer]: 사업자정보확인
            - link "회사소개" [ref=e679] [cursor=pointer]:
              - /url: /kr/about
        - generic [ref=e680]:
          - paragraph [ref=e681]: 1899-5529
          - paragraph [ref=e683]: 오전 9시 ~ 오후 6시(토요일, 공휴일 휴무)
          - generic [ref=e684]:
            - button "1:1문의하기" [ref=e685] [cursor=pointer]
            - link "자주 묻는 질문" [ref=e686] [cursor=pointer]:
              - /url: /kr/faq
          - generic [ref=e687]:
            - generic [ref=e688]: "Follow us at:"
            - generic [ref=e689]:
              - link "instagram icon" [ref=e690] [cursor=pointer]:
                - /url: https://www.instagram.com/musticker_official/
                - img "instagram icon"
              - link "youtube icon" [ref=e691] [cursor=pointer]:
                - /url: https://www.youtube.com/@MustickerOfficial
                - img "youtube icon"
  - dialog [ref=e693]:
    - banner [ref=e694]:
      - heading "장바구니 미리보기 (1)" [level=3] [ref=e695]
      - button "쇼핑 계속하기" [ref=e696] [cursor=pointer]:
        - generic [ref=e697]:
          - paragraph [ref=e698]: 쇼핑 계속하기
          - img [ref=e699]
    - article [ref=e704]:
      - generic [ref=e705]:
        - img "illustrations/products/sheet-stickers/circle-sheet.svg" [ref=e707]
        - generic [ref=e708]:
          - heading "원형 시트 스티커" [level=4] [ref=e709]
          - paragraph [ref=e710]: "개별 사이즈: 30x30mm"
          - paragraph [ref=e711]: "수량: 5시트"
          - generic [ref=e712]: "소재: PVC 매트"
      - generic [ref=e713]:
        - strong [ref=e714]: 3,450원
        - generic [ref=e715]:
          - button "상품 수정" [ref=e716] [cursor=pointer]:
            - img [ref=e717]
            - generic [ref=e719]: 상품 수정
          - button "상품 삭제" [ref=e720] [cursor=pointer]:
            - img [ref=e721]
            - generic [ref=e723]: 상품 삭제
    - contentinfo [ref=e724]:
      - generic [ref=e725]:
        - paragraph [ref=e726]:
          - generic [ref=e727]: 합계
          - strong [ref=e728]: 3,450원
        - generic [ref=e729]:
          - paragraph [ref=e730]: 참고
          - paragraph [ref=e731]: 배송비 및 할인 내역은 결제 시 적용됩니다.
      - generic [ref=e732]:
        - button "장바구니 보기" [ref=e733] [cursor=pointer]:
          - generic [ref=e734]: 장바구니 보기
        - button "주문하기" [ref=e735] [cursor=pointer]:
          - generic [ref=e736]:
            - img [ref=e737]
            - text: 주문하기
  - dialog "사이즈 및 수량 수정" [ref=e739]:
    - banner [ref=e740]:
      - heading "사이즈 및 수량 수정" [level=3] [ref=e742]
      - button "모달 닫기" [ref=e744] [cursor=pointer]:
        - img [ref=e746]
    - generic [ref=e750]:
      - img "원형 시트 스티커" [ref=e752]
      - generic [ref=e753]:
        - generic [ref=e754]:
          - generic [ref=e755]: 소재
          - navigation [ref=e756]:
            - button "PVC 매트" [ref=e757] [cursor=pointer]
            - button "투명" [ref=e758] [cursor=pointer]
            - button "홀로그램" [ref=e759] [cursor=pointer]
        - generic [ref=e760]:
          - generic [ref=e761]:
            - generic [ref=e762]: 개별 사이즈
            - generic [ref=e763]: (단위:mm)
          - generic [ref=e764]:
            - generic [ref=e765]:
              - textbox "가로" [ref=e766]: "123"
              - generic [ref=e767]: x
              - textbox "세로" [ref=e768]: "123"
            - button "사이즈 옵션 열기" [ref=e769] [cursor=pointer]:
              - img [ref=e770]
          - paragraph [ref=e772]: 한 시트에 최소 2개의 스티커가 들어가도록 세로 길이 를 97mm 이하로 입력해 주세요.
        - generic [ref=e773]:
          - generic [ref=e774]: 수량
          - button "5시트" [ref=e776] [cursor=pointer]:
            - generic [ref=e777]: 5시트
            - img [ref=e778]
    - contentinfo [ref=e780]:
      - generic [ref=e781]:
        - button "취소" [ref=e782] [cursor=pointer]:
          - generic [ref=e783]: 취소
        - button "업데이트" [disabled] [ref=e784]:
          - generic [ref=e785]: 업데이트
```

# Test source

```ts
  145 |         await this.closeEditDialog(editDialog);
  146 |         continue;
  147 |       }
  148 | 
  149 |       const selectedSize = await this.selectFromEditDialog(editDialog, 0, String(sizeMm));
  150 |       const selectedQuantity = await this.selectFromEditDialog(editDialog, 1, String(quantity));
  151 | 
  152 |       if (!selectedSize.changed && !selectedQuantity.changed) {
  153 |         await this.closeEditDialog(editDialog);
  154 |         continue;
  155 |       }
  156 | 
  157 |       const updateResponsePromise = this.waitForCartItemUpdateResponse();
  158 |       const updateButton = await firstVisibleLocator([
  159 |         {
  160 |           name: 'cart edit update button role',
  161 |           locator: editDialog.getByRole('button', { name: /\uc5c5\ub370\uc774\ud2b8|Update/i })
  162 |         },
  163 |         {
  164 |           name: 'cart edit submit button',
  165 |           locator: editDialog.locator('button[type="submit"]')
  166 |         }
  167 |       ]);
  168 | 
  169 |       await updateButton.click();
  170 |       await this.expectCartItemUpdateSucceeded(await updateResponsePromise);
  171 | 
  172 |       const dialogClosed = await editDialog
  173 |         .waitFor({ state: 'hidden', timeout: 10_000 })
  174 |         .then(() => true)
  175 |         .catch(() => false);
  176 | 
  177 |       if (!dialogClosed) {
  178 |         await this.closeEditDialog(editDialog).catch(() => undefined);
  179 |         continue;
  180 |       }
  181 | 
  182 |       if (selectedSize.value) {
  183 |         await expect(this.dialog.getByText(new RegExp(`Size:\\s*${selectedSize.value}x${selectedSize.value}`, 'i')).first())
  184 |           .toBeVisible({ timeout: 5_000 })
  185 |           .catch(() => undefined);
  186 |       }
  187 | 
  188 |       if (selectedQuantity.value) {
  189 |         await expect(this.dialog.getByText(new RegExp(`Quantity:\\s*${selectedQuantity.value}`, 'i')).first())
  190 |           .toBeVisible({
  191 |             timeout: 5_000
  192 |           })
  193 |           .catch(() => undefined);
  194 |       }
  195 | 
  196 |       const totalChanged = await expect
  197 |         .poll(() => this.captureTotal(), { timeout: 15_000 })
  198 |         .not.toBe(totalBefore)
  199 |         .then(() => true)
  200 |         .catch(() => false);
  201 | 
  202 |       if (totalChanged || selectedSize.changed || selectedQuantity.changed) {
  203 |         return;
  204 |       }
  205 |     }
  206 | 
  207 |     throw new Error('No cart preview item exposed both size and quantity edit controls.');
  208 |   }
  209 | 
  210 |   async editFirstItemMaterial(materialName: string): Promise<void> {
  211 |     const totalBefore = await this.captureTotal();
  212 |     const editButtons = await this.editButtons();
  213 |     await editButtons.first().click();
  214 | 
  215 |     const editDialog = await this.editDialog();
  216 |     await editDialog.getByRole('button', { name: materialName }).click();
  217 | 
  218 |     const updateResponsePromise = this.waitForCartItemUpdateResponse();
  219 |     const updateButton = await firstVisibleLocator([
  220 |       {
  221 |         name: 'cart edit update button role',
  222 |         locator: editDialog.getByRole('button', { name: /업데이트|Update/i })
  223 |       },
  224 |       {
  225 |         name: 'cart edit submit button',
  226 |         locator: editDialog.locator('button[type="submit"]')
  227 |       }
  228 |     ]);
  229 | 
  230 |     await updateButton.click();
  231 |     await this.expectCartItemUpdateSucceeded(await updateResponsePromise);
  232 |     await expect(editDialog).toBeHidden({ timeout: 10_000 });
  233 |     await expect.poll(() => this.captureTotal(), { timeout: 15_000 }).not.toBe(totalBefore);
  234 |   }
  235 | 
  236 |   // The drawer's combined 사이즈 및 수량 수정 dialog enforces the same minimum-two-per-sheet rule as
  237 |   // the product page and the full cart page's 사이즈 변경 dialog.
  238 |   async expectCustomSizeRejectedInEditDialog(widthMm: number, heightMm: number): Promise<void> {
  239 |     const editButtons = await this.editButtons();
  240 |     await editButtons.first().click();
  241 | 
  242 |     const editDialog = await this.editDialog();
  243 |     await enterCartDialogCustomSize(this.page, editDialog, widthMm, heightMm);
  244 | 
> 245 |     await expect(editDialog.getByText(ko.minimumTwoPerSheetError)).toBeVisible();
      |                                                                    ^ Error: expect(locator).toBeVisible() failed
  246 |     await expect(
  247 |       editDialog.getByRole('button', { name: new RegExp(`${ko.cartUpdate}|Update`, 'i') })
  248 |     ).toBeDisabled();
  249 |   }
  250 | 
  251 |   async expectRecommendedProductsVisible(): Promise<void> {
  252 |     await expect(this.dialog.getByRole('heading', { name: '\ucd94\ucc9c \uc0c1\ud488' })).toBeVisible();
  253 |     await expect(this.dialog.getByRole('button', { name: '\ub9de\ucda4 \uc81c\uc791' }).first()).toBeVisible();
  254 |   }
  255 | 
  256 |   async removeLineItem(config: string | ProductConfig | CartLineItem): Promise<void> {
  257 |     const itemCountBefore = await this.lineItemArticles().count();
  258 |     const item = this.lineItem(config);
  259 |     await this.deleteLineItem(item);
  260 | 
  261 |     await this.confirmRemovalIfPrompted();
  262 |     await expect.poll(() => this.lineItemArticles().count(), { timeout: 10_000 }).toBe(itemCountBefore - 1);
  263 |   }
  264 | 
  265 |   async removeAllLineItems(): Promise<void> {
  266 |     await this.waitForLineItems(3_000).catch(() => undefined);
  267 | 
  268 |     for (let attempt = 0; attempt < 200; attempt += 1) {
  269 |       const lineItems = this.lineItemArticles();
  270 |       const itemCount = await lineItems.count();
  271 |       const totalBefore = await this.cartItemCount();
  272 | 
  273 |       if (itemCount === 0 || totalBefore === 0) {
  274 |         return;
  275 |       }
  276 | 
  277 |       const firstItemText = await lineItems.first().innerText().catch(() => '');
  278 |       await this.deleteLineItem(lineItems.first());
  279 |       await this.confirmRemovalIfPrompted();
  280 | 
  281 |       const removalObserved = await expect
  282 |         .poll(
  283 |           async () => {
  284 |             const totalAfter = await this.cartItemCount();
  285 | 
  286 |             if (totalBefore !== undefined && totalAfter !== undefined && totalAfter < totalBefore) {
  287 |               return true;
  288 |             }
  289 | 
  290 |             const updatedItems = this.lineItemArticles();
  291 |             const updatedCount = await updatedItems.count();
  292 |             const updatedFirstItemText = await updatedItems.first().innerText().catch(() => '');
  293 | 
  294 |             return updatedCount < itemCount || updatedFirstItemText !== firstItemText;
  295 |           },
  296 |           { timeout: 10_000 }
  297 |         )
  298 |         .toBe(true)
  299 |         .then(() => true)
  300 |         .catch(() => false);
  301 | 
  302 |       if (!removalObserved) {
  303 |         await this.page.waitForTimeout(500);
  304 |       }
  305 |     }
  306 | 
  307 |     throw new Error('Cart still had line items after 200 removal attempts.');
  308 |   }
  309 | 
  310 |   async checkout(): Promise<void> {
  311 |     const checkoutByTestId = this.page.getByTestId('product-category-cart-checkout-button');
  312 |     if (await checkoutByTestId.count()) {
  313 |       await checkoutByTestId.click();
  314 |     } else {
  315 |       await this.dialog.getByRole('button', { name: '\uacb0\uc81c \uc9c4\ud589' }).click();
  316 |     }
  317 | 
  318 |     await expect(this.page).toHaveURL(/\/kr\/checkout\/?$/);
  319 |   }
  320 | 
  321 |   async continueShopping(): Promise<void> {
  322 |     await this.dialog.getByRole('button', { name: '\uc1fc\ud551 \uacc4\uc18d\ud558\uae30' }).click();
  323 |     await expect(this.dialog).toBeHidden();
  324 |   }
  325 | 
  326 |   async viewCart(): Promise<void> {
  327 |     await this.dialog.getByTestId('product-category-cart-view-button').click();
  328 |     await expect(this.page).toHaveURL(/\/kr\/cart\/?$/);
  329 |   }
  330 | 
  331 |   private lineItem(product: string | ProductConfig | CartLineItem): Locator {
  332 |     if (typeof product === 'string') {
  333 |       return this.lineItems(product).first();
  334 |     }
  335 | 
  336 |     let items = this.lineItems(product.productName);
  337 |     const price = lineItemPrice(product);
  338 | 
  339 |     if (product.widthMm && product.heightMm) {
  340 |       items = items.filter({
  341 |         hasText: new RegExp(`(?:Size|사이즈):\\s*${product.widthMm}x\\s*${product.heightMm}(?:mm)?`, 'i')
  342 |       });
  343 |     }
  344 | 
  345 |     if (product.quantity) {
```