window.addEventListener('load', function () {
  cleanAd()

  let lastInfo = null

  let $main = document.querySelector('.TopstoryMain')

  /**
   * webkit doesn't support DOMAttrModified
   * {@link https://bugs.webkit.org/show_bug.cgi?id=8191}
   * {@link http://about.silk.co/page/Mutation%20Events:%20What%20Happen}
   */
  $main.addEventListener('DOMSubtreeModified', function () {
    let info = $main.dataset.zaModuleInfo

    if (info === lastInfo) {
      // other attribute
      // break
      return
    }

    lastInfo = info

    cleanAd()
  })

  function cleanAd () {
    // check feed ad
    let adList = document.querySelectorAll('[data-za-module="AdItem"]')

    if (adList && adList.length) {
      console.log(`clean ad: ${adList.length}`);
      adList.forEach(tag => {
        let adCard = tag.parentNode.parentNode
        adCard.parentNode.removeChild(adCard)
      })
    }

    let adBannerList = document.querySelectorAll('[data-za-module="ExternalAdItem"]')

    if (adBannerList && adBannerList.length) {
      console.log(`clean banner ad: ${adBannerList.length}`);
      adBannerList.forEach(tag => {
        let adCard = tag
        adCard.parentNode.removeChild(adCard)
      })
    }
  }
})
