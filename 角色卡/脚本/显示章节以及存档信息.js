
eventOn(getButtonEvent('显示信息'), async () => {
    const chat_id = SillyTavern.getCurrentChatId();
    const value = JSON.parse(window.localStorage.getItem(chat_id));
    try {
        const message = `当前章节序号: ${value.chapter_iter}\n当前章节名称: ${value.chapter_name}`;
        toastr.info(message, "当前章节信息");
    } catch (e) {
        console.error('显示章节信息出错:', e);
    }
});