<template>
    <div class="searchTop" :style="{}">
        <div class="searchTopNav">
            <div class="back" @click="$router.go(-1)">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
                
            </div>
            <div class="right">
                <input type="text" v-model="searchKeyword" :placeholder="placeholder" @keydown.enter="saveKeyWord">
            </div>
        </div>
        <div class="history" v-show="(searchSongs.length == 0)">
            <div class="historyLeft">
                历史
            </div>
            <div class="historyRight">
                <div @click="historySearch(item)" class="keywordItem" v-for="(item,i) in keywordList" :key="i">
                    {{item}}

                </div>
            </div>

        </div>
        <div class="searchSongs" v-show="(searchSongs.length!=0)">
        <div class="searchSongs-top">
            <div class="left">
                <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-playCircle"></use>
                </svg>
             <div class="text">
                <div class="title">播放全部</div>
             <div class="num">(共{{searchSongs.length}}首)</div>

             </div>

            </div>

        </div>
        <div class="list">
        <div class="playItem" v-for="(item,i) in searchSongs" :key="i">
            <div class="left">
                <div class="index">{{i+1}}</div>
                <div class="content">
                    <div class="title">{{item.name}}</div>
                    <div class="anthor">

                        <span class="name">{{item.al.name}}</span>

                    </div>
                </div>
            </div>
            <div class="right">
                <svg class="icon" aria-hidden="true" @click="setPlay(item,i)">
                    <use xlink:href="#icon-bofangqi"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-31liebiao"></use>
                </svg>
            </div>
        </div>
    </div>
    </div>

    </div>
</template>
<script>
import {searchMusic} from '@/api/index.js'
export default{
    data:function(){
        return{
            placeholder:"陈奕迅",
            keywordList:[],
            searchKeyword:'',
            searchSongs:[],
        }

    },
    beforeMount(){
        this.keywordList =localStorage.keywordList? JSON.parse(localStorage.keywordList):[]

    },
    methods:{
        saveKeyWord:async function(){

            this.keywordList.push(this.searchKeyword);
            this.keywordList = Array.from(new Set(this.keywordList)) 
            if(this.keywordList.length>10){
                this.keywordList = this.keywordList.slice(this.keywordList.length-10,this.keywordList.length)
            }
            localStorage.keywordList = JSON.stringify(this.keywordList)
            let result = await searchMusic(this.searchKeyword)
            this.searchSongs = result.data.result.songs
            console.log();
        },
        historySearch(keyword){
            this.searchKeyword = keyword;
            this.saveKeyWord();

        },
        setPlay(item,i){
            item.al = item.al;
            // item.al.picUrl = item.al.artist.img1v1Url
            this.$store.commit('pushPlaylist',item);
            this.$store.commit('setPlayIndex',this.$store.state.playlist.length-1);

        }
    }
}
</script>

<style lang="less" scoped>
.searchTop{
    width: 7.5rem;
    height: calc(100vh - 1.2rem);
    
    padding: 0 0.4rem;
    .searchTopNav{
        display: flex;
        width: 100%;
        height: 1.2rem;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        .icon{
            width: 0.5rem;
            height: 0.5rem;
        }
        .right{
            padding: 0 0 0 0.4rem;
            flex: 1;
            input{
                border: none;
                outline: none;
                border-bottom: 1.5px solid #666;
                width: 100%;
                height: 0.5rem;
                font-size: large;
            }
        }

    }
    .history{
        display: flex;
        margin-top: 1.2rem;
        .historyLeft{
            width: 1.2rem;
            height: 0.6rem;
            font-weight: 900;
            margin: 0.2rem 0;
            line-height: 0.6rem;
        }
        .historyRight{
            color: #666;
            display: flex;
            flex-wrap: wrap;
            flex:1;
            .keywordItem{
                background-color: #eee;
                padding: 0.6rem;
                padding: 0 0.2rem;
                border-radius: 0.4rem;
                line-height: 0.6rem;
                margin: 0.2rem 0.1rem;
            }
        }
    }
    .searchSongs{
    width: 7.5rem;
    padding: 0 0.4rem;
    background-color: #fff;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    margin-top: 0.4rem;
    position: fixed;
    top: 1.2rem;
    bottom: 1.2rem;
    overflow: scroll;
    .searchSongs-top{
    display: flex;
    justify-content: space-between;
    height: 1rem;
    align-items: center;
    .left{
        display: flex;
        align-items: center;
        .icon{
            width: 0.6rem;
            height: 0.6rem;
        }
        .title{
            font-size: 0.34rem;
            font-weight: 900;
        }
        .num{
            font-size: 0.3rem;
            color: #666;
        }
        .text{
            display: flex;
            align-items: center;
            margin-left: 0.2rem;
        }
        
    }
    .btn{
        font-size: 0.3rem;
        color: #fff;
        background-color: rgb(221, 83, 52);
        height: 0.6rem;
        line-height: 0.6rem;
        padding: 0.1rem;
        display: flex;
        align-items: center;
        border-radius: 0.4rem;
        

    }
}
.list {
        .playItem {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1rem;

            .left {
                flex: 1;
                display: flex;
                align-items: center;
                color: #666;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                word-break: break-all;
                word-wrap: break-word;

                .index {
                    width: 0.4rem;
                }

                .content {
                    padding-left: 0.4rem;
                    width: 100%;
                }

                .title {
                    width: calc(100% - 0.4rem);
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    word-break: break-all;
                    word-wrap: break-word;
                    font-size: 0.3rem;
                    font-weight: 900;
                    color: #000;
                    margin-bottom: 0.1rem;
                }

                .tag {
                    font-size: 0.2rem;
                    color: orangered;
                    border: 1px solid orangered;
                    border-radius: 0.1rem;
                    margin-right: 0.1rem;

                }

                .anthor {
                    color: #666;
                    display: flex;
                    overflow: hidden;
                    height: 0.35rem;

                    .name {
                        width: 3rem;
                    }
                }
            }

            .right {
                width: 1.6rem;

                .icon {
                    margin: 0 0.2rem
                }
            }

        }
    }
}
    
    
}
</style>