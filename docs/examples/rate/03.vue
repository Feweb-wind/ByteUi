<template>
    <byte-rate 
    v-model="rateValue"
    :icons="icons"
    :void-icon="voidIcon"
    :color="['#409eff', '#67c23a', '#FF9900']"></byte-rate>
</template>
<script lang="ts" setup>
import { ChatDotRound, ChatLineRound, ChatRound } from '@element-plus/icons-vue'
import {ref} from 'vue'
const rateValue = ref()
const voidIcon = ChatRound
const icons = [ChatRound,ChatLineRound,ChatDotRound]
</script>