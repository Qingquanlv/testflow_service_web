import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Testflow Tool'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
