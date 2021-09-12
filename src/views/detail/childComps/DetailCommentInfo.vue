<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
    <div class="header clear-fix">
      <span>用户评价</span>
      <span class="more">更多</span>
    </div>
    <div>
      <div class="info-user">
        <img :src="'http:' + commentInfo.user.avatar" alt="" />
        <span>{{ commentInfo.user.uname }}</span>
      </div>
      <div>
        <div class="info-rate">{{ commentInfo.content }}</div>
        <div class="info-other">
          <span>{{ createdDate }}</span>
          <span>{{ commentInfo.style }}</span>
        </div>
      </div>
      <div v-if="commentInfo.images" class="info-img">
        <img :src="'http:' + item" alt="" v-for="item in commentInfo.images" />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    createdDate() {
      const date = new Date(this.commentInfo.created * 1000);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
};
</script>

<style scoped>
.comment-info {
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}
.header {
  height: 50px;
  line-height: 50px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
.more {
  float: right;
  font-size: 14px;
}
.info-user {
  padding: 10px 0;
}
.info-user img {
  margin-right: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  vertical-align: middle;
}
.info-rate {
  font-size: 14px;
  color: #666;
}
.info-other {
  margin: 10px 0;
  color: #999;
}
.info-other span {
  font-size: 14px;
  margin-right: 10px;
}
.info-img img {
  width: 70px;
  height: 70px;
  margin-right: 10px;
}
</style>