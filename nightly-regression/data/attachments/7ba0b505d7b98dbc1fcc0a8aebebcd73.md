# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: purchasing/sheet-sticker-configurator.spec.ts >> storefront v2 sheet sticker configurator (circle/oval/square/rectangle/rounded) >> MS-V2-058 둥근 사각 시트 스티커 size-guide illustrations have meaningful, localized alt text
- Location: tests/e2e/purchasing/sheet-sticker-configurator.spec.ts:181:5

# Error details

```
Error: Expected size-guide illustration images to be present

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e6]:
      - paragraph [ref=e7]: 공지
      - link "택배 없는 날 & 광복절 대체공휴일 배송 안내 “택배 없는 날 및 공휴일로 인해 해당 기간 동안 택배사 배송 업무가 일시 중단됩니다”" [ref=e8] [cursor=pointer]:
        - /url: javascript:;
        - paragraph [ref=e9]: 택배 없는 날 & 광복절 대체공휴일 배송 안내
        - paragraph [ref=e10]: “택배 없는 날 및 공휴일로 인해 해당 기간 동안 택배사 배송 업무가 일시 중단됩니다”
      - generic [ref=e11]:
        - button [disabled] [ref=e12]:
          - img [ref=e13]
        - button [disabled] [ref=e15]:
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
        - generic [ref=e53]:
          - generic [ref=e54]:
            - generic [ref=e55]:
              - heading "둥근 사각 시트 스티커" [level=1] [ref=e56]
              - paragraph [ref=e57]: 빠른 작업이 가능하도록 시트 한장에 정리된 둥근 사각형 시트 스티커
            - img "둥근 사각형 시트 스티커 preview poster" [ref=e59]
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
              - heading "원하시는 소재를 선택하세요" [level=3] [ref=e80]
              - generic [ref=e81]:
                - button "PVC 매트" [ref=e82] [cursor=pointer]:
                  - paragraph [ref=e83]: PVC 매트
                - button "투명" [ref=e84] [cursor=pointer]:
                  - paragraph [ref=e85]: 투명
                - button "홀로그램" [ref=e86] [cursor=pointer]:
                  - paragraph [ref=e87]: 홀로그램
            - generic [ref=e88]:
              - generic [ref=e89]:
                - heading "개별 스티커 사이즈를 선택하세요" [level=3] [ref=e90]
                - generic [ref=e91]: (단위:mm)
              - generic [ref=e92]:
                - button "소형 30x30" [ref=e93] [cursor=pointer]:
                  - generic [ref=e94]: 소형
                  - generic [ref=e95]: 30x30
                - button "중형 75x75" [ref=e96] [cursor=pointer]:
                  - generic [ref=e97]: 중형
                  - generic [ref=e98]: 75x75
                - button "대형 100x100" [ref=e99] [cursor=pointer]:
                  - generic [ref=e100]: 대형
                  - generic [ref=e101]: 100x100
                - button "초대형 125x125" [ref=e102] [cursor=pointer]:
                  - generic [ref=e103]: 초대형
                  - generic [ref=e104]: 125x125
                - button "원하는 크기 입력" [ref=e105] [cursor=pointer]:
                  - paragraph [ref=e106]: 원하는 크기 입력
            - generic [ref=e107]:
              - heading "수량을 선택하세요" [level=3] [ref=e108]
              - button "원하는 수량 입력" [ref=e110] [cursor=pointer]:
                - paragraph [ref=e111]: 원하는 수량 입력
            - generic [ref=e112]:
              - generic [ref=e113]:
                - paragraph [ref=e114]: 스티커는 A5 시트(148×210mm)에 인쇄됩니다. 아래 가이드를 통해 사이즈별 배치 수량을 확인하고, 가장 적합한 옵션을 선택해 보세요.
                - generic [ref=e116] [cursor=pointer]:
                  - generic [ref=e117]: 배치 가이드 보기
                  - img [ref=e118]
              - button "다음 단계" [disabled] [ref=e120]:
                - generic [ref=e121]: 다음 단계
            - list [ref=e123]:
              - listitem [ref=e124]: 5만원 이상 무료배송
              - listitem [ref=e125]: 3시 이전 시안 확정 시 당일배송
              - listitem [ref=e126]: "도착 예정일: 08.19 (수) · CJ 대한통운"
              - listitem [ref=e127]: 시안 승인 후 평균 1~3일 내 배송됩니다. (주말·공휴일 제외)
      - generic [ref=e129]:
        - article [ref=e130]:
          - img "오늘제작, 내일발송" [ref=e131]
          - heading "오늘제작, 내일발송" [level=4] [ref=e132]
          - paragraph [ref=e133]: 디자인 승인 즉시 제작이 시작됩니다 평균 1~2일 안에 당신의 손에 도착하죠
        - article [ref=e134]:
          - img "빠른 시안 피드백" [ref=e135]
          - heading "빠른 시안 피드백" [level=4] [ref=e136]
          - paragraph [ref=e137]: 결제 후 곧바로 시안을 받아보세요 마음이 ‘예스’ 할 때까지 수정 가능합니다
        - article [ref=e138]:
          - img "뛰어난 내구성과 내수성" [ref=e139]
          - heading "뛰어난 내구성과 내수성" [level=4] [ref=e140]
          - paragraph [ref=e141]: 두꺼운 프리미엄 재질로 색상, 접착력 그대로 오래갑니다
      - generic [ref=e143]:
        - article [ref=e144]:
          - generic [ref=e147]:
            - heading "색감은 생생하게, 내구성은 완벽하게" [level=3] [ref=e148]
            - paragraph [ref=e149]: 고품질 인쇄와 두꺼운 소재로 구현한 화려하고 선명한 색감. 비, 햇빛, 고온에도 쉽게 흐려지지 않는 뛰어난 내구성. 붙이는 순간부터 오래도록 변하지 않는 품질을 느껴보세요.
        - article [ref=e150]:
          - generic [ref=e153]:
            - heading "쉽게 붙이고, 깔끔하게 제거" [level=3] [ref=e154]
            - paragraph [ref=e155]: 매끄럽게 부착되고, 흔적 없이 깔끔하게 떨어집니다. 접착은 강력하지만, 표면은 안전하게 보호합니다. 필요할 땐 단번에 제거되고, 남는 건 깔끔함뿐입니다.
        - article [ref=e156]:
          - generic [ref=e159]:
            - heading "디자인에 맞게 정확하게 컷팅" [level=3] [ref=e160]
            - paragraph [ref=e161]: 로고, 일러스트, 사진을 업로드하면 칼선에 맞춰 정밀하게 스티커로 제작됩니다. 복잡한 패턴도 머스티커의 고유한 절단 기술로 완벽하게 표현됩니다.
      - generic [ref=e163]:
        - generic [ref=e164]:
          - generic [ref=e165]:
            - generic [ref=e166]: 좋아요 😀
            - generic [ref=e167]:
              - img [ref=e168]
              - img [ref=e170]
              - img [ref=e172]
              - img [ref=e174]
              - img [ref=e176]
            - generic [ref=e178]: "5.0"
          - heading "225개 사진 후기가 보장해요" [level=2] [ref=e179]
          - paragraph [ref=e180]: 직접 사용한 고객들의 생생한 리뷰를 확인해보세요. 리얼 사용 이미지와 함께 실제 만족도를 보여드립니다.
          - generic [ref=e181]:
            - button "이전 리뷰" [disabled] [ref=e182] [cursor=pointer]:
              - img [ref=e183]
              - generic [ref=e185]: 이전 리뷰
            - button "다음 리뷰" [ref=e186] [cursor=pointer]:
              - img [ref=e187]
              - generic [ref=e189]: 다음 리뷰
        - generic [ref=e191]:
          - article [ref=e193]:
            - generic [ref=e194]:
              - img "tkop****" [ref=e196]
              - paragraph [ref=e198]: 빨리오고 너무 이쁘게 만들어주셔서 감사합니다 그리고 서비스도 20장 더 주셔서 감사합니다
            - generic [ref=e199]:
              - generic [ref=e200]:
                - img "tkop**** avatar" [ref=e201]
                - generic [ref=e202]:
                  - strong [ref=e203]: tkop****
                  - generic [ref=e204]: 2026-03-25
              - generic [ref=e205]:
                - img [ref=e206]
                - img [ref=e208]
                - img [ref=e210]
                - img [ref=e212]
                - img [ref=e214]
          - article [ref=e217]:
            - generic [ref=e218]:
              - img "oozz******" [ref=e220]
              - paragraph [ref=e222]: 잘나와서 만족합니다 잘쓰겠습니다
            - generic [ref=e223]:
              - generic [ref=e224]:
                - img "oozz****** avatar" [ref=e225]
                - generic [ref=e226]:
                  - strong [ref=e227]: oozz******
                  - generic [ref=e228]: 2026-03-22
              - generic [ref=e229]:
                - img [ref=e230]
                - img [ref=e232]
                - img [ref=e234]
                - img [ref=e236]
                - img [ref=e238]
          - article [ref=e241]:
            - generic [ref=e242]:
              - img "aktm********" [ref=e244]
              - paragraph [ref=e246]: 만족하면서 사용중입니다
            - generic [ref=e247]:
              - generic [ref=e248]:
                - img "aktm******** avatar" [ref=e249]
                - generic [ref=e250]:
                  - strong [ref=e251]: aktm********
                  - generic [ref=e252]: 2026-03-04
              - generic [ref=e253]:
                - img [ref=e254]
                - img [ref=e256]
                - img [ref=e258]
                - img [ref=e260]
                - img [ref=e262]
          - article [ref=e265]:
            - generic [ref=e266]:
              - img "aktm********" [ref=e268]
              - paragraph [ref=e270]: 잘 받았어요 잘쓸게요.
            - generic [ref=e271]:
              - generic [ref=e272]:
                - img "aktm******** avatar" [ref=e273]
                - generic [ref=e274]:
                  - strong [ref=e275]: aktm********
                  - generic [ref=e276]: 2026-01-31
              - generic [ref=e277]:
                - img [ref=e278]
                - img [ref=e280]
                - img [ref=e282]
                - img [ref=e284]
                - img [ref=e286]
          - article [ref=e289]:
            - generic [ref=e290]:
              - img "aktm********" [ref=e292]
              - paragraph [ref=e294]: 아주 잘쓰고있습니다.
            - generic [ref=e295]:
              - generic [ref=e296]:
                - img "aktm******** avatar" [ref=e297]
                - generic [ref=e298]:
                  - strong [ref=e299]: aktm********
                  - generic [ref=e300]: 2026-01-06
              - generic [ref=e301]:
                - img [ref=e302]
                - img [ref=e304]
                - img [ref=e306]
                - img [ref=e308]
                - img [ref=e310]
          - article [ref=e313]:
            - generic [ref=e314]:
              - img "aktm********" [ref=e316]
              - paragraph [ref=e318]: 아주 잘쓰고있습니다.
            - generic [ref=e319]:
              - generic [ref=e320]:
                - img "aktm******** avatar" [ref=e321]
                - generic [ref=e322]:
                  - strong [ref=e323]: aktm********
                  - generic [ref=e324]: 2026-01-06
              - generic [ref=e325]:
                - img [ref=e326]
                - img [ref=e328]
                - img [ref=e330]
                - img [ref=e332]
                - img [ref=e334]
          - article [ref=e337]:
            - generic [ref=e338]:
              - img "jiwn****" [ref=e340]
              - paragraph [ref=e342]: 아 정말 너무 좋아연ㅎㅎ
            - generic [ref=e343]:
              - generic [ref=e344]:
                - img "jiwn**** avatar" [ref=e345]
                - generic [ref=e346]:
                  - strong [ref=e347]: jiwn****
                  - generic [ref=e348]: 2025-12-29
              - generic [ref=e349]:
                - img [ref=e350]
                - img [ref=e352]
                - img [ref=e354]
                - img [ref=e356]
                - img [ref=e358]
          - article [ref=e361]:
            - generic [ref=e362]:
              - img "koj3***" [ref=e364]
              - paragraph [ref=e366]: 방수도 잘되고 오염에도 잘 버티고 좋아요. 적극 추천합니다.^^
            - generic [ref=e367]:
              - generic [ref=e368]:
                - img "koj3*** avatar" [ref=e369]
                - generic [ref=e370]:
                  - strong [ref=e371]: koj3***
                  - generic [ref=e372]: 2025-12-24
              - generic [ref=e373]:
                - img [ref=e374]
                - img [ref=e376]
                - img [ref=e378]
                - img [ref=e380]
                - img [ref=e382]
          - article [ref=e385]:
            - generic [ref=e386]:
              - img "aktm********" [ref=e388]
              - paragraph [ref=e390]: 이쁘네요 잘쓸게요.!!
            - generic [ref=e391]:
              - generic [ref=e392]:
                - img "aktm******** avatar" [ref=e393]
                - generic [ref=e394]:
                  - strong [ref=e395]: aktm********
                  - generic [ref=e396]: 2025-12-03
              - generic [ref=e397]:
                - img [ref=e398]
                - img [ref=e400]
                - img [ref=e402]
                - img [ref=e404]
                - img [ref=e406]
          - article [ref=e409]:
            - generic [ref=e410]:
              - img "aktm********" [ref=e412]
              - paragraph [ref=e414]: 이쁘게 잘뽑혔네요.
            - generic [ref=e415]:
              - generic [ref=e416]:
                - img "aktm******** avatar" [ref=e417]
                - generic [ref=e418]:
                  - strong [ref=e419]: aktm********
                  - generic [ref=e420]: 2025-11-30
              - generic [ref=e421]:
                - img [ref=e422]
                - img [ref=e424]
                - img [ref=e426]
                - img [ref=e428]
                - img [ref=e430]
          - article [ref=e433]:
            - generic [ref=e434]:
              - img "circ*****" [ref=e436]
              - paragraph [ref=e438]: 품질도 좋고 응대도 잘해주셔서 이쁘게 나왔네요
            - generic [ref=e439]:
              - generic [ref=e440]:
                - img "circ***** avatar" [ref=e441]
                - generic [ref=e442]:
                  - strong [ref=e443]: circ*****
                  - generic [ref=e444]: 2025-11-20
              - generic [ref=e445]:
                - img [ref=e446]
                - img [ref=e448]
                - img [ref=e450]
                - img [ref=e452]
                - img [ref=e454]
          - article [ref=e457]:
            - generic [ref=e458]:
              - img "pina******" [ref=e460]
              - paragraph [ref=e462]: 부착 잘되고 제거할때 끈적임 없이 깔끔하게 떨어져서 좋아요
            - generic [ref=e463]:
              - generic [ref=e464]:
                - img "pina****** avatar" [ref=e465]
                - generic [ref=e466]:
                  - strong [ref=e467]: pina******
                  - generic [ref=e468]: 2025-08-22
              - generic [ref=e469]:
                - img [ref=e470]
                - img [ref=e472]
                - img [ref=e474]
                - img [ref=e476]
                - img [ref=e478]
          - article [ref=e481]:
            - generic [ref=e482]:
              - img "qcyc*****" [ref=e484]
              - paragraph [ref=e486]: 덕분에 넘넘 잘썼습니다
            - generic [ref=e487]:
              - generic [ref=e488]:
                - img "qcyc***** avatar" [ref=e489]
                - generic [ref=e490]:
                  - strong [ref=e491]: qcyc*****
                  - generic [ref=e492]: 2025-08-15
              - generic [ref=e493]:
                - img [ref=e494]
                - img [ref=e496]
                - img [ref=e498]
                - img [ref=e500]
                - img [ref=e502]
          - article [ref=e505]:
            - generic [ref=e506]:
              - img "rlad*******" [ref=e508]
              - paragraph [ref=e510]: 꼼꼼하게 체크해주셔서 너무좋았습니다!
            - generic [ref=e511]:
              - generic [ref=e512]:
                - img "rlad******* avatar" [ref=e513]
                - generic [ref=e514]:
                  - strong [ref=e515]: rlad*******
                  - generic [ref=e516]: 2025-07-17
              - generic [ref=e517]:
                - img [ref=e518]
                - img [ref=e520]
                - img [ref=e522]
                - img [ref=e524]
                - img [ref=e526]
          - article [ref=e529]:
            - generic [ref=e530]:
              - img "csbn*****" [ref=e532]
              - paragraph [ref=e534]: 배송도 빠르고 재질도 좋고 너무 좋아요 감사합니다!
            - generic [ref=e535]:
              - generic [ref=e536]:
                - img "csbn***** avatar" [ref=e537]
                - generic [ref=e538]:
                  - strong [ref=e539]: csbn*****
                  - generic [ref=e540]: 2025-07-14
              - generic [ref=e541]:
                - img [ref=e542]
                - img [ref=e544]
                - img [ref=e546]
                - img [ref=e548]
                - img [ref=e550]
          - article [ref=e553]:
            - generic [ref=e554]:
              - img "pina******" [ref=e556]
              - paragraph [ref=e558]: 생각한대로 너무 깔끔하게 나왔어요! 다음에도 주문하겠습니다!!
            - generic [ref=e559]:
              - generic [ref=e560]:
                - img "pina****** avatar" [ref=e561]
                - generic [ref=e562]:
                  - strong [ref=e563]: pina******
                  - generic [ref=e564]: 2025-07-09
              - generic [ref=e565]:
                - img [ref=e566]
                - img [ref=e568]
                - img [ref=e570]
                - img [ref=e572]
                - img [ref=e574]
      - generic [ref=e577]:
        - generic [ref=e578]:
          - img "text" [ref=e579]
          - generic [ref=e580]:
            - heading "둥근 사각 시트 스티커 FAQ" [level=2] [ref=e581]
            - paragraph [ref=e582]:
              - text: 멤버십, 주문, 디자인 파일 업로드, 인쇄, 결제, 반품·환불에 대한 자세한 내용은 자주 묻는
              - link "질문(FAQ) 페이지에서 확인해 주세요" [ref=e583] [cursor=pointer]:
                - /url: https://www.musticker.com/faq
              - text: .
        - generic [ref=e584]:
          - generic [ref=e585]:
            - generic [ref=e586] [cursor=pointer]:
              - heading "둥근사각형 시트 스티커란 무엇인가요?" [level=3] [ref=e587]
              - paragraph [ref=e590]: 둥근사각형 시트 스티커는 모서리가 둥글게 처리된 정사각형 또는 직사각형 스티커를 한 장의 시트에 배치해 제작하는 스티커입니다. 각 스티커는 키스컷 방식으로 제작되어 시트는 그대로 유지되며, 스티커를 한 장씩 쉽게 떼어 사용할 수 있습니다.
            - button [ref=e591] [cursor=pointer]:
              - img [ref=e592]
          - generic [ref=e594]:
            - generic [ref=e595] [cursor=pointer]:
              - heading "둥근사각형 시트 스티커는 어떤 소재를 선택할 수 있나요?" [level=3] [ref=e596]
              - paragraph [ref=e597]: 둥근사각형 시트 스티커는 PVC(백색), 투명, 홀로그램 소재로 제작할 수 있습니다. 선명한 색감을 원한다면 PVC(백색), 깔끔하고 자연스러운 느낌을 원한다면 투명, 반짝이는 효과를 원한다면 홀로그램을 추천합니다.
            - button [ref=e598] [cursor=pointer]:
              - img [ref=e599]
          - generic [ref=e601]:
            - generic [ref=e602] [cursor=pointer]:
              - heading "모서리의 둥근 정도를 선택할 수 있나요?" [level=3] [ref=e603]
              - paragraph [ref=e604]: 모서리의 둥근 정도는 상품 규격과 선택한 사이즈에 따라 달라집니다. 원하는 모서리 형태가 있는 경우에는 디자인 파일과 함께 요청 사항을 남겨 주시면 제작 전에 확인해 드립니다.
            - button [ref=e605] [cursor=pointer]:
              - img [ref=e606]
          - generic [ref=e608]:
            - generic [ref=e609] [cursor=pointer]:
              - heading "둥근사각형 시트 스티커는 쉽게 떼어 사용할 수 있나요?" [level=3] [ref=e610]
              - paragraph [ref=e611]: 네. 모든 스티커는 키스컷 방식으로 제작되어 시트에서 한 장씩 쉽게 떼어 사용할 수 있습니다. 둥근 모서리 덕분에 가장자리가 걸리는 현상을 줄여 더욱 편리하게 사용할 수 있습니다.
            - button [ref=e612] [cursor=pointer]:
              - img [ref=e613]
          - generic [ref=e615]:
            - generic [ref=e616] [cursor=pointer]:
              - heading "둥근사각형 시트 스티커는 방수 및 내구성이 있나요?" [level=3] [ref=e617]
              - paragraph [ref=e618]: 네. 머스티커의 둥근사각형 시트 스티커는 방수 기능이 있는 PVC 소재로 제작됩니다. 다만 날카로운 물체나 강한 마찰에는 긁힘이 생길 수 있으니 주의해 주세요.
            - button [ref=e619] [cursor=pointer]:
              - img [ref=e620]
        - generic [ref=e622]:
          - generic [ref=e623]:
            - heading "궁금한 점이 더 있으신가요?" [level=4] [ref=e624]
            - paragraph [ref=e625]: 원하시는 답변을 찾지 못하셨다면 언제든지 문의해 주세요.
          - button "문의하기" [ref=e626] [cursor=pointer]:
            - generic [ref=e627]: 문의하기
    - navigation "네이버 톡톡으로 문의하기" [ref=e628]:
      - link "카카오채널로 문의하기" [ref=e629] [cursor=pointer]:
        - /url: https://pf.kakao.com/_nJxnTX/chat
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 카카오채널로 문의하기
        - img [ref=e631]
      - link "네이버 톡톡 으로 문의하기" [ref=e632] [cursor=pointer]:
        - /url: https://talk.naver.com/ct/w2luxqo
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 네이버 톡톡 으로 문의하기
        - img [ref=e634]
      - generic "이메일로 문의하기" [ref=e635] [cursor=pointer]:
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 이메일로 문의하기
        - img [ref=e637]
  - contentinfo [ref=e638]:
    - generic [ref=e639]:
      - generic [ref=e640]:
        - heading "MUSTICKER / 머스티커" [level=2] [ref=e641]
        - paragraph [ref=e642]: "상호명: (주)글로픽스"
        - paragraph [ref=e643]: "사업자등록번호 : 877-88-03313 통신판매업신고 : 2026-부산해운대-0792호"
        - paragraph [ref=e644]: "대표이사 : 여일석 주소 : 부산광역시 해운대구 해운대해변로 203 오션타워 1014호"
        - paragraph [ref=e645]: "호스팅사업자 : 아마존웹서비시즈(Amazon Web Services)"
        - paragraph [ref=e646]:
          - generic [ref=e647]: ⓒ 2026. All rights reserved.
          - generic [ref=e648]: "판매: sales@musticker.com"
          - link "이용약관" [ref=e649] [cursor=pointer]:
            - /url: /kr/terms-of-use
          - link "개인정보처리방침" [ref=e650] [cursor=pointer]:
            - /url: /kr/privacy-policy
          - generic [ref=e651] [cursor=pointer]: 사업자정보확인
          - link "회사소개" [ref=e652] [cursor=pointer]:
            - /url: /kr/about
      - generic [ref=e653]:
        - paragraph [ref=e654]: 1899-5529
        - paragraph [ref=e656]: 오전 9시 ~ 오후 6시(토요일, 공휴일 휴무)
        - generic [ref=e657]:
          - button "1:1문의하기" [ref=e658] [cursor=pointer]
          - link "자주 묻는 질문" [ref=e659] [cursor=pointer]:
            - /url: /kr/faq
```

# Test source

```ts
  11  |   readonly optionsPanel: Locator;
  12  | 
  13  |   constructor(page: Page) {
  14  |     this.page = page;
  15  |     this.optionsPanel = page
  16  |       .getByTestId('product-category-options')
  17  |       .or(page.getByRole('complementary').filter({ hasText: /\uc0ac\uc774\uc988|\uc218\ub7c9|Size|Quantity/i }))
  18  |       .first();
  19  |   }
  20  | 
  21  |   async goto(path: string, heading: string): Promise<void> {
  22  |     await this.page.goto(appPath(path));
  23  |     await expect(this.page.getByRole('heading', { name: heading, exact: true }).first()).toBeVisible();
  24  |     await expect(this.optionsPanel).toBeVisible();
  25  |   }
  26  | 
  27  |   async expectCatalogEntryRenders(path: string): Promise<void> {
  28  |     await this.page.goto(appPath(path));
  29  |     await expect(this.page).toHaveURL(new RegExp(`${escapeRegExp(path.replace(/^\.\//, ''))}/?$`));
  30  |     await expect(this.page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  31  |     await expect(this.optionsPanel).toBeVisible();
  32  |   }
  33  | 
  34  |   async addToCart(): Promise<void> {
  35  |     await this.nextStepButton().click();
  36  | 
  37  |     const addToCartButton = this.page.getByRole('dialog').getByRole('button', { name: ko.addToCart });
  38  |     await expect(addToCartButton).toBeVisible();
  39  |     await addToCartButton.click();
  40  |   }
  41  | 
  42  |   async selectSize(sizeName: string): Promise<void> {
  43  |     await this.optionsPanel.getByRole('button', { name: new RegExp(escapeRegExp(sizeName)) }).first().click();
  44  |   }
  45  | 
  46  |   async selectMaterial(materialName: string): Promise<void> {
  47  |     await this.optionsPanel.getByRole('button', { name: materialName }).click();
  48  |   }
  49  | 
  50  |   // vinyl-lettering and transfer-sticker expose color choices as `.color-swatch` buttons whose
  51  |   // accessible name (aria-label) is the English color name (e.g. "Black"); the Korean label used
  52  |   // elsewhere in this suite only exists in a child `.color-swatch-tooltip` span, so this can't use
  53  |   // the getByRole name-matching that selectMaterial relies on.
  54  |   async selectSwatchColor(koreanColorLabel: string): Promise<void> {
  55  |     await this.optionsPanel.locator('.color-swatch').filter({ hasText: koreanColorLabel }).first().click();
  56  |   }
  57  | 
  58  |   async selectSheetSize(sizeName: string): Promise<void> {
  59  |     await this.optionsPanel.getByRole('button', { name: new RegExp(`^${escapeRegExp(sizeName)}`) }).first().click();
  60  |   }
  61  | 
  62  |   async selectQuantity(quantity: number): Promise<void> {
  63  |     const quantityLabel = new RegExp(`^${quantity.toLocaleString('en-US')}\\s*(?:\\S+)?\\s*${wonAmountPattern.source}`, 'u');
  64  |     await this.optionsPanel.getByRole('button', { name: quantityLabel }).first().click();
  65  |   }
  66  | 
  67  |   async selectCustomIndividualSize(widthMm: number, heightMm: number): Promise<void> {
  68  |     const widthInput = this.optionsPanel.getByPlaceholder('가로');
  69  | 
  70  |     await this.optionsPanel.getByRole('button', { name: ko.customSize }).first().click();
  71  |     const appeared = await widthInput
  72  |       .waitFor({ state: 'visible', timeout: 5_000 })
  73  |       .then(() => true)
  74  |       .catch(() => false);
  75  | 
  76  |     if (!appeared) {
  77  |       // Occasionally the custom-size row does not mount on the first click on development
  78  |       // environments (observed alongside a Vue hydration-mismatch warning); one retry clears it.
  79  |       await this.optionsPanel.getByRole('button', { name: ko.customSize }).first().click();
  80  |       await widthInput.waitFor({ state: 'visible', timeout: 10_000 });
  81  |     }
  82  | 
  83  |     await widthInput.fill(String(widthMm));
  84  |     await this.optionsPanel.getByPlaceholder('세로').fill(String(heightMm));
  85  |     await this.optionsPanel.getByPlaceholder('세로').blur();
  86  |   }
  87  | 
  88  |   // vinyl-lettering's design surface is a contenteditable canvas, not an input/textarea, and
  89  |   // pricing stays at 0원 with the next-step button disabled until text is entered.
  90  |   async fillVinylLetteringText(text: string): Promise<void> {
  91  |     const canvas = this.page.getByTestId('product-category-vinyl-designer-textarea');
  92  |     await canvas.click();
  93  |     await this.page.keyboard.type(text);
  94  |   }
  95  | 
  96  |   async expectVisiblePrice(): Promise<void> {
  97  |     await expect(this.optionsPanel.getByText(wonAmountPattern).last()).toBeVisible();
  98  |   }
  99  | 
  100 |   async expectBulkDiscountVisible(): Promise<void> {
  101 |     await expect(this.optionsPanel.getByText(/^-\d+%$/).first()).toBeVisible();
  102 |   }
  103 | 
  104 |   async expectNoBulkDiscountVisible(): Promise<void> {
  105 |     await expect(this.optionsPanel.getByText(/^-\d+%$/)).toHaveCount(0);
  106 |   }
  107 | 
  108 |   async expectSizeGuideImagesLocalized(): Promise<void> {
  109 |     const images = this.page.locator('.mini-feature-image');
  110 |     const count = await images.count();
> 111 |     expect(count, 'Expected size-guide illustration images to be present').toBeGreaterThan(0);
      |                                                                            ^ Error: Expected size-guide illustration images to be present
  112 | 
  113 |     for (let index = 0; index < count; index += 1) {
  114 |       const alt = (await images.nth(index).getAttribute('alt')) ?? '';
  115 |       expect(alt, `Size guide image ${index} alt text is a raw, untranslated i18n key: "${alt}"`).not.toMatch(
  116 |         /^product\.sizes\./
  117 |       );
  118 |       expect(
  119 |         alt,
  120 |         `Size guide image ${index} alt text looks like an unrelated sheet/paper size label: "${alt}"`
  121 |       ).not.toMatch(/^A\d+\s|^\d+\s*x\s*\d+$/i);
  122 |     }
  123 |   }
  124 | 
  125 |   async expectDesignUploadModal(): Promise<void> {
  126 |     const dialog = this.page.getByRole('dialog');
  127 |     await expect(dialog.getByTestId('product-category-upload-dropzone')).toContainText(
  128 |       '.eps, .ai, .psd, .pdf, .tif, .png'
  129 |     );
  130 |     await expect(dialog.getByTestId('product-category-upload-select-files-button')).toBeVisible();
  131 |   }
  132 | 
  133 |   async fillDesignOrderNote(note: string): Promise<void> {
  134 |     await this.page.getByTestId('product-category-upload-special-instructions').locator('textarea').fill(note);
  135 |   }
  136 | 
  137 |   async uploadDesignFile(filePath: string): Promise<void> {
  138 |     await this.page.getByRole('dialog').locator('input[type="file"]').setInputFiles(filePath);
  139 |   }
  140 | 
  141 |   async expectDesignFileAccepted(fileName: string): Promise<void> {
  142 |     await expect(this.page.getByRole('dialog').getByTestId('product-category-upload-dropzone')).toContainText(
  143 |       fileName
  144 |     );
  145 |   }
  146 | 
  147 |   async expectNextStepEnabled(): Promise<void> {
  148 |     await expect(this.nextStepButton()).toBeEnabled();
  149 |   }
  150 | 
  151 |   async clickNextStepAndExpectProgression(): Promise<void> {
  152 |     await this.nextStepButton().click();
  153 |     await expect(
  154 |       this.page
  155 |         .getByRole('dialog')
  156 |         .or(this.page.getByText(/\uc5c5\ub85c\ub4dc|\ub514\uc790\uc778|\uc7a5\ubc14\uad6c\ub2c8|Upload|Cart/i))
  157 |         .first()
  158 |     ).toBeVisible();
  159 |   }
  160 | 
  161 |   async expectProductionPromises(): Promise<void> {
  162 |     await expect(this.page.locator('body')).toContainText('5\ub9cc\uc6d0 \uc774\uc0c1 \ubb34\ub8cc\ubc30\uc1a1');
  163 |     await expect(this.page.locator('body')).toContainText('3\uc2dc \uc774\uc804 \uc2dc\uc548 \ud655\uc815 \uc2dc \ub2f9\uc77c\ubc30\uc1a1');
  164 |     await expect(this.page.locator('body')).toContainText(/\ub3c4\ucc29 \uc608\uc815\uc77c|CJ \ub300\ud55c\ud1b5\uc6b4/);
  165 |     await expect(this.page.locator('body')).toContainText('\uc624\ub298\uc81c\uc791, \ub0b4\uc77c\ubc1c\uc1a1');
  166 |     await expect(this.page.locator('body')).toContainText('\ube60\ub978 \uc2dc\uc548 \ud53c\ub4dc\ubc31');
  167 |     await expect(this.page.locator('body')).toContainText('\ub6f0\uc5b4\ub09c \ub0b4\uad6c\uc131\uacfc \ub0b4\uc218\uc131');
  168 |   }
  169 | 
  170 |   async expectReviewCarouselUsable(): Promise<void> {
  171 |     const body = this.page.locator('body');
  172 |     await expect(body).toContainText(ko.reviews225);
  173 | 
  174 |     const nextButton = this.page.getByRole('button', { name: /\ub2e4\uc74c \ub9ac\ubdf0/ }).first();
  175 |     const previousButton = this.page.getByRole('button', { name: /\uc774\uc804 \ub9ac\ubdf0/ }).first();
  176 | 
  177 |     await expect(nextButton).toBeVisible();
  178 |     await nextButton.click();
  179 |     await expect(previousButton).toBeVisible();
  180 |     await previousButton.click();
  181 |     await expect(body).toContainText(ko.reviews225);
  182 |   }
  183 | 
  184 |   async expectCustomControlsOpen(): Promise<void> {
  185 |     const customSizeButton = this.optionsPanel.getByRole('button', { name: ko.customSize }).first();
  186 |     await expect(customSizeButton).toBeVisible();
  187 |     await customSizeButton.click();
  188 |     await expect(this.page.getByRole('dialog').or(this.optionsPanel.getByRole('spinbutton')).first()).toBeVisible();
  189 |     await this.closeTransientDialog();
  190 | 
  191 |     const customQuantityButton = this.optionsPanel.getByRole('button', { name: ko.customQuantity }).first();
  192 |     await expect(customQuantityButton).toBeVisible();
  193 |     await customQuantityButton.click();
  194 |     await expect(this.page.getByRole('dialog').or(this.optionsPanel.getByRole('spinbutton')).first()).toBeVisible();
  195 |     await this.closeTransientDialog();
  196 |   }
  197 | 
  198 |   async expectSheetTemplateControls(): Promise<void> {
  199 |     await expect(this.page.locator('body')).toContainText(/\uc2dc\ud2b8 \uc2a4\ud2f0\ucee4 \ud15c\ud50c\ub9bf \ub2e4\uc6b4\ub85c\ub4dc/);
  200 |     await expect(this.page.locator('body')).toContainText(/\ubc30\uce58 \uac00\uc774\ub4dc \ubcf4\uae30/);
  201 |   }
  202 | 
  203 |   private nextStepButton(): Locator {
  204 |     return this.optionsPanel.getByRole('button', { name: ko.nextStep });
  205 |   }
  206 | 
  207 |   private async closeTransientDialog(): Promise<void> {
  208 |     const cancelButton = this.page.getByRole('button', { name: ko.cancel }).last();
  209 |     if (await cancelButton.isVisible().catch(() => false)) {
  210 |       await cancelButton.click();
  211 |       return;
```