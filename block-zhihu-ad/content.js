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
    let adList = Array.from(document.querySelectorAll('[data-za-module="AdItem"]'))

    // adList = [].concat(adList, )

    if (adList && adList.length) {
      console.log(`clean ad: ${adList.length}`);
      adList.forEach(tag => {
        let adCard = tag.parentNode.parentNode
        adCard.parentNode.removeChild(adCard)
      })
    }

    let adBannerList = Array.from(document.querySelectorAll('[data-za-module="ExternalAdItem"]'))

    adBannerList = [].concat(adBannerList, Array.from(document.querySelectorAll('[data-za-detail-view-path-is_ad="true"][data-za-detail-view-path-module="ExternalAdItem"]')), Array.from(document.querySelectorAll('[data-za-detail-view-path-is_ad="true"][data-za-detail-view-path-module="FeedItem"]')))

    if (adBannerList && adBannerList.length) {
      console.log(`clean banner ad: ${adBannerList.length}`);
      adBannerList.forEach(tag => {
        let adCard = tag
        adCard.parentNode.removeChild(adCard)
      })
    }
  }
})
