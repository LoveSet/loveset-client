- sketch how many pages and components i need. [done]
- design them in v0. [done]
- generate the "get 10 more swipes -> invite friend" modal from the "platle v2" document [done]
- change options font [done]
- remove box shadow [done]
- fix: space below modal title [done]

- adjust ui [done]
- adjust coding [done]

- pages [done]

  - discover [done]
  - details [done]
  - watchlist [done]
  - premium [done]
  - settings [done]
  - mobile [done]

- modals [done]

  - invite friend [done]
  - out of swipes [done]
  - terms of service [done]
  - privacy policy [done]

- emails [done]

  - referral award [done]
  - subscription expired [done]
  - welcome [done]

- fonts: ui-serif, Inter (text), Biotif\*, Neuzeit Grotesk Bold

- bugs [done]

  - https://v0.dev/chat/swiping-animation-code-WJNbidJ7KMk [done]
  - https://www.hover.dev/components/cards + https://www.youtube.com/watch?app=desktop&v=bzJHOoiu1Bs [done]
  - swiping animation, animate with button clicks [done]
  - the item being swiped away should fade away to make it more graceful [done]
  - like batch should be more visible [done]
  - what to do about the buttons [done]
  - animation should also work when you like and dislike [done]

- move getContent to `useDiscoveryContext` [done]

- get youtube trailer -> react-modal-video [done]
- loader for discovery [done]
- loader for content images [done]
- loader for watch trailer [done]
- like, dislike [done]
- more getContent [done]
- detail page -> back button [done]
- streaming availability -> login + subscribe [done]

- frontend [sunday][done]
- ui adjustments [monday][done]
- backend [tuesday,wednesday,thursday][done]
- coupling [friday,saturday][]
  - totalSwipes in user.model.js, add with like + pass [done]
  - referredSomeone : true/false in user.model.js [done]
  - adjust coding [done]
  - all emitting\* []
  - getCache + getContent --> Context []
  - if nothing from `getCache` to show, use `getContent` ==> handle this in coupling []
  - show error toast notification from all rate limit errors []
  - test everything billing + `subscription cron job` + `subscription expired email` in coupling []
  - test `all emails` in coupling []
  - App.js -> getUser []
  - google analytics []
  - enable emails []
- terms + hosting + paddle [sunday][]
- launch after paddle verification []

package to install: react-query
