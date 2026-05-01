let chapter_list = new Array(
        '第一卷:第一章:开始的结束',
        '第一卷:第二章:太迟的抵抗',
        '第一卷:第三章:结束与开始',
        '第一卷:第四章:第四次的正直',
        '第一卷:第五章:从零开始的异世界生活',
        '第一卷:终章:月亮都看在眼里',
        '第二卷:第一章:自觉的感情',
        '第二卷:第二章:约定之晨尚远',
        '第二卷:第三章:锁链的声响',
        '第二卷:第四章:薄暮之时的捉迷藏',
        '第二卷:终章:期望的早晨',
        '第三卷:第一章:重新开始',
        '第三卷:第二章:哭过喊过就会停止哭泣',
        '第三卷:第三章:勇气的意义',
        '第三卷:第四章:鬼上身的作法',
        '第三卷:第五章:ALL IN',
        '第三卷:终章:未来的事',
        '第四卷:第一章:再访王都',
        '第四卷:第二章:加持，再会，约定',
        '第四卷:第三章:感情恶劣到爆的与会成员',
        '第四卷:第四章:国王候补人选及其骑士们',
        '第四卷:第五章:自称骑士的我',
        '第四卷:终章:骑士们的想法',
        '第五卷:第一章:腐败的精神',
        '第五卷:第二章:开始变化的事态与雷姆的意志',
        '第五卷:第三章:名为绝望的疾病',
        '第五卷:第四章:疯狂的外侧',
        '第五卷:第五章:怠惰',
        '第六卷:第一章:拙稚的谈判',
        '第六卷:第二章:猪的欲望',
        '第六卷:第三章:白鲸之颚',
        '第六卷:第四章:无法诉诸言语',
        '第六卷:第五章:从零开始',
        '第六卷:第六章:被分到的卡片',
        '第七卷:第一章:被分到的手牌',
        '第七卷:第二章:决战前夕',
        '第七卷:第三章:白鲸攻略战',
        '第七卷:第四章:对抗绝望的赌注',
        '第七卷:第五章:威尔海姆．范．阿斯特雷亚',
        '第七卷:第六章:通往梅札斯领地之路',
        '第八卷:第一章:怠惰一闪',
        '第八卷:第二章:战斗吧',
        '第八卷:第三章:回来的意义',
        '第八卷:第四章:阴险狠毒的怠惰',
        '第八卷:第五章:履行契约',
        '第九卷:第一章:名为温暖的福音',
        '第九卷:第二章:准备好的舞台后',
        '第九卷:第三章:自称骑士和最优秀骑士',
        '第九卷:第四章:怠惰的末路',
        '第九卷:第五章:只是这样的故事',
        '第九卷:第六章间章:代价',
        '第九卷:第六章:各自的誓言',
        '第十卷:第一章:千辛万苦抵达的地方',
        '第十卷:第二章:通往圣域的路上',
        '第十卷:第三章:久候多时的重逢',
        '第十卷:第四章:亲子',
        '第十卷:第五章:踏出的一步',
                "第十一卷:第一章:女仆·女仆·女仆",
        "第十一卷:第二章:少女的福音",
        "第十一卷:第三章:朋友",
        "第十一卷:第四章:生命的价值",
        "第十一卷:第五章:魔女们的茶会",
        "第十一卷:第六章:我爱你爱你爱你爱你爱你爱你",
        "第十二卷:第一章:爱我爱我爱我爱我爱我爱我爱我爱我爱我爱我爱我爱我爱我爱我",
        "第十二卷:第二章:我知道地狱是什么样",
        "第十二卷:第三章:始自四百年前的吶喊",
        "第十二卷:第四章:死亡的味道",
        "第十二卷:第五章:Ending List",
        "第十二卷:第六章:魔女的茶会",
        "第十三卷:第一章:让人泫然欲泣的声音",
        "第十三卷:第二章:置胜算于度外",
        "第十三卷:第三章:STRAIGHT　BET",
        "第十三卷:第四章:谎言，骗子，唬烂精",
        "第十三卷:第五章:奥托·思文",
        "第十三卷:第六章:相信的理由",
        "第十三卷:第七章:奎恩之石一个人爬不上去",
        "第十三卷:第八章:情书",
        "第十四卷:第一章:──记忆的旅途",
        "第十四卷:第二章:圣域的起始，和崩坏的开始",
        "第十四卷:第三章:贝特鲁吉乌斯曾笑开怀的日子",
        "第十四卷:第四章:艾利欧尔大森林的永久冻土",
        "第十四卷:第五章:在唇瓣抹上殷红",
        "第十四卷:第六章:将谎言化作希望",
        "第十四卷:第七章:咆哮的重逢",
        "第十五卷:第一章:在罗兹瓦尔宅邸的最后一天",
        "第十五卷:第二章:映照在水面上的幸福",
        "第十五卷:第三章:──森林的漆黑之王•基尔缇拉乌来袭！！",
        "第十五卷:第四章:下次一定会举行茶会",
        "第十五卷:第五章:连鲜血和内脏都一并疼爱",
        "第十五卷:第六章:从复仇开始",
        "第十五卷:第七章:──选我吧",
        "第十五卷:第八章:雪的脸型",
        "第十五卷:幕间:各自的妥协",
        "第十五卷:终章:月光下，踩着随性的舞步",
        "第十五卷:余篇:──再度降临"
);

await waitGlobalInitialized('Mvu');

// 章节变更器
class ChapterChangeDetector {
    constructor() {
        this.world_book = getCharWorldbookNames('current').primary;
    }
    async onChapterChange(newChapter, flag, strategyType = 'constant') {
        await updateWorldbookWith(this.world_book, worldbook => {
            return worldbook.map(entry => {
                if (entry.name === newChapter) {
                    return {
                        ...entry,
                        enabled: flag,
                        strategy: {
                            ...entry.strategy,
                            type: strategyType
                        }
                    };
                }
                return entry;
            });
        });
    }
    async reset_chapter() {
        for (let i = 1; i < chapter_list.length; i++) {
            await updateWorldbookWith(this.world_book, worldbook => {
                return worldbook.map(entry => {
                    if (entry.enabled && entry.name === chapter_list[i]) {
                        return {
                            ...entry,
                            enabled: false,
                            strategy: {
                                ...entry.strategy,
                                type: 'selective'
                            }
                        };
                    }
                    return entry;
                });
            });
        }
        this.onChapterChange(chapter_list[0], true);
        toastr.info("世界书重置成功");
    }
}
const detector = new ChapterChangeDetector();

eventOn(getButtonEvent('推进'), async () => {
    const chat_id = SillyTavern.getCurrentChatId();
    let value = window.localStorage.getItem(chat_id);
    value = JSON.parse(value);
    try {
        const last_iter = value.chapter_iter;
        if (last_iter >= chapter_list.length - 1) {
            toastr.error("已经是最后一章了");
            return;
        }
        const new_iter = last_iter + 1;
        value.chapter_iter = new_iter;
        value.chapter_name = chapter_list[new_iter];
        window.localStorage.setItem(chat_id, JSON.stringify(value));
        await detector.onChapterChange(chapter_list[new_iter], true);
        await detector.onChapterChange(chapter_list[last_iter], false, 'selective');
        toastr.info("章节推进成功");
    } catch (e) {
        console.error('章节推进出错:', e);
    }
});