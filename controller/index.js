const models = require('../models');

exports.index = (req, res) => {
    res.render("index.ejs")
};

//유저테이블 불러오기
exports.userinfo = (req, res) => {
    models.userinfo.findAll().then((result) => {
        // console.log('sibalsiba', result);
        res.render("userinfo.ejs", { userinfo: result });
    });
};

//루트테이블의 도시들 불러오기
exports.route = (req, res) => {
    models.route.findAll().then((routeTable) => {
        // 모든 route_city 중복 제거
        // ['서울', '서울', '부산', '부산', '제주도', '제주도']를 
        // ['서울', '부산', '제주도']
        let routeCityResultArray = [];
        for (let i = 0; i < routeTable.length; i++) {
            routeCityResultArray.push(routeTable[i].dataValues.route_city);
        }
        const set = new Set(routeCityResultArray);
        routeCityResultArray = [...set];

        let routeDayResultArray = [];
        for (let i = 0; i < routeTable.length; i++) {
            routeDayResultArray.push(routeTable[i].dataValues.route_day);
        }
        const set1 = new Set(routeDayResultArray);
        routeDayResultArray = [...set1];

        models.detail.findAll().then((detailTable) => {
            // console.log(detailTable[0].dataValues)
            res.render('userinfo.ejs', { routeCity: routeCityResultArray, routeDay: routeDayResultArray, detailTable: detailTable });
        })
    });
}

//route_id를 통해 detail테이블의 정보 불러오기
exports.detail = (req, res) => {
    //지역과 날짜가 all일 때
    if (req.body.city === 'all' && req.body.day === 'all') {
        models.detail.findAll().then((data) => {
            detailArray = [];
            for (let j = 0; j < data.length; j++) {
                detailArray.push(data[j].dataValues.detail_comment)
            }
            res.send(detailArray)
        })
        //지역만 all일 때
    } else if (req.body.city === 'all' && req.body.day !== 'all') {
        console.log('aaaaaaaaaaaaa', req.body.city)
        models.route.findAll({
            attributes: ["route_id"],
            where: {
                route_day: req.body.day
            }
        }).then((data) => {
            for (let i = 0; i < data.length; i++) {
                console.log('route_id는', data[i].dataValues.route_id)
            }
            models.detail.findAll().then((dataa) => {
                detailArray = [];
                for (let j = 0; j < data.length; j++) {
                    detailArray.push(dataa[data[j].dataValues.route_id - 1].dataValues.detail_comment)
                }
                console.log('detailArray:', detailArray)
                res.send(detailArray)
            })
        })
        //날짜만 all일 때
    } else if (req.body.city !== 'all' && req.body.day === 'all') {
        models.route.findAll({
            attributes: ["route_id"],
            where: {
                route_city: req.body.city
            }
        }).then((data) => {
            for (let i = 0; i < data.length; i++) {
                console.log('route_id는', data[i].dataValues.route_id)
            }
            models.detail.findAll().then((dataa) => {
                detailArray = [];
                for (let j = 0; j < data.length; j++) {
                    detailArray.push(dataa[data[j].dataValues.route_id - 1].dataValues.detail_comment)
                }
                console.log('detailArray:', detailArray)
                res.send(detailArray)
            })
        })

        // 지역과 날짜가 all이 아닐 때
    } else {
        // console.log(req.city)
        models.route.findAll({
            attributes: ["route_id"],
            where: {
                route_city: req.body.city,
                route_day: req.body.day
            }
            //route테이블의 route_id
        }).then((data) => {
            for (let i = 0; i < data.length; i++) {
                // console.log('route_id는', data[i].dataValues.route_id)
            }
            models.detail.findAll().then((dataa) => {
                detailArray = [];
                for (let j = 0; j < data.length; j++) {
                    detailArray.push(dataa[data[j].dataValues.route_id - 1].dataValues.detail_comment)
                }
                // console.log('detailArray:', detailArray)
                res.send(detailArray)
            })
        })
    }
}