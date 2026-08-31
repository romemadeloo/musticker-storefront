# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: purchasing/sheet-sticker-size-rules.spec.ts >> storefront v2 sheet sticker size rules (minimum two stickers per sheet) >> MS-V2-073 원형 시트 스티커 rejects a custom size that fits only one sticker per sheet
- Location: tests/e2e/purchasing/sheet-sticker-size-rules.spec.ts:47:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('product-category-options').or(getByRole('complementary').filter({ hasText: /\uc0ac\uc774\uc988|\uc218\ub7c9|Size|Quantity/i })).first().getByText('더 작은 사이즈를 입력해 주세요. 한 시트에 최소 2개의 스티커가 들어가야 합니다.')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('product-category-options').or(getByRole('complementary').filter({ hasText: /\uc0ac\uc774\uc988|\uc218\ub7c9|Size|Quantity/i })).first().getByText('더 작은 사이즈를 입력해 주세요. 한 시트에 최소 2개의 스티커가 들어가야 합니다.')

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
                - generic [ref=e88] [cursor=pointer]:
                  - generic [ref=e89]:
                    - generic [ref=e90]:
                      - generic [ref=e91]: 너비
                      - spinbutton [ref=e92]: "123"
                    - generic [ref=e93]: x
                    - generic [ref=e94]:
                      - generic [ref=e95]: 높이
                      - spinbutton [ref=e96]: "123"
                  - paragraph [ref=e97]: 한 시트에 최소 2개의 스티커가 들어가도록 세로 길이 를 97mm 이하로 입력해 주세요.
            - generic [ref=e98]:
              - heading "수량을 선택하세요" [level=3] [ref=e99]
              - generic [ref=e100]:
                - button "5시트 0원" [ref=e101] [cursor=pointer]:
                  - generic [ref=e102]: 5시트
                  - generic [ref=e103]: 0원
                - button "10시트 0원" [ref=e104] [cursor=pointer]:
                  - generic [ref=e105]: 10시트
                  - generic [ref=e106]: 0원
                - button "20시트 0원" [ref=e107] [cursor=pointer]:
                  - generic [ref=e108]: 20시트
                  - generic [ref=e109]: 0원
                - button "50시트 0원" [ref=e110] [cursor=pointer]:
                  - generic [ref=e111]: 50시트
                  - generic [ref=e112]: 0원
                - button "100시트 0원" [ref=e113] [cursor=pointer]:
                  - generic [ref=e114]: 100시트
                  - generic [ref=e115]: 0원
                - button "200시트 0원" [ref=e116] [cursor=pointer]:
                  - generic [ref=e117]: 200시트
                  - generic [ref=e118]: 0원
                - button "500시트 0원" [ref=e119] [cursor=pointer]:
                  - generic [ref=e120]: 500시트
                  - generic [ref=e121]: 0원
                - button "1,000시트 0원" [ref=e122] [cursor=pointer]:
                  - generic [ref=e123]: 1,000시트
                  - generic [ref=e124]: 0원
                - 'button "원하는 수량 입력 주문 가능 수량: 5-1,000시트" [ref=e125] [cursor=pointer]':
                  - generic [ref=e126]:
                    - img [ref=e127]
                    - paragraph [ref=e129]: 원하는 수량 입력
                  - generic [ref=e130]: "주문 가능 수량: 5-1,000시트"
            - region "Sheet summary" [ref=e131]:
              - img "A5 sheet" [ref=e132]
              - generic [ref=e133]:
                - paragraph [ref=e134]: 1시트 = 스티커 1개
                - paragraph [ref=e135]: "총 스티커 수량 : 0개"
            - generic [ref=e138]:
              - paragraph [ref=e140]:
                - strong [ref=e141]: 0원
              - paragraph [ref=e142]: (1시트당 0원)
            - generic [ref=e143]:
              - button "다음 단계" [disabled] [ref=e144]:
                - generic [ref=e145]: 다음 단계
              - generic [ref=e146]:
                - paragraph [ref=e147]: 스티커는 A5 시트(148×210mm)에 인쇄됩니다. 아래 가이드를 통해 사이즈별 배치 수량을 확인하고, 가장 적합한 옵션을 선택해 보세요.
                - generic [ref=e149] [cursor=pointer]:
                  - generic [ref=e150]: 배치 가이드 보기
                  - img [ref=e151]
            - list [ref=e154]:
              - listitem [ref=e155]: 5만원 이상 무료배송
              - listitem [ref=e156]: 3시 이전 시안 확정 시 당일배송
              - listitem [ref=e157]: "도착 예정일: 09.02 (수) · CJ 대한통운"
              - listitem [ref=e158]: 시안 승인 후 평균 1~3일 내 배송됩니다. (주말·공휴일 제외)
      - generic [ref=e160]:
        - article [ref=e161]:
          - img "오늘제작, 내일발송" [ref=e162]
          - heading "오늘제작, 내일발송" [level=4] [ref=e163]
          - paragraph [ref=e164]: 디자인 승인 즉시 제작이 시작됩니다 평균 1~2일 안에 당신의 손에 도착하죠
        - article [ref=e165]:
          - img "빠른 시안 피드백" [ref=e166]
          - heading "빠른 시안 피드백" [level=4] [ref=e167]
          - paragraph [ref=e168]: 결제 후 곧바로 시안을 받아보세요 마음이 ‘예스’ 할 때까지 수정 가능합니다
        - article [ref=e169]:
          - img "뛰어난 내구성과 내수성" [ref=e170]
          - heading "뛰어난 내구성과 내수성" [level=4] [ref=e171]
          - paragraph [ref=e172]: 두꺼운 프리미엄 재질로 색상, 접착력 그대로 오래갑니다
      - generic [ref=e174]:
        - article [ref=e175]:
          - generic [ref=e178]:
            - heading "색감은 생생하게, 내구성은 완벽하게" [level=3] [ref=e179]
            - paragraph [ref=e180]: 고품질 인쇄와 두꺼운 소재로 구현한 화려하고 선명한 색감. 비, 햇빛, 고온에도 쉽게 흐려지지 않는 뛰어난 내구성. 붙이는 순간부터 오래도록 변하지 않는 품질을 느껴보세요.
        - article [ref=e181]:
          - generic [ref=e184]:
            - heading "쉽게 붙이고, 깔끔하게 제거" [level=3] [ref=e185]
            - paragraph [ref=e186]: 매끄럽게 부착되고, 흔적 없이 깔끔하게 떨어집니다. 접착은 강력하지만, 표면은 안전하게 보호합니다. 필요할 땐 단번에 제거되고, 남는 건 깔끔함뿐입니다.
        - article [ref=e187]:
          - generic [ref=e190]:
            - heading "디자인에 맞게 정확하게 컷팅" [level=3] [ref=e191]
            - paragraph [ref=e192]: 로고, 일러스트, 사진을 업로드하면 칼선에 맞춰 정밀하게 스티커로 제작됩니다. 복잡한 패턴도 머스티커의 고유한 절단 기술로 완벽하게 표현됩니다.
      - generic [ref=e194]:
        - generic [ref=e195]:
          - generic [ref=e196]:
            - generic [ref=e197]: 좋아요 😀
            - generic [ref=e198]:
              - img [ref=e199]
              - img [ref=e201]
              - img [ref=e203]
              - img [ref=e205]
              - img [ref=e207]
            - generic [ref=e209]: "5.0"
          - heading "225개 사진 후기가 보장해요" [level=2] [ref=e210]
          - paragraph [ref=e211]: 직접 사용한 고객들의 생생한 리뷰를 확인해보세요. 리얼 사용 이미지와 함께 실제 만족도를 보여드립니다.
          - generic [ref=e212]:
            - button "이전 리뷰" [ref=e213] [cursor=pointer]:
              - img [ref=e214]
              - generic [ref=e216]: 이전 리뷰
            - button "다음 리뷰" [ref=e217] [cursor=pointer]:
              - img [ref=e218]
              - generic [ref=e220]: 다음 리뷰
        - generic [ref=e222]:
          - article [ref=e224]:
            - generic [ref=e225]:
              - img "tkop****" [ref=e227]
              - paragraph [ref=e229]: 빨리오고 너무 이쁘게 만들어주셔서 감사합니다 그리고 서비스도 20장 더 주셔서 감사합니다
            - generic [ref=e230]:
              - generic [ref=e231]:
                - img "tkop**** avatar" [ref=e232]
                - generic [ref=e233]:
                  - strong [ref=e234]: tkop****
                  - generic [ref=e235]: 2026-03-25
              - generic [ref=e236]:
                - img [ref=e237]
                - img [ref=e239]
                - img [ref=e241]
                - img [ref=e243]
                - img [ref=e245]
          - article [ref=e248]:
            - generic [ref=e249]:
              - img "oozz******" [ref=e251]
              - paragraph [ref=e253]: 잘나와서 만족합니다 잘쓰겠습니다
            - generic [ref=e254]:
              - generic [ref=e255]:
                - img "oozz****** avatar" [ref=e256]
                - generic [ref=e257]:
                  - strong [ref=e258]: oozz******
                  - generic [ref=e259]: 2026-03-22
              - generic [ref=e260]:
                - img [ref=e261]
                - img [ref=e263]
                - img [ref=e265]
                - img [ref=e267]
                - img [ref=e269]
          - article [ref=e272]:
            - generic [ref=e273]:
              - img "aktm********" [ref=e275]
              - paragraph [ref=e277]: 만족하면서 사용중입니다
            - generic [ref=e278]:
              - generic [ref=e279]:
                - img "aktm******** avatar" [ref=e280]
                - generic [ref=e281]:
                  - strong [ref=e282]: aktm********
                  - generic [ref=e283]: 2026-03-04
              - generic [ref=e284]:
                - img [ref=e285]
                - img [ref=e287]
                - img [ref=e289]
                - img [ref=e291]
                - img [ref=e293]
          - article [ref=e296]:
            - generic [ref=e297]:
              - img "aktm********" [ref=e299]
              - paragraph [ref=e301]: 잘 받았어요 잘쓸게요.
            - generic [ref=e302]:
              - generic [ref=e303]:
                - img "aktm******** avatar" [ref=e304]
                - generic [ref=e305]:
                  - strong [ref=e306]: aktm********
                  - generic [ref=e307]: 2026-01-31
              - generic [ref=e308]:
                - img [ref=e309]
                - img [ref=e311]
                - img [ref=e313]
                - img [ref=e315]
                - img [ref=e317]
          - article [ref=e320]:
            - generic [ref=e321]:
              - img "aktm********" [ref=e323]
              - paragraph [ref=e325]: 아주 잘쓰고있습니다.
            - generic [ref=e326]:
              - generic [ref=e327]:
                - img "aktm******** avatar" [ref=e328]
                - generic [ref=e329]:
                  - strong [ref=e330]: aktm********
                  - generic [ref=e331]: 2026-01-06
              - generic [ref=e332]:
                - img [ref=e333]
                - img [ref=e335]
                - img [ref=e337]
                - img [ref=e339]
                - img [ref=e341]
          - article [ref=e344]:
            - generic [ref=e345]:
              - img "aktm********" [ref=e347]
              - paragraph [ref=e349]: 아주 잘쓰고있습니다.
            - generic [ref=e350]:
              - generic [ref=e351]:
                - img "aktm******** avatar" [ref=e352]
                - generic [ref=e353]:
                  - strong [ref=e354]: aktm********
                  - generic [ref=e355]: 2026-01-06
              - generic [ref=e356]:
                - img [ref=e357]
                - img [ref=e359]
                - img [ref=e361]
                - img [ref=e363]
                - img [ref=e365]
          - article [ref=e368]:
            - generic [ref=e369]:
              - img "jiwn****" [ref=e371]
              - paragraph [ref=e373]: 아 정말 너무 좋아연ㅎㅎ
            - generic [ref=e374]:
              - generic [ref=e375]:
                - img "jiwn**** avatar" [ref=e376]
                - generic [ref=e377]:
                  - strong [ref=e378]: jiwn****
                  - generic [ref=e379]: 2025-12-29
              - generic [ref=e380]:
                - img [ref=e381]
                - img [ref=e383]
                - img [ref=e385]
                - img [ref=e387]
                - img [ref=e389]
          - article [ref=e392]:
            - generic [ref=e393]:
              - img "koj3***" [ref=e395]
              - paragraph [ref=e397]: 방수도 잘되고 오염에도 잘 버티고 좋아요. 적극 추천합니다.^^
            - generic [ref=e398]:
              - generic [ref=e399]:
                - img "koj3*** avatar" [ref=e400]
                - generic [ref=e401]:
                  - strong [ref=e402]: koj3***
                  - generic [ref=e403]: 2025-12-24
              - generic [ref=e404]:
                - img [ref=e405]
                - img [ref=e407]
                - img [ref=e409]
                - img [ref=e411]
                - img [ref=e413]
          - article [ref=e416]:
            - generic [ref=e417]:
              - img "aktm********" [ref=e419]
              - paragraph [ref=e421]: 이쁘네요 잘쓸게요.!!
            - generic [ref=e422]:
              - generic [ref=e423]:
                - img "aktm******** avatar" [ref=e424]
                - generic [ref=e425]:
                  - strong [ref=e426]: aktm********
                  - generic [ref=e427]: 2025-12-03
              - generic [ref=e428]:
                - img [ref=e429]
                - img [ref=e431]
                - img [ref=e433]
                - img [ref=e435]
                - img [ref=e437]
          - article [ref=e440]:
            - generic [ref=e441]:
              - img "aktm********" [ref=e443]
              - paragraph [ref=e445]: 이쁘게 잘뽑혔네요.
            - generic [ref=e446]:
              - generic [ref=e447]:
                - img "aktm******** avatar" [ref=e448]
                - generic [ref=e449]:
                  - strong [ref=e450]: aktm********
                  - generic [ref=e451]: 2025-11-30
              - generic [ref=e452]:
                - img [ref=e453]
                - img [ref=e455]
                - img [ref=e457]
                - img [ref=e459]
                - img [ref=e461]
          - article [ref=e464]:
            - generic [ref=e465]:
              - img "circ*****" [ref=e467]
              - paragraph [ref=e469]: 품질도 좋고 응대도 잘해주셔서 이쁘게 나왔네요
            - generic [ref=e470]:
              - generic [ref=e471]:
                - img "circ***** avatar" [ref=e472]
                - generic [ref=e473]:
                  - strong [ref=e474]: circ*****
                  - generic [ref=e475]: 2025-11-20
              - generic [ref=e476]:
                - img [ref=e477]
                - img [ref=e479]
                - img [ref=e481]
                - img [ref=e483]
                - img [ref=e485]
          - article [ref=e488]:
            - generic [ref=e489]:
              - img "pina******" [ref=e491]
              - paragraph [ref=e493]: 부착 잘되고 제거할때 끈적임 없이 깔끔하게 떨어져서 좋아요
            - generic [ref=e494]:
              - generic [ref=e495]:
                - img "pina****** avatar" [ref=e496]
                - generic [ref=e497]:
                  - strong [ref=e498]: pina******
                  - generic [ref=e499]: 2025-08-22
              - generic [ref=e500]:
                - img [ref=e501]
                - img [ref=e503]
                - img [ref=e505]
                - img [ref=e507]
                - img [ref=e509]
          - article [ref=e512]:
            - generic [ref=e513]:
              - img "qcyc*****" [ref=e515]
              - paragraph [ref=e517]: 덕분에 넘넘 잘썼습니다
            - generic [ref=e518]:
              - generic [ref=e519]:
                - img "qcyc***** avatar" [ref=e520]
                - generic [ref=e521]:
                  - strong [ref=e522]: qcyc*****
                  - generic [ref=e523]: 2025-08-15
              - generic [ref=e524]:
                - img [ref=e525]
                - img [ref=e527]
                - img [ref=e529]
                - img [ref=e531]
                - img [ref=e533]
          - article [ref=e536]:
            - generic [ref=e537]:
              - img "rlad*******" [ref=e539]
              - paragraph [ref=e541]: 꼼꼼하게 체크해주셔서 너무좋았습니다!
            - generic [ref=e542]:
              - generic [ref=e543]:
                - img "rlad******* avatar" [ref=e544]
                - generic [ref=e545]:
                  - strong [ref=e546]: rlad*******
                  - generic [ref=e547]: 2025-07-17
              - generic [ref=e548]:
                - img [ref=e549]
                - img [ref=e551]
                - img [ref=e553]
                - img [ref=e555]
                - img [ref=e557]
          - article [ref=e560]:
            - generic [ref=e561]:
              - img "csbn*****" [ref=e563]
              - paragraph [ref=e565]: 배송도 빠르고 재질도 좋고 너무 좋아요 감사합니다!
            - generic [ref=e566]:
              - generic [ref=e567]:
                - img "csbn***** avatar" [ref=e568]
                - generic [ref=e569]:
                  - strong [ref=e570]: csbn*****
                  - generic [ref=e571]: 2025-07-14
              - generic [ref=e572]:
                - img [ref=e573]
                - img [ref=e575]
                - img [ref=e577]
                - img [ref=e579]
                - img [ref=e581]
          - article [ref=e584]:
            - generic [ref=e585]:
              - img "pina******" [ref=e587]
              - paragraph [ref=e589]: 생각한대로 너무 깔끔하게 나왔어요! 다음에도 주문하겠습니다!!
            - generic [ref=e590]:
              - generic [ref=e591]:
                - img "pina****** avatar" [ref=e592]
                - generic [ref=e593]:
                  - strong [ref=e594]: pina******
                  - generic [ref=e595]: 2025-07-09
              - generic [ref=e596]:
                - img [ref=e597]
                - img [ref=e599]
                - img [ref=e601]
                - img [ref=e603]
                - img [ref=e605]
      - generic [ref=e608]:
        - generic [ref=e609]:
          - img "text" [ref=e610]
          - generic [ref=e611]:
            - heading "원형 시트 스티커 FAQ" [level=2] [ref=e612]
            - paragraph [ref=e613]:
              - text: 멤버십, 주문, 디자인 파일 업로드, 인쇄, 결제, 반품·환불에 대한 자세한 내용은 자주 묻는
              - link "질문(FAQ) 페이지에서 확인해 주세요" [ref=e614] [cursor=pointer]:
                - /url: https://www.musticker.com/faq
              - text: .
        - generic [ref=e615]:
          - generic [ref=e616]:
            - generic [ref=e617] [cursor=pointer]:
              - heading "원형 시트 스티커란 무엇인가요?" [level=3] [ref=e618]
              - paragraph [ref=e621]: 원형 시트 스티커는 여러 개의 원형 스티커를 한 장의 시트에 배치해 제작하는 스티커입니다. 각 스티커는 키스컷 방식으로 제작되어 시트는 그대로 유지되며, 스티커를 한 장씩 쉽게 떼어 사용할 수 있습니다.
            - button [ref=e622] [cursor=pointer]:
              - img [ref=e623]
          - generic [ref=e625]:
            - generic [ref=e626] [cursor=pointer]:
              - heading "원형 시트 스티커는 방수 및 내구성이 있나요?" [level=3] [ref=e627]
              - paragraph [ref=e628]: 네. 머스티커의 원형 시트 스티커는 방수 기능이 있는 PVC 소재로 제작됩니다. 둥근 형태로 가장자리가 깔끔하게 마감되어 다양한 용도로 편리하게 사용할 수 있습니다. 다만 날카로운 물체나 강한 마찰에는 긁힘이 생길 수 있으니 주의해 주세요.
            - button [ref=e629] [cursor=pointer]:
              - img [ref=e630]
          - generic [ref=e632]:
            - generic [ref=e633] [cursor=pointer]:
              - heading "한 장의 시트에 여러 가지 원형 디자인을 넣을 수 있나요?" [level=3] [ref=e634]
              - paragraph [ref=e635]: 아니요. 원형 시트 스티커는 하나의 디자인이 시트 전체에 반복 배치되어 제작됩니다. 모든 스티커가 동일한 크기와 간격으로 배치되어 깔끔하게 제작됩니다.
            - button [ref=e636] [cursor=pointer]:
              - img [ref=e637]
          - generic [ref=e639]:
            - generic [ref=e640] [cursor=pointer]:
              - heading "원형 스티커는 정확한 원형으로 제작되나요?" [level=3] [ref=e641]
              - paragraph [ref=e642]: 네. 모든 원형 스티커는 깔끔한 원형으로 제작됩니다. 디자인이 중앙에 맞게 배치되어 좌우 균형이 잘 잡힌 형태로 완성됩니다.
            - button [ref=e643] [cursor=pointer]:
              - img [ref=e644]
          - generic [ref=e646]:
            - generic [ref=e647] [cursor=pointer]:
              - heading "원형 시트 스티커는 어떤 소재를 선택할 수 있나요?" [level=3] [ref=e648]
              - paragraph [ref=e649]: 원형 시트 스티커는 PVC(백색), 투명, 홀로그램 소재로 제작할 수 있습니다. 선명한 색감을 원한다면 PVC(백색), 깔끔하고 자연스러운 느낌을 원한다면 투명, 반짝이는 효과를 원한다면 홀로그램을 추천합니다.
            - button [ref=e650] [cursor=pointer]:
              - img [ref=e651]
        - generic [ref=e653]:
          - generic [ref=e654]:
            - heading "궁금한 점이 더 있으신가요?" [level=4] [ref=e655]
            - paragraph [ref=e656]: 원하시는 답변을 찾지 못하셨다면 언제든지 문의해 주세요.
          - button "문의하기" [ref=e657] [cursor=pointer]:
            - generic [ref=e658]: 문의하기
    - navigation "네이버 톡톡으로 문의하기" [ref=e659]:
      - link "카카오채널로 문의하기" [ref=e660] [cursor=pointer]:
        - /url: https://pf.kakao.com/_nJxnTX/chat
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 카카오채널로 문의하기
        - img [ref=e662]
      - link "네이버 톡톡 으로 문의하기" [ref=e663] [cursor=pointer]:
        - /url: https://talk.naver.com/ct/w2luxqo
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 네이버 톡톡 으로 문의하기
        - img [ref=e665]
      - generic "이메일로 문의하기" [ref=e666] [cursor=pointer]:
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 이메일로 문의하기
        - img [ref=e668]
  - contentinfo [ref=e669]:
    - generic [ref=e670]:
      - generic [ref=e671]:
        - heading "MUSTICKER / 머스티커" [level=2] [ref=e672]
        - paragraph [ref=e673]: "상호명: (주)글로픽스"
        - paragraph [ref=e674]: "사업자등록번호 : 877-88-03313 통신판매업신고 : 2026-부산해운대-0792호"
        - paragraph [ref=e675]: "대표이사 : 여일석 주소 : 부산광역시 해운대구 해운대해변로 203 오션타워 1014호"
        - paragraph [ref=e676]: "호스팅사업자 : 아마존웹서비시즈(Amazon Web Services)"
        - paragraph [ref=e677]:
          - generic [ref=e678]: ⓒ 2026. All rights reserved.
          - generic [ref=e679]: "판매: sales@musticker.com"
          - link "이용약관" [ref=e680] [cursor=pointer]:
            - /url: /kr/terms-of-use
          - link "개인정보처리방침" [ref=e681] [cursor=pointer]:
            - /url: /kr/privacy-policy
          - generic [ref=e682] [cursor=pointer]: 사업자정보확인
          - link "회사소개" [ref=e683] [cursor=pointer]:
            - /url: /kr/about
      - generic [ref=e684]:
        - paragraph [ref=e685]: 1899-5529
        - paragraph [ref=e687]: 오전 9시 ~ 오후 6시(토요일, 공휴일 휴무)
        - generic [ref=e688]:
          - button "1:1문의하기" [ref=e689] [cursor=pointer]
          - link "자주 묻는 질문" [ref=e690] [cursor=pointer]:
            - /url: /kr/faq
        - generic [ref=e691]:
          - generic [ref=e692]: "Follow us at:"
          - generic [ref=e693]:
            - link "instagram icon" [ref=e694] [cursor=pointer]:
              - /url: https://www.instagram.com/musticker_official/
              - img "instagram icon"
            - link "youtube icon" [ref=e695] [cursor=pointer]:
              - /url: https://www.youtube.com/@MustickerOfficial
              - img "youtube icon"
```

# Test source

```ts
  160 |     );
  161 | 
  162 |     return this.optionsPanel.getByRole('button', { name: quantityLabel }).first();
  163 |   }
  164 | 
  165 |   async expectVisiblePrice(): Promise<void> {
  166 |     await expect(this.optionsPanel.getByText(wonAmountPattern).last()).toBeVisible();
  167 |   }
  168 | 
  169 |   async expectBulkDiscountVisible(): Promise<void> {
  170 |     await expect(this.optionsPanel.getByText(/^-\d+%$/).first()).toBeVisible();
  171 |   }
  172 | 
  173 |   async expectNoBulkDiscountVisible(): Promise<void> {
  174 |     await expect(this.optionsPanel.getByText(/^-\d+%$/)).toHaveCount(0);
  175 |   }
  176 | 
  177 |   async expectSizeGuideImagesLocalized(): Promise<void> {
  178 |     const images = this.page.locator('.mini-feature-image');
  179 |     const count = await images.count();
  180 |     expect(count, 'Expected size-guide illustration images to be present').toBeGreaterThan(0);
  181 | 
  182 |     for (let index = 0; index < count; index += 1) {
  183 |       const alt = (await images.nth(index).getAttribute('alt')) ?? '';
  184 |       expect(alt, `Size guide image ${index} alt text is a raw, untranslated i18n key: "${alt}"`).not.toMatch(
  185 |         /^product\.sizes\./
  186 |       );
  187 |       expect(
  188 |         alt,
  189 |         `Size guide image ${index} alt text looks like an unrelated sheet/paper size label: "${alt}"`
  190 |       ).not.toMatch(/^A\d+\s|^\d+\s*x\s*\d+$/i);
  191 |     }
  192 |   }
  193 | 
  194 |   async expectDesignUploadModal(): Promise<void> {
  195 |     const dialog = this.page.getByRole('dialog');
  196 |     await expect(dialog.getByTestId('product-category-upload-dropzone')).toContainText(
  197 |       '.eps, .ai, .psd, .pdf, .tif, .png'
  198 |     );
  199 |     await expect(dialog.getByTestId('product-category-upload-select-files-button')).toBeVisible();
  200 |   }
  201 | 
  202 |   async fillDesignOrderNote(note: string): Promise<void> {
  203 |     await this.page.getByTestId('product-category-upload-special-instructions').locator('textarea').fill(note);
  204 |   }
  205 | 
  206 |   async uploadDesignFile(filePath: string): Promise<void> {
  207 |     await this.page.getByRole('dialog').locator('input[type="file"]').setInputFiles(filePath);
  208 |   }
  209 | 
  210 |   async expectDesignFileAccepted(fileName: string): Promise<void> {
  211 |     await expect(this.page.getByRole('dialog').getByTestId('product-category-upload-dropzone')).toContainText(
  212 |       fileName
  213 |     );
  214 |   }
  215 | 
  216 |   // --- individual-sticker sheet size rules (see sheet-sticker-size-rules.spec.ts) ---
  217 | 
  218 |   // `1시트 = 스티커 N개`. Polled rather than read once: both count readouts repaint asynchronously
  219 |   // when the pricing round-trip lands, so an immediate read catches the previous size's numbers or
  220 |   // an empty node mid-render. Asserts the rendered readout rather than recomputing the packing --
  221 |   // the point is that what the shopper is shown matches what the pricing engine actually packs.
  222 |   async expectStickersPerSheet(expected: number): Promise<void> {
  223 |     await expect
  224 |       .poll(() => this.readCount(/1시트 = 스티커 ([\d,]+)개/), {
  225 |         timeout: 15_000,
  226 |         message: `Expected the sheet to report ${expected} stickers per sheet`
  227 |       })
  228 |       .toBe(expected);
  229 |   }
  230 | 
  231 |   // `총 스티커 수량 : N개`
  232 |   async expectTotalStickers(expected: number): Promise<void> {
  233 |     await expect
  234 |       .poll(() => this.readCount(/총 스티커 수량\s*:\s*([\d,]+)개/), {
  235 |         timeout: 15_000,
  236 |         message: `Expected a total of ${expected} stickers`
  237 |       })
  238 |       .toBe(expected);
  239 |   }
  240 | 
  241 |   async expectSizePresets(presets: ReadonlyArray<{ label: string; dimensions: string }>): Promise<void> {
  242 |     const grid = this.sizeGrid();
  243 |     await expect(grid).toBeVisible();
  244 | 
  245 |     for (const [index, preset] of presets.entries()) {
  246 |       const pill = grid.locator('.option-pill').nth(index);
  247 |       await expect(pill.locator('.size-pill-name'), `size preset ${index} label`).toHaveText(preset.label);
  248 |       await expect(pill.locator('.size-pill-dim'), `size preset ${index} dimensions`).toHaveText(preset.dimensions);
  249 |     }
  250 | 
  251 |     // The custom-size pill trails the presets, so the count is presets + 1.
  252 |     await expect(grid.locator('.option-pill')).toHaveCount(presets.length + 1);
  253 |   }
  254 | 
  255 |   async selectSizePreset(label: string): Promise<void> {
  256 |     await this.sizeGrid().locator('.option-pill').filter({ hasText: label }).first().click();
  257 |   }
  258 | 
  259 |   async expectMinimumTwoPerSheetError(): Promise<void> {
> 260 |     await expect(this.optionsPanel.getByText(ko.minimumTwoPerSheetError)).toBeVisible();
      |                                                                           ^ Error: expect(locator).toBeVisible() failed
  261 |   }
  262 | 
  263 |   async expectNoMinimumTwoPerSheetError(): Promise<void> {
  264 |     await expect(this.optionsPanel.getByText(ko.minimumTwoPerSheetError)).toHaveCount(0);
  265 |   }
  266 | 
  267 |   // A rejected size shows only the minimum-two-per-sheet message -- an oversized entry does not get
  268 |   // a separate "가로 138mm × 세로 200mm 이내로 작업해 주세요." line. Confirmed intended on
  269 |   // development-1 (2026-08-26), so this asserts the absence rather than treating it as a gap.
  270 |   async expectNoMaxWorkAreaMessage(): Promise<void> {
  271 |     await expect(this.optionsPanel.getByText(/가로 \d+mm × 세로 \d+mm 이내로 작업해 주세요\./)).toHaveCount(0);
  272 |   }
  273 | 
  274 |   // Every sheet-quantity tier zeroes out while the chosen size is rejected, not just the selected
  275 |   // one, so a shopper cannot switch tiers to find a priced combination.
  276 |   async expectAllQuantityTiersZeroPriced(): Promise<void> {
  277 |     const prices = this.quantityGrid().locator('.qty-pill-price');
  278 |     const count = await prices.count();
  279 |     expect(count, 'Expected sheet-quantity tiers to be present').toBeGreaterThan(0);
  280 | 
  281 |     for (let index = 0; index < count; index += 1) {
  282 |       await expect(prices.nth(index), `quantity tier ${index} price`).toHaveText('0원');
  283 |     }
  284 |   }
  285 | 
  286 |   async expectNextStepDisabled(): Promise<void> {
  287 |     await expect(this.nextStepButton()).toBeDisabled();
  288 |   }
  289 | 
  290 |   async openSizeGuide(): Promise<Locator> {
  291 |     await this.optionsPanel.getByText(ko.sizeGuideOpen).first().click();
  292 |     const dialog = this.page.getByRole('dialog').first();
  293 |     await expect(dialog).toBeVisible();
  294 | 
  295 |     return dialog;
  296 |   }
  297 | 
  298 |   // The size-guide modal's inputs are `#sheet-width`/`#sheet-height` and carry no `type` attribute,
  299 |   // so an `input[type=...]` selector finds nothing here.
  300 |   async enterSizeGuideCustomSize(dialog: Locator, widthMm: number, heightMm: number): Promise<void> {
  301 |     await dialog.getByText(ko.sizeGuideCustomSize).first().click({ force: true });
  302 | 
  303 |     const width = dialog.locator('#sheet-width');
  304 |     await expect(width).toBeVisible();
  305 |     await width.fill(String(widthMm));
  306 | 
  307 |     const height = dialog.locator('#sheet-height');
  308 |     await height.fill(String(heightMm));
  309 |     await height.blur();
  310 |   }
  311 | 
  312 |   async expectNextStepEnabled(): Promise<void> {
  313 |     await expect(this.nextStepButton()).toBeEnabled();
  314 |   }
  315 | 
  316 |   async clickNextStepAndExpectProgression(): Promise<void> {
  317 |     await this.nextStepButton().click();
  318 |     await expect(
  319 |       this.page
  320 |         .getByRole('dialog')
  321 |         .or(this.page.getByText(/\uc5c5\ub85c\ub4dc|\ub514\uc790\uc778|\uc7a5\ubc14\uad6c\ub2c8|Upload|Cart/i))
  322 |         .first()
  323 |     ).toBeVisible();
  324 |   }
  325 | 
  326 |   async expectProductionPromises(): Promise<void> {
  327 |     await expect(this.page.locator('body')).toContainText('5\ub9cc\uc6d0 \uc774\uc0c1 \ubb34\ub8cc\ubc30\uc1a1');
  328 |     await expect(this.page.locator('body')).toContainText('3\uc2dc \uc774\uc804 \uc2dc\uc548 \ud655\uc815 \uc2dc \ub2f9\uc77c\ubc30\uc1a1');
  329 |     await expect(this.page.locator('body')).toContainText(/\ub3c4\ucc29 \uc608\uc815\uc77c|CJ \ub300\ud55c\ud1b5\uc6b4/);
  330 |     await expect(this.page.locator('body')).toContainText('\uc624\ub298\uc81c\uc791, \ub0b4\uc77c\ubc1c\uc1a1');
  331 |     await expect(this.page.locator('body')).toContainText('\ube60\ub978 \uc2dc\uc548 \ud53c\ub4dc\ubc31');
  332 |     await expect(this.page.locator('body')).toContainText('\ub6f0\uc5b4\ub09c \ub0b4\uad6c\uc131\uacfc \ub0b4\uc218\uc131');
  333 |   }
  334 | 
  335 |   async expectReviewCarouselUsable(): Promise<void> {
  336 |     const body = this.page.locator('body');
  337 |     await expect(body).toContainText(ko.reviews225);
  338 | 
  339 |     const nextButton = this.page.getByRole('button', { name: /\ub2e4\uc74c \ub9ac\ubdf0/ }).first();
  340 |     const previousButton = this.page.getByRole('button', { name: /\uc774\uc804 \ub9ac\ubdf0/ }).first();
  341 | 
  342 |     await expect(nextButton).toBeVisible();
  343 |     await nextButton.click();
  344 |     await expect(previousButton).toBeVisible();
  345 |     await previousButton.click();
  346 |     await expect(body).toContainText(ko.reviews225);
  347 |   }
  348 | 
  349 |   async expectCustomControlsOpen(): Promise<void> {
  350 |     const customSizeButton = this.optionsPanel.getByRole('button', { name: ko.customSize }).first();
  351 |     await expect(customSizeButton).toBeVisible();
  352 |     await customSizeButton.click();
  353 |     await expect(this.page.getByRole('dialog').or(this.optionsPanel.getByRole('spinbutton')).first()).toBeVisible();
  354 |     await this.closeTransientDialog();
  355 | 
  356 |     const customQuantityButton = this.optionsPanel.getByRole('button', { name: ko.customQuantity }).first();
  357 |     await expect(customQuantityButton).toBeVisible();
  358 |     await customQuantityButton.click();
  359 |     await expect(this.page.getByRole('dialog').or(this.optionsPanel.getByRole('spinbutton')).first()).toBeVisible();
  360 |     await this.closeTransientDialog();
```