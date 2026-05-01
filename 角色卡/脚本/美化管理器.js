// 等待 Mvu 全局对象初始化完成
await waitGlobalInitialized('Mvu');
//关闭美化
eventOn(tavern_events.GENERATE_AFTER_DATA,async () => {
    try {
        let last_message_id = await triggerSlash('/pass {{lastMessageId}}');
        if (last_message_id < 2) {
            console.log('关闭RE背景美化');
            await updateTavernRegexesWith(regexes => {
                regexes.forEach(regex => {
                    if (regex.script_name.includes('RE背景美化') && regex.enabled === true) {
                        regex.enabled = false;
                    }
                });
                return regexes;
            });
        }
    } catch (error) {
        console.error('出错', error);
    }
});
//开启美化
eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, async () => {
        try {
        let last_message_id = await triggerSlash('/pass {{lastMessageId}}');
        if (last_message_id >= 2) {
            console.log('启用RE背景美化');
            await updateTavernRegexesWith(regexes => {
                regexes.forEach(regex => {
                    if (regex.script_name.includes('RE背景美化') && regex.enabled === false) {
                        regex.enabled = true;
                    }
                });
                return regexes;
            });
        }
    } catch (error) {
        console.error('出错', error);
    }
});