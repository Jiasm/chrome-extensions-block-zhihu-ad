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
    let info = $main.dataset.zaExtraModule

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

    adList = [].concat(adList, Array.from(document.querySelectorAll('[data-za-detail-view-path-is_ad="true"][data-za-detail-view-path-module="FeedItem"]')))

    if (adList && adList.length) {
      adList.forEach(tag => {
        let adCard = tag.parentNode
        adCard.parentNode.removeChild(adCard)
        // adCard.style.border = '1px solid red'
      })
    }

    let adBannerList = Array.from(document.querySelectorAll('[data-za-module="ExternalAdItem"]'))

    adBannerList = [].concat(adBannerList, Array.from(document.querySelectorAll('[data-za-detail-view-path-is_ad="true"][data-za-detail-view-path-module="ExternalAdItem"]')))

    if (adBannerList && adBannerList.length) {
      console.log(`clean banner ad: ${adBannerList.length}`);
      adBannerList.forEach(tag => {
        let adCard = tag
        // adCard.style.border = '1px solid red'
        adCard.parentNode.removeChild(adCard)
      })
    }
  }
})
