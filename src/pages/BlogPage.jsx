// src/pages/BlogPage.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { 
  Calendar, User, Clock, ArrowRight, 
  BookOpen, MessageCircle,
  Eye, TrendingUp
} from 'lucide-react'

// Import des images locales
import track1 from '/images/track.jfif'
import track2 from '/images/track2.jfif'
import track3 from '/images/track3.jfif'

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const posts = [
    {
      id: 1,
      category: 'Knowledge Base',
      title: 'Everything You Need to Know About Marine Insurance',
      image: track1,
      excerpt: 'The purpose of this article is to provide you with a complete guide to marine insurance. We will be looking at the meaning, types, benefits and coverage of marine insurance.',
      content: 'Full content of the article goes here...',
      author: 'Track Flow Express',
      date: 'December 31, 2022',
      readTime: '8 min read',
      comments: 12,
      views: 245,
      tags: ['Insurance', 'Marine', 'Logistics']
    },
    {
      id: 2,
      category: 'Knowledge Base',
      title: '7 ways to avoid common freight and shipping fraud',
      image: track2,
      excerpt: 'The benefits of international shipping by sea are well-documented. Last year, maritime trade volumes reached around 11.1 billion tonnes.',
      content: 'Full content of the article goes here...',
      author: 'Track Flow Express',
      date: 'December 31, 2022',
      readTime: '6 min read',
      comments: 8,
      views: 189,
      tags: ['Fraud Prevention', 'Shipping', 'Safety']
    },
    {
      id: 3,
      category: 'Uncategorized',
      title: 'Shipping Strategies for High-Value Cargo',
      image: track3,
      excerpt: 'When shipping anything internationally, you need to take lots of precautions to make sure it arrives at where it\'s headed safely.',
      content: 'Full content of the article goes here...',
      author: 'Track Flow Express',
      date: 'December 31, 2022',
      readTime: '10 min read',
      comments: 5,
      views: 312,
      tags: ['High-Value', 'Security', 'Cargo']
    },
    {
      id: 4,
      category: 'Uncategorized',
      title: 'Global Freight Summit 2022 by DP World: Key Insights',
      image: track1,
      excerpt: 'The Global Freight Summit 2022 brought together industry leaders to discuss the future of logistics and supply chain management.',
      content: 'Full content of the article goes here...',
      author: 'Track Flow Express',
      date: 'December 31, 2022',
      readTime: '5 min read',
      comments: 3,
      views: 156,
      tags: ['Summit', 'Industry', 'Innovation']
    },
    {
      id: 5,
      category: 'Industry News',
      title: 'The Future of Supply Chain: AI and Automation',
      image: track2,
      excerpt: 'Artificial intelligence and automation are revolutionizing the logistics industry. Discover how these technologies are shaping the future.',
      content: 'Full content of the article goes here...',
      author: 'Track Flow Express',
      date: 'January 15, 2023',
      readTime: '7 min read',
      comments: 18,
      views: 423,
      tags: ['AI', 'Automation', 'Future']
    },
    {
      id: 6,
      category: 'Industry News',
      title: 'Sustainable Logistics: Green Shipping Solutions',
      image: track3,
      excerpt: 'The logistics industry is moving towards sustainability. Explore the latest green shipping solutions and eco-friendly practices.',
      content: 'Full content of the article goes here...',
      author: 'Track Flow Express',
      date: 'February 10, 2023',
      readTime: '9 min read',
      comments: 22,
      views: 567,
      tags: ['Sustainability', 'Green', 'Environment']
    }
  ]

  const categories = ['All', ...new Set(posts.map(p => p.category))]

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <BlogHero />
        
        {/* Featured Post */}
        <FeaturedPost post={posts[0]} />
        
        {/* Search & Filter */}
        <div className="bg-white border-b border-gray-200 py-6 sticky top-[120px] z-40 backdrop-blur-md bg-white/90">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Search */}
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">No articles found</h3>
                <p className="text-gray-500">Try adjusting your search or filter</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

// Blog Hero
const BlogHero = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 container-custom text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6 animate-fade-in-up">
          <BookOpen className="w-4 h-4" />
          <span>Knowledge Hub</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
          Our <span className="bg-gradient-to-r from-yellow-300 to-orange-200 bg-clip-text text-transparent">Blog</span>
        </h1>
        
        <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          Latest insights, industry news, and expert advice from Track Flow
        </p>
      </div>
    </section>
  )
}

// Featured Post
const FeaturedPost = ({ post }) => {
  if (!post) return null

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8 items-center bg-gradient-to-r from-orange-50 to-white rounded-2xl overflow-hidden shadow-lg border border-orange-100">
          <div className="order-2 md:order-1 p-8">
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              🔥 Featured Article
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
            <Link
              to={`/blog/${post.id}`}
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              Read Article
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="order-1 md:order-2 h-full">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Blog Card Component
const BlogCard = ({ post }) => {
  return (
    <article className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Image avec overlay */}
      <div className="relative overflow-hidden">
        <Link to={`/blog/${post.id}`}>
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-block bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
            {post.category}
          </span>
        </div>
        
        {/* Tags */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {post.tags?.slice(0, 2).map((tag, i) => (
            <span key={i} className="bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Link to={`/blog/${post.id}`} className="block">
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        {/* Meta */}
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4 gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span className="text-xs">{post.author}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs">
              <Eye className="w-3 h-3" />
              {post.views}
            </span>
            <span className="flex items-center gap-1 text-xs">
              <MessageCircle className="w-3 h-3" />
              {post.comments}
            </span>
            <span className="flex items-center gap-1 text-xs">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
        </div>
        
        {/* Read More */}
        <Link 
          to={`/blog/${post.id}`}
          className="mt-4 inline-flex items-center gap-1 text-orange-600 font-medium text-sm group-hover:gap-2 transition-all duration-300"
        >
          Read More
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}

export default BlogPage