// LA_TEMP
// https://vike.dev/onPrerenderStart
export { onPrerenderStart }

import type { OnPrerenderStartAsync, PageContextServer } from 'vike/types'

// We only need this for pre-rendered apps https://vike.dev/pre-rendering
const onPrerenderStart: OnPrerenderStartAsync = async (prerenderContext): ReturnType<OnPrerenderStartAsync> => {
  const pageContexts: PageContextServer[] = []
  prerenderContext.pageContexts.forEach((pageContext) => {
    // Duplicate pageContext for each locale
    const LA_TEMP_locales = ['fr']
    LA_TEMP_locales.forEach((locale) => {
      // Localize URL
      let { urlOriginal } = pageContext
      if (urlOriginal === '/markdown') {
        urlOriginal = `/${locale}${pageContext.urlOriginal}`
        console.log('LA_TEMP: urlOriginal', urlOriginal)
        pageContexts.push({
          ...pageContext,
          urlOriginal,
          // Set pageContext.locale
          locale
        })
      }
    })
  })
  return {
    prerenderContext: {
      pageContexts
    }
  }
}

declare global {
  namespace Vike {
    interface PageContext {
      locale: string
    }
  }
}
