<template>
  <div class="layout">
    <div class="layout-content">
      <Row type="flex" justify="center">
        <Col span="5">
        <Affix :offset-top="50">
          <Menu :active-name="curWikiIndex" @on-select="menuSelect" ref="knowledgeMenu">
            <MenuGroup :title="key" v-for="(list,key) in wikis" :key="key">
              <MenuItem v-for="(item,index) in list" :name="item.id" :key="index">
                {{item.name}}
              </MenuItem>
            </MenuGroup>
          </Menu>
        </Affix>
        </Col>
        <Col span="19">
        <div style="padding-top: 10px">
          <!--<Tabs type="card" :animated="false" @on-click="tabClick" :value="tabName">-->
          <!--<TabPane label="wiki内容" name="0">-->
          <h1 v-show="visible">
            {{wiki.name}}
            <a  @click="openEditWikiModel(wiki.id)"><Icon type="edit"></Icon></a>
          </h1>
          <p class="layout-tip" v-show="visible">
            {{wiki.create_user_name}}创建于{{wiki.create_at | fromNow}},{{wiki.update_user_name}}更新于{{wiki.update_at |
            fromNow}}
          </p>
          <div class="layout-content-main" v-html="wiki.content">
          </div>
          <!--<div class="layout-content-at">-->
          <!--<h1 v-show="visible">-->
          <!--附件下载-->
          <!--</h1>-->
          <!--<div style="margin: 35px;">-->
          <!--<a :key="item.id" v-for="item in attachments" :href="item.url">-->
          <!--{{item.name}}-->
          <!--</a>-->
          <!--</div>-->
          <!--</div>-->
          <!--</TabPane>-->
          <!--<TabPane label="创建wiki" name="1">-->
          <!--</TabPane>-->
          <!--</Tabs>-->
        </div>
        </Col>
      </Row>
    </div>
    <WikiEdit ref="wikiEdit" @update="findDetail"></WikiEdit>

  </div>
</template>

<script>
  import WikiEdit from './../wiki/wiki_create.vue'

  export default {
    created () {
      this.listWiki()
    },
    components: {
      WikiEdit
    },
    data () {
      return {
        curWikiIndex: 0,
        wikis: '',
        wiki: '',
        visible: false,
        title: '公共',
        topicId: 0,
        tabName: '0'
      }
    },
    watch: {
      '$route.query': 'listWiki'
    },
    methods: {
      menuSelect (index) {
        this.curWikiIndex = parseInt(index)
        this.visible = true
        this.findDetail(this.curWikiIndex)
      },
      findDetail (id) {
        this.$http.get('/api/project/wiki/findDetail', {
          params: {
            id: id
          }
        }).then((response) => {
          let res = response.data
          if (res.code === '00000') {
            this.wiki = res.data
          } else {
            this.$Message.error('系统异常')
          }
        }).catch(() => {
          this.$Message.error('系统异常')
        })
      },
      listWiki () {
        this.$http.get('/api/project/wiki/listAll', {
          params: {
            project_id: this.$route.query.project_id
          }
        }).then((response) => {
          let res = response.data
          if (res.code === '00000') {
            this.wikis = res.data
          } else {
            this.$Message.error('系统异常')
          }
        }).catch(() => {
          this.$Message.error('系统异常')
        })
      },
      openEditWikiModel (id) {
        this.$refs.wikiEdit.show(true,id);
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .layout-content {
    min-height: 600px;
    overflow: hidden;
    background: #fff;
  }

  .layout-tip {
    margin-left: 40px;
    font-size: 12px;
    color: #b2b2b2;
    margin-bottom: 15px;
  }

  .layout-content-main {
    min-height: 400px;
    margin-left: 15px;
    padding-left: 20px;
    padding-right: 20px;
  }

  h1 {
    font-size: 26px;
    font-weight: 400;
    margin-left: 35px;
    margin-top: 15px;
  }
</style>
