// src/pages/BlogDetailsPage.jsx
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { 
  ArrowLeft, Calendar, User, Clock, Tag, MessageCircle, 
  Eye, TrendingUp
} from 'lucide-react'

// Import des images locales
import track1 from '/images/track.jfif'
import track2 from '/images/track2.jfif'
import track3 from '/images/track3.jfif'

const BlogDetailsPage = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  // Données des articles avec images locales
  const posts = [
    {
      id: 1,
      category: 'Knowledge Base',
      title: 'Everything You Need to Know About Marine Insurance',
      image: track1,
      excerpt: 'The purpose of this article is to provide you with a complete guide to marine insurance.',
      content: `
        <p><strong>Marine insurance</strong> is a type of insurance that covers the loss or damage of ships, cargo, terminals, and any transport by which property is transferred, acquired, or held between the points of origin and final destination.</p>
        
        <h2>What is Marine Insurance?</h2>
        <p>Marine insurance is a contract of indemnity. It is a type of insurance that covers the loss or damage of ships, cargo, terminals, and any transport by which property is transferred, acquired, or held between the points of origin and final destination.</p>
        
        <h3>Types of Marine Insurance</h3>
        <ul>
          <li><strong>Hull Insurance:</strong> Covers the ship itself</li>
          <li><strong>Cargo Insurance:</strong> Covers the goods being transported</li>
          <li><strong>Freight Insurance:</strong> Covers the freight charges</li>
          <li><strong>Liability Insurance:</strong> Covers third-party claims</li>
        </ul>
        
        <h3>Benefits of Marine Insurance</h3>
        <ul>
          <li>Protection against financial loss</li>
          <li>Peace of mind during transit</li>
          <li>Compliance with international trade regulations</li>
          <li>Customizable coverage options</li>
        </ul>
        
        <p>At <strong>Track Flow</strong>, we provide comprehensive marine insurance solutions tailored to your specific needs. Contact our experts today to learn more about protecting your shipments.</p>
      `,
      author: 'Track Flow Express',
      date: 'December 31, 2022',
      readTime: '8 min read',
      comments: 12,
      views: 245,
      tags: ['Insurance', 'Marine', 'Logistics', 'Protection']
    },
    {
      id: 2,
      category: 'Knowledge Base',
      title: '7 ways to avoid common freight and shipping fraud',
      image: track2,
      excerpt: 'The benefits of international shipping by sea are well-documented.',
      content: `
        <p>Freight and shipping fraud is a growing concern in the logistics industry. Here are 7 ways to protect your business.</p>
        <h2>1. Verify All Parties</h2>
        <p>Always verify the identity of all parties involved in the transaction.</p>
        <h2>2. Use Secure Payment Methods</h2>
        <p>Choose payment methods that offer buyer protection.</p>
        <h2>3. Track Shipments in Real-Time</h2>
        <p>Use tracking technology to monitor your shipments.</p>
      `,
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
      excerpt: 'When shipping anything internationally, you need to take lots of precautions.',
      content: `
        <p>Shipping high-value cargo requires special attention and strategies.</p>
        <h2>Security Measures</h2>
        <ul>
          <li>GPS tracking</li>
          <li>Secure packaging</li>
          <li>Insurance coverage</li>
        </ul>
      `,
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
      excerpt: 'The Global Freight Summit 2022 brought together industry leaders.',
      content: `
        <p>The Global Freight Summit 2022 was a landmark event for the logistics industry.</p>
        <h2>Key Takeaways</h2>
        <ul>
          <li>Digital transformation in logistics</li>
          <li>Sustainability initiatives</li>
          <li>AI in supply chain</li>
        </ul>
      `,
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
      excerpt: 'Artificial intelligence and automation are revolutionizing the logistics industry.',
      content: `
        <p>AI and automation are transforming the logistics industry.</p>
        <h2>AI Applications in Logistics</h2>
        <ul>
          <li>Predictive analytics</li>
          <li>Route optimization</li>
          <li>Automated warehouses</li>
        </ul>
      `,
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
      excerpt: 'The logistics industry is moving towards sustainability.',
      content: `
        <p>Sustainable logistics is becoming increasingly important.</p>
        <h2>Green Shipping Initiatives</h2>
        <ul>
          <li>Electric vehicles</li>
          <li>Carbon offset programs</li>
          <li>Eco-friendly packaging</li>
        </ul>
      `,
      author: 'Track Flow Express',
      date: 'February 10, 2023',
      readTime: '9 min read',
      comments: 22,
      views: 567,
      tags: ['Sustainability', 'Green', 'Environment']
    }
  ]

  useEffect(() => {
    const found = posts.find(p => p.id === parseInt(id))
    if (found) {
      setPost(found)
    }
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent" />
        </div>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h2>
            <p className="text-gray-600 mb-4">The article you're looking for doesn't exist.</p>
            <Link to="/blog" className="text-orange-600 hover:underline">
              ← Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container-custom py-8">
          {/* Back button */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Article Header */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="p-8">
                  {/* Category */}
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    {post.category}
                  </span>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {post.title}
                  </h1>
                  
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
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
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {post.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments} comments
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-orange-600 prose-a:text-orange-600"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  
                  {/* Tags */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, i) => (
                        <span key={i} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* About the Author */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">About the Author</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    TF
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Track Flow</h4>
                    <p className="text-sm text-gray-500">Logistics Expert</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Track Flow provides expert insights on logistics, shipping, and supply chain management.
                </p>
              </div>

              {/* Popular Posts */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  Popular Posts
                </h3>
                <div className="space-y-4">
                  {posts.filter(p => p.id !== post.id).slice(0, 3).map((p) => (
                    <Link 
                      key={p.id} 
                      to={`/blog/${p.id}`}
                      className="block group"
                    >
                      <div className="flex gap-3">
                        <img 
                          src={p.image} 
                          alt={p.title} 
                          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                        />
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                            {p.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{p.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-orange-600 to-orange-400 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="font-bold text-xl mb-2">📬 Newsletter</h3>
                <p className="text-white/80 text-sm mb-4">
                  Get the latest articles delivered to your inbox
                </p>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="w-full mt-3 bg-white text-orange-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default BlogDetailsPage