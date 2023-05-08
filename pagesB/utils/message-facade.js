import {
  emojiMap,
  emojiUrl
} from './emojiMap';
/** 传入message.element（群系统消息SystemMessage，群提示消息GroupTip除外）
 * content = {
 *  type: 'TIMTextElem',
 *  content: {
 *    text: 'AAA[龇牙]AAA[龇牙]AAA[龇牙AAA]'
 *  }
 *}
 **/
// 群提示消息的含义 (opType)

const GROUP_TIP_TYPE = {
  MEMBER_JOIN: 1,
  MEMBER_QUIT: 2,
  MEMBER_KICKED_OUT: 3,
  MEMBER_SET_ADMIN: 4,
  // 被设置为管理员
  MEMBER_CANCELED_ADMIN: 5,
  // 被取消管理员
  GROUP_INFO_MODIFIED: 6,
  // 修改群资料，转让群组为该类型，msgBody.msgGroupNewInfo.ownerAccount表示新群主的ID
  MEMBER_INFO_MODIFIED: 7 // 修改群成员信息

}; // 解析小程序text, 表情信息也是[嘻嘻]文本

export function parseText(message) {
  // console.log(message,'消息--------------------')
  const renderDom = [];
  let temp = message.payload.text;
  let left = -1;
  let right = -1;

  while (temp !== '') {
    left = temp.indexOf('[');
    right = temp.indexOf(']');

    switch (left) {
      case 0:
        if (right === -1) {
          renderDom.push({
            name: 'span',
            text: temp
          });
          temp = '';
        } else {
          const _emoji = temp.slice(0, right + 1);

          if (emojiMap[_emoji]) {
            renderDom.push({
              name: 'img',
              src: emojiUrl + emojiMap[_emoji]
            });
            temp = temp.substring(right + 1);
          } else {
            renderDom.push({
              name: 'span',
              text: '['
            });
            temp = temp.slice(1);
          }
        }

        break;

      case -1:
        renderDom.push({
          name: 'span',
          text: temp
        });
        temp = '';
        break;

      default:
        renderDom.push({
          name: 'span',
          text: temp.slice(0, left)
        });
        temp = temp.substring(left);
        break;
    }
  }

  return renderDom;
} // 解析群系统消息

export function parseImage(message) {
  const renderDom = [{
    name: 'image',
    // 这里默认渲染的是 1080P 的图片
    src: message.payload.imageInfoArray[0].url
  }];
  return renderDom;
} // 解析视频消息

export function parseVideo(message) {
  const renderDom = {
    name: 'video',
    src: message.payload.videoUrl
  };
  return renderDom;
} // 解析语音消息

export function parseAudio(message) {
  const renderDom = {
    name: 'audio',
    src: message.payload.url,
    second: message.payload.second === 0 ? 1 : message.payload.second
  };
  return renderDom;
}
