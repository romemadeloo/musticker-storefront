# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: validation/purchasing-validation.spec.ts >> purchasing validation and error handling >> custom size and quantity controls gate the next step until valid values exist
- Location: tests/e2e/validation/purchasing-validation.spec.ts:11:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('product-category-options').or(getByRole('complementary').filter({ hasText: /사이즈|수량|Quantity|Size/i })).first().getByRole('button', { name: /\uCEE4\uC2A4\uD140|\uC9C1\uC811|Custom|Direct/i }).first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('product-category-options').or(getByRole('complementary').filter({ hasText: /사이즈|수량|Quantity|Size/i })).first().getByRole('button', { name: /\uCEE4\uC2A4\uD140|\uC9C1\uC811|Custom|Direct/i }).first()

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e6]:
      - paragraph [ref=e7]: 공지
      - link "머스티커에 오신 것을 환영합니다! “다양한 제품을 둘러보고 머스티커의 새로운 소식을 확인해 보세요.”" [ref=e8] [cursor=pointer]:
        - /url: javascript:;
        - paragraph [ref=e9]: 머스티커에 오신 것을 환영합니다!
        - paragraph [ref=e10]: “다양한 제품을 둘러보고 머스티커의 새로운 소식을 확인해 보세요.”
      - generic [ref=e11]:
        - button [ref=e12] [cursor=pointer]:
          - img [ref=e13]
        - button [ref=e15] [cursor=pointer]:
          - img [ref=e16]
    - button [ref=e18] [cursor=pointer]:
      - img [ref=e19]
  - banner [ref=e21]:
    - generic [ref=e22]:
      - generic [ref=e23]:
        - link "Musticker" [ref=e24] [cursor=pointer]:
          - /url: /kr
          - img "musticker logo" [ref=e25]
        - generic [ref=e26]:
          - button "공지사항 열기" [ref=e28] [cursor=pointer]:
            - img [ref=e30]
          - button "layout.header.search" [ref=e32] [cursor=pointer]:
            - img [ref=e33]
          - button "장바구니" [ref=e36] [cursor=pointer]:
            - img [ref=e37]
          - button "계정" [ref=e40] [cursor=pointer]:
            - img [ref=e42]
      - navigation "Primary":
        - link "스티커" [ref=e44] [cursor=pointer]:
          - /url: /kr/stickers
        - link "롤스티커" [ref=e45] [cursor=pointer]:
          - /url: /kr/roll-stickers
        - link "시트 스티커" [ref=e46] [cursor=pointer]:
          - /url: /kr/sheet-stickers
  - main [ref=e47]:
    - generic [ref=e48]:
      - generic [ref=e50]:
        - generic:
          - navigation
        - generic [ref=e53]:
          - generic [ref=e54]:
            - generic [ref=e55]:
              - heading "자유형 스티커" [level=1] [ref=e56]
              - paragraph [ref=e57]: 두텁고 강력한 내구성을 가진 소재를 자랑해요
            - img "자유형 스티커 preview poster" [ref=e59]
            - generic [ref=e61]:
              - button "소형 30x30 A6 105x148 작고 귀여운 크기로 휴대폰 케이스나 헬멧에 딱!" [ref=e62] [cursor=pointer]:
                - heading "소형 30x30" [level=4] [ref=e63]
                - img "A6 105x148" [ref=e64]
                - paragraph [ref=e65]: 작고 귀여운 크기로 휴대폰 케이스나 헬멧에 딱!
              - button "중형 75x75 A5 148x210 텀블러·노트북에 잘 어울려요. 가장 인기 있는 사이즈예요." [ref=e66] [cursor=pointer]:
                - heading "중형 75x75" [level=4] [ref=e67]
                - img "A5 148x210" [ref=e68]
                - paragraph [ref=e69]: 텀블러·노트북에 잘 어울려요. 가장 인기 있는 사이즈예요.
              - button "대형 100x100 A4 210x297 보드나 캐리어에 붙이면 눈에 잘 띄는 크기예요." [ref=e70] [cursor=pointer]:
                - heading "대형 100x100" [level=4] [ref=e71]
                - img "A4 210x297" [ref=e72]
                - paragraph [ref=e73]: 보드나 캐리어에 붙이면 눈에 잘 띄는 크기예요.
              - button "초대형 125x125 72x170 차·아이스박스·공구함에도 딱 맞는 넉넉한 크기예요." [ref=e74] [cursor=pointer]:
                - heading "초대형 125x125" [level=4] [ref=e75]
                - img "72x170" [ref=e76]
                - paragraph [ref=e77]: 차·아이스박스·공구함에도 딱 맞는 넉넉한 크기예요.
          - complementary [ref=e78]:
            - generic [ref=e79]:
              - generic [ref=e80]:
                - heading "사이즈를 선택하세요" [level=3] [ref=e81]
                - generic [ref=e82]: (단위:mm)
              - generic [ref=e83]:
                - button "소형 30x30" [ref=e84] [cursor=pointer]:
                  - generic [ref=e85]: 소형
                  - generic [ref=e86]: 30x30
                - button "중형 75x75" [ref=e87] [cursor=pointer]:
                  - generic [ref=e88]: 중형
                  - generic [ref=e89]: 75x75
                - button "대형 100x100" [ref=e90] [cursor=pointer]:
                  - generic [ref=e91]: 대형
                  - generic [ref=e92]: 100x100
                - button "초대형 125x125" [ref=e93] [cursor=pointer]:
                  - generic [ref=e94]: 초대형
                  - generic [ref=e95]: 125x125
                - button "원하는 크기 입력" [ref=e96] [cursor=pointer]:
                  - paragraph [ref=e97]: 원하는 크기 입력
            - generic [ref=e98]:
              - heading "수량을 선택하세요" [level=3] [ref=e99]
              - generic [ref=e100]:
                - button "10개 2,700원" [ref=e101] [cursor=pointer]:
                  - generic [ref=e102]: 10개
                  - generic [ref=e103]: 2,700원
                - button "20개 5,100원" [ref=e104] [cursor=pointer]:
                  - generic [ref=e105]: 20개
                  - generic [ref=e106]: 5,100원
                - button "30개 7,600원" [ref=e107] [cursor=pointer]:
                  - generic [ref=e108]: 30개
                  - generic [ref=e109]: 7,600원
                - button "50개 11,800원" [ref=e110] [cursor=pointer]:
                  - generic [ref=e111]: 50개
                  - generic [ref=e112]: 11,800원
                - button "100개 22,100원" [ref=e113] [cursor=pointer]:
                  - generic [ref=e114]: 100개
                  - generic [ref=e115]: 22,100원
                - button "300개 63,200원" [ref=e116] [cursor=pointer]:
                  - generic [ref=e117]: 300개
                  - generic [ref=e118]: 63,200원
                - button "500개 101,600원" [ref=e119] [cursor=pointer]:
                  - generic [ref=e120]: 500개
                  - generic [ref=e121]: 101,600원
                - button "1,000개 195,200원" [ref=e122] [cursor=pointer]:
                  - generic [ref=e123]: 1,000개
                  - generic [ref=e124]: 195,200원
                - button "원하는 수량 입력" [ref=e125] [cursor=pointer]:
                  - paragraph [ref=e126]: 원하는 수량 입력
            - generic [ref=e129]:
              - paragraph [ref=e131]:
                - strong [ref=e132]: 2,700원
              - paragraph [ref=e133]: (1매당 270원)
            - button "다음 단계" [ref=e134] [cursor=pointer]:
              - generic [ref=e135]: 다음 단계
            - list [ref=e137]:
              - listitem [ref=e138]: 5만원 이상 무료배송
              - listitem [ref=e139]: 3시 이전 시안 확정 시 당일배송
              - listitem [ref=e140]: "도착 예정일: 07.30 (목) · CJ 대한통운"
              - listitem [ref=e141]: 시안 승인 후 평균 1~3일 내 배송됩니다. (주말·공휴일 제외)
      - generic [ref=e143]:
        - article [ref=e144]:
          - img "오늘제작, 내일발송" [ref=e145]
          - heading "오늘제작, 내일발송" [level=4] [ref=e146]
          - paragraph [ref=e147]: 디자인 승인 즉시 제작이 시작됩니다 평균 1~2일 안에 당신의 손에 도착하죠
        - article [ref=e148]:
          - img "빠른 시안 피드백" [ref=e149]
          - heading "빠른 시안 피드백" [level=4] [ref=e150]
          - paragraph [ref=e151]: 결제 후 곧바로 시안을 받아보세요 마음이 ‘예스’ 할 때까지 수정 가능합니다
        - article [ref=e152]:
          - img "뛰어난 내구성과 내수성" [ref=e153]
          - heading "뛰어난 내구성과 내수성" [level=4] [ref=e154]
          - paragraph [ref=e155]: 두꺼운 프리미엄 재질로 색상, 접착력 그대로 오래갑니다
      - generic [ref=e157]:
        - article [ref=e158]:
          - generic [ref=e161]:
            - heading "색감은 생생하게, 내구성은 완벽하게" [level=3] [ref=e162]
            - paragraph [ref=e163]: 고품질 인쇄와 두꺼운 소재로 구현한 화려하고 선명한 색감. 비, 햇빛, 고온에도 쉽게 흐려지지 않는 뛰어난 내구성. 붙이는 순간부터 오래도록 변하지 않는 품질을 느껴보세요.
        - article [ref=e164]:
          - generic [ref=e167]:
            - heading "쉽게 붙이고, 깔끔하게 제거" [level=3] [ref=e168]
            - paragraph [ref=e169]: 매끄럽게 부착되고, 흔적 없이 깔끔하게 떨어집니다. 접착은 강력하지만, 표면은 안전하게 보호합니다. 필요할 땐 단번에 제거되고, 남는 건 깔끔함뿐입니다.
        - article [ref=e170]:
          - generic [ref=e173]:
            - heading "디자인에 맞게 정확하게 컷팅" [level=3] [ref=e174]
            - paragraph [ref=e175]: 로고, 일러스트, 사진을 업로드하면 칼선에 맞춰 정밀하게 스티커로 제작됩니다. 복잡한 패턴도 머스티커의 고유한 절단 기술로 완벽하게 표현됩니다.
      - generic [ref=e177]:
        - generic [ref=e178]:
          - generic [ref=e179]:
            - generic [ref=e180]: 좋아요 😀
            - generic [ref=e181]:
              - img [ref=e182]
              - img [ref=e184]
              - img [ref=e186]
              - img [ref=e188]
              - img [ref=e190]
            - generic [ref=e192]: "5.0"
          - heading "225개 사진 후기가 보장해요" [level=2] [ref=e193]
          - paragraph [ref=e194]: 직접 사용한 고객들의 생생한 리뷰를 확인해보세요. 리얼 사용 이미지와 함께 실제 만족도를 보여드립니다.
          - generic [ref=e195]:
            - button "이전 리뷰" [ref=e196] [cursor=pointer]:
              - img [ref=e197]
              - generic [ref=e199]: 이전 리뷰
            - button "다음 리뷰" [ref=e200] [cursor=pointer]:
              - img [ref=e201]
              - generic [ref=e203]: 다음 리뷰
        - generic [ref=e205]:
          - article [ref=e207]:
            - generic [ref=e208]:
              - img "tkop****" [ref=e210]
              - paragraph [ref=e212]: 빨리오고 너무 이쁘게 만들어주셔서 감사합니다 그리고 서비스도 20장 더 주셔서 감사합니다
            - generic [ref=e213]:
              - generic [ref=e214]:
                - img "tkop**** avatar" [ref=e215]
                - generic [ref=e216]:
                  - strong [ref=e217]: tkop****
                  - generic [ref=e218]: 2026-03-25
              - generic [ref=e219]:
                - img [ref=e220]
                - img [ref=e222]
                - img [ref=e224]
                - img [ref=e226]
                - img [ref=e228]
          - article [ref=e231]:
            - generic [ref=e232]:
              - img "oozz******" [ref=e234]
              - paragraph [ref=e236]: 잘나와서 만족합니다 잘쓰겠습니다
            - generic [ref=e237]:
              - generic [ref=e238]:
                - img "oozz****** avatar" [ref=e239]
                - generic [ref=e240]:
                  - strong [ref=e241]: oozz******
                  - generic [ref=e242]: 2026-03-22
              - generic [ref=e243]:
                - img [ref=e244]
                - img [ref=e246]
                - img [ref=e248]
                - img [ref=e250]
                - img [ref=e252]
          - article [ref=e255]:
            - generic [ref=e256]:
              - img "aktm********" [ref=e258]
              - paragraph [ref=e260]: 만족하면서 사용중입니다
            - generic [ref=e261]:
              - generic [ref=e262]:
                - img "aktm******** avatar" [ref=e263]
                - generic [ref=e264]:
                  - strong [ref=e265]: aktm********
                  - generic [ref=e266]: 2026-03-04
              - generic [ref=e267]:
                - img [ref=e268]
                - img [ref=e270]
                - img [ref=e272]
                - img [ref=e274]
                - img [ref=e276]
          - article [ref=e279]:
            - generic [ref=e280]:
              - img "aktm********" [ref=e282]
              - paragraph [ref=e284]: 잘 받았어요 잘쓸게요.
            - generic [ref=e285]:
              - generic [ref=e286]:
                - img "aktm******** avatar" [ref=e287]
                - generic [ref=e288]:
                  - strong [ref=e289]: aktm********
                  - generic [ref=e290]: 2026-01-31
              - generic [ref=e291]:
                - img [ref=e292]
                - img [ref=e294]
                - img [ref=e296]
                - img [ref=e298]
                - img [ref=e300]
          - article [ref=e303]:
            - generic [ref=e304]:
              - img "aktm********" [ref=e306]
              - paragraph [ref=e308]: 아주 잘쓰고있습니다.
            - generic [ref=e309]:
              - generic [ref=e310]:
                - img "aktm******** avatar" [ref=e311]
                - generic [ref=e312]:
                  - strong [ref=e313]: aktm********
                  - generic [ref=e314]: 2026-01-06
              - generic [ref=e315]:
                - img [ref=e316]
                - img [ref=e318]
                - img [ref=e320]
                - img [ref=e322]
                - img [ref=e324]
          - article [ref=e327]:
            - generic [ref=e328]:
              - img "aktm********" [ref=e330]
              - paragraph [ref=e332]: 아주 잘쓰고있습니다.
            - generic [ref=e333]:
              - generic [ref=e334]:
                - img "aktm******** avatar" [ref=e335]
                - generic [ref=e336]:
                  - strong [ref=e337]: aktm********
                  - generic [ref=e338]: 2026-01-06
              - generic [ref=e339]:
                - img [ref=e340]
                - img [ref=e342]
                - img [ref=e344]
                - img [ref=e346]
                - img [ref=e348]
          - article [ref=e351]:
            - generic [ref=e352]:
              - img "jiwn****" [ref=e354]
              - paragraph [ref=e356]: 아 정말 너무 좋아연ㅎㅎ
            - generic [ref=e357]:
              - generic [ref=e358]:
                - img "jiwn**** avatar" [ref=e359]
                - generic [ref=e360]:
                  - strong [ref=e361]: jiwn****
                  - generic [ref=e362]: 2025-12-29
              - generic [ref=e363]:
                - img [ref=e364]
                - img [ref=e366]
                - img [ref=e368]
                - img [ref=e370]
                - img [ref=e372]
          - article [ref=e375]:
            - generic [ref=e376]:
              - img "koj3***" [ref=e378]
              - paragraph [ref=e380]: 방수도 잘되고 오염에도 잘 버티고 좋아요. 적극 추천합니다.^^
            - generic [ref=e381]:
              - generic [ref=e382]:
                - img "koj3*** avatar" [ref=e383]
                - generic [ref=e384]:
                  - strong [ref=e385]: koj3***
                  - generic [ref=e386]: 2025-12-24
              - generic [ref=e387]:
                - img [ref=e388]
                - img [ref=e390]
                - img [ref=e392]
                - img [ref=e394]
                - img [ref=e396]
          - article [ref=e399]:
            - generic [ref=e400]:
              - img "aktm********" [ref=e402]
              - paragraph [ref=e404]: 이쁘네요 잘쓸게요.!!
            - generic [ref=e405]:
              - generic [ref=e406]:
                - img "aktm******** avatar" [ref=e407]
                - generic [ref=e408]:
                  - strong [ref=e409]: aktm********
                  - generic [ref=e410]: 2025-12-03
              - generic [ref=e411]:
                - img [ref=e412]
                - img [ref=e414]
                - img [ref=e416]
                - img [ref=e418]
                - img [ref=e420]
          - article [ref=e423]:
            - generic [ref=e424]:
              - img "aktm********" [ref=e426]
              - paragraph [ref=e428]: 이쁘게 잘뽑혔네요.
            - generic [ref=e429]:
              - generic [ref=e430]:
                - img "aktm******** avatar" [ref=e431]
                - generic [ref=e432]:
                  - strong [ref=e433]: aktm********
                  - generic [ref=e434]: 2025-11-30
              - generic [ref=e435]:
                - img [ref=e436]
                - img [ref=e438]
                - img [ref=e440]
                - img [ref=e442]
                - img [ref=e444]
          - article [ref=e447]:
            - generic [ref=e448]:
              - img "circ*****" [ref=e450]
              - paragraph [ref=e452]: 품질도 좋고 응대도 잘해주셔서 이쁘게 나왔네요
            - generic [ref=e453]:
              - generic [ref=e454]:
                - img "circ***** avatar" [ref=e455]
                - generic [ref=e456]:
                  - strong [ref=e457]: circ*****
                  - generic [ref=e458]: 2025-11-20
              - generic [ref=e459]:
                - img [ref=e460]
                - img [ref=e462]
                - img [ref=e464]
                - img [ref=e466]
                - img [ref=e468]
          - article [ref=e471]:
            - generic [ref=e472]:
              - img "pina******" [ref=e474]
              - paragraph [ref=e476]: 부착 잘되고 제거할때 끈적임 없이 깔끔하게 떨어져서 좋아요
            - generic [ref=e477]:
              - generic [ref=e478]:
                - img "pina****** avatar" [ref=e479]
                - generic [ref=e480]:
                  - strong [ref=e481]: pina******
                  - generic [ref=e482]: 2025-08-22
              - generic [ref=e483]:
                - img [ref=e484]
                - img [ref=e486]
                - img [ref=e488]
                - img [ref=e490]
                - img [ref=e492]
          - article [ref=e495]:
            - generic [ref=e496]:
              - img "qcyc*****" [ref=e498]
              - paragraph [ref=e500]: 덕분에 넘넘 잘썼습니다
            - generic [ref=e501]:
              - generic [ref=e502]:
                - img "qcyc***** avatar" [ref=e503]
                - generic [ref=e504]:
                  - strong [ref=e505]: qcyc*****
                  - generic [ref=e506]: 2025-08-15
              - generic [ref=e507]:
                - img [ref=e508]
                - img [ref=e510]
                - img [ref=e512]
                - img [ref=e514]
                - img [ref=e516]
          - article [ref=e519]:
            - generic [ref=e520]:
              - img "rlad*******" [ref=e522]
              - paragraph [ref=e524]: 꼼꼼하게 체크해주셔서 너무좋았습니다!
            - generic [ref=e525]:
              - generic [ref=e526]:
                - img "rlad******* avatar" [ref=e527]
                - generic [ref=e528]:
                  - strong [ref=e529]: rlad*******
                  - generic [ref=e530]: 2025-07-17
              - generic [ref=e531]:
                - img [ref=e532]
                - img [ref=e534]
                - img [ref=e536]
                - img [ref=e538]
                - img [ref=e540]
          - article [ref=e543]:
            - generic [ref=e544]:
              - img "csbn*****" [ref=e546]
              - paragraph [ref=e548]: 배송도 빠르고 재질도 좋고 너무 좋아요 감사합니다!
            - generic [ref=e549]:
              - generic [ref=e550]:
                - img "csbn***** avatar" [ref=e551]
                - generic [ref=e552]:
                  - strong [ref=e553]: csbn*****
                  - generic [ref=e554]: 2025-07-14
              - generic [ref=e555]:
                - img [ref=e556]
                - img [ref=e558]
                - img [ref=e560]
                - img [ref=e562]
                - img [ref=e564]
          - article [ref=e567]:
            - generic [ref=e568]:
              - img "pina******" [ref=e570]
              - paragraph [ref=e572]: 생각한대로 너무 깔끔하게 나왔어요! 다음에도 주문하겠습니다!!
            - generic [ref=e573]:
              - generic [ref=e574]:
                - img "pina****** avatar" [ref=e575]
                - generic [ref=e576]:
                  - strong [ref=e577]: pina******
                  - generic [ref=e578]: 2025-07-09
              - generic [ref=e579]:
                - img [ref=e580]
                - img [ref=e582]
                - img [ref=e584]
                - img [ref=e586]
                - img [ref=e588]
    - navigation "네이버 톡톡으로 문의하기" [ref=e590]:
      - link "카카오채널로 문의하기" [ref=e591] [cursor=pointer]:
        - /url: https://pf.kakao.com/_nJxnTX/chat
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 카카오채널로 문의하기
        - img [ref=e593]
      - link "네이버 톡톡 으로 문의하기" [ref=e594] [cursor=pointer]:
        - /url: https://talk.naver.com/ct/w2luxqo
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 네이버 톡톡 으로 문의하기
        - img [ref=e596]
      - generic "이메일로 문의하기" [ref=e597] [cursor=pointer]:
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 이메일로 문의하기
        - img [ref=e599]
  - contentinfo [ref=e600]:
    - generic [ref=e601]:
      - generic [ref=e602]:
        - heading "MUSTICKER / 머스티커" [level=2] [ref=e603]
        - paragraph [ref=e604]: "상호명: (주)글로픽스"
        - paragraph [ref=e605]: "사업자등록번호 : 877-88-03313 통신판매업신고 : 2026-부산해운대-0792호"
        - paragraph [ref=e606]: "대표이사 : 여일석 주소 : 부산광역시 해운대구 해운대해변로 203 오션타워 1014호"
        - paragraph [ref=e607]:
          - generic [ref=e608]: ⓒ 2026. All rights reserved.
          - generic [ref=e609]: "판매: sales@musticker.com"
          - link "이용약관" [ref=e610] [cursor=pointer]:
            - /url: /kr/terms-of-use
          - link "개인정보처리방침" [ref=e611] [cursor=pointer]:
            - /url: /kr/privacy-policy
          - generic [ref=e612] [cursor=pointer]: 사업자정보확인
      - generic [ref=e613]:
        - paragraph [ref=e614]: 1899-5529
        - paragraph [ref=e616]: 오전 9시 ~ 오후 6시(토요일, 공휴일 휴무)
        - generic [ref=e617]:
          - button "1:1문의하기" [ref=e618] [cursor=pointer]
          - link "자주 묻는 질문" [ref=e619] [cursor=pointer]:
            - /url: /kr/faq
```

# Test source

```ts
  21  | type SelectedQuantity = {
  22  |   quantity: number;
  23  |   price?: string;
  24  | };
  25  | 
  26  | export class ProductPage {
  27  |   readonly page: Page;
  28  |   readonly optionsPanel: Locator;
  29  | 
  30  |   constructor(page: Page) {
  31  |     this.page = page;
  32  |     this.optionsPanel = page
  33  |       .getByTestId('product-category-options')
  34  |       .or(page.getByRole('complementary').filter({ hasText: /사이즈|수량|Quantity|Size/i }))
  35  |       .first();
  36  |   }
  37  | 
  38  |   async goto(path = './stickers/die-cut-sticker'): Promise<void> {
  39  |     await this.page.goto(appPath(path));
  40  |   }
  41  | 
  42  |   async expectLoaded(productName = '자유형 스티커'): Promise<void> {
  43  |     await expect(this.page).toHaveTitle(storefrontTitlePattern);
  44  |     await expect(this.page.getByRole('heading', { name: productName })).toBeVisible();
  45  |     await expect(this.optionsPanel).toBeVisible();
  46  |     await expect(this.optionsPanel.getByRole('heading', { name: /사이즈.*선택|Size/i })).toBeVisible();
  47  |     await expect(this.optionsPanel.getByRole('heading', { name: /수량.*선택|Quantity/i })).toBeVisible();
  48  |   }
  49  | 
  50  |   async selectSize(sizeLabel: string): Promise<void> {
  51  |     await this.optionsPanel.getByRole('button', { name: sizeLabel, exact: true }).click();
  52  |   }
  53  | 
  54  |   async selectQuantity(quantity: number): Promise<void> {
  55  |     const quantityLabel = new RegExp(`^${quantity.toLocaleString('en-US')}\\s`);
  56  |     await this.optionsPanel.getByRole('button', { name: quantityLabel }).click();
  57  |   }
  58  | 
  59  |   async configureProduct(config: ProductConfig): Promise<CartLineItem> {
  60  |     await expect(this.optionsPanel).toBeVisible();
  61  |     const selectedSize = await this.selectConfiguredSize(config);
  62  |     const selectedQuantity = await this.selectPreferredQuantity(config.quantity);
  63  |     await this.expectNextStepEnabled();
  64  | 
  65  |     return {
  66  |       productName: config.localizedName,
  67  |       widthMm: selectedSize.widthMm ?? config.widthMm,
  68  |       heightMm: selectedSize.heightMm ?? config.heightMm,
  69  |       quantity: selectedQuantity.quantity,
  70  |       price: selectedQuantity.price ?? config.expectedUnitPrice
  71  |     };
  72  |   }
  73  | 
  74  |   async configureRegressionProduct(candidate: RegressionProductCandidate): Promise<CartLineItem> {
  75  |     await expect(this.optionsPanel).toBeVisible();
  76  |     await this.configureLetteringText(candidate);
  77  |     await this.selectRegressionSize(candidate);
  78  | 
  79  |     const quantityButton = await this.quantityButtonWithAnyPrice(candidate.quantity);
  80  |     const price = extractWonAmount(await quantityButton.innerText());
  81  |     await quantityButton.click({ force: true });
  82  |     await this.expectNextStepEnabled();
  83  | 
  84  |     return {
  85  |       productName: candidate.productName,
  86  |       widthMm: candidate.widthMm,
  87  |       heightMm: candidate.heightMm,
  88  |       quantity: candidate.quantity,
  89  |       price
  90  |     };
  91  |   }
  92  | 
  93  |   async configureOrderAllProduct(candidate: RegressionProductCandidate): Promise<CartLineItem> {
  94  |     await expect(this.optionsPanel).toBeVisible();
  95  |     await this.configureLetteringText(candidate);
  96  | 
  97  |     const selectedSize = await this.selectPreferredSize(candidate);
  98  |     const selectedQuantity = await this.selectPreferredQuantity(candidate.quantity);
  99  |     await this.expectNextStepEnabled();
  100 | 
  101 |     return {
  102 |       productName: candidate.productName,
  103 |       widthMm: selectedSize.widthMm ?? candidate.widthMm,
  104 |       heightMm: selectedSize.heightMm ?? candidate.heightMm,
  105 |       quantity: selectedQuantity.quantity,
  106 |       price: selectedQuantity.price
  107 |     };
  108 |   }
  109 | 
  110 |   async expectPrice(price: string): Promise<void> {
  111 |     await expect(this.optionsPanel.getByText(price).last()).toBeVisible();
  112 |   }
  113 | 
  114 |   async expectVisiblePrice(): Promise<void> {
  115 |     await expect(this.optionsPanel.getByText(wonAmountPattern).last()).toBeVisible();
  116 |   }
  117 | 
  118 |   async openCustomSizeFields(): Promise<void> {
  119 |     const customSizeButton = this.customOptionButtons().first();
  120 | 
> 121 |     await expect(customSizeButton).toBeVisible({ timeout: 10_000 });
      |                                    ^ Error: expect(locator).toBeVisible() failed
  122 |     await customSizeButton.click();
  123 |     await expect(this.customSizeInputs().first()).toBeVisible();
  124 |   }
  125 | 
  126 |   async fillCustomSize(widthMm: number, heightMm: number): Promise<void> {
  127 |     const inputs = this.customSizeInputs();
  128 | 
  129 |     await inputs.nth(0).fill(String(widthMm));
  130 |     await inputs.nth(1).fill(String(heightMm));
  131 |   }
  132 | 
  133 |   async openCustomQuantityField(): Promise<void> {
  134 |     const customQuantityButton = this.customOptionButtons().last();
  135 | 
  136 |     await expect(customQuantityButton).toBeVisible({ timeout: 10_000 });
  137 |     await customQuantityButton.click();
  138 |     await expect(this.optionsPanel.getByRole('spinbutton').last()).toBeVisible();
  139 |   }
  140 | 
  141 |   async fillCustomQuantity(quantity: number): Promise<void> {
  142 |     await this.optionsPanel.getByRole('spinbutton').last().fill(String(quantity));
  143 |   }
  144 | 
  145 |   async expectNextStepDisabled(): Promise<void> {
  146 |     await expect(this.nextStepButton()).toBeDisabled();
  147 |   }
  148 | 
  149 |   async expectNextStepEnabled(): Promise<void> {
  150 |     await expect(this.nextStepButton()).toBeEnabled();
  151 |   }
  152 | 
  153 |   async openUploadModal(): Promise<DesignUploadModal> {
  154 |     await this.nextStepButton().click();
  155 |     const uploadModal = new DesignUploadModal(this.page);
  156 |     await uploadModal.expectVisible();
  157 |     return uploadModal;
  158 |   }
  159 | 
  160 |   async openUploadModalIfPresent(): Promise<DesignUploadModal | undefined> {
  161 |     await this.nextStepButton().click();
  162 |     const uploadModal = new DesignUploadModal(this.page);
  163 |     const opened = await uploadModal.dialog
  164 |       .waitFor({ state: 'visible', timeout: 5_000 })
  165 |       .then(() => true)
  166 |       .catch(() => false);
  167 | 
  168 |     return opened ? uploadModal : undefined;
  169 |   }
  170 | 
  171 |   async openCartDrawer(): Promise<CartDrawer> {
  172 |     await this.page.getByTestId('app-header-cart-button').click();
  173 |     const cart = new CartDrawer(this.page);
  174 |     await cart.expectVisible();
  175 |     return cart;
  176 |   }
  177 | 
  178 |   async currentOrOpenCartDrawer(): Promise<CartDrawer> {
  179 |     const cart = new CartDrawer(this.page);
  180 | 
  181 |     if (!(await cart.dialog.isVisible().catch(() => false))) {
  182 |       await this.page.getByTestId('app-header-cart-button').click();
  183 |     }
  184 | 
  185 |     await cart.expectVisible();
  186 |     return cart;
  187 |   }
  188 | 
  189 |   private nextStepButton(): Locator {
  190 |     return this.optionsPanel.getByRole('button', { name: '다음 단계' });
  191 |   }
  192 | 
  193 |   private customSizeInputs(): Locator {
  194 |     return this.optionsPanel.getByPlaceholder('Width').or(this.optionsPanel.getByRole('spinbutton'));
  195 |   }
  196 | 
  197 |   private customOptionButtons(): Locator {
  198 |     return this.optionsPanel.getByRole('button', { name: customOptionLabel });
  199 |   }
  200 | 
  201 |   private async configureLetteringText(candidate: RegressionProductCandidate): Promise<void> {
  202 |     const editor = this.page
  203 |       .getByTestId('product-category-vinyl-designer-textarea')
  204 |       .locator('[contenteditable="true"]')
  205 |       .or(this.page.locator('[contenteditable="true"]'))
  206 |       .first();
  207 |     const editorTimeout = candidate.letteringText ? 10_000 : 1_000;
  208 |     const hasEditor = await editor
  209 |       .waitFor({ state: 'visible', timeout: editorTimeout })
  210 |       .then(() => true)
  211 |       .catch(() => false);
  212 | 
  213 |     if (!hasEditor) {
  214 |       return;
  215 |     }
  216 | 
  217 |     const text = candidate.letteringText ?? `E2E ${candidate.categoryName}`;
  218 |     await editor.click();
  219 |     await this.page.keyboard.press('Control+A');
  220 |     await this.page.keyboard.press('Backspace');
  221 |     await this.page.keyboard.type(text);
```