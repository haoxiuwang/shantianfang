export const routeMap = {
  '/about': () => import('.src//pages/About.jsx'),
  '/blog': () => import('.src//pages/Blog.jsx'),
  '/blogs': () => import('.src//pages/Blogs.jsx'),
  '/': () => import('.src//pages/Home.jsx'),
}
