<template>
  <div id="main" :style="{width,height}"></div>
</template>
<script>
  import echarts from 'echarts'
    export default {
        name: 'kecEchart',
        // props: ['msgVal']
        props:[
            'width',
            'height',
            'serverdate'
        ],
        data () {
            return {
                charts: '',
                serverdates:['1月份', '2月份', '3月份', '4月份', '5月份', '6月份', '7月份','8月份','9月份','10月份','11月份','12月份'],
                objall:'',
            }
        },
        watch:{
            serverdate:function(newvVal,old){
                this.objall = newvVal
                // if(this.objall){
                // sessionStorage.setItem("objall", JSON.stringify(this.objall));
                // }
                // this.drawChart()
                this.drawPie('main')
              
            }
          
        },
        methods:{
            drawPie(id){

        if(this.objall){
             
                  var _this = this

               this.charts = echarts.init(document.getElementById(id))
                
               let obj = {
                 tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '1%',
                        right: '1%',
                        bottom: '1%',
                        containLabel: true
                    },
                    yAxis: {
                        type: 'value'
                    }
               }

               obj.xAxis = {
                        type: 'category',
                        data: this.objall.time
                    }

               if(this.objall.status==1){
                       obj.series = [
                           {
                            name: '用户订单',
                            type: 'bar',
                             barWidth : 40,
                            data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        },
                         {
                            name: '总计',
                            type: 'bar',
                            stack: '总计',
                            barGap: '-100%',
                            smooth: true,
                            barWidth : 40,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    textStyle: { color: '#000' },
                                    formatter: function(v) {
                                        return "总计：" + (v.value)
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'rgba(128, 128, 128, 0)',
                                    borderWidth: 1,
                                    borderColor: '#1FBCD2'
                                }
                            },
                             data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                        }]
                        // myChart.setOption(option,true)
                   this.charts.setOption(obj,true)
                   return false;
               }   
                       obj.series = [
                           
                         {
                            name: '总计',
                            type: 'bar',
                            stack: '总计',
                            barGap: '-100%',
                            smooth: true,
                            barWidth : 40,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    textStyle: { color: '#000' },
                                    formatter: function(v) {
                                        return "总计：" + (v.value)
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'rgba(128, 128, 128, 0)',
                                    borderWidth: 1,
                                    borderColor: '#1FBCD2'
                                }
                            },
                             data: this.objall.ordersum
                        }]

      

               if(this.objall.hasOwnProperty('hash')==true){
                    console.log('bert')
                    for(var e=0;e<this.objall.hash.length;e++){
  
                       var objf = {
                           name:this.objall.hash[e],
                           type:'bar',
                           barWidth : 40,
                           data:this.objall.arr[e]
                       }
              obj.series.unshift(objf)
                   }
               }else{

                // console.log(this.objall.ordersum)
                  var ade = {
                            name: '用户订单',
                            type: 'bar',
                             barWidth : 40,
                            data: this.objall.ordersum,
                        }
                   obj.series.push(ade)
               }
               
            
                   
                  
               this.charts.setOption(obj,true)
              } 
            }
        },
      //调用
        mounted(){
            this.$nextTick(function() {
                this.drawPie('main')
            })
        }
    }
</script>
<style lang='stylus' scoped>
  .content
    width 100%
</style>