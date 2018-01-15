#!/usr/bin/env node

var program = require('commander')
var fs = require('fs')
var sourceMap = require("source-map");

program.version('1.0.0')
       .option('-f --file [file]','source map file')
       .option('-l --line [row]','error message row line')
       .option('-c --column [column]','error message colomn number')
       .parse(process.argv)

if(!program.file || !program.column || !program.line){
    console.log('please input map file name or error line error column')
    process.exit(1)
}

fs.stat(program.file,(err, stats)=>{
    if(err){
        console.error('source map file is not exist, please retry it')
        process.exit(1)
    }else{
        if( isNaN(parseInt(program.line,10)) || isNaN(parseInt(program.column,10))){
            console.log('you error column or error line is not number')
            process.exit(1)
        }else{
            fs.readFile(program.file,(err,data)=>{
                var smc = new sourceMap.SourceMapConsumer(data.toString());
                console.log(smc.originalPositionFor({
                  line: parseInt(program.line,10),
                  column: parseInt(program.column,10),
                }));
            })
        }
    }
})