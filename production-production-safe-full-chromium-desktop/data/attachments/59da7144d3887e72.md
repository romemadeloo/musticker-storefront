# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: edgecases/storefront-edgecases.spec.ts >> production-safe storefront edge cases >> search handles very long queries without server errors
- Location: tests/e2e/edgecases/storefront-edgecases.spec.ts:190:3

# Error details

```
Error: Unexpected browser console errors or warnings

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "[error] Critical Server Error. Please contact support.",
+   "[error] Critical Server Error. Please contact support.",
+ ]
```

```
Error: Unexpected failed HTTP responses

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "500 https://api.musticker.com/index.php/sys/kr/search?query=musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-&page=1&per_page=10",
+   "500 https://api.musticker.com/index.php/sys/kr/search?query=musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-&page=1&per_page=10",
+ ]
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
    - dialog "상품 검색" [ref=e31]:
      - generic [ref=e33]:
        - button "layout.header.search" [ref=e34] [cursor=pointer]:
          - img [ref=e35]
        - searchbox "스티커를 검색해보세요" [active] [ref=e37]: musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-musticker-edgecase-
      - generic [ref=e39]:
        - img "검색 결과가 없습니다" [ref=e41]
        - generic [ref=e42]:
          - heading "검색 결과가 없습니다" [level=4] [ref=e43]
          - paragraph [ref=e44]:
            - text: 다른 검색어를 입력하거나
            - button "\"자유형 스티커\"" [ref=e45] [cursor=pointer]:
              - generic [ref=e46]: "\"자유형 스티커\""
            - text: 와 같은 인기 제품을 둘러보세요.
      - contentinfo [ref=e47]:
        - generic [ref=e48]:
          - generic [ref=e49]:
            - img [ref=e51]
            - img [ref=e54]
            - generic [ref=e56]: 이동
          - generic [ref=e57]:
            - img [ref=e59]
            - generic [ref=e61]: 선택
        - generic [ref=e62]:
          - generic [ref=e63]: esc
          - button "닫기" [ref=e64] [cursor=pointer]:
            - generic [ref=e65]: 닫기
  - main [ref=e66]:
    - main [ref=e67]:
      - generic [ref=e69]:
        - generic:
          - img "스티커ㅋㅋㅋ,"
        - generic [ref=e70]:
          - generic [ref=e71]:
            - heading "스티커ㅋㅋㅋ, 이유가 있구나" [level=1] [ref=e72]:
              - text: 스티커ㅋㅋㅋ,
              - generic [ref=e73]: 이유가 있구나
            - paragraph [ref=e74]: 빠른데, 퀄리티까지 미쳤다
          - button "빠른 주문" [ref=e75] [cursor=pointer]:
            - generic [ref=e76]: 빠른 주문
      - generic [ref=e77]:
        - generic [ref=e79]:
          - link "스티커" [ref=e80] [cursor=pointer]:
            - /url: /kr/stickers/die-cut-sticker
            - img [ref=e82]
            - paragraph [ref=e83]: 스티커
          - link "롤스티커" [ref=e84] [cursor=pointer]:
            - /url: /kr/roll-stickers/die-cut-roll
            - img [ref=e86]
            - paragraph [ref=e87]: 롤스티커
          - link "판스티커" [ref=e88] [cursor=pointer]:
            - /url: /kr/stickers/sticker-sheet
            - img [ref=e90]
            - paragraph [ref=e91]: 판스티커
          - link "홀로그램" [ref=e92] [cursor=pointer]:
            - /url: /kr/stickers/hologram-sticker
            - img [ref=e94]
            - paragraph [ref=e95]: 홀로그램
          - link "레터링" [ref=e96] [cursor=pointer]:
            - /url: /kr/stickers/vinyl-lettering
            - img [ref=e98]
            - paragraph [ref=e99]: 레터링
        - generic [ref=e101]:
          - generic [ref=e102]:
            - button "음소거 해제" [ref=e104] [cursor=pointer]:
              - img [ref=e105]
            - button "전체화면" [ref=e107] [cursor=pointer]:
              - img [ref=e108]
          - generic [ref=e110]:
            - heading "급해서 맡겼는데, 퀄리티 때문에 기억나는 스티커" [level=2] [ref=e111]:
              - text: 급해서 맡겼는데,
              - text: 퀄리티 때문에 기억나는 스티커
            - paragraph [ref=e112]: 파일만 첨부하면 시안이 전달되고, 승인 즉시 제작이 시작됩니다. 급한 작업이어도 색감·라인·마감까지 정교해 “여기 또 써야겠다”는 말이 나올 거예요. 우리는 빨리 만드는 게 아니라, 빠르게 ‘잘’ 만드는 것을 목표로 합니다.
        - region "고객 리뷰 캐러셀" [ref=e113]:
          - generic [ref=e114]:
            - generic [ref=e115]:
              - heading "사진 후기 225개, 만족도는 이미 증명됐어요" [level=2] [ref=e116]:
                - text: 사진 후기 225개,
                - text: 만족도는 이미 증명됐어요
              - generic [ref=e117]:
                - button "이전 리뷰로 이동" [ref=e118] [cursor=pointer]:
                  - img [ref=e119]
                  - generic [ref=e121]: 이전 리뷰로 이동
                - button "다음 리뷰로 이동" [ref=e122] [cursor=pointer]:
                  - img [ref=e123]
                  - generic [ref=e125]: 다음 리뷰로 이동
            - region "고객 리뷰 캐러셀" [ref=e126]:
              - generic [ref=e127]:
                - group "Review 1 of 16" [ref=e128]:
                  - img "tkop****" [ref=e129]
                  - generic [ref=e130]:
                    - generic [ref=e131]:
                      - heading "tkop****" [level=3] [ref=e133]
                      - paragraph [ref=e134]: 빨리오고 너무 이쁘게 만들어주셔서 감사합니다 그리고 서비스도 20장 더 주셔서 감사합니다
                    - generic [ref=e135]:
                      - img [ref=e136]
                      - img [ref=e138]
                      - img [ref=e140]
                      - img [ref=e142]
                      - img [ref=e144]
                      - generic [ref=e146]: 2026-03-25
                - group "Review 2 of 16" [ref=e147]:
                  - img "oozz******" [ref=e148]
                  - generic [ref=e149]:
                    - generic [ref=e150]:
                      - heading "oozz******" [level=3] [ref=e152]
                      - paragraph [ref=e153]: 잘나와서 만족합니다 잘쓰겠습니다
                    - generic [ref=e154]:
                      - img [ref=e155]
                      - img [ref=e157]
                      - img [ref=e159]
                      - img [ref=e161]
                      - img [ref=e163]
                      - generic [ref=e165]: 2026-03-22
                - group "Review 3 of 16" [ref=e166]:
                  - img "aktm********" [ref=e167]
                  - generic [ref=e168]:
                    - generic [ref=e169]:
                      - generic [ref=e170]:
                        - heading "aktm********" [level=3] [ref=e171]
                        - generic [ref=e172]: 한달사용
                      - paragraph [ref=e173]: 만족하면서 사용중입니다
                    - generic [ref=e174]:
                      - img [ref=e175]
                      - img [ref=e177]
                      - img [ref=e179]
                      - img [ref=e181]
                      - img [ref=e183]
                      - generic [ref=e185]: 2026-03-04
                - group "Review 4 of 16" [ref=e186]:
                  - img "aktm********" [ref=e187]
                  - generic [ref=e188]:
                    - generic [ref=e189]:
                      - heading "aktm********" [level=3] [ref=e191]
                      - paragraph [ref=e192]: 잘 받았어요 잘쓸게요.
                    - generic [ref=e193]:
                      - img [ref=e194]
                      - img [ref=e196]
                      - img [ref=e198]
                      - img [ref=e200]
                      - img [ref=e202]
                      - generic [ref=e204]: 2026-01-31
                - group "Review 5 of 16" [ref=e205]:
                  - img "aktm********" [ref=e206]
                  - generic [ref=e207]:
                    - generic [ref=e208]:
                      - generic [ref=e209]:
                        - heading "aktm********" [level=3] [ref=e210]
                        - generic [ref=e211]: 한달사용
                      - paragraph [ref=e212]: 아주 잘쓰고있습니다.
                    - generic [ref=e213]:
                      - img [ref=e214]
                      - img [ref=e216]
                      - img [ref=e218]
                      - img [ref=e220]
                      - img [ref=e222]
                      - generic [ref=e224]: 2026-01-06
                - group "Review 6 of 16" [ref=e225]:
                  - img "aktm********" [ref=e226]
                  - generic [ref=e227]:
                    - generic [ref=e228]:
                      - generic [ref=e229]:
                        - heading "aktm********" [level=3] [ref=e230]
                        - generic [ref=e231]: 한달사용
                      - paragraph [ref=e232]: 아주 잘쓰고있습니다.
                    - generic [ref=e233]:
                      - img [ref=e234]
                      - img [ref=e236]
                      - img [ref=e238]
                      - img [ref=e240]
                      - img [ref=e242]
                      - generic [ref=e244]: 2026-01-06
                - group "Review 7 of 16" [ref=e245]:
                  - img "jiwn****" [ref=e246]
                  - generic [ref=e247]:
                    - generic [ref=e248]:
                      - heading "jiwn****" [level=3] [ref=e250]
                      - paragraph [ref=e251]: 아 정말 너무 좋아연ㅎㅎ
                    - generic [ref=e252]:
                      - img [ref=e253]
                      - img [ref=e255]
                      - img [ref=e257]
                      - img [ref=e259]
                      - img [ref=e261]
                      - generic [ref=e263]: 2025-12-29
                - group "Review 8 of 16" [ref=e264]:
                  - img "koj3***" [ref=e265]
                  - generic [ref=e266]:
                    - generic [ref=e267]:
                      - heading "koj3***" [level=3] [ref=e269]
                      - paragraph [ref=e270]: 방수도 잘되고 오염에도 잘 버티고 좋아요. 적극 추천합니다.^^
                    - generic [ref=e271]:
                      - img [ref=e272]
                      - img [ref=e274]
                      - img [ref=e276]
                      - img [ref=e278]
                      - img [ref=e280]
                      - generic [ref=e282]: 2025-12-24
                - group "Review 9 of 16" [ref=e283]:
                  - img "aktm********" [ref=e284]
                  - generic [ref=e285]:
                    - generic [ref=e286]:
                      - heading "aktm********" [level=3] [ref=e288]
                      - paragraph [ref=e289]: 이쁘네요 잘쓸게요.!!
                    - generic [ref=e290]:
                      - img [ref=e291]
                      - img [ref=e293]
                      - img [ref=e295]
                      - img [ref=e297]
                      - img [ref=e299]
                      - generic [ref=e301]: 2025-12-03
                - group "Review 10 of 16" [ref=e302]:
                  - img "aktm********" [ref=e303]
                  - generic [ref=e304]:
                    - generic [ref=e305]:
                      - heading "aktm********" [level=3] [ref=e307]
                      - paragraph [ref=e308]: 이쁘게 잘뽑혔네요.
                    - generic [ref=e309]:
                      - img [ref=e310]
                      - img [ref=e312]
                      - img [ref=e314]
                      - img [ref=e316]
                      - img [ref=e318]
                      - generic [ref=e320]: 2025-11-30
                - group "Review 11 of 16" [ref=e321]:
                  - img "circ*****" [ref=e322]
                  - generic [ref=e323]:
                    - generic [ref=e324]:
                      - heading "circ*****" [level=3] [ref=e326]
                      - paragraph [ref=e327]: 품질도 좋고 응대도 잘해주셔서 이쁘게 나왔네요
                    - generic [ref=e328]:
                      - img [ref=e329]
                      - img [ref=e331]
                      - img [ref=e333]
                      - img [ref=e335]
                      - img [ref=e337]
                      - generic [ref=e339]: 2025-11-20
                - group "Review 12 of 16" [ref=e340]:
                  - img "pina******" [ref=e341]
                  - generic [ref=e342]:
                    - generic [ref=e343]:
                      - generic [ref=e344]:
                        - heading "pina******" [level=3] [ref=e345]
                        - generic [ref=e346]: 한달사용
                      - paragraph [ref=e347]: 부착 잘되고 제거할때 끈적임 없이 깔끔하게 떨어져서 좋아요
                    - generic [ref=e348]:
                      - img [ref=e349]
                      - img [ref=e351]
                      - img [ref=e353]
                      - img [ref=e355]
                      - img [ref=e357]
                      - generic [ref=e359]: 2025-08-22
                - group "Review 13 of 16" [ref=e360]:
                  - img "qcyc*****" [ref=e361]
                  - generic [ref=e362]:
                    - generic [ref=e363]:
                      - generic [ref=e364]:
                        - heading "qcyc*****" [level=3] [ref=e365]
                        - generic [ref=e366]: 한달사용
                      - paragraph [ref=e367]: 덕분에 넘넘 잘썼습니다
                    - generic [ref=e368]:
                      - img [ref=e369]
                      - img [ref=e371]
                      - img [ref=e373]
                      - img [ref=e375]
                      - img [ref=e377]
                      - generic [ref=e379]: 2025-08-15
                - group "Review 14 of 16" [ref=e380]:
                  - img "rlad*******" [ref=e381]
                  - generic [ref=e382]:
                    - generic [ref=e383]:
                      - heading "rlad*******" [level=3] [ref=e385]
                      - paragraph [ref=e386]: 꼼꼼하게 체크해주셔서 너무좋았습니다!
                    - generic [ref=e387]:
                      - img [ref=e388]
                      - img [ref=e390]
                      - img [ref=e392]
                      - img [ref=e394]
                      - img [ref=e396]
                      - generic [ref=e398]: 2025-07-17
                - group "Review 15 of 16" [ref=e399]:
                  - img "csbn*****" [ref=e400]
                  - generic [ref=e401]:
                    - generic [ref=e402]:
                      - heading "csbn*****" [level=3] [ref=e404]
                      - paragraph [ref=e405]: 배송도 빠르고 재질도 좋고 너무 좋아요 감사합니다!
                    - generic [ref=e406]:
                      - img [ref=e407]
                      - img [ref=e409]
                      - img [ref=e411]
                      - img [ref=e413]
                      - img [ref=e415]
                      - generic [ref=e417]: 2025-07-14
                - group "Review 16 of 16" [ref=e418]:
                  - img "pina******" [ref=e419]
                  - generic [ref=e420]:
                    - generic [ref=e421]:
                      - heading "pina******" [level=3] [ref=e423]
                      - paragraph [ref=e424]: 생각한대로 너무 깔끔하게 나왔어요! 다음에도 주문하겠습니다!!
                    - generic [ref=e425]:
                      - img [ref=e426]
                      - img [ref=e428]
                      - img [ref=e430]
                      - img [ref=e432]
                      - img [ref=e434]
                      - generic [ref=e436]: 2025-07-09
        - generic [ref=e438]:
          - article [ref=e439]:
            - img "100% 품질 보장" [ref=e441]
            - generic [ref=e442]:
              - heading "100% 품질 보장" [level=3] [ref=e443]
              - paragraph [ref=e444]: 문제가 생기면 변명하지 않습니다 재인쇄 또는 환불까지 끝까지 책임집니다
          - article [ref=e445]:
            - img "오늘 제작 · 내일 발송" [ref=e447]
            - generic [ref=e448]:
              - heading "오늘 제작 · 내일 발송" [level=3] [ref=e449]
              - paragraph [ref=e450]: 디자인 승인 후 바로 제작이 시작되며, 승인이 빠를수록 다음 날 바로 출고됩니다
          - article [ref=e451]:
            - img "5만원 이상 무료배송" [ref=e453]
            - generic [ref=e454]:
              - heading "5만원 이상 무료배송" [level=3] [ref=e455]
              - paragraph [ref=e456]: 기본 배송비는 3,000원이며, 5만원 이상 주문 시 무료배송입니다
        - generic [ref=e459]:
          - heading "처음 주문해도 걱정할 필요 없어요" [level=2] [ref=e460]:
            - text: 처음 주문해도
            - text: 걱정할 필요 없어요
          - generic [ref=e461]:
            - button "바로 주문하기" [ref=e462] [cursor=pointer]:
              - generic [ref=e463]: 바로 주문하기
            - button "제작 문의하기" [ref=e464] [cursor=pointer]:
              - generic [ref=e465]: 제작 문의하기
    - navigation "네이버 톡톡으로 문의하기" [ref=e466]:
      - link "카카오채널로 문의하기" [ref=e467] [cursor=pointer]:
        - /url: https://pf.kakao.com/_nJxnTX/chat
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 카카오채널로 문의하기
        - img [ref=e469]
      - link "네이버 톡톡 으로 문의하기" [ref=e470] [cursor=pointer]:
        - /url: https://talk.naver.com/ct/w2luxqo
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 네이버 톡톡 으로 문의하기
        - img [ref=e472]
      - generic "이메일로 문의하기" [ref=e473] [cursor=pointer]:
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 이메일로 문의하기
        - img [ref=e475]
  - contentinfo [ref=e476]:
    - generic [ref=e477]:
      - generic [ref=e478]:
        - heading "MUSTICKER / 머스티커" [level=2] [ref=e479]
        - paragraph [ref=e480]: "상호명: (주)글로픽스"
        - paragraph [ref=e481]: "사업자등록번호 : 877-88-03313 통신판매업신고 : 2026-부산해운대-0792호"
        - paragraph [ref=e482]: "대표이사 : 여일석 주소 : 부산광역시 해운대구 해운대해변로 203 오션타워 1014호"
        - paragraph [ref=e483]:
          - generic [ref=e484]: ⓒ 2026. All rights reserved.
          - generic [ref=e485]: "판매: sales@musticker.com"
          - link "이용약관" [ref=e486] [cursor=pointer]:
            - /url: /kr/terms-of-use
          - link "개인정보처리방침" [ref=e487] [cursor=pointer]:
            - /url: /kr/privacy-policy
          - generic [ref=e488] [cursor=pointer]: 사업자정보확인
      - generic [ref=e489]:
        - paragraph [ref=e490]: 1899-5529
        - paragraph [ref=e492]: 오전 9시 ~ 오후 6시(토요일, 공휴일 휴무)
        - generic [ref=e493]:
          - button "1:1문의하기" [ref=e494] [cursor=pointer]
          - link "자주 묻는 질문" [ref=e495] [cursor=pointer]:
            - /url: /kr/faq
```

# Test source

```ts
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
  236 |     expect.soft(consoleFailures, 'Unexpected browser console errors or warnings').toEqual([]);
> 237 |     expect.soft(responseFailures, 'Unexpected failed HTTP responses').toEqual([]);
      |                                                                       ^ Error: Unexpected failed HTTP responses
  238 |   }
  239 | });
  240 | 
  241 | export { expect };
  242 | 
```