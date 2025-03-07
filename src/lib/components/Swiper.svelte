<script lang='ts'>
    import Swiper from 'swiper';
    import { Navigation, Pagination, Autoplay } from 'swiper/modules';
    import { onMount } from 'svelte';
    import type { CSSSelector } from 'swiper/types';

    let swiperContainer: HTMLElement | CSSSelector;
    let swiperPagination: HTMLDivElement;
    let swiperNext: HTMLDivElement;
    let swiperPrev: HTMLDivElement;

    let { images = [] } = $props();
    
    onMount(() => {
        if (!swiperContainer || !swiperPagination || !swiperNext || !swiperPrev) return;

        new Swiper(swiperContainer, {
            modules: [Pagination, Autoplay, Navigation],
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: swiperPagination,
                clickable: true
            },
            navigation: {
                nextEl: swiperNext,
                prevEl: swiperPrev
            }
        });
    });
</script>

<!-- Swiper Styles -->
<style>
    @import "swiper/css";
    @import "swiper/css/navigation";
    @import "swiper/css/pagination";
  
    .swiper-container {
      width: 100%;
      height: 400px;
      position: relative;
      overflow: hidden;
    }
  
    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ddd;
      height: 100%;
    }
  
    .swiper-slide img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 20px;
    color: white;
  }

  .swiper-button-next {
    right: 10px;
  }

  .swiper-button-prev {
    left: 10px;
  }
</style>

<!-- Swiper HTML Structure -->
<div class="swiper-container" bind:this={swiperContainer}>
    <div class="swiper-wrapper">
      {#each images as {src, alt}}
        <div class="swiper-slide">
          <img src={src} alt={alt}/>
        </div>
      {/each}
    </div>
  
    <!-- Pagination -->
    <div class="swiper-pagination" bind:this={swiperPagination}></div>
  
    <!-- Navigation Buttons -->
    <div class="swiper-button-next" bind:this={swiperNext}></div>
    <div class="swiper-button-prev" bind:this={swiperPrev}></div>
</div>