<template>
	<view class="TUI-Emoji">
		<view v-for="(item, index) in emojiList" :key="index" class="TUI-emoji-image">
			<image :data-name="item.emojiName" :data-index="index + 1" class="emoji-image" :src="item.url" @tap="handleEnterEmoji"></image>
		</view>
	</view>
</template>

<script>
import { emojiName, emojiUrl, emojiMap } from '@/pagesB/utils/emojiMap.js';

export default {
	data() {
		return {
			emojiList: []
		};
	},

	components: {},
	props: {},

	beforeMount() {
		for (let i = 0; i < emojiName.length; i++) {
			this.emojiList.push({
				emojiName: emojiName[i],
				url: emojiUrl + emojiMap[emojiName[i]]
			});
		}
		this.emojiList = this.emojiList
	},

	methods: {
		handleEnterEmoji(event) {
			console.log(event)
			this.$emit('enterEmoji', {
				detail: {
					message: event.currentTarget.dataset.name
				}
			});
		}
	}
};
</script>
<style>
@import './index.css';
</style>
