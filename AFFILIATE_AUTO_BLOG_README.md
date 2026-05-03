# Amazon Affiliate Auto-Blog Generator

Complete automation system to fetch trending Amazon products and automatically generate blog posts with affiliate links.

## 🎯 Features

✅ **Automatic Product Fetching**
- Fetches trending products from Amazon daily
- Filters by category (Electronics, Home & Kitchen, Fitness, etc.)
- Real-time bestseller updates

✅ **AI-Powered Blog Generation**
- Uses OpenAI to generate professional product reviews
- Creates comprehensive buying guides
- Includes pros, cons, and comparisons

✅ **Affiliate Link Integration**
- Automatically adds your Amazon Associate links
- Tracks affiliate tag in all links
- Includes affiliate disclosure on each post

✅ **Automated Publishing**
- Generates HTML blog posts automatically
- Updates blog index page
- Publishes via GitHub commit

✅ **Scheduled Updates**
- Runs on schedule (daily, weekly, or custom)
- GitHub Actions integration
- No manual intervention needed

## 📋 Prerequisites

### 1. Amazon Associate Account
- Sign up at [amazon.com/associates](https://amazon.com/associates)
- Get your **Associate Tag** (looks like: `yourname-20`)
- Join Amazon Product Advertising API

### 2. API Keys Needed

#### A. Amazon Product Advertising API
- Visit [webservices.amazon.com/paapi](https://webservices.amazon.com/paapi)
- Get `Access Key` and `Secret Key`
- Create security credentials

#### B. RapidAPI Key (for trending products)
- Go to [rapidapi.com](https://rapidapi.com)
- Search for "Amazon Product API"
- Subscribe to a plan (free tier available)
- Copy your API key

#### C. OpenAI API Key (for AI reviews)
- Sign up at [openai.com](https://openai.com)
- Create API key in settings
- Ensure sufficient credits for API usage

## 🚀 Setup Instructions

### Step 1: Clone Repository
```bash
git clone https://github.com/opticsailive-glitch/affiliate-marketing.git
cd affiliate-marketing
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```env
AMAZON_ASSOCIATE_TAG=yourname-20
RAPIDAPI_KEY=your_rapidapi_key_here
OPENAI_API_KEY=your_openai_key_here
AMAZON_API_KEY=your_amazon_api_key
```

### Step 4: Add GitHub Secrets

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:
   - `AMAZON_ASSOCIATE_TAG`
   - `RAPIDAPI_KEY`
   - `OPENAI_API_KEY`
   - `AMAZON_API_KEY`

### Step 5: Test Locally
```bash
npm run update-blog
```

### Step 6: Enable GitHub Actions
1. Go to **Actions** tab
2. Click on **Auto-Blog Generator** workflow
3. Enable the workflow

## ⚙️ How It Works

```
┌─────────────────────────────────────────┐
│  GitHub Actions (Daily at 2 AM UTC)    │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  Fetch Trending Products                │
│  (From Amazon via RapidAPI)             │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  Generate AI Reviews (OpenAI)           │
│  - Features & Benefits                  │
│  - Pros & Cons                          │
│  - Comparisons                          │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  Create HTML Blog Posts                 │
│  - Add Affiliate Links                  │
│  - Include Affiliate Disclosure         │
│  - Optimize for SEO                     │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  Update Blog Index Page                 │
│  - Add new posts to blog.html           │
│  - Maintain navigation                  │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  Commit & Push to GitHub                │
│  - Auto-deploy to website               │
│  - Notify on completion                 │
└─────────────────────────────────────────┘
```

## 📊 Generated Blog Post Structure

Each auto-generated blog post includes:
- ✅ Product title and pricing
- ✅ Amazon ratings and review count
- ✅ Affiliate link (with your tag)
- ✅ AI-generated professional review
- ✅ Key features and specifications
- ✅ Pros and cons analysis
- ✅ Product comparisons
- ✅ SEO-optimized content
- ✅ Affiliate disclosure
- ✅ Call-to-action buttons

## 💰 Revenue Strategy

1. **Generate high-quality content** about trending products
2. **Rank on Google** through SEO optimization
3. **Drive organic traffic** to blog posts
4. **Earn commissions** when users click affiliate links
5. **Scale automatically** as content grows

## 🔧 Customization

### Change Update Frequency
Edit `.github/workflows/auto-blog.yml`:
```yaml
schedule:
  - cron: '0 2 * * *'  # Daily at 2 AM UTC
  # - cron: '0 2 * * 0'  # Weekly on Mondays
  # - cron: '0 2 1 * *'  # Monthly on 1st
```

### Change Product Categories
Edit `.env`:
```env
CATEGORIES=Electronics,Home & Kitchen,Fitness,Smart Home,Sports & Outdoors
```

### Modify Post Count
Edit `.env`:
```env
MAX_POSTS_PER_RUN=5
```

## 📈 Monitoring

### GitHub Actions
- Go to **Actions** tab to see workflow runs
- Click on a run to view logs
- Check for errors in real-time

### Blog Posts
- New posts appear in `/blog-posts/` directory
- Blog index updates automatically
- Check `blog.html` for latest posts

## 🐛 Troubleshooting

### No Posts Generated
- Check API keys are correct in GitHub Secrets
- Verify RapidAPI subscription is active
- Check OpenAI account has credits

### Build Fails
- View GitHub Actions logs for errors
- Verify `.env` file has all required keys
- Test locally: `npm run update-blog`

### Affiliate Links Not Working
- Verify Associate Tag is correct
- Check ASIN is valid on Amazon
- Ensure affiliate account is approved

## 📚 Resources

- [Amazon Associates](https://amazon.com/associates)
- [Amazon Product API Docs](https://docs.aws.amazon.com/AmazonProductAdvertisingAPI/)
- [RapidAPI Amazon API](https://rapidapi.com/apigeek/api/amazon-product-reviews-keywords)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

## ⚠️ Important Notes

1. **Affiliate Disclosure**: Always include affiliate disclosure (already included in generated posts)
2. **Content Quality**: Verify AI-generated content for accuracy
3. **API Costs**: Monitor OpenAI and RapidAPI usage to manage costs
4. **Amazon Terms**: Comply with Amazon Associates Program Operating Agreement
5. **Review Accuracy**: Fact-check generated reviews periodically

## 📞 Support

For issues or questions:
1. Check GitHub Issues
2. Review workflow logs in Actions tab
3. Verify API credentials
4. Test locally before troubleshooting

---

**Happy Blogging! 🚀** Your affiliate site is now fully automated and ready to generate passive income.
