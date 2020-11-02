var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');
var RespDataService = require('../public/javascripts/resp-data');

/* GET users listing. */
router.get('/list', function(req, res, next) {
    db.query("select * from user",function(err,rows){
        if(err){
            res.send(RespDataService.back(err, 'error'));
        }else {
            db.query("select * from role",function(err,resp){
                if(err){
                    res.send(RespDataService.back(err, 'error'));
                }else {
                    rows.map(item=>{
                        resp.forEach(val=>{
                            if(item.roleId == val.id){
                                item['roleName'] = val.name;
                                return item;
                            }
                        })
                    });
                    res.send(RespDataService.back(rows, 'data'));
                }
            });
        }
    });
});

/**
 * 获取单个用户
 */
router.get("/get/:id",function(req,res,next){
    let id = req.params.id;
    let sql = "select * from user";
    if(id){
        sql += " where id = '"+ id +"'";
    }
    sql.replace("and","where");
    db.query(sql,function(err,rows){
        if(err){
            res.send(RespDataService.back(err, 'error'));
        }else{
            res.send(RespDataService.back(rows[0], 'data'));
        }
    });
})

/**
 * 添加用户
 */
router.post("/add",function(req,res,next){
    let params = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        address: req.body.address,
        roleId: req.body.roleId,
        note: req.body.note,
    };
    db.query("insert into user set ?",params, function(err,rows){
        console.log(res);
        console.log(rows);
        if(err){
            res.send(RespDataService.back(err, 'error'));
        }else {
            res.send(RespDataService.back(rows, 'alert'));
        }
    });
});

/**
 * 删除用户
 */
router.post("/delete/:id",function(req,res){
    let id = req.params.id;
    db.query("delete from user where id = " + id,function(err,rows){
        if(err){
            res.send(RespDataService.back(err, 'error'));
        }else {
            res.send(RespDataService.back(rows, 'alert'));
        }
    });
});

/**
 * 修改
 */
router.get("/toUpdate/:id",function(req,res,next){
    var id = req.params.id;
    var sql = "select * from user where id = " + id;
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            res.send("修改页面跳转失败");
        }else {
            res.render("update",{datas:rows});
        }
    });
});

router.post("/update",function(req,res,next){
    let params = {
        id:req.body.id,
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        address: req.body.address,
        roleId: req.body.roleId,
        note: req.body.note,
    };
    let str = '';
    Object.keys(params).forEach(key=>{
        if(key != 'id' && params[key]){
            str += key + ' = "' +params[key]+'",';
        }
    });
    str = str.slice(0, str.length - 1);
    let sql = "update user set "+ str +" where id = " + params.id;
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            res.send(RespDataService.back(err, 'error'));
        }else {
            res.send(RespDataService.back(rows, 'alert'));
        }
    });
});


/**
 * 查询
 */
router.post("/search",function(req,res,next){
    var name = req.body.s_name;
    var age = req.body.s_age;
    var sql = "select * from user";
    if(name){
        sql += " where name = '"+ name +"'";
    }
    sql.replace("and","where");
    db.query(sql,function(err,rows){
        if(err){
            res.send("查询失败: "+err);
        }else{
            res.render("users",{title:"用户列表",datas:rows,s_name:name,s_age:age});
        }
    });
})

module.exports = router;
