<script lang="ts" setup>
import { useFrontmatter } from "vuepress/client";

const frontmatter = useFrontmatter<Record<string, any>>();

// 产品列表
const products = [
  {
    name: "图床助手 Plus",
    icon: "🖼️",
    description: "强大的图床管理工具，支持多种存储方式",
    link: "/picture-bed-plus/",
  },
  {
    name: "截图助手 Plus",
    icon: "✂️",
    description: "高效的截图工具，支持编辑和快速分享",
    link: "/screenshot-plus/",
  }
];
</script>

<template>
  <main id="main-content" class="custom-home-page">

    <!-- 产品列表 -->
    <section class="products-section">
      <div class="container">
        <div class="section-title">
          我的产品
        </div>
        <div class="products-grid">
          <a
            v-for="product in products"
            :key="product.name"
            :href="product.link"
            class="product-card"
          >
            <div class="header">
              <div class="product-icon">{{ product.icon }}</div>
              <div class="product-name">{{ product.name }}</div>
            </div>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-arrow">查看文档 →</div>
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.custom-home-page {
  min-height: 100vh;
  background: var(--vp-c-bg, #ffffff);
  transition: background-color 0.3s ease;
}

html.dark .hero-logo {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* 容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 区块标题 */
.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #1a1a1a);
  margin: 0 0 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: color 0.3s ease;
}

.title-icon {
  font-size: 1.6rem;
}

/* 产品列表区域 */
.products-section {
  padding: 80px 0;
  background: var(--vp-c-bg, #ffffff);
  transition: background-color 0.3s ease;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.product-card {
  background: var(--vp-c-bg-soft, #f9fafb);
  border: 2px solid var(--vp-c-divider, #e5e7eb);
  border-radius: 12px;
  padding: 32px 28px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
}
.product-card .header {
  display: flex;
  align-content: center;
  gap: 10px;
  margin-bottom: 10px;
}
.product-card:hover {
  border-color: var(--vp-c-brand, #42b983);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(66, 185, 131, 0.15);
}

.product-icon {
  font-size: 3rem;
}

.product-name {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #1a1a1a);
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
}

.product-description {
  color: var(--vp-c-text-2, #666);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 20px;
  flex-grow: 1;
  transition: color 0.3s ease;
}
html.dark .product-card:hover {
  box-shadow: 0 8px 24px rgba(66, 185, 131, 0.25);
}

.product-arrow {
  color: var(--vp-c-brand, #42b983);
  font-weight: 500;
  font-size: 0.95rem;
  margin-top: 8px;
  transition: color 0.3s ease;
  display: flex;
  justify-content: flex-end;
}

/* 联系方式区域 */
.contact-section {
  padding: 60px 0 80px;
  background: var(--vp-c-bg-soft, #f9fafb);
  transition: background-color 0.3s ease;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}


/* 响应式设计 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .products-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>

