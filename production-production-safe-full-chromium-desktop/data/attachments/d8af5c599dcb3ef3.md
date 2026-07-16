# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: purchasing/cart.spec.ts >> upload and cart >> adds configured product to cart with upload-later path and removes it
- Location: tests/e2e/purchasing/cart.spec.ts:25:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('dialog').filter({ hasText: /\uc7a5\ubc14\uad6c\ub2c8 \ubbf8\ub9ac\ubcf4\uae30|Cart Preview/i }).getByRole('heading', { name: '추천 상품' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('dialog').filter({ hasText: /\uc7a5\ubc14\uad6c\ub2c8 \ubbf8\ub9ac\ubcf4\uae30|Cart Preview/i }).getByRole('heading', { name: '추천 상품' })

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
            - button "layout.header.search" [ref=e10] [cursor=pointer]:
              - img [ref=e11]
            - generic [ref=e13]:
              - button "장바구니" [ref=e14] [cursor=pointer]:
                - img [ref=e15]
              - generic: "1"
            - button "계정" [ref=e18] [cursor=pointer]:
              - img [ref=e20]
        - navigation "Primary":
          - link "스티커" [ref=e22] [cursor=pointer]:
            - /url: /kr/stickers
          - link "롤스티커" [ref=e23] [cursor=pointer]:
            - /url: /kr/roll-stickers
          - link "시트 스티커" [ref=e24] [cursor=pointer]:
            - /url: /kr/sheet-stickers
    - main [ref=e25]:
      - generic [ref=e26]:
        - generic [ref=e28]:
          - generic:
            - navigation
          - generic [ref=e31]:
            - generic [ref=e32]:
              - generic [ref=e33]:
                - heading "자유형 스티커" [level=1] [ref=e34]
                - paragraph [ref=e35]: 두텁고 강력한 내구성을 가진 소재를 자랑해요
              - img "자유형 스티커 preview poster" [ref=e37]
              - generic [ref=e39]:
                - button "소형 30x30 A6 105x148 작고 귀여운 크기로 휴대폰 케이스나 헬멧에 딱!" [ref=e40] [cursor=pointer]:
                  - heading "소형 30x30" [level=4] [ref=e41]
                  - img "A6 105x148" [ref=e42]
                  - paragraph [ref=e43]: 작고 귀여운 크기로 휴대폰 케이스나 헬멧에 딱!
                - button "중형 75x75 A5 148x210 텀블러·노트북에 잘 어울려요. 가장 인기 있는 사이즈예요." [ref=e44] [cursor=pointer]:
                  - heading "중형 75x75" [level=4] [ref=e45]
                  - img "A5 148x210" [ref=e46]
                  - paragraph [ref=e47]: 텀블러·노트북에 잘 어울려요. 가장 인기 있는 사이즈예요.
                - button "대형 100x100 A4 210x297 보드나 캐리어에 붙이면 눈에 잘 띄는 크기예요." [ref=e48] [cursor=pointer]:
                  - heading "대형 100x100" [level=4] [ref=e49]
                  - img "A4 210x297" [ref=e50]
                  - paragraph [ref=e51]: 보드나 캐리어에 붙이면 눈에 잘 띄는 크기예요.
                - button "초대형 125x125 72x170 차·아이스박스·공구함에도 딱 맞는 넉넉한 크기예요." [ref=e52] [cursor=pointer]:
                  - heading "초대형 125x125" [level=4] [ref=e53]
                  - img "72x170" [ref=e54]
                  - paragraph [ref=e55]: 차·아이스박스·공구함에도 딱 맞는 넉넉한 크기예요.
            - complementary [ref=e56]:
              - generic [ref=e57]:
                - generic [ref=e58]:
                  - heading "사이즈를 선택하세요" [level=3] [ref=e59]
                  - generic [ref=e60]: (단위:mm)
                - generic [ref=e61]:
                  - button "소형 30x30" [ref=e62] [cursor=pointer]:
                    - generic [ref=e63]: 소형
                    - generic [ref=e64]: 30x30
                  - button "중형 75x75" [ref=e65] [cursor=pointer]:
                    - generic [ref=e66]: 중형
                    - generic [ref=e67]: 75x75
                  - button "대형 100x100" [ref=e68] [cursor=pointer]:
                    - generic [ref=e69]: 대형
                    - generic [ref=e70]: 100x100
                  - button "초대형 125x125" [ref=e71] [cursor=pointer]:
                    - generic [ref=e72]: 초대형
                    - generic [ref=e73]: 125x125
                  - generic [ref=e74] [cursor=pointer]:
                    - spinbutton [ref=e75]: "75"
                    - generic [ref=e76]: x
                    - spinbutton [ref=e77]: "75"
              - generic [ref=e78]:
                - heading "수량을 선택하세요" [level=3] [ref=e79]
                - generic [ref=e80]:
                  - button "10개 6,600원" [ref=e81] [cursor=pointer]:
                    - generic [ref=e82]: 10개
                    - generic [ref=e83]: 6,600원
                  - button "20개 12,500원" [ref=e84] [cursor=pointer]:
                    - generic [ref=e85]: 20개
                    - generic [ref=e86]: 12,500원
                  - button "30개 18,700원" [ref=e87] [cursor=pointer]:
                    - generic [ref=e88]: 30개
                    - generic [ref=e89]: 18,700원
                  - button "50개 29,600원" [ref=e90] [cursor=pointer]:
                    - generic [ref=e91]: 50개
                    - generic [ref=e92]: 29,600원
                  - button "100개 55,500원" [ref=e93] [cursor=pointer]:
                    - generic [ref=e94]: 100개
                    - generic [ref=e95]: 55,500원
                  - button "300개 159,100원" [ref=e96] [cursor=pointer]:
                    - generic [ref=e97]: 300개
                    - generic [ref=e98]: 159,100원
                  - button "500개 250,500원" [ref=e99] [cursor=pointer]:
                    - generic [ref=e100]: 500개
                    - generic [ref=e101]: 250,500원
                  - button "1,000개 459,100원" [ref=e102] [cursor=pointer]:
                    - generic [ref=e103]: 1,000개
                    - generic [ref=e104]: 459,100원
                  - button "직접 입력" [ref=e105] [cursor=pointer]
              - generic [ref=e108]:
                - paragraph [ref=e110]:
                  - strong [ref=e111]: 6,600원
                - paragraph [ref=e112]: (1매당 660원)
              - button "다음 단계" [ref=e113] [cursor=pointer]:
                - generic [ref=e114]: 다음 단계
              - list [ref=e116]:
                - listitem [ref=e117]: 5만원 이상 무료배송
                - listitem [ref=e118]: 3시 이전 시안 확정 시 당일배송
                - listitem [ref=e119]: "도착 예정일: 07.21 (화) · CJ 대한통운"
                - listitem [ref=e120]: 시안 승인 후 평균 1~3일 내 배송됩니다. (주말·공휴일 제외)
        - generic [ref=e122]:
          - article [ref=e123]:
            - img "오늘제작, 내일발송" [ref=e124]
            - heading "오늘제작, 내일발송" [level=4] [ref=e125]
            - paragraph [ref=e126]: 디자인 승인 즉시 제작이 시작됩니다 평균 1~2일 안에 당신의 손에 도착하죠
          - article [ref=e127]:
            - img "빠른 시안 피드백" [ref=e128]
            - heading "빠른 시안 피드백" [level=4] [ref=e129]
            - paragraph [ref=e130]: 결제 후 곧바로 시안을 받아보세요 마음이 ‘예스’ 할 때까지 수정 가능합니다
          - article [ref=e131]:
            - img "뛰어난 내구성과 내수성" [ref=e132]
            - heading "뛰어난 내구성과 내수성" [level=4] [ref=e133]
            - paragraph [ref=e134]: 두꺼운 프리미엄 재질로 색상, 접착력 그대로 오래갑니다
        - generic [ref=e136]:
          - article [ref=e137]:
            - generic [ref=e140]:
              - heading "색감은 생생하게, 내구성은 완벽하게" [level=3] [ref=e141]
              - paragraph [ref=e142]: 고품질 인쇄와 두꺼운 소재로 구현한 화려하고 선명한 색감. 비, 햇빛, 고온에도 쉽게 흐려지지 않는 뛰어난 내구성. 붙이는 순간부터 오래도록 변하지 않는 품질을 느껴보세요.
          - article [ref=e143]:
            - generic [ref=e146]:
              - heading "쉽게 붙이고, 깔끔하게 제거" [level=3] [ref=e147]
              - paragraph [ref=e148]: 매끄럽게 부착되고, 흔적 없이 깔끔하게 떨어집니다. 접착은 강력하지만, 표면은 안전하게 보호합니다. 필요할 땐 단번에 제거되고, 남는 건 깔끔함뿐입니다.
          - article [ref=e149]:
            - generic [ref=e152]:
              - heading "디자인에 맞게 정확하게 컷팅" [level=3] [ref=e153]
              - paragraph [ref=e154]: 로고, 일러스트, 사진을 업로드하면 칼선에 맞춰 정밀하게 스티커로 제작됩니다. 복잡한 패턴도 머스티커의 고유한 절단 기술로 완벽하게 표현됩니다.
        - generic [ref=e156]:
          - generic [ref=e157]:
            - generic [ref=e158]:
              - generic [ref=e159]: 좋아요 😀
              - generic [ref=e160]:
                - img [ref=e161]
                - img [ref=e163]
                - img [ref=e165]
                - img [ref=e167]
                - img [ref=e169]
              - generic [ref=e171]: "5.0"
            - heading "225개 사진 후기가 보장해요" [level=2] [ref=e172]
            - paragraph [ref=e173]: 직접 사용한 고객들의 생생한 리뷰를 확인해보세요. 리얼 사용 이미지와 함께 실제 만족도를 보여드립니다.
            - generic [ref=e174]:
              - button "이전 리뷰" [ref=e175] [cursor=pointer]:
                - img [ref=e176]
                - generic [ref=e178]: 이전 리뷰
              - button "다음 리뷰" [ref=e179] [cursor=pointer]:
                - img [ref=e180]
                - generic [ref=e182]: 다음 리뷰
          - generic [ref=e184]:
            - article [ref=e186]:
              - generic [ref=e187]:
                - img "tkop****" [ref=e189]
                - paragraph [ref=e191]: 빨리오고 너무 이쁘게 만들어주셔서 감사합니다 그리고 서비스도 20장 더 주셔서 감사합니다
              - generic [ref=e192]:
                - generic [ref=e193]:
                  - img "tkop**** avatar" [ref=e194]
                  - generic [ref=e195]:
                    - strong [ref=e196]: tkop****
                    - generic [ref=e197]: 2026-03-25
                - generic [ref=e198]:
                  - img [ref=e199]
                  - img [ref=e201]
                  - img [ref=e203]
                  - img [ref=e205]
                  - img [ref=e207]
            - article [ref=e210]:
              - generic [ref=e211]:
                - img "oozz******" [ref=e213]
                - paragraph [ref=e215]: 잘나와서 만족합니다 잘쓰겠습니다
              - generic [ref=e216]:
                - generic [ref=e217]:
                  - img "oozz****** avatar" [ref=e218]
                  - generic [ref=e219]:
                    - strong [ref=e220]: oozz******
                    - generic [ref=e221]: 2026-03-22
                - generic [ref=e222]:
                  - img [ref=e223]
                  - img [ref=e225]
                  - img [ref=e227]
                  - img [ref=e229]
                  - img [ref=e231]
            - article [ref=e234]:
              - generic [ref=e235]:
                - img "aktm********" [ref=e237]
                - paragraph [ref=e239]: 만족하면서 사용중입니다
              - generic [ref=e240]:
                - generic [ref=e241]:
                  - img "aktm******** avatar" [ref=e242]
                  - generic [ref=e243]:
                    - strong [ref=e244]: aktm********
                    - generic [ref=e245]: 2026-03-04
                - generic [ref=e246]:
                  - img [ref=e247]
                  - img [ref=e249]
                  - img [ref=e251]
                  - img [ref=e253]
                  - img [ref=e255]
            - article [ref=e258]:
              - generic [ref=e259]:
                - img "aktm********" [ref=e261]
                - paragraph [ref=e263]: 잘 받았어요 잘쓸게요.
              - generic [ref=e264]:
                - generic [ref=e265]:
                  - img "aktm******** avatar" [ref=e266]
                  - generic [ref=e267]:
                    - strong [ref=e268]: aktm********
                    - generic [ref=e269]: 2026-01-31
                - generic [ref=e270]:
                  - img [ref=e271]
                  - img [ref=e273]
                  - img [ref=e275]
                  - img [ref=e277]
                  - img [ref=e279]
            - article [ref=e282]:
              - generic [ref=e283]:
                - img "aktm********" [ref=e285]
                - paragraph [ref=e287]: 아주 잘쓰고있습니다.
              - generic [ref=e288]:
                - generic [ref=e289]:
                  - img "aktm******** avatar" [ref=e290]
                  - generic [ref=e291]:
                    - strong [ref=e292]: aktm********
                    - generic [ref=e293]: 2026-01-06
                - generic [ref=e294]:
                  - img [ref=e295]
                  - img [ref=e297]
                  - img [ref=e299]
                  - img [ref=e301]
                  - img [ref=e303]
            - article [ref=e306]:
              - generic [ref=e307]:
                - img "aktm********" [ref=e309]
                - paragraph [ref=e311]: 아주 잘쓰고있습니다.
              - generic [ref=e312]:
                - generic [ref=e313]:
                  - img "aktm******** avatar" [ref=e314]
                  - generic [ref=e315]:
                    - strong [ref=e316]: aktm********
                    - generic [ref=e317]: 2026-01-06
                - generic [ref=e318]:
                  - img [ref=e319]
                  - img [ref=e321]
                  - img [ref=e323]
                  - img [ref=e325]
                  - img [ref=e327]
            - article [ref=e330]:
              - generic [ref=e331]:
                - img "jiwn****" [ref=e333]
                - paragraph [ref=e335]: 아 정말 너무 좋아연ㅎㅎ
              - generic [ref=e336]:
                - generic [ref=e337]:
                  - img "jiwn**** avatar" [ref=e338]
                  - generic [ref=e339]:
                    - strong [ref=e340]: jiwn****
                    - generic [ref=e341]: 2025-12-29
                - generic [ref=e342]:
                  - img [ref=e343]
                  - img [ref=e345]
                  - img [ref=e347]
                  - img [ref=e349]
                  - img [ref=e351]
            - article [ref=e354]:
              - generic [ref=e355]:
                - img "koj3***" [ref=e357]
                - paragraph [ref=e359]: 방수도 잘되고 오염에도 잘 버티고 좋아요. 적극 추천합니다.^^
              - generic [ref=e360]:
                - generic [ref=e361]:
                  - img "koj3*** avatar" [ref=e362]
                  - generic [ref=e363]:
                    - strong [ref=e364]: koj3***
                    - generic [ref=e365]: 2025-12-24
                - generic [ref=e366]:
                  - img [ref=e367]
                  - img [ref=e369]
                  - img [ref=e371]
                  - img [ref=e373]
                  - img [ref=e375]
            - article [ref=e378]:
              - generic [ref=e379]:
                - img "aktm********" [ref=e381]
                - paragraph [ref=e383]: 이쁘네요 잘쓸게요.!!
              - generic [ref=e384]:
                - generic [ref=e385]:
                  - img "aktm******** avatar" [ref=e386]
                  - generic [ref=e387]:
                    - strong [ref=e388]: aktm********
                    - generic [ref=e389]: 2025-12-03
                - generic [ref=e390]:
                  - img [ref=e391]
                  - img [ref=e393]
                  - img [ref=e395]
                  - img [ref=e397]
                  - img [ref=e399]
            - article [ref=e402]:
              - generic [ref=e403]:
                - img "aktm********" [ref=e405]
                - paragraph [ref=e407]: 이쁘게 잘뽑혔네요.
              - generic [ref=e408]:
                - generic [ref=e409]:
                  - img "aktm******** avatar" [ref=e410]
                  - generic [ref=e411]:
                    - strong [ref=e412]: aktm********
                    - generic [ref=e413]: 2025-11-30
                - generic [ref=e414]:
                  - img [ref=e415]
                  - img [ref=e417]
                  - img [ref=e419]
                  - img [ref=e421]
                  - img [ref=e423]
            - article [ref=e426]:
              - generic [ref=e427]:
                - img "circ*****" [ref=e429]
                - paragraph [ref=e431]: 품질도 좋고 응대도 잘해주셔서 이쁘게 나왔네요
              - generic [ref=e432]:
                - generic [ref=e433]:
                  - img "circ***** avatar" [ref=e434]
                  - generic [ref=e435]:
                    - strong [ref=e436]: circ*****
                    - generic [ref=e437]: 2025-11-20
                - generic [ref=e438]:
                  - img [ref=e439]
                  - img [ref=e441]
                  - img [ref=e443]
                  - img [ref=e445]
                  - img [ref=e447]
            - article [ref=e450]:
              - generic [ref=e451]:
                - img "pina******" [ref=e453]
                - paragraph [ref=e455]: 부착 잘되고 제거할때 끈적임 없이 깔끔하게 떨어져서 좋아요
              - generic [ref=e456]:
                - generic [ref=e457]:
                  - img "pina****** avatar" [ref=e458]
                  - generic [ref=e459]:
                    - strong [ref=e460]: pina******
                    - generic [ref=e461]: 2025-08-22
                - generic [ref=e462]:
                  - img [ref=e463]
                  - img [ref=e465]
                  - img [ref=e467]
                  - img [ref=e469]
                  - img [ref=e471]
            - article [ref=e474]:
              - generic [ref=e475]:
                - img "qcyc*****" [ref=e477]
                - paragraph [ref=e479]: 덕분에 넘넘 잘썼습니다
              - generic [ref=e480]:
                - generic [ref=e481]:
                  - img "qcyc***** avatar" [ref=e482]
                  - generic [ref=e483]:
                    - strong [ref=e484]: qcyc*****
                    - generic [ref=e485]: 2025-08-15
                - generic [ref=e486]:
                  - img [ref=e487]
                  - img [ref=e489]
                  - img [ref=e491]
                  - img [ref=e493]
                  - img [ref=e495]
            - article [ref=e498]:
              - generic [ref=e499]:
                - img "rlad*******" [ref=e501]
                - paragraph [ref=e503]: 꼼꼼하게 체크해주셔서 너무좋았습니다!
              - generic [ref=e504]:
                - generic [ref=e505]:
                  - img "rlad******* avatar" [ref=e506]
                  - generic [ref=e507]:
                    - strong [ref=e508]: rlad*******
                    - generic [ref=e509]: 2025-07-17
                - generic [ref=e510]:
                  - img [ref=e511]
                  - img [ref=e513]
                  - img [ref=e515]
                  - img [ref=e517]
                  - img [ref=e519]
            - article [ref=e522]:
              - generic [ref=e523]:
                - img "csbn*****" [ref=e525]
                - paragraph [ref=e527]: 배송도 빠르고 재질도 좋고 너무 좋아요 감사합니다!
              - generic [ref=e528]:
                - generic [ref=e529]:
                  - img "csbn***** avatar" [ref=e530]
                  - generic [ref=e531]:
                    - strong [ref=e532]: csbn*****
                    - generic [ref=e533]: 2025-07-14
                - generic [ref=e534]:
                  - img [ref=e535]
                  - img [ref=e537]
                  - img [ref=e539]
                  - img [ref=e541]
                  - img [ref=e543]
            - article [ref=e546]:
              - generic [ref=e547]:
                - img "pina******" [ref=e549]
                - paragraph [ref=e551]: 생각한대로 너무 깔끔하게 나왔어요! 다음에도 주문하겠습니다!!
              - generic [ref=e552]:
                - generic [ref=e553]:
                  - img "pina****** avatar" [ref=e554]
                  - generic [ref=e555]:
                    - strong [ref=e556]: pina******
                    - generic [ref=e557]: 2025-07-09
                - generic [ref=e558]:
                  - img [ref=e559]
                  - img [ref=e561]
                  - img [ref=e563]
                  - img [ref=e565]
                  - img [ref=e567]
      - navigation "네이버 톡톡으로 문의하기" [ref=e569]:
        - link "카카오채널로 문의하기" [ref=e570] [cursor=pointer]:
          - /url: https://pf.kakao.com/_nJxnTX/chat
          - generic:
            - generic:
              - generic:
                - img
              - paragraph: 카카오채널로 문의하기
          - img [ref=e572]
        - link "네이버 톡톡 으로 문의하기" [ref=e573] [cursor=pointer]:
          - /url: https://talk.naver.com/ct/w2luxqo
          - generic:
            - generic:
              - generic:
                - img
              - paragraph: 네이버 톡톡 으로 문의하기
          - img [ref=e575]
        - generic "이메일로 문의하기" [ref=e576] [cursor=pointer]:
          - generic:
            - generic:
              - generic:
                - img
              - paragraph: 이메일로 문의하기
          - img [ref=e578]
    - contentinfo [ref=e579]:
      - generic [ref=e580]:
        - generic [ref=e581]:
          - heading "MUSTICKER / 머스티커" [level=2] [ref=e582]
          - paragraph [ref=e583]: "상호명: (주)글로픽스"
          - paragraph [ref=e584]: "사업자등록번호 : 877-88-03313 통신판매업신고 : 2026-부산해운대-0792호"
          - paragraph [ref=e585]: "대표이사 : 여일석 주소 : 부산광역시 해운대구 해운대해변로 203 오션타워 1014호"
          - paragraph [ref=e586]:
            - generic [ref=e587]: ⓒ 2026. All rights reserved.
            - generic [ref=e588]: "판매: sales@musticker.com"
            - link "이용약관" [ref=e589] [cursor=pointer]:
              - /url: /kr/terms-of-use
            - link "개인정보처리방침" [ref=e590] [cursor=pointer]:
              - /url: /kr/privacy-policy
            - generic [ref=e591] [cursor=pointer]: 사업자정보확인
        - generic [ref=e592]:
          - paragraph [ref=e593]: 1899-5529
          - paragraph [ref=e595]: 오전 9시 ~ 오후 6시(토요일, 공휴일 휴무)
          - generic [ref=e596]:
            - button "1:1문의하기" [ref=e597] [cursor=pointer]
            - link "자주 묻는 질문" [ref=e598] [cursor=pointer]:
              - /url: /kr/faq
  - dialog [ref=e600]:
    - banner [ref=e601]:
      - heading "장바구니 미리보기 (1)" [level=3] [ref=e602]
      - button "쇼핑 계속하기" [ref=e603] [cursor=pointer]:
        - generic [ref=e604]:
          - paragraph [ref=e605]: 쇼핑 계속하기
          - img [ref=e606]
    - article [ref=e611]:
      - generic [ref=e612]:
        - img "illustrations/products/stickers/die-cut.svg" [ref=e614]
        - generic [ref=e615]:
          - heading "자유형 스티커" [level=4] [ref=e616]
          - paragraph [ref=e617]: "사이즈: 75x75mm"
          - paragraph [ref=e618]: "수량: 10개"
      - generic [ref=e619]:
        - strong [ref=e620]: 2,700원
        - generic [ref=e621]:
          - button "상품 수정" [ref=e622] [cursor=pointer]:
            - img [ref=e623]
            - generic [ref=e625]: 상품 수정
          - button "상품 삭제" [ref=e626] [cursor=pointer]:
            - img [ref=e627]
            - generic [ref=e629]: 상품 삭제
    - contentinfo [ref=e630]:
      - generic [ref=e631]:
        - paragraph [ref=e632]:
          - generic [ref=e633]: 합계
          - strong [ref=e634]: 2,700원
        - generic [ref=e635]:
          - paragraph [ref=e636]: 참고
          - paragraph [ref=e637]: 배송비 및 할인 내역은 결제 시 적용됩니다.
      - generic [ref=e638]:
        - button "장바구니 보기" [ref=e639] [cursor=pointer]:
          - generic [ref=e640]: 장바구니 보기
        - button "주문하기" [ref=e641] [cursor=pointer]:
          - generic [ref=e642]:
            - img [ref=e643]
            - text: 주문하기
```

# Test source

```ts
  100 | 
  101 |     const lineItems = this.lineItemArticles();
  102 |     const itemCount = await lineItems.count();
  103 | 
  104 |     for (let index = 0; index < itemCount; index += 1) {
  105 |       const text = await lineItems.nth(index).innerText();
  106 | 
  107 |       items.push({
  108 |         productName: parseProductName(text),
  109 |         ...parseLineItemText(text)
  110 |       });
  111 |     }
  112 | 
  113 |     return items;
  114 |   }
  115 | 
  116 |   async captureTotal(): Promise<string> {
  117 |     const total = this.dialog.getByTestId('product-category-cart-total-row');
  118 |     await expect(total).toBeVisible();
  119 |     return extractWonAmount(await total.innerText()) ?? '';
  120 |   }
  121 | 
  122 |   async editFirstItemSizeAndQuantity(sizeMm: number, quantity: number): Promise<void> {
  123 |     const totalBefore = await this.captureTotal();
  124 |     const editButtons = await this.editButtons();
  125 |     const editButtonCount = await editButtons.count();
  126 | 
  127 |     for (let index = 0; index < editButtonCount; index += 1) {
  128 |       await editButtons.nth(index).click();
  129 | 
  130 |       const editDialog = await this.editDialog();
  131 | 
  132 |       const editableSelects = this.editDialogSelectTriggers(editDialog);
  133 |       if ((await editableSelects.count()) < 2) {
  134 |         await this.closeEditDialog(editDialog);
  135 |         continue;
  136 |       }
  137 | 
  138 |       const selectedSize = await this.selectFromEditDialog(editDialog, 0, String(sizeMm));
  139 |       const selectedQuantity = await this.selectFromEditDialog(editDialog, 1, String(quantity));
  140 | 
  141 |       if (!selectedSize.changed && !selectedQuantity.changed) {
  142 |         await this.closeEditDialog(editDialog);
  143 |         continue;
  144 |       }
  145 | 
  146 |       const updateResponsePromise = this.waitForCartItemUpdateResponse();
  147 |       const updateButton = await firstVisibleLocator([
  148 |         {
  149 |           name: 'cart edit update button role',
  150 |           locator: editDialog.getByRole('button', { name: /\uc5c5\ub370\uc774\ud2b8|Update/i })
  151 |         },
  152 |         {
  153 |           name: 'cart edit submit button',
  154 |           locator: editDialog.locator('button[type="submit"]')
  155 |         }
  156 |       ]);
  157 | 
  158 |       await updateButton.click();
  159 |       await this.expectCartItemUpdateSucceeded(await updateResponsePromise);
  160 | 
  161 |       const dialogClosed = await editDialog
  162 |         .waitFor({ state: 'hidden', timeout: 10_000 })
  163 |         .then(() => true)
  164 |         .catch(() => false);
  165 | 
  166 |       if (!dialogClosed) {
  167 |         await this.closeEditDialog(editDialog).catch(() => undefined);
  168 |         continue;
  169 |       }
  170 | 
  171 |       if (selectedSize.value) {
  172 |         await expect(this.dialog.getByText(new RegExp(`Size:\\s*${selectedSize.value}x${selectedSize.value}`, 'i')).first())
  173 |           .toBeVisible({ timeout: 5_000 })
  174 |           .catch(() => undefined);
  175 |       }
  176 | 
  177 |       if (selectedQuantity.value) {
  178 |         await expect(this.dialog.getByText(new RegExp(`Quantity:\\s*${selectedQuantity.value}`, 'i')).first())
  179 |           .toBeVisible({
  180 |             timeout: 5_000
  181 |           })
  182 |           .catch(() => undefined);
  183 |       }
  184 | 
  185 |       const totalChanged = await expect
  186 |         .poll(() => this.captureTotal(), { timeout: 15_000 })
  187 |         .not.toBe(totalBefore)
  188 |         .then(() => true)
  189 |         .catch(() => false);
  190 | 
  191 |       if (totalChanged || selectedSize.changed || selectedQuantity.changed) {
  192 |         return;
  193 |       }
  194 |     }
  195 | 
  196 |     throw new Error('No cart preview item exposed both size and quantity edit controls.');
  197 |   }
  198 | 
  199 |   async expectRecommendedProductsVisible(): Promise<void> {
> 200 |     await expect(this.dialog.getByRole('heading', { name: '\ucd94\ucc9c \uc0c1\ud488' })).toBeVisible();
      |                                                                                           ^ Error: expect(locator).toBeVisible() failed
  201 |     await expect(this.dialog.getByRole('button', { name: '\ub9de\ucda4 \uc81c\uc791' }).first()).toBeVisible();
  202 |   }
  203 | 
  204 |   async removeLineItem(config: ProductConfig | CartLineItem): Promise<void> {
  205 |     const item = this.lineItem(config);
  206 |     await this.deleteLineItem(item);
  207 | 
  208 |     await this.confirmRemovalIfPrompted();
  209 |     await expect(this.lineItem(config)).toHaveCount(0);
  210 |   }
  211 | 
  212 |   async removeAllLineItems(): Promise<void> {
  213 |     await this.waitForLineItems(3_000).catch(() => undefined);
  214 | 
  215 |     for (let attempt = 0; attempt < 200; attempt += 1) {
  216 |       const lineItems = this.lineItemArticles();
  217 |       const itemCount = await lineItems.count();
  218 |       const totalBefore = await this.cartItemCount();
  219 | 
  220 |       if (itemCount === 0 || totalBefore === 0) {
  221 |         return;
  222 |       }
  223 | 
  224 |       const firstItemText = await lineItems.first().innerText().catch(() => '');
  225 |       await this.deleteLineItem(lineItems.first());
  226 |       await this.confirmRemovalIfPrompted();
  227 | 
  228 |       await expect
  229 |         .poll(
  230 |           async () => {
  231 |             const totalAfter = await this.cartItemCount();
  232 | 
  233 |             if (totalBefore !== undefined && totalAfter !== undefined && totalAfter < totalBefore) {
  234 |               return true;
  235 |             }
  236 | 
  237 |             const updatedItems = this.lineItemArticles();
  238 |             const updatedCount = await updatedItems.count();
  239 |             const updatedFirstItemText = await updatedItems.first().innerText().catch(() => '');
  240 | 
  241 |             return updatedCount < itemCount || updatedFirstItemText !== firstItemText;
  242 |           },
  243 |           { timeout: 10_000 }
  244 |         )
  245 |         .toBe(true);
  246 |     }
  247 | 
  248 |     throw new Error('Cart still had line items after 200 removal attempts.');
  249 |   }
  250 | 
  251 |   async checkout(): Promise<void> {
  252 |     const checkoutByTestId = this.page.getByTestId('product-category-cart-checkout-button');
  253 |     if (await checkoutByTestId.count()) {
  254 |       await checkoutByTestId.click();
  255 |     } else {
  256 |       await this.dialog.getByRole('button', { name: '\uacb0\uc81c \uc9c4\ud589' }).click();
  257 |     }
  258 | 
  259 |     await expect(this.page).toHaveURL(/\/kr\/checkout\/?$/);
  260 |   }
  261 | 
  262 |   async continueShopping(): Promise<void> {
  263 |     await this.dialog.getByRole('button', { name: '\uc1fc\ud551 \uacc4\uc18d\ud558\uae30' }).click();
  264 |     await expect(this.dialog).toBeHidden();
  265 |   }
  266 | 
  267 |   async viewCart(): Promise<void> {
  268 |     await this.dialog.getByTestId('product-category-cart-view-button').click();
  269 |     await expect(this.page).toHaveURL(/\/kr\/cart\/?$/);
  270 |   }
  271 | 
  272 |   private lineItem(product: string | ProductConfig | CartLineItem): Locator {
  273 |     if (typeof product === 'string') {
  274 |       return this.lineItems(product).first();
  275 |     }
  276 | 
  277 |     let items = this.lineItems(product.productName);
  278 |     const price = lineItemPrice(product);
  279 | 
  280 |     if (product.widthMm && product.heightMm) {
  281 |       items = items.filter({
  282 |         hasText: new RegExp(`(?:Size|사이즈):\\s*${product.widthMm}x\\s*${product.heightMm}(?:mm)?`, 'i')
  283 |       });
  284 |     }
  285 | 
  286 |     if (product.quantity) {
  287 |       items = items.filter({ hasText: new RegExp(`(?:Quantity|수량):\\s*${product.quantity}`, 'i') });
  288 |     }
  289 | 
  290 |     if (price) {
  291 |       items = items.filter({ hasText: price });
  292 |     }
  293 | 
  294 |     return items.first();
  295 |   }
  296 | 
  297 |   private lineItems(productName: string): Locator {
  298 |     return this.dialog
  299 |       .getByRole('article')
  300 |       .filter({ hasText: productName })
```