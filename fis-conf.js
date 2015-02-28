fis.config.merge({
    project:{
        charest:"utf8",
        md5Length : 0,
        include: ["src/**","mods/**"]
    },
    settings:{
        //fis-optimizer-uglify-js插件的配置数据
        optimizer:{
            'uglify-js' : {
                output : {
                    max_line_len : 500,
                    ascii_only: true
                }
            }
        }
    },
    pack : {
        'pkg/farman.libs.js' : 'src/libs/**.js',
        'pkg/farman.seajs.js' : [
            "src/common/**.js",
            "src/core/**.js",
            "src/page/**.js",
            "src/app.js"    
        ],
        'pkg/farman.page.js' : [
            "mods/routes.js",
            "mods/common/**.js",
            "mods/page/**.js"
        ],
        'pkg/farman.all.js' : '**.js'
    }
});