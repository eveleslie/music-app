import { createStore } from 'vuex'
import api from '@/api/index.js'

export default createStore({
  state: {
    playlist:[{
      name: "彩券",
      id: 1486513704,
      al:{
        id: 96680121,
        name: "彩券",
        pic: 109951165386012140,
        picUrl: "http://p3.music.126.net/NP1Zg57UUbHNzAhw7n-LeA==/109951165386012146.jpg",
        pic_str: "109951165386012146"
      }}],
    playCurrentIndex:0,
    lyric:'',
    currentTime:0,
    intervalId:0,
    user:{
      isLogin:false,
      username:"未登录",
      account:{},
      userDetail:{},
    }
  },
  getters:{
    lyricList:function(state){
       let arr = state.lyric.split(/\n/igs).map((item,i,arr)=>{
          let min = parseInt(item.slice(1,3)) ;
          let sec = parseInt(item.slice(4,6)) ;
          let mill = parseInt(item.slice(7,10));

          
         return {
           
          min,sec,mill,
          lyric:item.slice(12,item.length),
          content:item,
          time:mill+sec*1000+min*60*1000
        }
      })
      
      arr.forEach((item,i)=>{
        if(i==0){
          item.pre = 0;
        }else{
          item.pre = arr[i-1].time
        }
        
      })
      return arr
  }
  },
  mutations: {
    setPlaylist:function(state,value){
      state.playlist = value
    },
    pushPlaylist:function(state,value){
      state.playlist.push(value)
    },
    setPlayIndex(state,value){
      state.playCurrentIndex = value
    },
    setLyric(state,value){
      state.lyric = value
    },
    setCurrentTime(state,value){
      state.currentTime = value
    },
    setUser(state,value){
      state.user = value
    }
  },
  actions: {
    async reqLyric(content,payload){
      console.log(payload)
      let result = await  api.getLyric(payload.id)
      content.commit('setLyric',result.data.lrc.lyric)
      console.log(result.data.lrc.lyric)
    },
    async phoneLogin(content,payload){
      let result = await  api.phoneLogin(payload.phone,payload.password);
      if(result.data.code==200){
        content.state.user.isLogin = true;
        content.state.user.account = result.data.account;
        
        let userDetail = await api.userDetail(result.data.account.id)
        content.state.user.userDetail = userDetail.data;
        localStorage.userData = JSON.stringify(content.state.user);
        content.commit('setUser',content.state.user)
      }
      return result;

    }

  },
  modules: {
  }
})
