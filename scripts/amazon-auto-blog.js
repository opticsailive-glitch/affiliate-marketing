#!/usr/bin/env node

/**
 * Amazon Affiliate Auto-Blog Generator
 * Fetches trending products from Amazon and generates blog posts
 */

require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration
const AMAZON_API_KEY = process.env.AMAZON_API_KEY;
const AMAZON_ASSOCIATE_TAG = process.env.AMAZON_ASSOCIATE_TAG;
const BLOG_DIR = path.join(__dirname, '../blog-posts');

// Ensure blog directory exists
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

/**
 * Fetch trending products from Amazon using Product Advertising API
 */
async function fetchTrendingProducts() {
  try {
    console.log('🔍 Fetching trending products from Amazon...');
    
    // Using Rapid API - Amazon Product API
    const options = {
      method: 'GET',
      url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/search',
      params: {
        keyword: 'best selling',
        country: 'US'
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'amazon-product-reviews-keywords.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    const products = response.data.products || [];
    
    console.log(`✅ Found ${products.length} trending products`);
    return products.slice(0, 5); // Get top 5 trending products
  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
    return [];
  }
}

/**
 * Generate AI-powered product review using OpenAI
 */
async function generateProductReview(product) {
  try {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    
    const prompt = `Write a comprehensive product review blog post for the following Amazon product:

Product: ${product.title}
Price: ${product.price}
Rating: ${product.rating}/5 (${product.reviews} reviews)
ASIN: ${product.asin}

Requirements:
1. Write an engaging introduction (2-3 sentences)
2. List key features (4-5 bullet points)
3. Discuss pros and cons (3-4 each)
4. Compare with alternatives (2-3 products)
5. Provide a final recommendation
6. Write in HTML format ready for web publishing

Make it informative, unbiased, and helpful for readers making a purchase decision.`;

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('❌ Error generating review:', error.message);
    return null;
  }
}

/**
 * Create Amazon affiliate link with associate tag
 */
function createAffiliateLink(asin) {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_ASSOCIATE_TAG}`;
}

/**
 * Generate HTML blog post file
 */
async function generateBlogPost(product, reviewContent) {
  if (!reviewContent) {
    console.log('⏭️  Skipping blog post generation (no review content)');
    return null;
  }

  const slug = product.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);

  const affiliateLink = createAffiliateLink(product.asin);
  const fileName = `${slug}.html`;
  const filePath = path.join(BLOG_DIR, fileName);

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${product.title} - Review & Buying Guide | AffiliateSite</title>
    <meta name="description" content="Comprehensive review and buying guide for ${product.title}. Expert analysis, pros & cons, and recommendations.">
    <meta name="keywords" content="${product.title}, review, buying guide, best price, comparison">
    <meta name="author" content="AffiliateSite Team">
    <link rel="canonical" href="https://affiliatesite.example/blog/${fileName}">
    <meta property="og:title" content="${product.title} - Review & Buying Guide">
    <meta property="og:description" content="Expert review and recommendations for ${product.title}">
    <meta property="og:type" content="article">
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <header role="banner">
        <div class="container">
            <div class="logo">
                <h1>AffiliateSite</h1>
            </div>
            <nav role="navigation" aria-label="Main Navigation">
                <ul>
                    <li><a href="../index.html">Home</a></li>
                    <li><a href="../about.html">About</a></li>
                    <li><a href="../blog.html">Blog</a></li>
                    <li><a href="../contact.html">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main role="main">
        <article class="blog-post">
            <div class="container">
                <header>
                    <h1>${product.title}</h1>
                    <div class="post-meta">
                        <span class="rating">⭐ ${product.rating}/5 (${product.reviews} reviews)</span>
                        <span class="price">Price: $${product.price}</span>
                        <span class="date">Published: ${new Date().toLocaleDateString()}</span>
                    </div>
                </header>

                <div class="post-content">
                    <section class="cta-section">
                        <h2>Check Current Price on Amazon</h2>
                        <p><a href="${affiliateLink}" class="btn-primary" target="_blank" rel="noopener noreferrer">View on Amazon</a></p>
                        <p class="affiliate-disclosure">
                            <em>As an Amazon Associate, we earn from qualifying purchases. This helps us provide free content to our readers.</em>
                        </p>
                    </section>

                    <section class="review-content">
                        ${reviewContent}
                    </section>

                    <section class="cta-section">
                        <h2>Ready to Purchase?</h2>
                        <p><a href="${affiliateLink}" class="btn-primary" target="_blank" rel="noopener noreferrer">Buy on Amazon</a></p>
                    </section>
                </div>

                <aside class="post-sidebar">
                    <h3>Product Details</h3>
                    <ul>
                        <li><strong>Rating:</strong> ${product.rating}/5</li>
                        <li><strong>Reviews:</strong> ${product.reviews}</li>
                        <li><strong>Price:</strong> \$${product.price}</li>
                        <li><strong>ASIN:</strong> ${product.asin}</li>
                    </ul>
                </aside>
            </div>
        </article>
    </main>

    <footer role="contentinfo">
        <div class="container">
            <p>&copy; 2026 AffiliateSite. All rights reserved.</p>
            <p><a href="../disclosure.html">Affiliate Disclosure</a> | <a href="../privacy.html">Privacy Policy</a></p>
        </div>
    </footer>

    <script src="../js/script.js" defer></script>
</body>
</html>`;

  try {
    fs.writeFileSync(filePath, htmlContent, 'utf8');
    console.log(`✅ Blog post created: ${fileName}`);
    return {
      fileName,
      slug,
      title: product.title,
      price: product.price,
      rating: product.rating,
      asin: product.asin,
      url: `https://affiliatesite.example/blog/${fileName}`
    };
  } catch (error) {
    console.error(`❌ Error creating blog post: ${error.message}`);
    return null;
  }
}

/**
 * Update blog.html with new posts
 */
async function updateBlogIndex(newPosts) {
  try {
    const blogIndexPath = path.join(__dirname, '../blog.html');
    let blogIndexContent = fs.readFileSync(blogIndexPath, 'utf8');

    // Generate new post cards HTML
    const newPostsHTML = newPosts
      .map(post => `
                        <!-- Auto-generated Post -->
                        <article class="post-card" role="article">
                            <h3><a href="blog/${post.fileName}">${post.title}</a></h3>
                            <p><strong>Price:</strong> $${post.price} | <strong>Rating:</strong> ⭐ ${post.rating}/5</p>
                            <p>Expert review and buying guide for this trending Amazon product with detailed analysis.</p>
                            <a href="blog/${post.fileName}" class="btn-sm" aria-label="Read review: ${post.title}">Read Review</a>
                        </article>
      `)
      .join('\n');

    // Insert new posts at the beginning of posts-grid
    const postsGridRegex = /(<div class="posts-grid"[^>]*>)/;
    blogIndexContent = blogIndexContent.replace(
      postsGridRegex,
      `$1\n${newPostsHTML}`
    );

    fs.writeFileSync(blogIndexPath, blogIndexContent, 'utf8');
    console.log('✅ Blog index updated with new posts');
  } catch (error) {
    console.error(`❌ Error updating blog index: ${error.message}`);
  }
}

/**
 * Main function - orchestrate the entire process
 */
async function main() {
  console.log('🚀 Starting Amazon Affiliate Auto-Blog Generator...\n');

  try {
    // Step 1: Fetch trending products
    const products = await fetchTrendingProducts();
    
    if (products.length === 0) {
      console.log('⚠️  No products found');
      return;
    }

    // Step 2: Generate blog posts for each product
    const newPosts = [];
    
    for (const product of products) {
      console.log(`\n📝 Processing: ${product.title}`);
      
      // Generate review
      const review = await generateProductReview(product);
      
      // Create blog post
      const blogPost = await generateBlogPost(product, review);
      
      if (blogPost) {
        newPosts.push(blogPost);
      }
      
      // Rate limiting - wait between API calls
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Step 3: Update blog index
    if (newPosts.length > 0) {
      await updateBlogIndex(newPosts);
      console.log(`\n✅ Successfully created ${newPosts.length} new blog posts!`);
    }

    console.log('\n🎉 Auto-blog generation complete!\n');
    return newPosts;

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main, fetchTrendingProducts, generateProductReview, generateBlogPost };
