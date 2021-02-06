// in gastby-browser.js
exports.shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  window.scrollTo(0, 0)

  return false
}