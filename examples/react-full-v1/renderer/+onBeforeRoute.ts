// LA_TEMP
// https://vike.dev/onBeforeRoute
export { onBeforeRoute }

import type { OnBeforeRouteAsync } from 'vike/types'

const onBeforeRoute: OnBeforeRouteAsync = async (pageContext): ReturnType<OnBeforeRouteAsync> => {
  // LA_TEMP:
  let urlWithoutLocale = pageContext.urlOriginal
  let locale = 'en'
  if (urlWithoutLocale.startsWith('/fr')) {
    urlWithoutLocale = urlWithoutLocale.slice(3)
    locale = 'fr'
  }

  return {
    pageContext: {
      // We make `locale` available as `pageContext.locale`. We can then use https://vike.dev/pageContext-anywhere to access pageContext.locale in any React/Vue component.
      locale,
      // We overwrite the original URL
      urlOriginal: urlWithoutLocale
    }
  }
}
