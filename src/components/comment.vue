<!-- components/post-comment.vue -->
<template>
  <!-- 评论列表区域 -->
  <view class="comment">
    <view class="comment-list">
      <view class="comment-item" v-for="item in commentList" :key="item.id">
        <!-- 主评论内容 -->
        <view class="main-comment">
          <image class="avatar" :src="item.author?.userInfo?.avatarUrl" />
          <view class="content">
            <view class="nickname">{{ item.author?.userInfo?.nickName }}</view>
            <text class="text">{{ item.content }}</text>
            <view class="actions">
              <!-- <text @click="handleReply">回复</text> -->
              <!-- <text @click="toggleLike">点赞 {{ likeCount }}</text> -->
            </view>
          </view>
        </view>

        <!-- 递归渲染子评论 -->
        <!-- <view v-if="comment.replies" class="nested-replies">
                <comment-item 
                v-for="reply in comment.replies" 
                :key="reply.id"
                :comment="reply"
                @reply="$emit('reply', $event)"
                />
            </view> -->
      </view>
    </view>

    <!-- 分页加载提示 -->
    <view v-if="hasMore" class="load-more" @click="loadMore">
      点击加载更多
    </view>
  </view>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      commentList: [], // 评论数据
      replyContent: '', // 输入内容
      currentComment: null, // 当前回复对象
      page: 1,
      pageSize: 10,
    };
  },
  mounted() {
    this.getComments(this.id);
  },
  methods: {
    async getComments() {
      this.commentList = await this.$api.comment.getComments(this.id);
    },
    // 弹出回复框
    handleReply(comment) {
      this.currentComment = comment;
      this.$refs.popup.open();
      this.autoFocus = true;
    },

    // 提交评论
    async submitComment() {
      const params = {
        content: this.replyContent,
        postId: this.postId,
        parentId: this.currentComment?.id || null,
      };

      try {
        const res = await uni.request({
          url: '/api/comment',
          method: 'POST',
          data: params,
        });

        if (res.data.success) {
          this.refreshComments();
          this.$refs.popup.close();
        }
      } catch (e) {
        uni.showToast({ title: '发送失败', icon: 'none' });
      }
    },

    // 分页加载
    async loadMore() {
      this.page++;
      const newData = await this.fetchComments();
      this.commentList = [...this.commentList, ...newData];
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  box-sizing: border-box;
  margin: 0 15px;
  border-top: 1px solid #eeecec;
  padding-bottom: 80px;
  .comment-item {
    padding: 10px 0px 10px 0px;
    .main-comment {
      display: flex;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 5px;
      }

      .content {
        font-size: 14px;
        .nickname {
          color: #999;

          margin-bottom: 5px;
        }
        .text {
          margin-bottom: 5px;
        }
        .actions {
          font-size: 12px;
          color: #999;
        }
      }
    }

    //   margin-left: 20rpx;
    //   border-left: 2rpx solid #eee;
    //   padding-left: 20rpx;

    .nested-replies {
      // margin-left: 30rpx;
    }
  }
}
</style>
