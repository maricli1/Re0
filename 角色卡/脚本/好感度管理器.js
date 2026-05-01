let woman_likeability_list = [
    '生理性厌恶: 将你的存在本身视为一种污染，光是看到你就会感到恶心，会用最恶毒的手段让你从她的世界里彻底消失',
    '深刻的憎恨: 对你怀有强烈的恨意，会抓住一切机会公开羞辱你，让你在社交上彻底孤立，并享受你的痛苦',
    '鄙夷与轻视: 认为你是一个毫无价值的人，对你的一切都嗤之以鼻，言语中充满不加掩饰的嘲讽与蔑视',
    '冰冷的嫌弃: 对你极不耐烦，会无视你的搭话，用冰冷的眼神和简短的话语将你拒之门外',
    '回避与反感: 对你的靠近感到不适，会下意识地避开你，不愿意与你有任何肢体或眼神接触',
    '毫无交集的陌生人: 对你没有任何特别的感觉，视你为背景板的一部分',
    '产生初步兴趣: 觉得你和其他人有些不同，对你的言行抱有好奇心，愿意以礼貌的态度与你交谈',
    '在意与关心: 开始在意你的事情，会偷偷观察你，在你遇到麻烦时会感到担忧，和你说话时偶尔会脸红',
    '萌生的好感: 对你怀有明显的少女情愫，享受与你独处的时光，会为你精心准备，并期待你的赞美',
    '深切的爱慕: 已经深深地爱上了你，对你有着强烈的占有欲，愿意为你付出一切，并渴望与你有更亲密的关系',
    '唯一的挚爱: 将你视为自己生命中唯一且不可替代的伴侣，她的世界以你为中心，愿意放弃一切与你共度余生，无论天堂或地狱'
];
let man_likeability_list = [
    '不共戴天之仇: 将你视为必须铲除的死敌，会不惜一切代价主动寻找机会将你置于死地',
    '切齿之恨: 对你怀有极深的憎恨，虽然不会主动寻死，但若有机会，会毫不犹豫地进行致命的报复与陷害',
    '根深蒂固的厌恶: 极度鄙夷和厌恶你，会在背后散播你的谣言，让你声名狼藉，并拒绝任何形式的合作',
    '明显的敌意与不屑: 公开表示对你的轻蔑，言语充满讽刺与挑衅，认为与你共处一室都是一种侮辱',
    '冷淡与戒备: 对你抱有怀疑和不信任，交谈时态度冷漠，时刻与你保持距离，并对你的动机充满警惕',
    '完全的陌生人: 对你没有任何印象，态度中立且漠不关心，如同对待任何一个路人',
    '初步的友善: 认为你是一个可以正常交流的人，态度礼貌，愿意进行简单的对话与合作',
    '值得信赖的伙伴: 对你产生了一定的信任感，认为你很有趣，愿意分享一些不那么重要的信息，并肩作战时会感到安心',
    '亲密的战友: 将你视为可以托付后背的可靠伙伴，会主动与你分享情报，关心你的安危，并邀请你一同行动',
    '推心置腹的挚友: 将你当作生活中不可或缺的朋友，愿意向你倾诉烦恼，分享秘密，并会为了你的荣誉而战',
    '可托付生死的兄弟: 将你视为超越血缘的家人与生死之交，你的事就是他的事，无论面对何种绝境，都会毫不犹豫地为你献出生命'
];
// 等待 Mvu 全局对象初始化完成
await waitGlobalInitialized('Mvu');
function get_woman_likeability_text(likeability){
    // 确保好感度在范围内
    likeability = Math.max(-100, Math.min(100, likeability));
    
    if(likeability <= -80){
        return woman_likeability_list[0];
    }else if(likeability <= -60){
        return woman_likeability_list[1];
    }else if(likeability <= -40){
        return woman_likeability_list[2];
    }else if(likeability <= -20){
        return woman_likeability_list[3];
    }else if(likeability < 0){
        return woman_likeability_list[4];
    }else if(likeability === 0){
        return woman_likeability_list[5];
    }else if(likeability <= 20){
        return woman_likeability_list[6];
    }else if(likeability <= 40){
        return woman_likeability_list[7];
    }else if(likeability <= 60){
        return woman_likeability_list[8];
    }else if(likeability <= 80){
        return woman_likeability_list[9];
    }else{
        return woman_likeability_list[10];
    }
}

function get_man_likeability_text(likeability){
    // 确保好感度在范围内
    likeability = Math.max(-100, Math.min(100, likeability));
    
    if(likeability <= -80){
        return man_likeability_list[0];
    }else if(likeability <= -60){
        return man_likeability_list[1];
    }else if(likeability <= -40){
        return man_likeability_list[2];
    }else if(likeability <= -20){
        return man_likeability_list[3];
    }else if(likeability < 0){
        return man_likeability_list[4];
    }else if(likeability === 0){
        return man_likeability_list[5];
    }else if(likeability <= 20){
        return man_likeability_list[6];
    }else if(likeability <= 40){
        return man_likeability_list[7];
    }else if(likeability <= 60){
        return man_likeability_list[8];
    }else if(likeability <= 80){
        return man_likeability_list[9];
    }else{
        return man_likeability_list[10];
    }
}

eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, async (variables) => {
    let last_data = Mvu.getMvuData({ type: 'message', message_id: -3 });
    let last_object = _.get(last_data, 'stat_data.关系列表') || {};
    
    try{
        var object_list = _.get(variables, 'stat_data.关系列表');
        for(let key in object_list){
            if(object_list.hasOwnProperty(key)){
                let child_object = object_list[key];
                var sex = child_object.性别;
                let current_likeability = child_object.好感度;

                // 检查上次数据中是否有这个角色
                if(last_object.hasOwnProperty(key)){
                    let last_likeability = last_object[key].好感度;
                    let difference = current_likeability - last_likeability;
                    
                    // 限制变化幅度在-5到5之间
                    if(difference > 5){
                        current_likeability = last_likeability + 5;
                    }else if(difference < -5){
                        current_likeability = last_likeability - 5;
                    }
   
                    // 确保好感度不超出范围
                    current_likeability = Math.max(-100, Math.min(100, current_likeability));
                }
                console.log("当前好感度",current_likeability);
                // 更新好感度
                child_object.好感度 = current_likeability;
                
                // 根据性别获取对应的态度文本
                if(sex === '男'){
                    let likeability_text = get_man_likeability_text(current_likeability);
                    _.set(variables, `stat_data.关系列表.${key}.对你态度`, likeability_text);
                }
                else if (sex === '女'){
                    let likeability_text = get_woman_likeability_text(current_likeability);
                    _.set(variables, `stat_data.关系列表.${key}.对你态度`, likeability_text);
                }
            }
        }
        await Mvu.replaceMvuData(variables, {type:'chat'});
    }
    catch(e){
        console.error(e);
    }
});