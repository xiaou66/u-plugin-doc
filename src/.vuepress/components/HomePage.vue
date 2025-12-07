<script lang="ts" setup>
import { ref } from 'vue';

// 产品列表
const products = [
  {
    name: "图床 Plus",
    icon: "https://res.u-tools.cn/plugins/logo/phgzvja2f4crknm3wly7kpnrswvz9tgg.png?x-oss-process=style/100x100",
    description: "强大的图床管理工具，支持多种存储方式",
    link: "/picture-bed-plus/",
  },
  {
    name: "截图工具 Plus",
    icon: "https://res.u-tools.cn/plugins/logo/dxga5xpyepzwaxrej9iit26idzgslphw.png?x-oss-process=style/100x100",
    description: "高效的截图工具，支持编辑和快速分享",
    link: "/screenshot-plus/",
  }
];

// 联系弹窗状态
const showContactModal = ref(false);

// 复制提示状态
const copySuccess = ref(false);
const copiedText = ref('');

// 联系方式数据
const contacts = [
  {
    icon: "/assets/image/wechat.png",
    label: "微信号",
    value: "-xiaou-",
    link: "weixin://addfriend/-xiaou-",
    description: "点击复制微信号, 添加微信",
    isImage: true,
    copyable: true
  },
  {
    icon: "/assets/image/wechat.png",
    label: "公众号",
    value: "程序员小悠",
    link: "weixin://profile/gh_ccd17b9c3c7d",
    description: "关注关注号，获取最新资讯",
    isImage: true,
    copyable: true
  },
];

// 打开联系弹窗
const openContactModal = () => {
  showContactModal.value = true;
  copySuccess.value = false;
};

// 关闭联系弹窗
const closeContactModal = () => {
  showContactModal.value = false;
  copySuccess.value = false;
};

// 复制到剪贴板
const copyToClipboard = async (contact: any, event: Event) => {
  // 如果是可复制的联系方式
  if (contact.copyable && !contact.link) {
    event.preventDefault();
  }
  if (contact.copyable) {
    try {
      await navigator.clipboard.writeText(contact.value);
      copiedText.value = contact.label;
      copySuccess.value = true;

      // 3秒后自动隐藏提示
      setTimeout(() => {
        copySuccess.value = false;
      }, 3000);
    } catch (err) {
      console.error('复制失败:', err);
      // 降级方案：使用传统方法复制
      fallbackCopy(contact.value);
    }
  }
};

// 降级复制方案（兼容老浏览器）
const fallbackCopy = (text: string) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();

  try {
    document.execCommand('copy');
    copiedText.value = '联系方式';
    copySuccess.value = true;

    setTimeout(() => {
      copySuccess.value = false;
    }, 3000);
  } catch (err) {
    console.error('降级复制也失败:', err);
  }

  document.body.removeChild(textArea);
};

// 滚动到产品区域
const scrollToProducts = () => {
  const productsSection = document.querySelector('.products-section');
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <main id="main-content"
        class="custom-home-page">
    <!-- 封面 -->
    <section class="hero-cover">
      <div class="hero-bg-particles"></div>
      <div class="hero-content-wrapper">
        <div class="hero-text">
          <p class="hero-subtitle">独立开发 · 行业探索者</p>
          <h1 class="hero-name">小悠</h1>
          <p class="hero-motto">" 代码连接你我，共绘言语之美，携手筑梦，共书山河壮丽。"</p>

          <div class="hero-actions">
            <a href="/picture-bed-plus/" class="btn btn-primary">
              文档中心 →
            </a>
            <button @click="openContactModal" class="btn btn-secondary">
              联系我 💬
            </button>
          </div>
        </div>

        <div class="scroll-indicator"
             @click="scrollToProducts">
          <div class="scroll-arrow">↓</div>
          <div class="scroll-text">向下滚动</div>
        </div>
      </div>
    </section>

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
              <div class="product-icon">
                <img alt="" :src="product.icon">
              </div>
              <div class="product-name">{{ product.name }}</div>
            </div>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-arrow">查看文档 →</div>
          </a>
        </div>
      </div>
    </section>

    <!-- 联系弹窗 -->
    <Transition name="modal">
      <div v-if="showContactModal" class="modal-overlay" @click="closeContactModal">
        <div class="modal-container" @click.stop>
          <div class="modal-body">
            <a
              v-for="contact in contacts"
              :key="contact.label"
              :href="contact.copyable && !contact.link  ? '#' : contact.link"
              :target="contact.link.startsWith('http') && !contact.copyable ? '_blank' : '_self'"
              class="contact-card"
              :class="{ 'copyable': contact.copyable }"
              @click="(e) => copyToClipboard(contact, e)"
            >
              <div class="contact-icon">
                <img v-if="contact.isImage" :src="contact.icon" :alt="contact.label" />
                <span v-else>{{ contact.icon }}</span>
              </div>
              <div class="contact-content">
                <div class="contact-label">{{ contact.label }}</div>
                <div class="contact-value">{{ contact.value }}</div>
                <div class="contact-description">{{ contact.description }}</div>
              </div>
              <div v-if="contact.copyable" class="copy-icon">
                复制
              </div>
            </a>
          </div>

          <!-- 复制成功提示 -->
          <Transition name="toast">
            <div v-if="copySuccess" class="copy-toast">
              {{ copiedText }} 已复制到剪贴板
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </main>
</template>

<style scoped>
.custom-home-page {
  min-height: 100vh;
  background: var(--vp-c-bg, #ffffff);
  transition: background-color 0.3s ease;
}

/* ==================== 封面区域 ==================== */
.hero-cover {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-image: linear-gradient(135deg,#2afadf,#4c83ff 100%);
}
html[data-theme='dark'] {
  .hero-cover {
    background-image: linear-gradient(135deg, rgb(107, 115, 255) 10%, rgb(0, 13, 255) 100%);
  }
}
/* 动态背景粒子 */
/*.hero-bg-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 3px, transparent 2px);
  background-size: 350px 350px, 450px 450px, 250px 250px;
  background-position: 0 0, 40px 60px, 130px 270px;
  animation: particlesFloat 30s linear infinite;
}

@keyframes particlesFloat {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(40px, 400px);
  }
}*/

.hero-content-wrapper {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  padding: 100px 20px;
  text-align: center;
}

.hero-text {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 20px;
  letter-spacing: 2px;
}

.hero-name {
  font-size: 4rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 30px;
  line-height: 1.2;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
}

.hero-tags {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 30px;
  letter-spacing: 1px;
}

.hero-motto {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
  margin: 0 0 50px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* 按钮组 */
.hero-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 80px;
}

.btn {
  padding: 14px 36px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: rgb(28, 126, 214);
  box-shadow: 0 4px 15px rgba(28, 126, 214, 0.3);
  color: #ffffff;
  transition: all 250ms linear;
}

.btn-primary:hover {
  background: rgb(34, 139, 230);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(34, 139, 230, 0.4);
}

.btn-secondary {
  background: transparent;
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ffffff;
  transform: translateY(-2px);
}

/* 统计数据 */
.hero-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffd700;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
}

/* 滚动指示器 */
.scroll-indicator {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  text-align: center;
  cursor: pointer;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

.scroll-arrow {
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
}

.scroll-text {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
}

.scroll-indicator:hover .scroll-arrow {
  color: #ffd700;
}

/* ==================== 原有样式 ==================== */

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
  color: var(--vp-c-text);
  margin: 0 0 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: color 0.3s ease;
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
  > img {
    width: 52px;
    height: 52px;
  }
}

.product-name {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--vp-c-text);
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
}

.product-description {
  color: var(--vp-c-text);
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

/* ==================== 联系弹窗 ==================== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal-container {
  background: var(--vp-c-bg, #ffffff);
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px;
  border-bottom: 1px solid var(--vp-c-divider, #e5e7eb);
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #1a1a1a);
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--vp-c-text-2, #666);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  line-height: 1;
}

.modal-close:hover {
  background: var(--vp-c-bg-soft, #f5f5f5);
  color: var(--vp-c-text-1, #1a1a1a);
}

.modal-body {
  padding: 20px 28px 28px;
  max-height: calc(80vh - 100px);
  overflow-y: auto;
  display: grid;
  gap: 16px;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: var(--vp-c-bg-soft, #f9fafb);
  border: 1px solid var(--vp-c-divider, #e5e7eb);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.contact-card:hover {
  border-color: var(--vp-c-brand, #42b983);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.15);
}

.contact-card.copyable {
  cursor: pointer;
}

.contact-card.copyable:active {
  transform: translateX(4px) scale(0.98);
}

.copy-icon {
  opacity: 0.5;
  transition: all 0.3s ease;
}

.contact-card:hover .copy-icon {
  opacity: 1;
  transform: scale(1.1);
}

.contact-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg, #ffffff);
  border-radius: 12px;
}

.contact-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.contact-content {
  flex: 1;
}

.contact-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-3, #999);
  margin-bottom: 4px;
}

.contact-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text);
  margin-bottom: 4px;
}

.contact-description {
  font-size: 0.85rem;
  color: var(--vp-c-text-2, #666);
}

/* 复制成功提示 */
.copy-toast {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--vp-c-brand, #42b983);
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10000;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Toast 过渡动画 */
.toast-enter-active {
  animation: toastSlideIn 0.3s ease-out;
}

.toast-leave-active {
  animation: toastSlideOut 0.3s ease-in;
}

@keyframes toastSlideIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes toastSlideOut {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
}

/* 弹窗过渡动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: translateY(-30px) scale(0.95);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-name {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-tags {
    font-size: 0.95rem;
  }

  .hero-motto {
    font-size: 0.9rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
    margin-bottom: 60px;
  }

  .btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }

  .hero-stats {
    gap: 40px;
  }

  .stat-value {
    font-size: 2rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .modal-container {
    max-height: 90vh;
  }

  .modal-header {
    padding: 20px;
  }

  .modal-body {
    padding: 16px 20px 20px;
  }

  .contact-card {
    padding: 16px;
  }

  .contact-icon {
    font-size: 2rem;
    width: 50px;
    height: 50px;
  }

  .contact-icon img {
    border-radius: 6px;
  }
}
</style>

