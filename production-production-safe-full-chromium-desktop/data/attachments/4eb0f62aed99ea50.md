# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: edgecases/storefront-edgecases.spec.ts >> production-safe storefront edge cases >> custom product inputs reject zero and negative size or quantity
- Location: tests/e2e/edgecases/storefront-edgecases.spec.ts:19:3

# Error details

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

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e6]:
      - paragraph [ref=e7]: 공지
      - link "여름 휴무 안내 “여름휴가 기간을 확인하시어 주문 및 이용 일정에 불편이 없으시길 바랍니다.”" [ref=e8] [cursor=pointer]:
        - /url: javascript:;
        - paragraph [ref=e9]: 여름 휴무 안내
        - paragraph [ref=e10]: “여름휴가 기간을 확인하시어 주문 및 이용 일정에 불편이 없으시길 바랍니다.”
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
                - generic [ref=e96] [cursor=pointer]:
                  - spinbutton [ref=e97]: "0"
                  - generic [ref=e98]: x
                  - spinbutton [ref=e99]: "0"
              - paragraph [ref=e100]: 가로 또는 세로 크기는 최소 25×25mm 이상이어야 합니다.
            - generic [ref=e101]:
              - heading "수량을 선택하세요" [level=3] [ref=e102]
              - generic [ref=e103]:
                - button "10개 0원" [ref=e104] [cursor=pointer]:
                  - generic [ref=e105]: 10개
                  - generic [ref=e106]: 0원
                - button "20개 0원" [ref=e107] [cursor=pointer]:
                  - generic [ref=e108]: 20개
                  - generic [ref=e109]: 0원
                - button "30개 0원" [ref=e110] [cursor=pointer]:
                  - generic [ref=e111]: 30개
                  - generic [ref=e112]: 0원
                - button "50개 0원" [ref=e113] [cursor=pointer]:
                  - generic [ref=e114]: 50개
                  - generic [ref=e115]: 0원
                - button "100개 0원" [ref=e116] [cursor=pointer]:
                  - generic [ref=e117]: 100개
                  - generic [ref=e118]: 0원
                - button "300개 0원" [ref=e119] [cursor=pointer]:
                  - generic [ref=e120]: 300개
                  - generic [ref=e121]: 0원
                - button "500개 0원" [ref=e122] [cursor=pointer]:
                  - generic [ref=e123]: 500개
                  - generic [ref=e124]: 0원
                - button "1,000개 0원" [ref=e125] [cursor=pointer]:
                  - generic [ref=e126]: 1,000개
                  - generic [ref=e127]: 0원
                - spinbutton [active] [ref=e129]
              - paragraph [ref=e130]: 수량은 최소 10개 이상 입력해 주세요.
            - generic [ref=e133]:
              - paragraph [ref=e135]:
                - strong [ref=e136]: 0원
              - paragraph [ref=e137]: (1매당 0원)
            - button "다음 단계" [disabled] [ref=e138]:
              - generic [ref=e139]: 다음 단계
            - list [ref=e141]:
              - listitem [ref=e142]: 5만원 이상 무료배송
              - listitem [ref=e143]: 3시 이전 시안 확정 시 당일배송
              - listitem [ref=e144]: "도착 예정일: 08.06 (목) · CJ 대한통운"
              - listitem [ref=e145]: 시안 승인 후 평균 1~3일 내 배송됩니다. (주말·공휴일 제외)
      - generic [ref=e147]:
        - article [ref=e148]:
          - img "오늘제작, 내일발송" [ref=e149]
          - heading "오늘제작, 내일발송" [level=4] [ref=e150]
          - paragraph [ref=e151]: 디자인 승인 즉시 제작이 시작됩니다 평균 1~2일 안에 당신의 손에 도착하죠
        - article [ref=e152]:
          - img "빠른 시안 피드백" [ref=e153]
          - heading "빠른 시안 피드백" [level=4] [ref=e154]
          - paragraph [ref=e155]: 결제 후 곧바로 시안을 받아보세요 마음이 ‘예스’ 할 때까지 수정 가능합니다
        - article [ref=e156]:
          - img "뛰어난 내구성과 내수성" [ref=e157]
          - heading "뛰어난 내구성과 내수성" [level=4] [ref=e158]
          - paragraph [ref=e159]: 두꺼운 프리미엄 재질로 색상, 접착력 그대로 오래갑니다
      - generic [ref=e161]:
        - article [ref=e162]:
          - generic [ref=e165]:
            - heading "색감은 생생하게, 내구성은 완벽하게" [level=3] [ref=e166]
            - paragraph [ref=e167]: 고품질 인쇄와 두꺼운 소재로 구현한 화려하고 선명한 색감. 비, 햇빛, 고온에도 쉽게 흐려지지 않는 뛰어난 내구성. 붙이는 순간부터 오래도록 변하지 않는 품질을 느껴보세요.
        - article [ref=e168]:
          - generic [ref=e171]:
            - heading "쉽게 붙이고, 깔끔하게 제거" [level=3] [ref=e172]
            - paragraph [ref=e173]: 매끄럽게 부착되고, 흔적 없이 깔끔하게 떨어집니다. 접착은 강력하지만, 표면은 안전하게 보호합니다. 필요할 땐 단번에 제거되고, 남는 건 깔끔함뿐입니다.
        - article [ref=e174]:
          - generic [ref=e177]:
            - heading "디자인에 맞게 정확하게 컷팅" [level=3] [ref=e178]
            - paragraph [ref=e179]: 로고, 일러스트, 사진을 업로드하면 칼선에 맞춰 정밀하게 스티커로 제작됩니다. 복잡한 패턴도 머스티커의 고유한 절단 기술로 완벽하게 표현됩니다.
      - generic [ref=e181]:
        - generic [ref=e182]:
          - generic [ref=e183]:
            - generic [ref=e184]: 좋아요 😀
            - generic [ref=e185]:
              - img [ref=e186]
              - img [ref=e188]
              - img [ref=e190]
              - img [ref=e192]
              - img [ref=e194]
            - generic [ref=e196]: "5.0"
          - heading "225개 사진 후기가 보장해요" [level=2] [ref=e197]
          - paragraph [ref=e198]: 직접 사용한 고객들의 생생한 리뷰를 확인해보세요. 리얼 사용 이미지와 함께 실제 만족도를 보여드립니다.
          - generic [ref=e199]:
            - button "이전 리뷰" [disabled] [ref=e200] [cursor=pointer]:
              - img [ref=e201]
              - generic [ref=e203]: 이전 리뷰
            - button "다음 리뷰" [ref=e204] [cursor=pointer]:
              - img [ref=e205]
              - generic [ref=e207]: 다음 리뷰
        - generic [ref=e209]:
          - article [ref=e211]:
            - generic [ref=e212]:
              - img "tkop****" [ref=e214]
              - paragraph [ref=e216]: 빨리오고 너무 이쁘게 만들어주셔서 감사합니다 그리고 서비스도 20장 더 주셔서 감사합니다
            - generic [ref=e217]:
              - generic [ref=e218]:
                - img "tkop**** avatar" [ref=e219]
                - generic [ref=e220]:
                  - strong [ref=e221]: tkop****
                  - generic [ref=e222]: 2026-03-25
              - generic [ref=e223]:
                - img [ref=e224]
                - img [ref=e226]
                - img [ref=e228]
                - img [ref=e230]
                - img [ref=e232]
          - article [ref=e235]:
            - generic [ref=e236]:
              - img "oozz******" [ref=e238]
              - paragraph [ref=e240]: 잘나와서 만족합니다 잘쓰겠습니다
            - generic [ref=e241]:
              - generic [ref=e242]:
                - img "oozz****** avatar" [ref=e243]
                - generic [ref=e244]:
                  - strong [ref=e245]: oozz******
                  - generic [ref=e246]: 2026-03-22
              - generic [ref=e247]:
                - img [ref=e248]
                - img [ref=e250]
                - img [ref=e252]
                - img [ref=e254]
                - img [ref=e256]
          - article [ref=e259]:
            - generic [ref=e260]:
              - img "aktm********" [ref=e262]
              - paragraph [ref=e264]: 만족하면서 사용중입니다
            - generic [ref=e265]:
              - generic [ref=e266]:
                - img "aktm******** avatar" [ref=e267]
                - generic [ref=e268]:
                  - strong [ref=e269]: aktm********
                  - generic [ref=e270]: 2026-03-04
              - generic [ref=e271]:
                - img [ref=e272]
                - img [ref=e274]
                - img [ref=e276]
                - img [ref=e278]
                - img [ref=e280]
          - article [ref=e283]:
            - generic [ref=e284]:
              - img "aktm********" [ref=e286]
              - paragraph [ref=e288]: 잘 받았어요 잘쓸게요.
            - generic [ref=e289]:
              - generic [ref=e290]:
                - img "aktm******** avatar" [ref=e291]
                - generic [ref=e292]:
                  - strong [ref=e293]: aktm********
                  - generic [ref=e294]: 2026-01-31
              - generic [ref=e295]:
                - img [ref=e296]
                - img [ref=e298]
                - img [ref=e300]
                - img [ref=e302]
                - img [ref=e304]
          - article [ref=e307]:
            - generic [ref=e308]:
              - img "aktm********" [ref=e310]
              - paragraph [ref=e312]: 아주 잘쓰고있습니다.
            - generic [ref=e313]:
              - generic [ref=e314]:
                - img "aktm******** avatar" [ref=e315]
                - generic [ref=e316]:
                  - strong [ref=e317]: aktm********
                  - generic [ref=e318]: 2026-01-06
              - generic [ref=e319]:
                - img [ref=e320]
                - img [ref=e322]
                - img [ref=e324]
                - img [ref=e326]
                - img [ref=e328]
          - article [ref=e331]:
            - generic [ref=e332]:
              - img "aktm********" [ref=e334]
              - paragraph [ref=e336]: 아주 잘쓰고있습니다.
            - generic [ref=e337]:
              - generic [ref=e338]:
                - img "aktm******** avatar" [ref=e339]
                - generic [ref=e340]:
                  - strong [ref=e341]: aktm********
                  - generic [ref=e342]: 2026-01-06
              - generic [ref=e343]:
                - img [ref=e344]
                - img [ref=e346]
                - img [ref=e348]
                - img [ref=e350]
                - img [ref=e352]
          - article [ref=e355]:
            - generic [ref=e356]:
              - img "jiwn****" [ref=e358]
              - paragraph [ref=e360]: 아 정말 너무 좋아연ㅎㅎ
            - generic [ref=e361]:
              - generic [ref=e362]:
                - img "jiwn**** avatar" [ref=e363]
                - generic [ref=e364]:
                  - strong [ref=e365]: jiwn****
                  - generic [ref=e366]: 2025-12-29
              - generic [ref=e367]:
                - img [ref=e368]
                - img [ref=e370]
                - img [ref=e372]
                - img [ref=e374]
                - img [ref=e376]
          - article [ref=e379]:
            - generic [ref=e380]:
              - img "koj3***" [ref=e382]
              - paragraph [ref=e384]: 방수도 잘되고 오염에도 잘 버티고 좋아요. 적극 추천합니다.^^
            - generic [ref=e385]:
              - generic [ref=e386]:
                - img "koj3*** avatar" [ref=e387]
                - generic [ref=e388]:
                  - strong [ref=e389]: koj3***
                  - generic [ref=e390]: 2025-12-24
              - generic [ref=e391]:
                - img [ref=e392]
                - img [ref=e394]
                - img [ref=e396]
                - img [ref=e398]
                - img [ref=e400]
          - article [ref=e403]:
            - generic [ref=e404]:
              - img "aktm********" [ref=e406]
              - paragraph [ref=e408]: 이쁘네요 잘쓸게요.!!
            - generic [ref=e409]:
              - generic [ref=e410]:
                - img "aktm******** avatar" [ref=e411]
                - generic [ref=e412]:
                  - strong [ref=e413]: aktm********
                  - generic [ref=e414]: 2025-12-03
              - generic [ref=e415]:
                - img [ref=e416]
                - img [ref=e418]
                - img [ref=e420]
                - img [ref=e422]
                - img [ref=e424]
          - article [ref=e427]:
            - generic [ref=e428]:
              - img "aktm********" [ref=e430]
              - paragraph [ref=e432]: 이쁘게 잘뽑혔네요.
            - generic [ref=e433]:
              - generic [ref=e434]:
                - img "aktm******** avatar" [ref=e435]
                - generic [ref=e436]:
                  - strong [ref=e437]: aktm********
                  - generic [ref=e438]: 2025-11-30
              - generic [ref=e439]:
                - img [ref=e440]
                - img [ref=e442]
                - img [ref=e444]
                - img [ref=e446]
                - img [ref=e448]
          - article [ref=e451]:
            - generic [ref=e452]:
              - img "circ*****" [ref=e454]
              - paragraph [ref=e456]: 품질도 좋고 응대도 잘해주셔서 이쁘게 나왔네요
            - generic [ref=e457]:
              - generic [ref=e458]:
                - img "circ***** avatar" [ref=e459]
                - generic [ref=e460]:
                  - strong [ref=e461]: circ*****
                  - generic [ref=e462]: 2025-11-20
              - generic [ref=e463]:
                - img [ref=e464]
                - img [ref=e466]
                - img [ref=e468]
                - img [ref=e470]
                - img [ref=e472]
          - article [ref=e475]:
            - generic [ref=e476]:
              - img "pina******" [ref=e478]
              - paragraph [ref=e480]: 부착 잘되고 제거할때 끈적임 없이 깔끔하게 떨어져서 좋아요
            - generic [ref=e481]:
              - generic [ref=e482]:
                - img "pina****** avatar" [ref=e483]
                - generic [ref=e484]:
                  - strong [ref=e485]: pina******
                  - generic [ref=e486]: 2025-08-22
              - generic [ref=e487]:
                - img [ref=e488]
                - img [ref=e490]
                - img [ref=e492]
                - img [ref=e494]
                - img [ref=e496]
          - article [ref=e499]:
            - generic [ref=e500]:
              - img "qcyc*****" [ref=e502]
              - paragraph [ref=e504]: 덕분에 넘넘 잘썼습니다
            - generic [ref=e505]:
              - generic [ref=e506]:
                - img "qcyc***** avatar" [ref=e507]
                - generic [ref=e508]:
                  - strong [ref=e509]: qcyc*****
                  - generic [ref=e510]: 2025-08-15
              - generic [ref=e511]:
                - img [ref=e512]
                - img [ref=e514]
                - img [ref=e516]
                - img [ref=e518]
                - img [ref=e520]
          - article [ref=e523]:
            - generic [ref=e524]:
              - img "rlad*******" [ref=e526]
              - paragraph [ref=e528]: 꼼꼼하게 체크해주셔서 너무좋았습니다!
            - generic [ref=e529]:
              - generic [ref=e530]:
                - img "rlad******* avatar" [ref=e531]
                - generic [ref=e532]:
                  - strong [ref=e533]: rlad*******
                  - generic [ref=e534]: 2025-07-17
              - generic [ref=e535]:
                - img [ref=e536]
                - img [ref=e538]
                - img [ref=e540]
                - img [ref=e542]
                - img [ref=e544]
          - article [ref=e547]:
            - generic [ref=e548]:
              - img "csbn*****" [ref=e550]
              - paragraph [ref=e552]: 배송도 빠르고 재질도 좋고 너무 좋아요 감사합니다!
            - generic [ref=e553]:
              - generic [ref=e554]:
                - img "csbn***** avatar" [ref=e555]
                - generic [ref=e556]:
                  - strong [ref=e557]: csbn*****
                  - generic [ref=e558]: 2025-07-14
              - generic [ref=e559]:
                - img [ref=e560]
                - img [ref=e562]
                - img [ref=e564]
                - img [ref=e566]
                - img [ref=e568]
          - article [ref=e571]:
            - generic [ref=e572]:
              - img "pina******" [ref=e574]
              - paragraph [ref=e576]: 생각한대로 너무 깔끔하게 나왔어요! 다음에도 주문하겠습니다!!
            - generic [ref=e577]:
              - generic [ref=e578]:
                - img "pina****** avatar" [ref=e579]
                - generic [ref=e580]:
                  - strong [ref=e581]: pina******
                  - generic [ref=e582]: 2025-07-09
              - generic [ref=e583]:
                - img [ref=e584]
                - img [ref=e586]
                - img [ref=e588]
                - img [ref=e590]
                - img [ref=e592]
    - navigation "네이버 톡톡으로 문의하기" [ref=e594]:
      - link "카카오채널로 문의하기" [ref=e595] [cursor=pointer]:
        - /url: https://pf.kakao.com/_nJxnTX/chat
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 카카오채널로 문의하기
        - img [ref=e597]
      - link "네이버 톡톡 으로 문의하기" [ref=e598] [cursor=pointer]:
        - /url: https://talk.naver.com/ct/w2luxqo
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 네이버 톡톡 으로 문의하기
        - img [ref=e600]
      - generic "이메일로 문의하기" [ref=e601] [cursor=pointer]:
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 이메일로 문의하기
        - img [ref=e603]
  - contentinfo [ref=e604]:
    - generic [ref=e605]:
      - generic [ref=e606]:
        - heading "MUSTICKER / 머스티커" [level=2] [ref=e607]
        - paragraph [ref=e608]: "상호명: (주)글로픽스"
        - paragraph [ref=e609]: "사업자등록번호 : 877-88-03313 통신판매업신고 : 2026-부산해운대-0792호"
        - paragraph [ref=e610]: "대표이사 : 여일석 주소 : 부산광역시 해운대구 해운대해변로 203 오션타워 1014호"
        - paragraph [ref=e611]:
          - generic [ref=e612]: ⓒ 2026. All rights reserved.
          - generic [ref=e613]: "판매: sales@musticker.com"
          - link "이용약관" [ref=e614] [cursor=pointer]:
            - /url: /kr/terms-of-use
          - link "개인정보처리방침" [ref=e615] [cursor=pointer]:
            - /url: /kr/privacy-policy
          - generic [ref=e616] [cursor=pointer]: 사업자정보확인
      - generic [ref=e617]:
        - paragraph [ref=e618]: 1899-5529
        - paragraph [ref=e620]: 오전 9시 ~ 오후 6시(토요일, 공휴일 휴무)
        - generic [ref=e621]:
          - button "1:1문의하기" [ref=e622] [cursor=pointer]
          - link "자주 묻는 질문" [ref=e623] [cursor=pointer]:
            - /url: /kr/faq
```

# Test source

```ts
  136 |     let pendingTransientApiNetworkFailures = 0;
  137 |     let pendingTransientProductPageFailures = 0;
  138 | 
  139 |     page.on('console', (message) => {
  140 |       if (!['error', 'warning'].includes(message.type())) {
  141 |         return;
  142 |       }
  143 | 
  144 |       const text = message.text();
  145 |       if (
  146 |         allowTransientProductPageFailures &&
  147 |         pendingTransientProductPageFailures > 0 &&
  148 |         /Failed to load resource: the server responded with a status of 50[23]/i.test(text)
  149 |       ) {
  150 |         pendingTransientProductPageFailures = Math.max(0, pendingTransientProductPageFailures - 1);
  151 |         return;
  152 |       }
  153 | 
  154 |       if (allowTransientApiCorsFailures && isTransientApiCorsFailure(text)) {
  155 |         pendingTransientApiNetworkFailures += 1;
  156 |         return;
  157 |       }
  158 | 
  159 |       if (
  160 |         allowTransientApiCorsFailures &&
  161 |         pendingTransientApiNetworkFailures > 0 &&
  162 |         text === 'Failed to load resource: net::ERR_FAILED'
  163 |       ) {
  164 |         return;
  165 |       }
  166 | 
  167 |       if (allowTransientApiCorsFailures && isTransientApiFetchFailure(text)) {
  168 |         pendingTransientApiNetworkFailures = Math.max(0, pendingTransientApiNetworkFailures - 1);
  169 |         return;
  170 |       }
  171 | 
  172 |       if (allowTransientCartCreateFailures && isCartCreateCorsFailure(text)) {
  173 |         pendingCartCreateNetworkFailures += 1;
  174 |         return;
  175 |       }
  176 | 
  177 |       if (
  178 |         allowTransientCartCreateFailures &&
  179 |         pendingCartCreateNetworkFailures > 0 &&
  180 |         text === 'Failed to load resource: net::ERR_FAILED'
  181 |       ) {
  182 |         return;
  183 |       }
  184 | 
  185 |       if (allowTransientCartCreateFailures && isCartCreateFetchFailure(text)) {
  186 |         pendingCartCreateNetworkFailures = Math.max(0, pendingCartCreateNetworkFailures - 1);
  187 |         return;
  188 |       }
  189 | 
  190 |       if (allowKnownPriceWarnings && isSupersededPricingRequest(text)) {
  191 |         hadSupersededPricingRequest = true;
  192 |         return;
  193 |       }
  194 | 
  195 |       if (allowKnownPriceWarnings && hadSupersededPricingRequest && text === 'Unable to retrieve prices.') {
  196 |         hadSupersededPricingRequest = false;
  197 |         return;
  198 |       }
  199 | 
  200 |       if (isKnownConsoleMessage(text, guardOptions)) {
  201 |         return;
  202 |       }
  203 | 
  204 |       consoleFailures.push(`[${message.type()}] ${text}`);
  205 |     });
  206 | 
  207 |     page.on('response', (response) => {
  208 |       const status = response.status();
  209 |       if (status < 400) {
  210 |         return;
  211 |       }
  212 | 
  213 |       const url = response.url();
  214 |       if (allowGuestUserMe401 && isExpectedGuestUserMe401(status, url)) {
  215 |         return;
  216 |       }
  217 | 
  218 |       if (allowExpectedAuthFailures && isExpectedAuthFailure(status, url)) {
  219 |         return;
  220 |       }
  221 | 
  222 |       if (allowKnownNuxtPayloadFailures && isKnownNuxtPayloadFailure(status, url)) {
  223 |         return;
  224 |       }
  225 | 
  226 |       if (allowTransientProductPageFailures && isTransientProductPageServerFailure(status, url)) {
  227 |         pendingTransientProductPageFailures += 1;
  228 |         return;
  229 |       }
  230 | 
  231 |       responseFailures.push(`${status} ${url}`);
  232 |     });
  233 | 
  234 |     await use(page);
  235 | 
> 236 |     expect.soft(consoleFailures, 'Unexpected browser console errors or warnings').toEqual([]);
      |                                                                                   ^ Error: Unexpected browser console errors or warnings
  237 |     expect.soft(responseFailures, 'Unexpected failed HTTP responses').toEqual([]);
  238 |   }
  239 | });
  240 | 
  241 | export { expect };
  242 | 
```