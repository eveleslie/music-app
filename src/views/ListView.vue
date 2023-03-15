<template>
    <div class="listview">
        <listview-top :playlist="state.playlist"></listview-top>
        <play-list :playlist="state.playlist"></play-list>
    </div>
</template>

<script>
import {getPlaylistDetail} from '@/api/index.js'
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import listviewTop from '@/components/listviewTop.vue'
import playList from '@/components/playList.vue'
import store from '@/store/index.js'

export default{
    setup(){
        const route = useRoute();
        let state = reactive({list:[],
        playlist:{
            creator:{},
            tracks:[]
        },
    });
        onMounted(async ()=>{
            let id = route.query.id;
            console.log(route)
            let result = await getPlaylistDetail(id);
            state.playlist = result.data.playlist
            store.commit('setPlaylist',state.playlist.tracks)
            
            console.log(state.playlist.tracks)
        })
        return {
            state
        }
    },
    components:{
        listviewTop,
        playList,
    }

}
</script>