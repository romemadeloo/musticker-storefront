# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: validation/purchasing-validation.spec.ts >> purchasing validation and error handling >> custom size and quantity controls gate the next step until valid values exist
- Location: tests/e2e/validation/purchasing-validation.spec.ts:12:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: '자유형 스티커' })
Expected: visible
Error: strict mode violation: getByRole('heading', { name: '자유형 스티커' }) resolved to 4 elements:
    1) <h2 data-v-12d49d97="" class="faq-section-title">자유형 스티커 FAQ</h2> aka getByRole('heading', { name: '자유형 스티커 FAQ' })
    2) <h3 data-v-a8dfaf65="" class="faq-section-card-question">자유형 스티커란 무엇인가요?</h3> aka getByRole('heading', { name: '자유형 스티커란 무엇인가요?' })
    3) <h3 data-v-a8dfaf65="" class="faq-section-card-question">자유형 스티커는 방수 및 내구성이 있나요?</h3> aka getByRole('heading', { name: '자유형 스티커는 방수 및 내구성이 있나요?' })
    4) <h3 data-v-a8dfaf65="" class="faq-section-card-question">자유형 스티커는 어떤 사이즈를 선택하는 것이 좋나요?</h3> aka getByRole('heading', { name: '자유형 스티커는 어떤 사이즈를 선택하는 것이 좋나요?' })

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('heading', { name: '자유형 스티커' })

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
          - navigation
        - generic [ref=e36]:
          - generic [ref=e37]:
            - generic [ref=e38]:
              - heading [level=1]
              - paragraph [ref=e39]: 두텁고 강력한 내구성을 가진 소재를 자랑해요
            - img "자유형 스티커 preview poster" [ref=e41]
          - complementary [ref=e64]:
            - generic [ref=e65]:
              - generic [ref=e66]:
                - heading "사이즈를 선택하세요" [level=3] [ref=e67]
                - generic [ref=e68]: (단위:mm)
              - button "원하는 크기 입력" [ref=e70] [cursor=pointer]:
                - paragraph [ref=e71]: 원하는 크기 입력
            - heading "수량을 선택하세요" [level=3] [ref=e73]
            - button "다음 단계" [disabled] [ref=e86]:
              - generic [ref=e87]: 다음 단계
            - list [ref=e89]:
              - listitem [ref=e90]: 5만원 이상 무료배송
              - listitem [ref=e91]: 3시 이전 시안 확정 시 당일배송
              - listitem [ref=e92]: 시안 승인 후 평균 1~3일 내 배송됩니다. (주말·공휴일 제외)
      - generic [ref=e94]:
        - article [ref=e95]:
          - img "오늘제작, 내일발송" [ref=e96]
          - heading "오늘제작, 내일발송" [level=4] [ref=e97]
          - paragraph [ref=e98]: 디자인 승인 즉시 제작이 시작됩니다 평균 1~2일 안에 당신의 손에 도착하죠
        - article [ref=e99]:
          - img "빠른 시안 피드백" [ref=e100]
          - heading "빠른 시안 피드백" [level=4] [ref=e101]
          - paragraph [ref=e102]: 결제 후 곧바로 시안을 받아보세요 마음이 ‘예스’ 할 때까지 수정 가능합니다
        - article [ref=e103]:
          - img "뛰어난 내구성과 내수성" [ref=e104]
          - heading "뛰어난 내구성과 내수성" [level=4] [ref=e105]
          - paragraph [ref=e106]: 두꺼운 프리미엄 재질로 색상, 접착력 그대로 오래갑니다
      - generic [ref=e108]:
        - article [ref=e109]:
          - generic [ref=e112]:
            - heading "색감은 생생하게, 내구성은 완벽하게" [level=3] [ref=e113]
            - paragraph [ref=e114]: 고품질 인쇄와 두꺼운 소재로 구현한 화려하고 선명한 색감. 비, 햇빛, 고온에도 쉽게 흐려지지 않는 뛰어난 내구성. 붙이는 순간부터 오래도록 변하지 않는 품질을 느껴보세요.
        - article [ref=e115]:
          - generic [ref=e118]:
            - heading "쉽게 붙이고, 깔끔하게 제거" [level=3] [ref=e119]
            - paragraph [ref=e120]: 매끄럽게 부착되고, 흔적 없이 깔끔하게 떨어집니다. 접착은 강력하지만, 표면은 안전하게 보호합니다. 필요할 땐 단번에 제거되고, 남는 건 깔끔함뿐입니다.
        - article [ref=e121]:
          - generic [ref=e124]:
            - heading "디자인에 맞게 정확하게 컷팅" [level=3] [ref=e125]
            - paragraph [ref=e126]: 로고, 일러스트, 사진을 업로드하면 칼선에 맞춰 정밀하게 스티커로 제작됩니다. 복잡한 패턴도 머스티커의 고유한 절단 기술로 완벽하게 표현됩니다.
      - generic [ref=e128]:
        - generic [ref=e129]:
          - generic [ref=e130]:
            - generic [ref=e131]: 좋아요 😀
            - generic [ref=e132]:
              - img [ref=e133]
              - img [ref=e135]
              - img [ref=e137]
              - img [ref=e139]
              - img [ref=e141]
            - generic [ref=e143]: "5.0"
          - heading "225개 사진 후기가 보장해요" [level=2] [ref=e144]
          - paragraph [ref=e145]: 직접 사용한 고객들의 생생한 리뷰를 확인해보세요. 리얼 사용 이미지와 함께 실제 만족도를 보여드립니다.
          - generic [ref=e146]:
            - button "이전 리뷰" [disabled] [ref=e147] [cursor=pointer]:
              - img [ref=e148]
              - generic [ref=e150]: 이전 리뷰
            - button "다음 리뷰" [ref=e151] [cursor=pointer]:
              - img [ref=e152]
              - generic [ref=e154]: 다음 리뷰
        - generic [ref=e156]:
          - article [ref=e158]:
            - generic [ref=e159]:
              - img "tkop****" [ref=e161]
              - paragraph [ref=e163]: 빨리오고 너무 이쁘게 만들어주셔서 감사합니다 그리고 서비스도 20장 더 주셔서 감사합니다
            - generic [ref=e164]:
              - generic [ref=e165]:
                - img "tkop**** avatar" [ref=e166]
                - generic [ref=e167]:
                  - strong [ref=e168]: tkop****
                  - generic [ref=e169]: 2026-03-25
              - generic [ref=e170]:
                - img [ref=e171]
                - img [ref=e173]
                - img [ref=e175]
                - img [ref=e177]
                - img [ref=e179]
          - article [ref=e182]:
            - generic [ref=e183]:
              - img "oozz******" [ref=e185]
              - paragraph [ref=e187]: 잘나와서 만족합니다 잘쓰겠습니다
            - generic [ref=e188]:
              - generic [ref=e189]:
                - img "oozz****** avatar" [ref=e190]
                - generic [ref=e191]:
                  - strong [ref=e192]: oozz******
                  - generic [ref=e193]: 2026-03-22
              - generic [ref=e194]:
                - img [ref=e195]
                - img [ref=e197]
                - img [ref=e199]
                - img [ref=e201]
                - img [ref=e203]
          - article [ref=e206]:
            - generic [ref=e207]:
              - img "aktm********" [ref=e209]
              - paragraph [ref=e211]: 만족하면서 사용중입니다
            - generic [ref=e212]:
              - generic [ref=e213]:
                - img "aktm******** avatar" [ref=e214]
                - generic [ref=e215]:
                  - strong [ref=e216]: aktm********
                  - generic [ref=e217]: 2026-03-04
              - generic [ref=e218]:
                - img [ref=e219]
                - img [ref=e221]
                - img [ref=e223]
                - img [ref=e225]
                - img [ref=e227]
          - article [ref=e230]:
            - generic [ref=e231]:
              - img "aktm********" [ref=e233]
              - paragraph [ref=e235]: 잘 받았어요 잘쓸게요.
            - generic [ref=e236]:
              - generic [ref=e237]:
                - img "aktm******** avatar" [ref=e238]
                - generic [ref=e239]:
                  - strong [ref=e240]: aktm********
                  - generic [ref=e241]: 2026-01-31
              - generic [ref=e242]:
                - img [ref=e243]
                - img [ref=e245]
                - img [ref=e247]
                - img [ref=e249]
                - img [ref=e251]
          - article [ref=e254]:
            - generic [ref=e255]:
              - img "aktm********" [ref=e257]
              - paragraph [ref=e259]: 아주 잘쓰고있습니다.
            - generic [ref=e260]:
              - generic [ref=e261]:
                - img "aktm******** avatar" [ref=e262]
                - generic [ref=e263]:
                  - strong [ref=e264]: aktm********
                  - generic [ref=e265]: 2026-01-06
              - generic [ref=e266]:
                - img [ref=e267]
                - img [ref=e269]
                - img [ref=e271]
                - img [ref=e273]
                - img [ref=e275]
          - article [ref=e278]:
            - generic [ref=e279]:
              - img "aktm********" [ref=e281]
              - paragraph [ref=e283]: 아주 잘쓰고있습니다.
            - generic [ref=e284]:
              - generic [ref=e285]:
                - img "aktm******** avatar" [ref=e286]
                - generic [ref=e287]:
                  - strong [ref=e288]: aktm********
                  - generic [ref=e289]: 2026-01-06
              - generic [ref=e290]:
                - img [ref=e291]
                - img [ref=e293]
                - img [ref=e295]
                - img [ref=e297]
                - img [ref=e299]
          - article [ref=e302]:
            - generic [ref=e303]:
              - img "jiwn****" [ref=e305]
              - paragraph [ref=e307]: 아 정말 너무 좋아연ㅎㅎ
            - generic [ref=e308]:
              - generic [ref=e309]:
                - img "jiwn**** avatar" [ref=e310]
                - generic [ref=e311]:
                  - strong [ref=e312]: jiwn****
                  - generic [ref=e313]: 2025-12-29
              - generic [ref=e314]:
                - img [ref=e315]
                - img [ref=e317]
                - img [ref=e319]
                - img [ref=e321]
                - img [ref=e323]
          - article [ref=e326]:
            - generic [ref=e327]:
              - img "koj3***" [ref=e329]
              - paragraph [ref=e331]: 방수도 잘되고 오염에도 잘 버티고 좋아요. 적극 추천합니다.^^
            - generic [ref=e332]:
              - generic [ref=e333]:
                - img "koj3*** avatar" [ref=e334]
                - generic [ref=e335]:
                  - strong [ref=e336]: koj3***
                  - generic [ref=e337]: 2025-12-24
              - generic [ref=e338]:
                - img [ref=e339]
                - img [ref=e341]
                - img [ref=e343]
                - img [ref=e345]
                - img [ref=e347]
          - article [ref=e350]:
            - generic [ref=e351]:
              - img "aktm********" [ref=e353]
              - paragraph [ref=e355]: 이쁘네요 잘쓸게요.!!
            - generic [ref=e356]:
              - generic [ref=e357]:
                - img "aktm******** avatar" [ref=e358]
                - generic [ref=e359]:
                  - strong [ref=e360]: aktm********
                  - generic [ref=e361]: 2025-12-03
              - generic [ref=e362]:
                - img [ref=e363]
                - img [ref=e365]
                - img [ref=e367]
                - img [ref=e369]
                - img [ref=e371]
          - article [ref=e374]:
            - generic [ref=e375]:
              - img "aktm********" [ref=e377]
              - paragraph [ref=e379]: 이쁘게 잘뽑혔네요.
            - generic [ref=e380]:
              - generic [ref=e381]:
                - img "aktm******** avatar" [ref=e382]
                - generic [ref=e383]:
                  - strong [ref=e384]: aktm********
                  - generic [ref=e385]: 2025-11-30
              - generic [ref=e386]:
                - img [ref=e387]
                - img [ref=e389]
                - img [ref=e391]
                - img [ref=e393]
                - img [ref=e395]
          - article [ref=e398]:
            - generic [ref=e399]:
              - img "circ*****" [ref=e401]
              - paragraph [ref=e403]: 품질도 좋고 응대도 잘해주셔서 이쁘게 나왔네요
            - generic [ref=e404]:
              - generic [ref=e405]:
                - img "circ***** avatar" [ref=e406]
                - generic [ref=e407]:
                  - strong [ref=e408]: circ*****
                  - generic [ref=e409]: 2025-11-20
              - generic [ref=e410]:
                - img [ref=e411]
                - img [ref=e413]
                - img [ref=e415]
                - img [ref=e417]
                - img [ref=e419]
          - article [ref=e422]:
            - generic [ref=e423]:
              - img "pina******" [ref=e425]
              - paragraph [ref=e427]: 부착 잘되고 제거할때 끈적임 없이 깔끔하게 떨어져서 좋아요
            - generic [ref=e428]:
              - generic [ref=e429]:
                - img "pina****** avatar" [ref=e430]
                - generic [ref=e431]:
                  - strong [ref=e432]: pina******
                  - generic [ref=e433]: 2025-08-22
              - generic [ref=e434]:
                - img [ref=e435]
                - img [ref=e437]
                - img [ref=e439]
                - img [ref=e441]
                - img [ref=e443]
          - article [ref=e446]:
            - generic [ref=e447]:
              - img "qcyc*****" [ref=e449]
              - paragraph [ref=e451]: 덕분에 넘넘 잘썼습니다
            - generic [ref=e452]:
              - generic [ref=e453]:
                - img "qcyc***** avatar" [ref=e454]
                - generic [ref=e455]:
                  - strong [ref=e456]: qcyc*****
                  - generic [ref=e457]: 2025-08-15
              - generic [ref=e458]:
                - img [ref=e459]
                - img [ref=e461]
                - img [ref=e463]
                - img [ref=e465]
                - img [ref=e467]
          - article [ref=e470]:
            - generic [ref=e471]:
              - img "rlad*******" [ref=e473]
              - paragraph [ref=e475]: 꼼꼼하게 체크해주셔서 너무좋았습니다!
            - generic [ref=e476]:
              - generic [ref=e477]:
                - img "rlad******* avatar" [ref=e478]
                - generic [ref=e479]:
                  - strong [ref=e480]: rlad*******
                  - generic [ref=e481]: 2025-07-17
              - generic [ref=e482]:
                - img [ref=e483]
                - img [ref=e485]
                - img [ref=e487]
                - img [ref=e489]
                - img [ref=e491]
          - article [ref=e494]:
            - generic [ref=e495]:
              - img "csbn*****" [ref=e497]
              - paragraph [ref=e499]: 배송도 빠르고 재질도 좋고 너무 좋아요 감사합니다!
            - generic [ref=e500]:
              - generic [ref=e501]:
                - img "csbn***** avatar" [ref=e502]
                - generic [ref=e503]:
                  - strong [ref=e504]: csbn*****
                  - generic [ref=e505]: 2025-07-14
              - generic [ref=e506]:
                - img [ref=e507]
                - img [ref=e509]
                - img [ref=e511]
                - img [ref=e513]
                - img [ref=e515]
          - article [ref=e518]:
            - generic [ref=e519]:
              - img "pina******" [ref=e521]
              - paragraph [ref=e523]: 생각한대로 너무 깔끔하게 나왔어요! 다음에도 주문하겠습니다!!
            - generic [ref=e524]:
              - generic [ref=e525]:
                - img "pina****** avatar" [ref=e526]
                - generic [ref=e527]:
                  - strong [ref=e528]: pina******
                  - generic [ref=e529]: 2025-07-09
              - generic [ref=e530]:
                - img [ref=e531]
                - img [ref=e533]
                - img [ref=e535]
                - img [ref=e537]
                - img [ref=e539]
      - generic [ref=e542]:
        - generic [ref=e543]:
          - img "text" [ref=e544]
          - generic [ref=e545]:
            - heading "자유형 스티커 FAQ" [level=2] [ref=e546]
            - paragraph [ref=e547]:
              - text: 멤버십, 주문, 디자인 파일 업로드, 인쇄, 결제, 반품·환불에 대한 자세한 내용은 자주 묻는
              - link "질문(FAQ) 페이지에서 확인해 주세요" [ref=e548] [cursor=pointer]:
                - /url: https://www.musticker.com/faq
              - text: .
        - generic [ref=e549]:
          - generic [ref=e550]:
            - generic [ref=e551] [cursor=pointer]:
              - heading "자유형 스티커란 무엇인가요?" [level=3] [ref=e552]
              - paragraph [ref=e555]: 자유형 스티커는 원형이나 사각형 같은 규격 모양이 아닌, 디자인의 외곽선을 따라 제작되는 스티커입니다. 로고, 일러스트, 캐릭터, 텍스트 등 다양한 디자인을 원하는 모양으로 제작할 수 있습니다.
            - button [ref=e556] [cursor=pointer]:
              - img [ref=e557]
          - generic [ref=e559]:
            - generic [ref=e560] [cursor=pointer]:
              - heading "자유형 스티커는 방수 및 내구성이 있나요?" [level=3] [ref=e561]
              - paragraph [ref=e562]: 머스티커의 자유형 스티커는 내구성이 뛰어난 PVC 용지에 인쇄되어 물, 햇빛, 일상적인 마모에 강합니다. 실내외 다양한 환경에서도 선명한 색감을 오래 유지합니다. 다만 날카로운 물체나 강한 마찰에는 긁힘이 생길 수 있으니 주의해 주세요
            - button [ref=e563] [cursor=pointer]:
              - img [ref=e564]
          - generic [ref=e566]:
            - generic [ref=e567] [cursor=pointer]:
              - heading "칼선은 직접 만들어야 하나요?" [level=3] [ref=e568]
              - paragraph [ref=e569]: 디자인 파일만 업로드해 주시면 머스티커에서 디자인에 맞게 칼선을 제작해 드립니다. 이미 칼선이 포함된 파일이 있다면 함께 업로드할 수 있으며, 보다 깔끔한 제작을 위해 디자인 외곽선을 따라 칼선을 작업하는 것을 권장합니다.
            - button [ref=e570] [cursor=pointer]:
              - img [ref=e571]
          - generic [ref=e573]:
            - generic [ref=e574] [cursor=pointer]:
              - heading "인쇄 색상은 화면과 동일하게 나오나요?" [level=3] [ref=e575]
              - paragraph [ref=e576]: 모니터와 인쇄물은 색상을 표현하는 방식이 달라 실제 색상이 다소 다르게 보일 수 있습니다. 또한 모니터의 밝기, 색상 설정, 사용 환경에 따라서도 차이가 발생할 수 있습니다. 머스티커는 고품질 인쇄를 통해 원본 디자인과 최대한 가까운 색상으로 제작해 드립니다.
            - button [ref=e577] [cursor=pointer]:
              - img [ref=e578]
          - generic [ref=e580]:
            - generic [ref=e581] [cursor=pointer]:
              - heading "자유형 스티커는 어떤 사이즈를 선택하는 것이 좋나요?" [level=3] [ref=e582]
              - paragraph [ref=e583]: 디자인에 따라 적합한 사이즈가 달라집니다. 간단한 로고나 아이콘은 소형 사이즈를, 디테일이 많은 일러스트나 텍스트가 포함된 디자인은 대형 사이즈를 추천합니다. 작은 글씨나 얇은 선이 있는 경우에는 큰 사이즈를 선택하면 더욱 선명하고 깔끔하게 제작할 수 있습니다.
            - button [ref=e584] [cursor=pointer]:
              - img [ref=e585]
        - generic [ref=e587]:
          - generic [ref=e588]:
            - heading "궁금한 점이 더 있으신가요?" [level=1] [ref=e589]
            - paragraph [ref=e590]: 원하시는 답변을 찾지 못하셨다면 언제든지 문의해 주세요.
          - button "문의하기" [ref=e591] [cursor=pointer]:
            - generic [ref=e592]: 문의하기
    - navigation "네이버 톡톡으로 문의하기" [ref=e593]:
      - link "카카오채널로 문의하기" [ref=e594] [cursor=pointer]:
        - /url: https://pf.kakao.com/_nJxnTX/chat
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 카카오채널로 문의하기
        - img [ref=e596]
      - link "네이버 톡톡 으로 문의하기" [ref=e597] [cursor=pointer]:
        - /url: https://talk.naver.com/ct/w2luxqo
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 네이버 톡톡 으로 문의하기
        - img [ref=e599]
      - generic "이메일로 문의하기" [ref=e600] [cursor=pointer]:
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 이메일로 문의하기
        - img [ref=e602]
  - contentinfo [ref=e603]:
    - generic [ref=e604]:
      - generic [ref=e605]:
        - heading "MUSTICKER / 머스티커" [level=2] [ref=e606]
        - paragraph [ref=e607]: "상호명: (주)글로픽스"
        - paragraph [ref=e608]: "사업자등록번호 : 877-88-03313 통신판매업신고 : 2026-부산해운대-0792호"
        - paragraph [ref=e609]: "대표이사 : 여일석 주소 : 부산광역시 해운대구 해운대해변로 203 오션타워 1014호"
        - paragraph [ref=e610]:
          - generic [ref=e611]: ⓒ 2026. All rights reserved.
          - generic [ref=e612]: "판매: sales@musticker.com"
          - link "이용약관" [ref=e613] [cursor=pointer]:
            - /url: /kr/terms-of-use
          - link "개인정보처리방침" [ref=e614] [cursor=pointer]:
            - /url: /kr/privacy-policy
          - generic [ref=e615] [cursor=pointer]: 사업자정보확인
      - generic [ref=e616]:
        - paragraph [ref=e617]: 1899-5529
        - paragraph [ref=e619]: 오전 9시 ~ 오후 6시(토요일, 공휴일 휴무)
        - generic [ref=e620]:
          - button "1:1문의하기" [ref=e621] [cursor=pointer]
          - link "자주 묻는 질문" [ref=e622] [cursor=pointer]:
            - /url: /kr/faq
```

# Test source

```ts
  1   | import type { Locator, Page } from '@playwright/test';
  2   | import { expect } from '@playwright/test';
  3   | 
  4   | import { appPath } from '../fixtures/env.js';
  5   | import type { CartLineItem, ProductConfig, RegressionProductCandidate } from '../fixtures/types.js';
  6   | import { CartDrawer } from './cart-drawer.js';
  7   | import { DesignUploadModal } from './design-upload-modal.js';
  8   | 
  9   | const customOptionLabel = /\uCEE4\uC2A4\uD140|\uC9C1\uC811|Custom|Direct|원하는 크기 입력|원하는 수량 입력/i;
  10  | const sizeLabelPattern = /\d+\s*(?:x|×)\s*\d+|Small|Medium|Large|\uC18C\uD615|\uC911\uD615|\uB300\uD615/i;
  11  | const storefrontTitlePattern = /(?=.*머스티커)(?=.*스티커)/;
  12  | const wonAmountPattern = /[\d,]+\uC6D0/u;
  13  | const quantityUnitPricePattern = String.raw`(?:\s*[^\d\s,]+)?\s+[\d,]+\uC6D0`;
  14  | const quantityPricePattern = new RegExp(String.raw`^\d[\d,]*${quantityUnitPricePattern}`, 'u');
  15  | 
  16  | type SelectedSize = {
  17  |   widthMm?: number;
  18  |   heightMm?: number;
  19  | };
  20  | 
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
> 44  |     await expect(this.page.getByRole('heading', { name: productName })).toBeVisible();
      |                                                                         ^ Error: expect(locator).toBeVisible() failed
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
  121 |     await expect(customSizeButton).toBeVisible({ timeout: 10_000 });
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
```