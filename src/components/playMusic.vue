<template>
    <div class="playMusic">
        <div class="bg" :style="{backgroundImage:`url(${playDetail.al.picUrl})` }"></div>
        <div class="playTop">
            <div class="back" @click="$emit('back')">
                <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            </div>
            <div class="center">
                <div class="title">
                    <marquee  behavior="scroll" direction="left">{{playDetail.al.name}}</marquee>
                  </div>
            </div>
            <div class="share">
                <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
            </div>

        </div>

       
        <div class="playContent" v-show="!isLyric">
            <img class="needle" :class="{active:!paused}" src="@/assets/img/needle-ip6.png" alt="">
            <img class="disc" src="@/assets/img/disc-ip6.png" alt="">
            <img class="playImg" :src="playDetail.al.picUrl" alt="">
        </div>
        <div class="playLyric" v-show="isLyric" ref="playLyric">
            <p :class="{active:(currentTime*1000>=item.pre&&currentTime*1000<item.time)}" v-for="(item,i) in $store.getters.lyricList" :key="i">{{item.lyric}}</p>
            
        </div>
        <div class="progress"></div>
        <div class="playFooter">

            <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xunhuanbofang"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
                    <use xlink:href="#icon-shangyishou"></use>
                </svg>
                <svg v-if="paused" class="icon play" aria-hidden="true" @click="play">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
                <svg v-else class="icon play" aria-hidden="true" @click="play">
                <use xlink:href="#icon-zanting1"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click="goPlay(1)">
                    <use xlink:href="#icon-xiayishou"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-31liebiao"></use>
                </svg>

        </div>
    </div>
</template>
<script>
import { watch } from 'vue'
import { mapState } from 'vuex'
export default{
    props:['playDetail','paused','play'],
    data:function(){
        return{
            isLyric:true,
        }
    },
    computed:{
        ...mapState(['lyric','currentTime','playlist','playCurrentIndex']),

    },
    watch:{
        currentTime:function(newValue){
            let p = document.querySelector('p.active');
            let offsetTop = p.offsetTop;
            let h = this.$refs.playLyric.offsetHeight;

            this.$refs.playLyric.scrollTop = p.offsetTop;

        }
    },
    methods:{
        goPlay(num){

            let count = this.playCurrentIndex+(num)
            let index = this.playCurrentIndex+num

            if(index<0){
                index = this.playlist.length-1;
            }else if(index == this.playlist.length){
                index = 0
            }
            this.$store.commit('setPlayIndex',index)


        }
    }
}
</script>

<style lang="less" scoped>
.playMusic{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    .bg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-size: auto 100%;
        filter: blur(60px);
        background-position: center;
       
    }
    .playTop{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 7.5rem;
        height: 1.2rem;
        position: absolute;
        left: 0;
        top: 0;
        color: #fff;
        padding: 0 0.4rem;
        .icon{
            fill: #fff;
            width: 0.4rem;
            height: 0.4rem;
        }
        marquee{
            width: 5rem;
            flex: 1;

        }


    }
    .playContent{
        position: relative;
        width: 7.5rem;
        height: 7.5rem;
        left: 0;
        top: 1.5rem;
        .needle{
            width:2.5rem;
            height: auto;
            position: absolute; 
            left: 3.5rem;
            transform-origin: 0.3rem 0;
            transform: rotate(-10deg);
            transition: all 1s;
            z-index: 10;
        }
        .needle.active{
            width: 2.5rem;
            height: auto;
            position: absolute;
            left: 3.5rem;
            transform-origin: 0.3rem 0;
            transform: rotate(30deg);
            z-index: 10;
            transition: all 1s;
        }
        .disc{
            width: 5.5rem;
            height: auto;
            position: absolute;
            left: calc(50% - 2.75rem) ;
            top: 2.5rem;

        }
        .playImg{
            width: 3.4rem;
            height: 3.4rem;
            border-radius: 1.7rem;

            position: absolute;
            left: calc(50% - 1.7rem) ;
            top: 3.55rem;
        }
    }
    .playFooter{
        width: 7.5rem;
        height: 1.5rem;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.4rem;
        .icon{
            fill: #fff;
            width: 0.5rem;
            height: 0.5rem;
        }
        .play.icon{
            width: 1rem;
            height: 1rem;
        }
    }
    .playLyric{
        position: absolute;
        width:7.5rem;
        height: 8rem;
        left: 0;
        top: calc(50% - 4rem);
        overflow: scroll;
        text-align: center;
        color: #fff;
        padding: 0.2rem 0;
        .active{
            color: red;
        }
    }

    
}
</style>