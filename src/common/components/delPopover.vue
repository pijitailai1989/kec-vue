<template>
  <span>
    <el-popover ref="popover" placement="left" width="160" v-model="visible">
      <p>{{content}}</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="deleteItem(date)">确定</el-button>
      </div>
    </el-popover>
    <el-button v-popover:popover type="danger" size="mini" style="margin-left:5px">删除</el-button>
  </span>
</template>
 
<script>
module.exports = {
  name: "KecDelPopover",
  props: ["content", "date"],
  data: function() {
    return {
      visible: false
    };
  },
  methods: {
    deleteItem(data) {
      this.$emit('click',data)
      this.visible = false;
    }
  }
};
</script>
