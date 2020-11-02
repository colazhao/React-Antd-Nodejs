var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');
var RespDataService = require('../public/javascripts/resp-data');

/* 获取角色列表. */
router.get('/list', function(req, res, next) {
    db.query("select * from role",function(err,rows){
        if(err){
            res.send(RespDataService.back(err, 'error'));
        }else {
            res.send(RespDataService.back(rows, 'data'));
        }
    });
});
/**
 * 获取单个角色
 */
router.get("/get/:id",function(req,res,next){
    let id = req.params.id;
    let sql = "select * from role";
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
 * 添加角色
 */
router.post("/add",function(req,res,next){
    let params = {
        name: req.body.name,
        note: req.body.note,
    };
    db.query("insert into role set ?",params, function(err,rows){
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
 * 删除角色
 */
router.post("/delete/:id",function(req,res){
    let id = req.params.id;
    db.query("delete from role where id = " + id,function(err,rows){
        if(err){
            res.send(RespDataService.back(err, 'error'));
        }else {
            res.send(RespDataService.back(rows, 'alert'));
        }
    });
});

/**
 * 修改角色
 */
router.post("/update",function(req,res,next){
    let params = {
        id:req.body.id,
        name: req.body.name,
        note: req.body.note,
    };
    let str = '';
    Object.keys(params).forEach(key=>{
        if(key != 'id' && params[key]){
            str += key + ' = "' +params[key]+'",';
        }
    });
    str = str.slice(0, str.length - 1);
    let sql = "update role set "+ str +" where id = " + params.id;
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
    var sql = "select * from role";
    if(name){
        sql += " where name = '"+ name +"'";
    }
    sql.replace("and","where");
    db.query(sql,function(err,rows){
        if(err){
            res.send("查询失败: "+err);
        }else{
            res.render("roles",{title:"用户列表",datas:rows,s_name:name,s_age:age});
        }
    });
})

module.exports = router;
