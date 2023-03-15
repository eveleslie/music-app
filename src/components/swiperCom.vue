<template>
<div class="swipercom">
    <div class="swiper-container" id="swiperIndex">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,i) in imgs" :key="i"><img :src="item.pic" /></div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    
    <!-- 如果需要导航按钮 -->
    <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
     -->
    <!-- 如果需要滚动条 -->
    <!-- <div class="swiper-scrollbar"></div> -->
    </div>
</div>

    
</template>
<script>

import Swiper from 'swiper';  
import axios from 'axios';
  // import swiper module styles
import 'swiper/dist/css/swiper.css'
import {getBanner} from '@/api/index.js'
  // more module style...
export default{
    data:function(){
        return{
        imgs:[
        {pic: require('../assets/img/swiper1.jpg')},
        {pic: require('../assets/img/swiper2.jpg')},
        {pic: require('../assets/img/swiper3.png')},
    ]}

    },
    
//     setup() {
    // const imgs = [
    //     {pic:require('@/assets/img/swiper1.png')},
    //     {pic:require('@/assets/img/swiper2.png')},
    //     {pic:require('@/assets/img/swiper3.png')},
    // ];
    // return { imgs };
//   },

    async mounted(){
    var mySwiper = new Swiper('#swiperIndex', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // // 如果需要前进后退按钮
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
    
    // // 如果需要滚动条
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
  });
  
  let res = await getBanner(1);
  this.imgs = res.data.banners;
  console.log('sdhfaoihg');
  console.log(this.imgs);
}
}
</script>

<style lang="less">
#swipercom{
    width: 7.5rem;
#swiperIndex.swiper-container{
    width: 7.1rem;
    height: 2.6rem;
    border-radius: 0.1rem;
    
    .swiper-slide img{
        width: 100%;
    }
    .swiper-pagination-bullet-active{
        background-color: orangered;
    }

}
}
</style>