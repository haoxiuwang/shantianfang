export const routeMap = {
  '/book': () => import('../src/pages/book.jsx'),
  '/chapter': () => import('../src/pages/chapter.jsx'),
  '/': () => import('../src/pages/Home.jsx'),
}
