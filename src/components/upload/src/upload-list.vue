<template>
  <transition-group
    tag="ul"
    :class="[
      nsUpload.b('list'),
      nsUpload.bm('list', listType),
      nsUpload.is('disabled', disabled),
    ]"
    :name="nsList.b()"
  >
    <li
      v-for="file in files"
      :key="file.uid || file.name"
      :class="[
        nsUpload.be('list', 'item'),
        nsUpload.is(file.status),
        { focusing },
      ]"
      tabindex="0"
      @keydown.delete="!disabled && handleRemove(file)"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
    >
      <slot :file="file">
        <img
          v-if="
            listType === 'picture' ||
            (file.status !== 'uploading' && listType === 'picture-card')
          "
          :class="nsUpload.be('list', 'item-thumbnail')"
          :src="file.url"
          alt=""
        />
        <div
          v-if="file.status === 'uploading' || listType !== 'picture-card'"
          :class="nsUpload.be('list', 'item-info')"
        >
          <a
            :class="nsUpload.be('list', 'item-name')"
            @click.prevent="handlePreview(file)"
          >
            <byte-icon :class="nsIcon.m('document')"><Document /></byte-icon>
            <span :class="nsUpload.be('list', 'item-file-name')">
              {{ file.name }}
            </span>
          </a>
          <!-- <el-progress
            v-if="file.status === 'uploading'"
            :type="listType === 'picture-card' ? 'circle' : 'line'"
            :stroke-width="listType === 'picture-card' ? 6 : 2"
            :percentage="Number(file.percentage)"
            :style="listType === 'picture-card' ? '' : 'margin-top: 0.5rem'"
          /> -->
        </div>

        <label :class="nsUpload.be('list', 'item-status-label')">
          <byte-icon
            v-if="listType === 'text'"
            :class="[nsIcon.m('upload-success'), nsIcon.m('circle-check')]"
          >
            <circle-check />
          </byte-icon>
          <byte-icon
            v-else-if="['picture-card', 'picture'].includes(listType)"
            :class="[nsIcon.m('upload-success'), nsIcon.m('check')]"
          >
            <Check />
          </byte-icon>
        </label>
        <byte-icon
          v-if="!disabled"
          :class="nsIcon.m('close')"
          @click="handleRemove(file)"
        >
          <Close />
        </byte-icon>
        <!-- Due to close btn only appears when li gets focused disappears after li gets blurred, thus keyboard navigation can never reach close btn-->
        <!-- This is a bug which needs to be fixed -->
        <!-- TODO: Fix the incorrect navigation interaction -->
        <i v-if="!disabled" :class="nsIcon.m('close-tip')">您确认删除吗？</i>
        <span
          v-if="listType === 'picture-card'"
          :class="nsUpload.be('list', 'item-actions')"
        >
          <span
            :class="nsUpload.be('list', 'item-preview')"
            @click="handlePreview(file)"
          >
            <byte-icon :class="nsIcon.m('zoom-in')"><zoom-in /></byte-icon>
          </span>
          <span
            v-if="!disabled"
            :class="nsUpload.be('list', 'item-delete')"
            @click="handleRemove(file)"
          >
            <byte-icon :class="nsIcon.m('delete')"><Delete /></byte-icon>
          </span>
        </span>
      </slot>
    </li>
    <slot name="append" />
  </transition-group>
</template>
<script lang="ts" setup>
import byteIcon from '@/components/byte-icon.vue'
import { ref } from 'vue'
import {
  Check,
  CircleCheck,
  Close,
  Delete,
  Document,
  ZoomIn,
} from '@element-plus/icons-vue'
import { useNamespace } from '@/hooks'

import { uploadListEmits, uploadListProps } from './upload-list'
import type { UploadFile } from './upload'

defineOptions({
  name: 'ElUploadList',
})

defineProps(uploadListProps)
const emit = defineEmits(uploadListEmits)

const nsUpload = useNamespace('upload')
const nsIcon = useNamespace('icon')
const nsList = useNamespace('list')

const focusing = ref(false)

const handleRemove = (file: UploadFile) => {
  emit('remove', file)
}
</script>