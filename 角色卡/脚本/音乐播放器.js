//音乐链接，想放的歌放这里
const musicList = [
  'http://share.sunjiada.cn/data/music_42834953.mp3', 
  'http://share.sunjiada.cn/data/music_63181904.mp3', 
  'http://share.sunjiada.cn/data/music_93469854.mp3', 
  'http://share.sunjiada.cn/data/music_55726903.mp3',
  'http://share.sunjiada.cn/data/music_78378542.mp3',
  'http://share.sunjiada.cn/data/music_81431652.mp3',
  'http://share.sunjiada.cn/data/music_30672089.mp3',
  'http://share.sunjiada.cn/data/music_66788514.mp3'
];

// 当前播放的音乐索引
let currentIndex = 0;
// 音频类型，'bgm' 代表背景音乐
const audioType = 'bgm';
// 跟踪是否已开始播放
let hasStarted = false;
// 跟踪当前播放状态
let isPlaying = false;

// 播放指定索引的音乐
const playMusicByIndex = (index) => {
  if (index >= 0 && index < musicList.length) {
    currentIndex = index;
    const url = musicList[currentIndex];
    console.log(`正在播放: ${url}`);
    // 导入并播放选定的音频
    audioSelect({ type: audioType }, url);
    // 更新状态
    hasStarted = true;
    isPlaying = true;
  } else {
    console.log('索引超出范围');
  }
};

// 监听“下一首”按钮事件
eventOn(getButtonEvent('下一首'), async () => {
  console.log('点击了下一首');
  // 如果还未开始播放，则不执行任何操作
  if (!hasStarted) return;
  // 计算下一首的索引，如果超出末尾则循环到第一首
  const nextIndex = (currentIndex + 1) % musicList.length;
  playMusicByIndex(nextIndex);
});

// 监听“上一首”按钮事件
eventOn(getButtonEvent('上一首'), async () => {
  console.log('点击了上一首');
  // 如果还未开始播放，则不执行任何操作
  if (!hasStarted) return;
  // 计算上一首的索引，如果小于开头则循环到最后一首
  const prevIndex = (currentIndex - 1 + musicList.length) % musicList.length;
  playMusicByIndex(prevIndex);
});

// 监听“暂停与播放”按钮事件
eventOn(getButtonEvent('暂停与播放'), async () => {
  console.log('点击了暂停与播放');
  if (!hasStarted) {
    // 如果是第一次播放，从第一首开始
    playMusicByIndex(0);
  } else {
    // 如果已经开始播放，则切换播放/暂停状态
    isPlaying = !isPlaying;
    // 根据错误日志，audioPlay 的 play 参数需要是字符串 'true' 或 'false'
    // @ts-ignore
    audioPlay({ type: audioType, play: isPlaying.toString() });
  }
});