// https://vike.dev/onRenderHtml
export { onRenderHtml }

import React from 'react'
import { renderToString } from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'
import { PageLayout } from './PageLayout'

async function onRenderHtml(pageContext) {
  const { Page } = pageContext
  const viewHtml = dangerouslySkipEscape(
    renderToString(
      <PageLayout>
        <Page />
      </PageLayout>
    )
  )

  // LA_TEMP
  const html = `<!DOCTYPE html>
  <html>
    <body>
      <div id="page-view">%HTML%</div>
    </body>
  </html>`
  const templateStrings = html.split('%HTML%')
  return escapeInject(templateStrings, viewHtml)
}
