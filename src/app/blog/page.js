'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Tag, Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'Πώς το Carpooling Μειώνει το Ανθρακικό Αποτύπωμα',
    excerpt: 'Ανακαλύψτε πώς ο διαμοιρασμός διαδρομών μπορεί να μειώσει τις εκπομπές CO2 κατά 30% και να συμβάλει σε ένα πιο βιώσιμο μέλλον.',
    image: '🌱',
    category: 'Περιβάλλον',
    author: 'Μαρία Κωνσταντίνου',
    date: '15 Φεβρουαρίου 2026',
    readTime: '5 λεπτά',
    likes: 234,
    comments: 18,
    featured: true,
  },
  {
    id: 2,
    title: '5 Συμβουλές για Ασφαλείς Διαδρομές',
    excerpt: 'Οδηγίες για να εξασφαλίσετε την ασφάλειά σας κατά τη χρήση υπηρεσιών carpooling.',
    image: '🛡️',
    category: 'Ασφάλεια',
    author: 'Γιάννης Παπαδόπουλος',
    date: '10 Φεβρουαρίου 2026',
    readTime: '4 λεπτά',
    likes: 189,
    comments: 12,
    featured: false,
  },
  {
    id: 3,
    title: 'Η Οικονομία του Carpooling: Πόσα Χρήματα Εξοικονομείτε;',
    excerpt: 'Ανάλυση του κόστους μετακίνησης και πώς το carpooling μπορεί να μειώσει τα έξοδά σας έως και 60%.',
    image: '💰',
    category: 'Οικονομία',
    author: 'Νίκος Ανδρέου',
    date: '5 Φεβρουαρίου 2026',
    readTime: '6 λεπτά',
    likes: 312,
    comments: 24,
    featured: false,
  },
  {
    id: 4,
    title: 'Νέα Χαρακτηριστικά: Ladies Only Διαδρομές',
    excerpt: 'Παρουσιάζουμε το νέο μας χαρακτηριστικό που επιτρέπει σε γυναίκες οδηγούς και επιβάτες να ταξιδεύουν με άνεση.',
    image: '✨',
    category: 'Νέα',
    author: 'Ελένη Δημητρίου',
    date: '1 Φεβρουαρίου 2026',
    readTime: '3 λεπτά',
    likes: 456,
    comments: 67,
    featured: false,
  },
  {
    id: 5,
    title: 'Η Ιστορία της Θεσσαλονίκης Μέσα από Διαδρομές',
    excerpt: 'Ανακαλύψτε κρυμμένα μυστικά της πόλης μέσα από ενδιαφέρουσες διαδρομές carpooling.',
    image: '🏛️',
    category: 'Πολιτισμός',
    author: 'Μαρία Κωνσταντίνου',
    date: '25 Ιανουαρίου 2026',
    readTime: '7 λεπτά',
    likes: 178,
    comments: 23,
    featured: false,
  },
  {
    id: 6,
    title: 'Οδηγός για Νέους Οδηγούς: Πώς να Ξεκινήσετε',
    excerpt: 'Όλα όσα πρέπει να ξέρετε για να ξεκινήσετε ως οδηγός στο carpal και να μεγιστοποιήσετε τα έσοδά σας.',
    image: '🚗',
    category: 'Οδηγοί',
    author: 'Γιάννης Παπαδόπουλος',
    date: '20 Ιανουαρίου 2026',
    readTime: '8 λεπτά',
    likes: 267,
    comments: 31,
    featured: false,
  },
];

const categories = [
  { name: 'Όλα', count: 12 },
  { name: 'Περιβάλλον', count: 3 },
  { name: 'Ασφάλεια', count: 2 },
  { name: 'Οικονομία', count: 2 },
  { name: 'Νέα', count: 2 },
  { name: 'Οδηγοί', count: 2 },
  { name: 'Πολιτισμός', count: 1 },
];

export default function BlogPage() {
  const featuredPost = blogPosts.find((p) => p.featured);
  const regularPosts = blogPosts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen grain-bg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6"
            >
              <Tag className="w-4 h-4" />
              Το Blog μας
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Ιστορίες, Συμβουλές & <span className="text-blue-600">Νέα</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Ανακαλύψτε άρθρα για το carpooling, την κοινότητά μας και τη βιώσιμη μετακίνηση
            </motion.p>
          </div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.name}
                className="px-5 py-2.5 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-blue-600 transition-all border border-gray-200 hover:border-blue-200"
              >
                {category.name}
                <span className="ml-2 text-gray-400">{category.count}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link href={`/blog/${featuredPost.id}`}>
                <article className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                  <div className="grid lg:grid-cols-2">
                    <div className="h-72 lg:h-auto bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-9xl group-hover:scale-105 transition-transform duration-500">
                      {featuredPost.image}
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {featuredPost.category}
                        </span>
                        <span className="px-4 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium flex items-center gap-1">
                          ⭐ Featured
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {featuredPost.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Heart className="w-4 h-4" />
                          {featuredPost.likes}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <MessageCircle className="w-4 h-4" />
                          {featuredPost.comments}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Link href={`/blog/${post.id}`}>
                  <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
                    <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500">
                      {post.image}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-400">{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="truncate max-w-[100px]">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {post.comments}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Μην χάνετε τα νέα μας!
              </h2>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                Εγγραφείτε στο newsletter μας για να λαμβάνετε τα τελευταία άρθρα, 
                συμβουλές και ενημερώσεις απευθείας στο email σας.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Το email σας"
                  className="flex-1 px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-colors">
                  Εγγραφή
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
