import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const notDraftBlogs = allBlogs.filter((post) => !post.draft)
  const blogRoutes = notDraftBlogs.map((post) => ({
    url: `${siteUrl}/${post.path}`,
    lastModified: post.lastmod || post.date,
  }))

  const routes = [...headerNavLinks.map((link) => link.route)].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
