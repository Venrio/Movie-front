<template>
  <div class="app-container">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1">
        <template #tab>
          <span>
            <apple-outlined />
            浏览记录
          </span>
        </template>
          <a-row type="flex" :gutter="[20,20]">
            <a-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4" v-for="(item, index) in listRecord" :key="index">
              <a-card hoverable style="width: 100%">
                <template #cover>
                  <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                </template>
                <a-card-meta :title=item.title>
                  <template #description>
                    <div>
                      <div class="tag">
                        <a-tag color="orange" style="margin-bottom: 10px">{{item.genres}}</a-tag>
                      </div>
                      <div class="time"><history-outlined /> 2020/09/30 22:00</div>
                    </div>
                  </template>
                </a-card-meta>
              </a-card>
              </a-col>
          </a-row>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #tab>
          <span>
            <apple-outlined />
            搜索电影
          </span>
        </template>

        <a-form
          style="margin-bottom: 20px; width: 100%;"
          :model="formState"
          name="horizontal_login"
          layout="inline"
          autocomplete="off"
          @finish="onFinish"
        >
        <a-row type="flex" :gutter="[20,20]" style="width: 100%;">
          <a-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
            <a-form-item>
              <a-input v-model:value="formState.keyWords" placeholder="请输入关键字"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
            <a-form-item>
              <a-input v-model:value="formState.kind" placeholder="请输入风格"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
            <a-form-item>
              <a-select
            placeholder="请选择性别"
            ref="select"
            v-model:value="formState.sex"
            style="width: 100%"
          >
            <a-select-option value="0">男</a-select-option>
            <a-select-option value="1">女</a-select-option>
            </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
            <a-form-item>
              <a-button type="primary" html-type="submit">搜索</a-button>
            </a-form-item>
          </a-col>
        </a-row>
        
        
          
        </a-form>

        <a-row type="flex" :gutter="[20,20]">
            <a-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4" v-for="(item, index) in list" :key="index">
              <a-card hoverable style="width: 100%">
                <template #cover>
                  <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                </template>
                <a-card-meta title="电影标题">
                  <template #description>
                    <div>
                      <div class="tag">
                        <a-tag color="orange" style="margin-bottom: 10px" >悬疑</a-tag>
                      </div>
                      <div class="time"><history-outlined /> 2020/09/30 22:00</div>
                    </div>
                  </template>
                </a-card-meta>
              </a-card>
              </a-col>
          </a-row>
      </a-tab-pane>
      <a-tab-pane key="3">
        <template #tab>
          <span>
            <apple-outlined />
            为你推荐
          </span>
        </template>
          <a-row type="flex" :gutter="[20,20]">
            <a-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4" v-for="(item, index) in list" :key="index">
              <a-card hoverable style="width: 100%">
                <template #cover>
                  <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                </template>
                <a-card-meta title="电影标题">
                  <template #description>
                    <div>
                      <div class="tag">
                        <a-tag color="orange" style="margin-bottom: 10px" >悬疑</a-tag>
                      </div>
                      <div class="time"><history-outlined /> 2020/09/30 22:00</div>
                    </div>
                  </template>
                </a-card-meta>
              </a-card>
              </a-col>
          </a-row>
      </a-tab-pane>
    </a-tabs>

    


  </div>


</template>
<script setup>
import { HistoryOutlined } from '@ant-design/icons-vue';
import { onMounted, reactive, ref } from "vue";
import { useUserStore } from '@/store/useUser'
import { useRoute } from 'vue-router'
import { getRecordMovieidApi,getRecordMovieInfoApi } from '@/api/record'

const {noticeClose, setNotice} = useUserStore()
const activeKey = ref('1')
const formState = reactive({
  keyWords: '',
  kind: '',
  sex: ''
})
const list = ref(
  [
    {name: '中国', tag: '肉肉肉肉', img: ''},
    {name: '中国', tag: '肉肉肉肉', img: ''},
    {name: '中国', tag: '肉肉肉肉', img: ''},
    {name: '中国', tag: '肉肉肉肉', img: ''},
    {name: '中国', tag: '肉肉肉肉', img: ''},
    {name: '中国', tag: '肉肉肉肉', img: ''},
    {name: '中国', tag: '肉肉肉肉', img: ''},
    {name: '中国', tag: '肉肉肉肉', img: ''},
  ]
)
onMounted(() => {
  getRecord()
})

// 搜索
const onFinish = () => {

}

let route = useRoute()
const id = route.query.id
const getRecordParam={
  pageSize:12,
  pageNum:1,
  param:{
    userid:Number(id)
  },
  searchId:[]
}
const listRecord = reactive([])

const getRecord=()=>{
  getRecordMovieidApi(JSON.stringify(getRecordParam)).then((res) => {
    for(let i=0;i<res.total;i++){
      getRecordParam.searchId.push(res.data[i].movieid)
    }
    getRecordMovieInfoApi(JSON.stringify(getRecordParam)).then((res) => {
      // console.log(res.data)
      listRecord.push(...res.data)
    })
  })
}

</script>
<style scoped lang="less">
  /deep/.ant-card-body {
    padding: 10px;
  }
</style>