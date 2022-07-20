<template>
  <el-row :gutter="24">
    <el-col :span="6" v-for="(item, index) in statiList" :key="index">
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <div>{{ item.title }}</div>
            <el-tag class="mx-1" :type="item.unitColor" effect="plain">
              {{ item.unit }}
            </el-tag>
          </div>
        </template>
        <div>
          <h1 class="font">{{ item.value }}</h1>
          <div class="bor"></div>
          <div class="card-bottom">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <div class="card-mini">
    <el-row :gutter="24">
      <el-col :span="3" v-for="(item, index) in tolist" :key="index">
        <el-card shadow="hover" @click="routesPath(item.path)"
          ><SvgIconVue :icon="item.icon"></SvgIconVue>
          <div>{{ item.title }}</div></el-card
        >
      </el-col>
    </el-row>
  </div>
  <div class="ec-card">
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header head">
              <div>订单统计</div>
              <div>
                <el-check-tag
                  v-for="item in tagData"
                  :key="item"
                  :checked="item.type === statiec"
                  @click="onChange(item.type)"
                  >{{ item.name }}</el-check-tag
                >
              </div>
            </div>
          </template>
          <div class="text item">
            <div style="height: 300px; width: 100%" id="main"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <div>
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>店铺及商品提示</span>
                <el-tag class="mx-1" type="danger" effect="plain">
                  店铺及商品提示
                </el-tag>
              </div>
            </template>
            <div>
              <el-row :gutter="24">
                <el-col :span="6" v-for="item in goods" :key="item">
                  <el-card shadow="hover" class="bgc">
                    <h2>{{ item.value }}</h2>
                    <div>{{ item.label }}</div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
        <div class="md-3">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>交易提示</span>
                <el-tag class="mx-1" type="danger" effect="plain">
                  需要立即处理的交易订单
                </el-tag>
              </div>
            </template>
            <div class="heig">
              <el-row :gutter="24">
                <el-col :span="6" v-for="item in order" :key="item">
                  <el-card shadow="hover" class="bgc">
                    <h2>{{ item.value }}</h2>
                    <div>{{ item.label }}</div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import statiApi from '@/api/stati'
import SvgIconVue from '@/components/SvgIcon.vue'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
const router = useRouter()
const statiList = ref('[]')
const statiec = ref('week')
const goods = ref()
const order = ref()
const tagData = reactive([
  {
    name: '近1个月',
    type: 'month'
  },
  {
    name: '近1周',
    type: 'week'
  },
  {
    name: '近24小时',
    type: 'hour'
  }
])
const routesPath = (path) => {
  router.push(path)
}
const tolist = ref([
  {
    title: '用户',
    icon: 'user',
    path: '/user/list'
  },
  {
    title: '商品',
    icon: 'shopping-cart',
    path: '/goods/list'
  },
  {
    title: '订单',
    icon: 'buyShop',
    path: '/order/list'
  },
  {
    title: '评价',
    icon: 'notify',
    path: '/comment/list'
  },
  {
    title: '图库',
    icon: 'pictures',
    path: '/image/list'
  },
  {
    icon: 'proclaim',
    title: '公告',
    path: '/notice/list'
  },
  {
    title: '配置',
    icon: 'set-up',
    path: '/setting/base'
  },
  { title: '优惠券', icon: 'couponColor', path: '/coupon/list' }
])
const res = ref()
onMounted(async () => {
  res.value = await statiApi.statiEc('week')
  // console.log(res)
  init()
})
function init() {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById('main'))
  // 指定图表的配置项和数据
  const option = {
    xAxis: {
      data: res.value.data.x
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: res.value.data.y
      }
    ]
  }
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}
// const weekdata=ref('week')
const getStati = async () => {
  const res = await statiApi.statiCard()
  // console.log(res)
  statiList.value = res.data.panels
}
getStati()
const getStatiData = async () => {
  const res = await statiApi.statiData()
  goods.value = res.data.goods
  order.value = res.data.order
}
getStatiData()
const onChange = async (type) => {
  statiec.value = type
  res.value = await statiApi.statiEc(type)
  // console.log(res)
  init()
}
</script>
<style scoped lang="scss">
.md-3 {
  margin-top: 10px;
}
.content {
  height: 120px;
  padding: 20px;
  font-size: 14px;
}
:deep(.el-card__header) {
  padding: 0;
  border-bottom: 1px solidvar(--el-card-border-color);
  box-sizing: border-box;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // height: 24px;
  padding: 8px;
}
:deep(.el-card__body) {
  // height: 140px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  h2 {
    margin-bottom: 10px;
  }
}
:deep(.bgc) {
  background-color: #f6f6f6;
}
.font {
  font-size: 30px;
  font-weight: 600;
  color: #6b7280;
}
.card-bottom {
  font-size: 14px;
  color: #6b7280;
  display: flex;
  justify-content: space-between;
}
.bor {
  height: 1px;
  width: 100%;
  background-color: #dcdfe6;
  margin: 24px 0;
}
.card-mini {
  margin-top: 20px;
  text-align: center;
  div {
    margin-top: 3px;
  }
}
head {
  display: flex;
  justify-content: space-between;
  height: 55px;
}
.ec-card {
  margin-top: 20px;
}
</style>
