import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta
  ) {}

  setTitle(title: string): void {
    this.title.setTitle(title);
  }

  setMetaTags(metaTags: { name: string; content: string }[]): void {
    metaTags.forEach(tag => {
      this.meta.updateTag({ name: tag.name, content: tag.content });
    });
  }

  setOgTags(ogTags: { property: string; content: string }[]): void {
    ogTags.forEach(tag => {
      this.meta.updateTag({ property: tag.property, content: tag.content });
    });
  }

  setTwitterCardTags(twitterTags: { name: string; content: string }[]): void {
    twitterTags.forEach(tag => {
      this.meta.updateTag({ name: tag.name, content: tag.content });
    });
  }

  setCanonicalUrl(url: string): void {
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = url;
    
    // Remove existing canonical link if any
    const existingLink = document.querySelector('link[rel="canonical"]');
    if (existingLink) {
      existingLink.remove();
    }
    
    document.head.appendChild(link);
  }

  setIndexFollow(index: boolean, follow: boolean): void {
    const robotsContent = `${index ? 'index' : 'noindex'}, ${follow ? 'follow' : 'nofollow'}`;
    this.meta.updateTag({ name: 'robots', content: robotsContent });
  }

  // Convenience method for setting all SEO at once
  setSeoData(seoData: {
    title: string;
    description: string;
    keywords?: string;
    author?: string;
    url?: string;
    imageUrl?: string;
    index?: boolean;
    follow?: boolean;
  }): void {
    // Set title
    this.setTitle(seoData.title);
    
    // Set basic meta tags
    const metaTags = [
      { name: 'description', content: seoData.description }
    ];
    
    if (seoData.keywords) {
      metaTags.push({ name: 'keywords', content: seoData.keywords });
    }
    
    if (seoData.author) {
      metaTags.push({ name: 'author', content: seoData.author });
    }
    
    this.setMetaTags(metaTags);
    
    // Set Open Graph tags
    const ogTags = [
      { property: 'og:title', content: seoData.title },
      { property: 'og:description', content: seoData.description },
      { property: 'og:type', content: 'website' }
    ];
    
    if (seoData.url) {
      ogTags.push({ property: 'og:url', content: seoData.url });
    }
    
    if (seoData.imageUrl) {
      ogTags.push({ property: 'og:image', content: seoData.imageUrl });
    }
    
    this.setOgTags(ogTags);
    
    // Set Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seoData.title },
      { name: 'twitter:description', content: seoData.description }
    ];
    
    if (seoData.imageUrl) {
      twitterTags.push({ name: 'twitter:image', content: seoData.imageUrl });
    }
    
    this.setTwitterCardTags(twitterTags);
    
    // Set canonical URL
    if (seoData.url) {
      this.setCanonicalUrl(seoData.url);
    }
    
    // Set robots meta
    const shouldIndex = seoData.index !== false;
    const shouldFollow = seoData.follow !== false;
    this.setIndexFollow(shouldIndex, shouldFollow);
  }
}
