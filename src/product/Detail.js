/**
 * @author xuweichen@meitu.io
 * @date 10/28/16
 */
/*http://www.dcloud.io/hellomui/examples/nav_transparent.html*/

import React,{
    Component
} from 'react';
import {Page, ImageSlider, Model,HTMLText,NormalError,Store,Prompt,Util,Bridge,Spy,Toast} from '../common/lv';
import {Link } from 'react-router';
import DayRouter from './DayRouter';
var priceCalendarData = new Store('KEY_PRICE_CALENDAR');
var secureCodeStore = new Store('SECURE_CODE');
var pageInstance;
var visitedTagStore = new Store('VISITED_TAG',{},{lifetime: '1D'});
import '../css/product.css';

export default class Detail extends Page {
    headerview = {
        title: '产品详情',
        right: [
            {
                text: '优惠码',
                onClick(){
                    pageInstance.showPromotion();
                }
            }
        ]
    }
    static prefetch2(params){
        return Model.post('/sharedline/getlinedetail', {
            lineid: params.id,
            owner: params.owner
        },{
            useSecureCode: true
        })
    }
    static prefetch(params){
        return Promise.resolve({"Code":200,"DebugInfo":"","welcome":"欢迎使用最棒的旅行社管理系统v0.82","Data":{"Success":true,"Infos":{"LineID":10655,"LineName":"宜昌-重庆 风景文化 （5钻）7日6晚游","TemplateLineName":null,"Price":0.0,"CostPrice":-1.0,"LineTypeID":8,"OrderPersonCount":4324,"ViewCount":0,"lstLineType":null,"LineDays":7,"LineNights":6,"FromCityName":"武汉","FromCityID":477,"ToCityName":"宜昌","ToCityID":515,"ReturnTransport":"高铁","GroupType":1,"KeyWords":"西安,华山,兵马俑","RecommendReason":"船游长江最美航段","GoTransport":"飞机`","Character":"<p>2016产品新升级，携程会员独立成团，全程不拼团、不转团，不换车不换导不换团友，带着宝贝一起去high吧！</p><p><img src=\"/upload/image/2016/08/09/6360635151791332543481753.png\" title=\"\" alt=\"\"/></p><p><span style=\"text-decoration: underline;\"><em><span style=\"text-decoration: underline; font-size: 24px;\">上面的1张图片是单图导入</span></em></span></p><p><strong>下面3张图片是多图导入</strong></p><p><img src=\"/upload/image/2016/08/09/6360635154275414938990476.jpg\" style=\"\"/></p><p><img src=\"/upload/image/2016/08/09/6360635154317410074161819.jpg\" style=\"\"/></p><p><img src=\"/upload/image/2016/08/09/6360635154368189246075733.jpg\" style=\"\"/></p><p>图片导入完成了</p><p><br/></p>","Summary":"<p>线路概要很不错啊<br/></p>","RecommendActivity":"跟着感觉走","CostIncludeDesc":"1、交通：去程团队/散客机票含税费（团队机票将统一出票，散客机票因实时计价预订后即刻出票），回程火车票（动车二等座）。<br>2、小交通：景区内用车（30元自费）。<br>3、住宿：0星级酒店 标准2人间。<br>4、用餐：行程中团队标准用餐，团餐50自费（中式餐或自助餐或特色餐，含飞机上用餐，自由活动期间用餐请自理；如因自身原因放弃用餐，则餐费不退）。<br>5、门票：行程中所含的景点首道大门票，导游张XX,国家一级导游。<br>6、导服：全程陪同中文导游，导游张XX,国家一级导游。<br>7、儿童价标准：年龄5~100周岁（不含）。","CostNotIncludeDesc":null,"Notice":null,"FormType":0,"StarLevel":0,"OverStep":0,"IsSyncMarket":false,"lstLineCalendar":null,"TripList":[{"TripID":11799,"LineID":10655,"TripDays":1,"TripTitle":"抵达目的地，游览三峡大坝","TripDescription":"","TrafficType":0,"Remark":"夜宿游船","SupperInfo":null,"BreakFastInfo":null,"LunchInfo":null,"HotelInfo":null,"TravelDate":"0001/01/01 00:00:00","TravelDateStr":"0001-01-01","TripDetailList":[{"TripDetailID":12802,"TripID":11799,"DetailTime":"8:10","DetailTimePrefix":null,"TripTitle":"","TripDesc":"<p>早上八点的航班从虹桥机场出发前往古都西安旅游。请带好您的身份证信息<br/></p>","Remark":"飞机上不准吃饭喝水已经大声说话, 但是可以随意走动","UpdaterID":0,"UpdaterName":null,"DataChange_LastTime":"2017/03/26 20:35:30","ActiveType":0,"Distance":0,"DriveTime":null,"ReferPrice":null,"TakeTime":null,"ResourceDesc":null,"HotelInfoList":null,"DinnerInfo":null,"Destination":null,"POIList":[]},{"TripDetailID":12803,"TripID":11799,"DetailTime":"13:15","DetailTimePrefix":null,"TripTitle":"宜昌-三峡大坝旅游区--[有简介]","TripDesc":"<p>带好钩索,麻绳</p>","Remark":"爬墙有危险","UpdaterID":0,"UpdaterName":null,"DataChange_LastTime":"2017/03/26 20:35:30","ActiveType":0,"Distance":0,"DriveTime":null,"ReferPrice":null,"TakeTime":null,"ResourceDesc":null,"HotelInfoList":null,"DinnerInfo":null,"Destination":null,"POIList":[{"POIPics":[{"pictureID":323066,"PictureName":"","PicturePath":"http://image.meitu.io/upload/image/1/2017/06/146363303640575889883796112.jpg","LinkID":323066,"LinkPicturesID":0,"TravelStoreID":0},{"pictureID":323066,"PictureName":"","PicturePath":"http://image.meitu.io/upload/image/1/2017/06/146363303644053747717049854.jpg","LinkID":323066,"LinkPicturesID":0,"TravelStoreID":0},{"pictureID":323066,"PictureName":"","PicturePath":"http://image.meitu.io/upload/image/1/2017/06/146363303647321734412403650.jpg","LinkID":323066,"LinkPicturesID":0,"TravelStoreID":0},{"pictureID":323066,"PictureName":"","PicturePath":"http://image.meitu.io/upload/image/1/2017/06/146363303651537483898149746.jpg","LinkID":323066,"LinkPicturesID":0,"TravelStoreID":0}],"POIID":323066,"POIName":"西安城墙","CityName":null,"Description":"西安城墙，位于西安市中心区域，是古都标志性的景观。现存的城墙，建于明朝初年，是中国现存最完整的古城墙。城墙总周长约14公里，是在唐代皇城的基础上建成的，包括护城河、角楼等一系列设施。","CoverImageUrl":null,"IsClassic":0,"CommentScore":4.60,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null},{"POIPics":[{"pictureID":322169,"PictureName":"","PicturePath":"http://image.meitu.io/upload/image/1/2017/03/096362466246973255061462023.jpg","LinkID":322169,"LinkPicturesID":0,"TravelStoreID":0},{"pictureID":322169,"PictureName":"","PicturePath":"http://image.meitu.io/upload/image/1/2017/03/096362466247108126162718623.jpg","LinkID":322169,"LinkPicturesID":0,"TravelStoreID":0}],"POIID":322169,"POIName":"三峡大坝旅游区","CityName":null,"Description":"位于宜昌市的三峡大坝，是当今世界上最大的水利工程，于1994年正式动工修建，2006年全线完工。大坝为混凝土重力坝，坝顶总长3035米，坝顶高程185米，正常蓄水位175米，总库容393亿立方米，能够抵御百年一遇的特大洪水。\n三峡大坝旅游区目前对游客开放有三个景点：坛子岭、185平台（观景点）和截流纪念园，前两个位于长江北岸，截流纪念园位于长江南岸。坝顶不对外开放。除了在旅游区观赏大坝外，您还可乘坐三峡游轮近距离体验大坝。三峡大坝五级船闸是世界上最大的船闸。船闸全长6．4公里，其主体闸室部分1．6公里，船闸上下落差达113米，船舶通过船闸要翻越40层楼房的高度。您可尽情体验随船乘坐“水上电梯”的感受。","CoverImageUrl":null,"IsClassic":1,"CommentScore":4.40,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null}]},{"TripDetailID":12804,"TripID":11799,"DetailTime":"17:40","DetailTimePrefix":null,"TripTitle":"晚餐 休息","TripDesc":"<p>一起去吃正宗的羊肉泡馍,然后回酒店睡觉觉&nbsp;&nbsp;&nbsp;&nbsp;</p>","Remark":"带上 羊","UpdaterID":0,"UpdaterName":null,"DataChange_LastTime":"2017/03/26 20:35:30","ActiveType":0,"Distance":0,"DriveTime":null,"ReferPrice":null,"TakeTime":null,"ResourceDesc":null,"HotelInfoList":null,"DinnerInfo":null,"Destination":null,"POIList":[{"POIPics":[],"POIID":327195,"POIName":"西安鼓楼","CityName":null,"Description":"西安鼓楼与钟楼相望，是古城的标志性建筑之一。鼓楼始建于明洪武十三年（1380年），登上鼓楼，能够看到一面高1.8米的大鼓，还有24面刻着24节气的红鼓，非常有气势。此鼓楼内还展览着明清家具、瓷器和齐白石的书画。","CoverImageUrl":null,"IsClassic":0,"CommentScore":4.40,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null}]}],"ResourceTypeList":null,"Resource":null,"ResourceDesc":null},{"TripID":11800,"LineID":10655,"TripDays":2,"TripTitle":"清江画廊+朝天吼","TripDescription":"","TrafficType":0,"Remark":"两个景点距离较远，导游要尽快","SupperInfo":null,"BreakFastInfo":null,"LunchInfo":null,"HotelInfo":null,"TravelDate":"0001/01/01 00:00:00","TravelDateStr":"0001-01-01","TripDetailList":[{"TripDetailID":12807,"TripID":11800,"DetailTime":"0:00","DetailTimePrefix":null,"TripTitle":"","TripDesc":"","Remark":"","UpdaterID":0,"UpdaterName":null,"DataChange_LastTime":"2017/03/26 20:35:30","ActiveType":0,"Distance":0,"DriveTime":null,"ReferPrice":null,"TakeTime":null,"ResourceDesc":null,"HotelInfoList":null,"DinnerInfo":null,"Destination":null,"POIList":[]},{"TripDetailID":12805,"TripID":11800,"DetailTime":"7:10","DetailTimePrefix":null,"TripTitle":"我们去爬华山咯","TripDesc":"<p>今天我们一起去华山，爬华山请把身份证放在您的衣袋里.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>","Remark":"自古华山一条路.","UpdaterID":0,"UpdaterName":null,"DataChange_LastTime":"2017/03/26 20:35:30","ActiveType":0,"Distance":0,"DriveTime":null,"ReferPrice":null,"TakeTime":null,"ResourceDesc":null,"HotelInfoList":null,"DinnerInfo":null,"Destination":null,"POIList":[{"POIPics":[],"POIID":297718,"POIName":"翠华山滑雪场","CityName":null,"Description":"<p>翠华山滑雪场是西安首家滑雪场，被誉为“秦岭第一天然雪场”，更因其距离西安市区仅20公里，而被称之为“家门口的滑雪场”。翠华山滑雪场位于翠华山国家地质公园的天池和甘湫池两大王牌景点之间，雪道海拔1200米，平均宽度为50米，总长约700米。今年滑雪场进一步完善了滑雪的各项配套服务设施，新增了长200米的雪圈道一条，儿童嬉雪区一个以及老少皆宜的雪橇项目，让前来滑雪的游客提供了更多选择。另外还设立了餐饮服务中心，提供美味放心的简餐和热饮，以满足游客的消费需要。<br /></p><p>翠华山滑雪场拥有滑雪服、滑雪板等雪具1300余套，更专门订购了一批适合10岁左右儿童使用的滑雪雪具。雪场内配备多名教练及看护，并在滑雪场四周设有以海绵包裹的安全网。为大多数前来体验滑雪乐趣的游客做足了安全保护措施。<br /></p><p>翠华山滑雪场海拔1200米，冬季气温低、雪质好、雪道长、宽度大、坡度非常适合滑雪爱好者，有“秦岭第一雪场”之称。雪场设备精良，现有从奥地利进口的滑雪板、雪杖1130副，滑雪圈100个，雪橇车20辆，造雪机3台，大、小拖车2个，压雪","CoverImageUrl":null,"IsClassic":0,"CommentScore":4.10,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null},{"POIPics":[],"POIID":260735,"POIName":"青华山","CityName":null,"Description":"<p>青华山位于西安市长安区滦镇境内，地处秦岭山麓，海拔1678米，形若莲花卧佛，山上有寺庙12处，古为达官贵人郊游进香之地。青华山地势呈现南北走向，景区以山道为轴，全长约2.6公里，左右层峦叠嶂，自古以“青秀华美”而得期名。青华山主峰大顶奇拔伟峻，大顶南约1公里处是唐太宗李世民消夏避暑的离宫——翠薇宫遗址。青华山景区又是长安境内佛教宗派对地之一，景区内有名寺古刹遗址10余座。如今每逢农历三月初三、六月十五，青华山都有传统庙会，各地香客蜂拥而至，热闹非凡。</p>","CoverImageUrl":null,"IsClassic":0,"CommentScore":3.60,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":"34.0573654174805","BDLat":"108.838487318928","UpdaterID":0,"TravelStoreID":0,"UpdaterName":null}]},{"TripDetailID":12806,"TripID":11800,"DetailTime":"9:00","DetailTimePrefix":null,"TripTitle":"宜昌-清江画廊--[有简介],兴山-朝天吼漂流--[有简介]","TripDesc":"","Remark":"","UpdaterID":0,"UpdaterName":null,"DataChange_LastTime":"2017/03/26 20:35:30","ActiveType":0,"Distance":0,"DriveTime":null,"ReferPrice":null,"TakeTime":null,"ResourceDesc":null,"HotelInfoList":null,"DinnerInfo":null,"Destination":null,"POIList":[{"POIPics":[],"POIID":324537,"POIName":"清江画廊","CityName":null,"Description":"流经长阳的清江水域长约148公里，在县城龙舟坪西11公里处的清江上，1994年建成隔河岩大坝，大坝长165米，高150米。在大坝下游1公里处的清江上，有亚洲最长的铁索桥，桥长303米从隔河岩大坝游船码头，乘船可游览百岛湖。百岛湖位于隔河岩大坝坝区的上游，最初，这里有许多山峰耸立于清江两岸，由于隔河岩大坝的修建，清江水位上升几十米，使山峰成为湖中岛，故名百岛湖。乘船可依次游览倒影峡、白玉湖、平湖洛、柏园岛、武落钟离山、天柱山、巴人洞景区。","CoverImageUrl":null,"IsClassic":1,"CommentScore":4.40,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null},{"POIPics":[],"POIID":28982,"POIName":"朝天吼漂流","CityName":null,"Description":"<p>朝天吼漂流，位于宜昌市兴山县境内，宜昌至神农架的的中途， 属“一江两山”黄金旅游通道的重要结点，交通极为便利。<span lang=\"EN-US\">???</span></p><p>朝天吼有十分独特的“双子漂河道”：孔子河和夏阳河两条漂流河道可以供游客选择。孔子河位于高岚内十里画廊景区，全长<span lang=\"EN-US\">4.5</span>公里，落差<span lang=\"EN-US\">78</span>米，沿途可观太公钓鱼、孔雀岭、骆驼峰、昭君石等景观，河内自然风光原始，景观秀美，水质清澈，柔中带刚，适合年龄偏大、小朋友以及喜欢观赏风光的游客。</p><p>夏阳河位于高岚自然风景区外十里画廊区，全长<span lang=\"EN-US\">5</span>公里，落差<span lang=\"EN-US\">128</span>米，途经卧佛山、八缎锦、将军柱、朝天吼等景观，开敞大气，急流处，乱石穿空，惊险刺激，刚中有柔，是偏爱冒险、运动的年轻人的选择。两种不同风格适应了不同市场层面的需求。两条漂流河道起点不同，但殊途同归，在全国绝无仅有，漂流区内自然风光旖旎，可同时开展户外拓展、宿营等项目。</p>","CoverImageUrl":null,"IsClassic":1,"CommentScore":4.60,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":"31.2042713165283","BDLat":"110.932139543326","UpdaterID":0,"TravelStoreID":0,"UpdaterName":null}]}],"ResourceTypeList":null,"Resource":null,"ResourceDesc":null},{"TripID":11801,"LineID":10655,"TripDays":3,"TripTitle":"车溪民俗风景区+西陵峡口风景名胜区","TripDescription":"","TrafficType":0,"Remark":"夜宿游船","SupperInfo":null,"BreakFastInfo":null,"LunchInfo":null,"HotelInfo":null,"TravelDate":"0001/01/01 00:00:00","TravelDateStr":"0001-01-01","TripDetailList":[{"TripDetailID":12808,"TripID":11801,"DetailTime":"8:00","DetailTimePrefix":null,"TripTitle":"休息休息","TripDesc":"<p>爬山累吧？休息休息,晚上10:30分坐飞机回上海</p>","Remark":"","UpdaterID":0,"UpdaterName":null,"DataChange_LastTime":"2017/03/26 20:35:30","ActiveType":0,"Distance":0,"DriveTime":null,"ReferPrice":null,"TakeTime":null,"ResourceDesc":null,"HotelInfoList":null,"DinnerInfo":null,"Destination":null,"POIList":[]},{"TripDetailID":12809,"TripID":11801,"DetailTime":"9:00","DetailTimePrefix":null,"TripTitle":"宜昌-车溪民俗风景区--[有简介],宜昌-西陵峡世外桃源--[有简介],宜昌-西陵峡--[有简介],宜昌-西陵峡毛公山--[有简介]","TripDesc":"","Remark":"","UpdaterID":0,"UpdaterName":null,"DataChange_LastTime":"2017/03/26 20:35:30","ActiveType":0,"Distance":0,"DriveTime":null,"ReferPrice":null,"TakeTime":null,"ResourceDesc":null,"HotelInfoList":null,"DinnerInfo":null,"Destination":null,"POIList":[{"POIPics":[],"POIID":318573,"POIName":"车溪民俗风景区","CityName":null,"Description":"","CoverImageUrl":null,"IsClassic":0,"CommentScore":4.40,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null},{"POIPics":[],"POIID":323063,"POIName":"西陵峡世外桃源","CityName":null,"Description":"世外桃源景区座落在西陵峡峡口，高峡平湖之上，与三游洞风景区一江之隔，仙人溪风景区呖呖在目。极目远眺，雄伟的葛州坝水利水电工程横卧长江之上，一切霸气尽收眼底。秀丽的长江之色、奇特的溶洞风光与神秘的部落风情融为一体，是踏青郊游，放松身躯、体验人生的绝好去处。景区占地200余亩，有白马洞、桃源部落、桃花村三大景点构成，独特的风景，优美的风光，神秘的风情让其成为西陵峡口一道亮丽的风景线，更像一颗璀璨的明珠正散发出耀眼的光芒。","CoverImageUrl":null,"IsClassic":0,"CommentScore":3.80,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null},{"POIPics":[{"pictureID":322171,"PictureName":"","PicturePath":"http://image.meitu.io/upload/image/1/2017/03/096362466244474953197995575.jpg","LinkID":322171,"LinkPicturesID":0,"TravelStoreID":0},{"pictureID":322171,"PictureName":"","PicturePath":"http://image.meitu.io/upload/image/1/2017/03/096362466244852042117377347.jpg","LinkID":322171,"LinkPicturesID":0,"TravelStoreID":0},{"pictureID":322171,"PictureName":"","PicturePath":"http://image.meitu.io/upload/image/1/2017/03/096362466245329649119518019.jpg","LinkID":322171,"LinkPicturesID":0,"TravelStoreID":0},{"pictureID":322171,"PictureName":"","PicturePath":"http://image.meitu.io/upload/image/1/2017/03/096362466245634755363285582.jpg","LinkID":322171,"LinkPicturesID":0,"TravelStoreID":0}],"POIID":322171,"POIName":"西陵峡","CityName":null,"Description":"西陵峡位于湖北省宜昌市秭归县境内，因宜昌市的西陵山而得名。西起巴东官渡口，东至南津关，长约120公里，是长江三峡中最长的一条，也是自然风光最为优美的峡段，自古既以其航道曲折、怪石林立、滩多水急、行舟惊险而闻名。北宋文学家欧阳修曾留下“西陵山水天下佳”的名句。","CoverImageUrl":null,"IsClassic":0,"CommentScore":4.30,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null},{"POIPics":[],"POIID":319785,"POIName":"西陵峡毛公山","CityName":null,"Description":"黄牛山高入苍穹，一代天骄卧奇峰。喜爱高峡平湖观，清流长歌毛泽东。","CoverImageUrl":null,"IsClassic":0,"CommentScore":5.00,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null}]}],"ResourceTypeList":null,"Resource":null,"ResourceDesc":null},{"TripID":11802,"LineID":10655,"TripDays":4,"TripTitle":"神农架","TripDescription":"","TrafficType":0,"Remark":"住景区","SupperInfo":null,"BreakFastInfo":null,"LunchInfo":null,"HotelInfo":null,"TravelDate":"0001/01/01 00:00:00","TravelDateStr":"0001-01-01","TripDetailList":[{"TripDetailID":12810,"TripID":11802,"DetailTime":"0:10","DetailTimePrefix":null,"TripTitle":"回到上海，旅程愉快的结束了","TripDesc":"<p>坑吧？占用了你10分钟，还是在分机上，这也算是行程中的一天了</p>","Remark":"","UpdaterID":0,"UpdaterName":null,"DataChange_LastTime":"2017/03/26 20:35:30","ActiveType":0,"Distance":0,"DriveTime":null,"ReferPrice":null,"TakeTime":null,"ResourceDesc":null,"HotelInfoList":null,"DinnerInfo":null,"Destination":null,"POIList":[]},{"TripDetailID":12811,"TripID":11802,"DetailTime":"9:00","DetailTimePrefix":null,"TripTitle":"宜昌-神农架--[有简介],宜昌-神农架国际生态旅游区--[有简介],宜昌-神农架滑雪场--[有简介],神农架-神农架自然博物馆--[有简介],神农架-神农架龙潭野考站--[有简介]","TripDesc":"","Remark":"","UpdaterID":0,"UpdaterName":null,"DataChange_LastTime":"2017/03/26 20:35:30","ActiveType":0,"Distance":0,"DriveTime":null,"ReferPrice":null,"TakeTime":null,"ResourceDesc":null,"HotelInfoList":null,"DinnerInfo":null,"Destination":null,"POIList":[{"POIPics":[],"POIID":325674,"POIName":"神农架","CityName":null,"Description":"神农架（也称神农架林区），位于湖北省的西部，北面和南面分别于十堰市（武当山所在地）和宜昌市（三峡大坝所在地）相邻。神农架林区面积庞大，作为一个地级行政区，神农架林区内有多个镇、林场，其中神农架林区北部的松柏镇是林区的行政中心，南部的木鱼镇是林区的旅游接待中心镇。游客来到林区游玩，基本都是先到达这两个镇，两地相距约80公里。","CoverImageUrl":null,"IsClassic":0,"CommentScore":4.60,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null},{"POIPics":[],"POIID":9372,"POIName":"神农架国际生态旅游区","CityName":null,"Description":"神农架因华夏始祖炎帝神农氏在此架木为梯，采尝百草而得名。神农架世界地质公园由五个园区组成，分别为神农顶园区、官门山园区、天燕园区、大九湖园区和老君山园区。其中神农顶园区展示了壮丽的山岳地貌及典型地质剖面；官门山园区以其独特的地质博物馆和丰富的峡谷地貌景观为主；天燕园区主要地质景观是峡谷与岩溶地貌发育；大九湖园区以发育冰川地貌和高山草甸为特色；老君山园区发育断裂构造与水体景观。","CoverImageUrl":null,"IsClassic":0,"CommentScore":4.60,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null},{"POIPics":[],"POIID":327791,"POIName":"神农架滑雪场","CityName":null,"Description":"神农架旅游滑雪场在海拔2000米高的神农架酒壶坪，是我国南方旅游滑雪场，配有初级和中级旅游滑雪下坡雪道，坡度5至15度，设有拖迁式索道，由山顶呈“S”形穿林沐风飞驰而下，有惊无险，乐趣横生，每年都吸引了大批游客前来。滑雪接待大厅面积3000平方米，设有雪具房、咖啡屋、快餐厅、雪上用品店、医疗急救室和滑雪学校等，游人可以聘请滑雪教练滑雪场配置有大小拖牵索道和进口的人工造雪系统、压雪设备、雪地摩托车以及滑雪用具，开设了滑雪、滑圈、雪地摩托车、羊拉爬犁、雪橇、雪地自行车等丰富多彩的雪上项目。","CoverImageUrl":null,"IsClassic":0,"CommentScore":4.40,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null},{"POIPics":[],"POIID":302637,"POIName":"神农架自然博物馆","CityName":null,"Description":"神农架自然博物馆位于神农架政府所在地松柏镇内，是华中地区唯一的区域性自然博物馆，整个博物馆根据原始森林的特点来布置，这里集中了神农架大量的动物和植物标本以及各类奇石。","CoverImageUrl":null,"IsClassic":0,"CommentScore":4.30,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null},{"POIPics":[],"POIID":34256,"POIName":"神农架龙潭野考站","CityName":null,"Description":"<p>位于神农架国家级自然保护区内，是神农架野人考察的大本营，同时，也是金丝猴生活习性的重要观察点和野生动物救护站，内设野考工作展览室，如实反映国家对神农架野人两次考察情况。</p><p>野考站还辟有<span>“</span>神农架风物<span>”</span>摄影展，计有<span>500</span>多幅作品，神农云海、高山夕照、千年铁杉和百草秀姿等都是极受游客注目，最令人倾倒的是神农架金丝猴组照，它们都是现场拍摄的，内容从猴王、猴群到哨猴，从迁徙、觅食到午睡，从母子相依到猴群嬉戏，从恋猴谈情到夫妻交欢，无所不有，堪称动物世界的神农架金丝猴专辑。</p>","CoverImageUrl":null,"IsClassic":0,"CommentScore":0.00,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":"31.4958667755127","BDLat":"110.338382449528","UpdaterID":0,"TravelStoreID":0,"UpdaterName":null}]}],"ResourceTypeList":null,"Resource":null,"ResourceDesc":null},{"TripID":11803,"LineID":10655,"TripDays":5,"TripTitle":"船行 重庆  山城夜景","TripDescription":"","TrafficType":0,"Remark":"夜宿游船","SupperInfo":null,"BreakFastInfo":null,"LunchInfo":null,"HotelInfo":null,"TravelDate":"0001/01/01 00:00:00","TravelDateStr":"0001-01-01","TripDetailList":[{"TripDetailID":12812,"TripID":11803,"DetailTime":"8:00","DetailTimePrefix":null,"TripTitle":"","TripDesc":"<p>抵达重庆 蒋公码头</p>","Remark":"","UpdaterID":0,"UpdaterName":null,"DataChange_LastTime":"2017/03/26 20:35:30","ActiveType":0,"Distance":0,"DriveTime":null,"ReferPrice":null,"TakeTime":null,"ResourceDesc":null,"HotelInfoList":null,"DinnerInfo":null,"Destination":null,"POIList":[]},{"TripDetailID":12813,"TripID":11803,"DetailTime":"9:00","DetailTimePrefix":null,"TripTitle":"重庆-山城夜景--[有简介],重庆-山城步道--[有简介]","TripDesc":"","Remark":"","UpdaterID":0,"UpdaterName":null,"DataChange_LastTime":"2017/03/26 20:35:30","ActiveType":0,"Distance":0,"DriveTime":null,"ReferPrice":null,"TakeTime":null,"ResourceDesc":null,"HotelInfoList":null,"DinnerInfo":null,"Destination":null,"POIList":[{"POIPics":[],"POIID":291567,"POIName":"山城夜景","CityName":null,"Description":"“不览夜景，未到重庆”，雄伟的山城重庆，以辉煌的夜景闻名海内。","CoverImageUrl":null,"IsClassic":0,"CommentScore":4.50,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null},{"POIPics":[],"POIID":278069,"POIName":"山城步道","CityName":null,"Description":"<p>所谓步道，就是只能步行的城市小道。重庆是一个建在山地的城市，许多相邻的地方落差高达几十米，交通只能靠这种爬坡上坎的城市小道。过去一些有名的步道都很繁华热闹，重庆的许多老的遗址就在这些步道旁。随着大规模的旧城改造和交通条件的改善，这些步道慢慢地失去了作用，有的已经消失或者荒芜了。周边的一些有名的遗址也慢慢被人们遗忘而消失在漫漫的历史长河中......</p><p>修复完工的第三步道是其中的代表。这条步道地处渝中半岛南向坡面，由北向南，依次经过市中山医院（原国民党政府立法、司法院）、抗建堂、菩提金刚塔、法国仁爱堂旧址、悬空栈道等，全长1748米，紧凑地串联了一?系列传统街区和历史文化遗迹。步道最高点在菩提金刚塔附近，最低点位于山城巷入口处，高差79.5米。是一条颇具重庆城市特色的山城步道。</p>","CoverImageUrl":null,"IsClassic":0,"CommentScore":4.20,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":"29.5562419891357","BDLat":"106.575325043843","UpdaterID":0,"TravelStoreID":0,"UpdaterName":null}]}],"ResourceTypeList":null,"Resource":null,"ResourceDesc":null},{"TripID":11804,"LineID":10655,"TripDays":6,"TripTitle":"吃喝玩乐 ：解放碑+磁器口古镇+南滨路 +南山一棵树","TripDescription":"","TrafficType":0,"Remark":"住宿安排在市区","SupperInfo":null,"BreakFastInfo":null,"LunchInfo":null,"HotelInfo":null,"TravelDate":"0001/01/01 00:00:00","TravelDateStr":"0001-01-01","TripDetailList":[{"TripDetailID":12814,"TripID":11804,"DetailTime":"8:00","DetailTimePrefix":null,"TripTitle":"","TripDesc":"<p>集合出发</p>","Remark":"","UpdaterID":0,"UpdaterName":null,"DataChange_LastTime":"2017/03/26 20:35:30","ActiveType":0,"Distance":0,"DriveTime":null,"ReferPrice":null,"TakeTime":null,"ResourceDesc":null,"HotelInfoList":null,"DinnerInfo":null,"Destination":null,"POIList":[]},{"TripDetailID":12815,"TripID":11804,"DetailTime":"8:30","DetailTimePrefix":null,"TripTitle":"重庆-解放碑步行街--[有简介],重庆-解放碑商圈--[有简介],重庆-南山一棵树观景台--[有简介],重庆-南滨路美食街--[有简介],重庆-磁器口古镇--[有简介]","TripDesc":"","Remark":"","UpdaterID":0,"UpdaterName":null,"DataChange_LastTime":"2017/03/26 20:35:30","ActiveType":0,"Distance":0,"DriveTime":null,"ReferPrice":null,"TakeTime":null,"ResourceDesc":null,"HotelInfoList":null,"DinnerInfo":null,"Destination":null,"POIList":[{"POIPics":[],"POIID":325127,"POIName":"解放碑步行街","CityName":null,"Description":"步行街位于重庆市渝中区，以解放碑为中心，包括周边的民权路、邹容路和八一、五一路等处，是重庆最繁华的商业圈。这里百货公司、酒饭店数量众多，是购物、美食和走走逛逛的好去处，更是打望重庆美女的绝佳去处。","CoverImageUrl":null,"IsClassic":0,"CommentScore":4.30,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null},{"POIPics":[],"POIID":333797,"POIName":"解放碑商圈","CityName":null,"Description":"有“西部第一街”美誉的解放碑商贸中心区（CBD）有望跻身中国第三大商圈。 不足一平方公里的面积，拥有4400多家商业网点，20多家大型商场，近百个金融网点和证券交易所，同时还汇聚了超过500家的餐饮宾馆。","CoverImageUrl":null,"IsClassic":0,"CommentScore":4.50,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null},{"POIPics":[],"POIID":326262,"POIName":"南山一棵树观景台","CityName":null,"Description":"南山一棵树观景台位于重庆南岸区南山上，包括一棵树观景亭和野外休闲区，可同时容纳上千人，是观赏山城夜景的最佳地点之一。","CoverImageUrl":null,"IsClassic":0,"CommentScore":4.20,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null},{"POIPics":[],"POIID":176715,"POIName":"南滨路美食街","CityName":null,"Description":"这里是重庆市的名小吃中心。因为靠近解放碑，所以生意特别红火。胖子妈的串串和好又来酸辣粉是你随时去买都会排队的地方，还有山城小汤圆、王鸭子也非常好吃。解放碑的国泰电影院旁边有个本土串串也很不错，和胖子妈的串串是两种风格。","CoverImageUrl":null,"IsClassic":0,"CommentScore":4.20,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null},{"POIPics":[],"POIID":324313,"POIName":"磁器口古镇","CityName":null,"Description":"磁器口古镇位于重庆主城区以西的沙坪坝区，当年是个非常热闹的一个水陆码头，如今的古镇，是市民休闲娱乐的好去处。坐地铁来这里，踩踩青石石板路，品尝当地的美食小吃，再找个茶馆坐坐，感受下老重庆的风土人情。","CoverImageUrl":null,"IsClassic":1,"CommentScore":4.30,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null}]}],"ResourceTypeList":null,"Resource":null,"ResourceDesc":null},{"TripID":11805,"LineID":10655,"TripDays":7,"TripTitle":"重庆人民大礼堂 + 渣滓洞白公馆 +动车返回","TripDescription":"","TrafficType":0,"Remark":"饮食安排清淡","SupperInfo":null,"BreakFastInfo":null,"LunchInfo":null,"HotelInfo":null,"TravelDate":"0001/01/01 00:00:00","TravelDateStr":"0001-01-01","TripDetailList":[{"TripDetailID":12816,"TripID":11805,"DetailTime":"8:00","DetailTimePrefix":null,"TripTitle":"重庆-白公馆--[有简介],重庆-人民大礼堂--[有简介]","TripDesc":"","Remark":"","UpdaterID":0,"UpdaterName":null,"DataChange_LastTime":"2017/03/26 20:35:30","ActiveType":0,"Distance":0,"DriveTime":null,"ReferPrice":null,"TakeTime":null,"ResourceDesc":null,"HotelInfoList":null,"DinnerInfo":null,"Destination":null,"POIList":[{"POIPics":[],"POIID":322179,"POIName":"白公馆","CityName":null,"Description":"白公馆，原为四川大军阀白驹的别墅，1938年开始被国民党特务机关当作关押政治犯的秘密监狱，曾经关押过江竹筠（江姐）、小萝卜头等著名的革命烈士，也是小说《红岩》的原型地之一。这里真实再现了当年那段残酷的囚禁生活和革命党人的鉴定革命信念。\n\n白公馆曾经关押过：日爱国将领黄显声，同济大学校长周均时，爱国人士廖承志，共产党员宋绮云，徐林侠夫妇及幼子（就是小萝卜头）。1943年中美特种技术合作所成立后，白公馆改为招待所，其关押人员被迁往附近的渣滓洞，1947年4月回迁。","CoverImageUrl":null,"IsClassic":0,"CommentScore":4.20,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null},{"POIPics":[],"POIID":322181,"POIName":"人民大礼堂","CityName":null,"Description":"重庆市人民大礼堂位于人民路学田湾，是一座精美奇巧的仿古民族建筑群，也是重庆独具特色的标志建筑物之一。","CoverImageUrl":null,"IsClassic":0,"CommentScore":4.20,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":null,"BDLat":null,"UpdaterID":0,"TravelStoreID":0,"UpdaterName":null}]},{"TripDetailID":12817,"TripID":11805,"DetailTime":"9:00","DetailTimePrefix":null,"TripTitle":"重庆-重庆--[有简介],重庆-重庆大剧院--[有简介]","TripDesc":"","Remark":"","UpdaterID":0,"UpdaterName":null,"DataChange_LastTime":"2017/03/26 20:35:30","ActiveType":0,"Distance":0,"DriveTime":null,"ReferPrice":null,"TakeTime":null,"ResourceDesc":null,"HotelInfoList":null,"DinnerInfo":null,"Destination":null,"POIList":[{"POIPics":[],"POIID":174564,"POIName":"重庆","CityName":null,"Description":"重庆，简称：渝。座落于长江与嘉陵江交汇处，四面环山，两江环绕。城市依山傍水，风光秀丽。既以江城闻名，又以山城著称。每当夜幕降临，登高远眺，万家灯火，江面波光粼粼，其风景不逊维多利亚港湾。<br><br>拥有三千年悠久历史的重庆，旅游资源丰富。既有山水泉瀑洞的自然景观，具代表性的有：武隆喀斯特景区、巫山小三峡；又有红岩革命纪念馆、歌乐山烈士陵园、磁器口古镇等巴渝三峡陪都文化景观。<br><br>同时，重庆还是著名的火锅之都。重庆的美食头牌当属火锅，比较出名的有秦妈、小天鹅、巴乡鱼头、德庄等，来重庆，火锅不可不尝。<br><br>山城夜景、重庆火锅、美女，是重庆的三大名片！","CoverImageUrl":null,"IsClassic":1,"CommentScore":4.70,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":"29.561351776123","BDLat":"106.554998848742","UpdaterID":0,"TravelStoreID":0,"UpdaterName":null},{"POIPics":[],"POIID":126116,"POIName":"重庆大剧院","CityName":null,"Description":"<p>重庆大剧院是集歌剧、戏剧、音乐会演出，文化艺术交流，多功能为一体的大型社会文化设施。。建筑形态为地上7层，地下两层，外立面和屋面为玻璃墙，建筑呈不规则形态，观众厅是传统的马蹄形，正厅和两层楼座的观众都能看得到极优的舞台视线。屋面最高约64.06米。东西长约220米，南北宽约110米，内设大剧场约1850座，其中剧场内设置约930座、排练厅约300座。大剧院的材料采用为特大型、特级、高层建筑，抗震设防类别为乙类，设计使用年限100年。内部音效有很强的实际演出效果，演员们不用话筒就可以使全场的人们听到完美的音效。<br />大剧院的外围墙将采用翡翠色调，结构采用双层换气玻璃幕墙系统，当强光照在外面一层玻璃时，夹在两层玻璃中间的空气变热就从顶部冲出去，这样，不仅可以使墙体美观，而且可以有效缓解内层过热。由于外围玻璃墙体为内透光，一到晚上从外面看起来，大剧院就像透明、炙热的水晶球。</p>","CoverImageUrl":null,"IsClassic":0,"CommentScore":4.30,"GDLon":null,"GDLat":null,"GGLon":null,"GGLat":null,"BDLon":"29.5757446289063","BDLat":"106.585954279884","UpdaterID":0,"TravelStoreID":0,"UpdaterName":null}]},{"TripDetailID":12818,"TripID":11805,"DetailTime":"15:00","DetailTimePrefix":null,"TripTitle":"","TripDesc":"<p>重庆高铁 返回</p>","Remark":"","UpdaterID":0,"UpdaterName":null,"DataChange_LastTime":"2017/03/26 20:35:30","ActiveType":0,"Distance":0,"DriveTime":null,"ReferPrice":null,"TakeTime":null,"ResourceDesc":null,"HotelInfoList":null,"DinnerInfo":null,"Destination":null,"POIList":[]}],"ResourceTypeList":null,"Resource":null,"ResourceDesc":null}],"LinePicList":[],"TravelStoreInfo":{"CityId":2,"CityName":"","TravelStoreId":2,"Name":"上海国旅(正式)","Address":"上海市北京西路1277号国旅大厦","Tel":"021-66678888","Mobile":"15618297818","Email":"","Fax":"021-11111112","Contract":"孙","QQ":"666666","WeiXin":"旅行天下","Zone":"021222"},"Sales":null,"OperateUser":null,"__ChangeContent__":null,"DataChangeIP":null,"_logList_":null,"DataChangeStringID":null,"DataChangeLongID":0,"DataChangeCaseType":0,"ChangeDetailJson":null}}})
    }
    constructor(){
        super();
        pageInstance = this;
    }
    needShowPromotion(){
        return !visitedTagStore.getItem('visited') && !secureCodeStore.getItem()
    }
    checkPromotionCode(secureCode){
        secureCodeStore.setItem({secureCode});
    }
    showPromotion(){
        var self = this;

        Prompt.show({
            yesLabel:'立即查看',
            noLabel:'没有优惠码',
            onYes(e){
                visitedTagStore.setItem('visited',1);
                self.checkPromotionCode(e.value);
                self.getDetail();
            },
            onNo(){
                visitedTagStore.setItem('visited',1);
                // console.log('no')
            },
            title: '优惠码',
            message: '输入优惠码, 查看更低价格'
        })
    }
    componentWillUnmount(){
        this.slider && this.slider.slider({
            interval: 0
        });
    }
    componentDidMount(){
        this.getDetail();

    }
    componentWillMount(){
        this.state = {
            data: this.getInitialData()
        }

    }
    sharedHandler(){
        Toast.show('分享成功');
        Spy.send({
	    storeid: this.getParams('storeid'),
            token: btoa((+new Date)+this.getParams('owner')),
            owner: parseInt(this.getParams('owner')),
            pids: [this.getParams('id')]
        })
    }
    getDetail(){
        Detail.prefetch(this.props.params).then((rs)=>{
            var detailData = rs.Data.Infos||{};
            this.wechatReady(()=>{
                this.wechat.share({
                    title: this.getParams('sharetitle')||'我在美途旅旅发现了很赞的旅行线路, 快看看~~~', // 分享标题
                    desc: detailData.LineName, // 分享描述
                    link: location.href, // 分享链接
                    imgUrl: rs.Data.Infos.LinePicList[0] && rs.Data.Infos.LinePicList[0].PicturePath, // 分享图标
                });
                this.wechat.on('all', this.sharedHandler.bind(this))
            });

            this.setState({
                data: rs,
                selectedDay: priceCalendarData.getItem('selectedDay')
            },()=>{
                this.slider = mui("#slider");
                this.slider.slider({
                    interval: 5000
                });
            });
            this.needShowPromotion() && this.showPromotion();
        }).catch((e)=>{
            this.setState({
                data: null
            })
        });
    }
    render(){
        var rawData = this.state.data||{},
            data = rawData.Data,
            summary = data && (typeof data.Summary==='string' ? JSON.parse(data.Summary) : data.Summary);

        summary && (data.Summary = summary||{});
        data = data && data.Infos || {};

        return this.create(

            <div>
                <div className="mui-scroll mui-content">
                    <ImageSlider data={data.LinePicList} cropMode="375_200x2"/>
                    <p className="departure">{data.FromCityName}&nbsp;-&nbsp;{data.ToCityName}&nbsp;</p>
                    <div className="mui-table-view page-section">
                        <h1 className="product-name">{data.LineName}</h1>
                        <p>
                            <span className="prices">
                                <span className="stars">评分&nbsp;{data.StarLevel}&nbsp;星</span>
                                <b className="price">&yen;&nbsp;{data.CostPrice>0?data.CostPrice:data.Price}</b><span>&nbsp;{data.CostPrice>0?'批发价':'起'}</span>
                            </span>
                            <span className="">销量&nbsp;{data.OrderPersonCount}</span>
                        </p>
                    </div>
                    {
                        (data.Summary && data.Summary.ClassicScenicTagList) ?
                            (<div className="scenic-taglist">

                                {data.Summary.ClassicScenicTagList.map((tag,index)=>(
                                    <span className="mui-badge " key={"tag"+index}>
                                                {tag}
                                            </span>
                                ))}

                            </div>)
                            : null
                    }
                    {
                        this.state.data ?

                            <ul className="mui-table-view" style={{marginBottom:60}}>
                                <li className="mui-table-view-cell">
                                    <Link
                                        to={{pathname:"/product/"+data.LineID+"/pricecalendar"}}
                                        className="mui-navigate-right">
                                        <span className="mui-icon-extra mui-icon-extra-calendar"></span>
                                        <span>可订日期与价格</span>
                                        <span className="mui-pull-right field-value">
                                            {this.state.selectedDay && ('已选 '+Object.keys(this.state.selectedDay)[0]) || '请选择出行日期'}
                                        </span>
                                    </Link>

                                </li>
                                <li className="mui-table-view-divider"></li>
                                <li className="mui-table-view-cell ">
                                    <Link
                                        to={{pathname:"/product/"+data.LineID+"/features",state:{features: data.Character}}}
                                        className="mui-navigate-right">产品特色</Link>
                                </li>
                                <li className="mui-table-view-divider">推荐理由</li>
                                <li className="mui-table-view-cell field-value">
                                    <HTMLText html={data.RecommendReason}/>
                                </li>
                                {
                                    (data.TripList && data.TripList.length) ?
                                        <li className="mui-table-view-divider">线路行程</li> : null
                                }
                                {
                                    (data.TripList && data.TripList.length) ?
                                        <li className="mui-table-view-cell">
                                            {
                                                data.TripList.map((trip, index)=> {
                                                    return (
                                                        <div className="item-detail" key={"trip"+index}>
                                                            <span className="daytour-index">第{index + 1}天</span><span
                                                            className="daytour-title">{trip.TripTitle}</span>
                                                            <p className="daytour-desc">{trip.Remark}</p>
                                                            <dl className="daytour-food">
                                                                <dt><span className="mui-icon-extra mui-icon-extra-cold"></span>餐饮</dt>
                                                                <dd>早餐:&nbsp;{trip.BreakFastInfo}</dd>
                                                                <dd>午餐:&nbsp;{trip.LunchInfo}</dd>
                                                                <dd>晚餐:&nbsp;{trip.SuperInfo}</dd>
                                                            </dl>
                                                            <dl className="daytour-hotel">
                                                                <dt><span className="mui-icon-extra mui-icon-extra-hotel"></span>住宿</dt>
                                                                <dd>{trip.HotelInfo||"无"}</dd>
                                                            </dl>
                                                            <DayRouter data={trip.TripDetailList}/>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </li>
                                        :
                                        null
                                }
                                <li className="mui-table-view-divider">费用说明</li>
                                <li className="mui-table-view-cell field-value">
                                    <HTMLText html={data.CostIncludeDesc}/>
                                </li>
                            </ul>
                      :
                    <NormalError msg="请求失败, 点击刷新试试 -_-!" global={false}/>
                    }
                </div>
                {
                    data ?
                        <div className="mui-bar-footer action-btns">
                            <button className="mui-btn mui-btn-default mui-col-xs-4" onClick={()=>{Bridge.callPhone(data.Sales.Tel)}}><span className="mui-icon mui-icon-phone"></span>联系客服</button>
                            <Link to={{
                                pathname:"/product/booking/"+data.LineID,
                                state: {
                                    data: data,
                                    selectedDay: this.state.selectedDay
                                }
                            }} className="mui-btn mui-btn-warning mui-col-xs-8">立即预约</Link>
                        </div>
                        :
                    null
                }
                </div>

        )
    }
}
