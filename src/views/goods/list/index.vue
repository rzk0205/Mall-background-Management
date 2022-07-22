<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
      <div class="top">
        <el-form
          :inline="true"
          style="display: flex; width: 100%; margin-top: 10px"
          :model="searchData"
          ref="ruleFormRef"
          class="demo-form-inline"
        >
          <div style="margin-right: auto">
            <el-form-item
              label="关键词:"
              style="margin-right: auto"
              prop="title"
            >
              <el-input
                v-model="searchData.title"
                placeholder="商品名称"
                size="small"
              />
            </el-form-item>
            <el-form-item label="商品分类:" v-if="show" prop="category_id">
              <el-select
                v-model="searchData.category_id"
                placeholder="请选择商品分类"
                size="small"
                @change="se"
              >
                <el-option
                  v-for="item in cates"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item>
              <el-button size="small" type="primary" @click="handleSearch"
                >搜索</el-button
              >
              <el-button size="small" @click="resetForm">重置</el-button>
              <el-button @click="show = !show" link>{{
                show ? '收起' : '展开'
              }}</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>

      <el-tab-pane
        v-for="item in tabsData"
        :key="item"
        :label="item.label"
        :name="item.name"
      >
        <el-table
          ref="multipleTableRef"
          :data="tableList"
          style="width: 100%"
          v-loading="loading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="商品" width="300">
            <template #default="scope">
              <div class="commodity">
                <div>
                  <div v-if="!scope.row.cover" class="block imgs">
                    <div>FAILED</div>
                  </div>
                  <div v-else class="imgs">
                    <img :src="scope.row.cover" alt="" />
                  </div>
                </div>
                <div>
                  <p>{{ scope.row.title }}</p>
                  <p>
                    <span class="fc">￥{{ scope.row.min_price }}</span> |
                    <span>￥{{ scope.row.min_oprice }}</span>
                  </p>
                  <p>
                    分类:{{
                      scope.row.category ? scope.row.category.name : '未分类'
                    }}
                  </p>
                  <p>创建时间:{{ scope.row.create_time }}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="sale_count" label="实际销量" />

          <el-table-column
            property="status"
            label="商品状态"
            show-overflow-tooltip
          >
            <template #default="scope">
              <el-tag v-if="scope.row.status === 0" class="ml-2" type="danger"
                >仓库</el-tag
              >
              <el-tag v-if="scope.row.status === 1" class="ml-2" type="success"
                >上架</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            property="ischeck"
            label="审核状态"
            align="center"
            width="100"
          >
            <template #default="scope">
              <span v-if="scope.row.ischeck === 1">通过</span>
              <span v-if="scope.row.ischeck === 2">拒绝</span>
              <div v-if="scope.row.ischeck === 0" class="btn">
                <el-button type="success" size="small" plain
                  >通过审核</el-button
                >
                <el-button type="danger" size="small" plain>拒绝审核</el-button>
              </div>
              <span></span>
            </template>
          </el-table-column>
          <el-table-column
            property="stock"
            label="总库存"
            show-overflow-tooltip
          />
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="handleEdit(scope.row)"
                >修改</el-button
              >
              <el-button
                link
                size="small"
                :type="scope.row.goods_skus.length <= 0 ? 'danger' : 'primary'"
                >商品规格</el-button
              >
              <el-button
                link
                :type="
                  scope.row.goods_banner.length <= 0 ? 'danger' : 'primary'
                "
                size="small"
                >设置轮播图</el-button
              >
              <el-button
                link
                size="small"
                :type="scope.row.content ? 'primary' : 'danger'"
                >商品详情</el-button
              >
              <el-button link type="primary" size="small" @click="handleClick"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          @current-change="handleCurrent"
        />
      </el-tab-pane>
    </el-tabs>
    <el-drawer v-model="drawer2" :direction="direction">
      <template #title>
        <h4>新增</h4>
      </template>
      <template #default>
        <div></div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import goodsApi from '../../../api/goods'

const activeName = ref('all')
const tableList = ref()
const cates = ref()
const searchData = reactive({
  title: '',
  category_id: ''
})

const totalCount = ref()
const show = ref(false)
const loading = ref(false)
const pageSize = ref(1)
const drawer2 = ref(false)
const ruleFormRef = ref()
const tabsData = ref([
  {
    label: '全部',
    name: 'all'
  },
  {
    label: '审核中',
    name: 'checking'
  },
  {
    label: '出售中',
    name: 'saling'
  },
  {
    label: '已下架',
    name: 'off'
  },
  {
    label: '库存预警',
    name: 'min_stock'
  },
  {
    label: '已回收',
    name: 'delete'
  }
])
const handleClick = (a) => {
  activeName.value = a
  getGoodsList({ tab: a })
}
const se = (a) => {
  searchData.category_id = a
}
const handleCurrent = (a) => {
  pageSize.value = a
  getGoodsList()
}
const resetForm = () => {
  ruleFormRef.value.resetFields()
  activeName.value = 'all'
  getGoodsList()
}
const handleSearch = () => {
  // if (searchData.title.length === 0) {
  //   delete searchData.title
  // }
  // if (searchData.category_id.length === 0) {
  //   delete searchData.category_id
  // }
  getGoodsList()
}
const handleEdit = (item) => {
  drawer2.value = true
}
const getGoodsList = async (data) => {
  loading.value = true
  const obj = {
    tab: activeName.value,
    title: searchData.title,
    category_id: searchData.category_id
  }
  if (obj.title.length === 0) {
    delete obj.title
  }
  if (obj.category_id.length === 0) {
    delete obj.category_id
  }
  const res = await goodsApi.getGoods(pageSize.value, obj)
  console.log(res)
  tableList.value = res.data.list
  cates.value = res.data.cates
  totalCount.value = res.data.totalCount
  loading.value = false
}
getGoodsList()
</script>
<style scoped lang="scss">
.commodity {
  display: flex;
  color: #9ca3af;
  font-size: 14px;

  .imgs {
    width: 50px;
    height: 50px;

    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .fc {
    color: red;
    font-size: 16px;
  }
}
// .btn {
//   .el-button + .el-button {
//     margin-left: 0;
//   }
// }

.top {
  font-size: 12px;
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: space-between;
}
.ipt {
  width: 80px;
  height: 20px;
  font-size: 12px;
  margin-right: 50px;
}
:deep(.el-input__inner) {
  --el-input-inner-height: calc(var(--el-input-height, 32px) - 2px);
  width: 80px;
  flex-grow: 1;
  -webkit-appearance: none;
  color: var(--el-input-text-color, var(--el-text-color-regular));
  font-size: inherit;
  // height: 20px;
  line-height: var(--el-input-inner-height);
  // font-size: 12px;
  padding: 0;
  outline: 0;
  border: none;
  background: 0 0;
  box-sizing: border-box;
}
.active {
  color: red;
}
</style>
