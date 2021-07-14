module.exports =  (babel)=>{
    // 相当于 babel types
    const type = babel.types
    return {
        visitor:{
            ImportDeclaration(path, state){
            const { name } = state.opts;
                if(path.node.source.value !== name){
                    return;
                }
                const specs = path.node.specifiers
                /**
                 * import 'foo'
                 * 删除
                 */
                if(!specs.length){
                    path.remove();
                    return 
                }
                /**
                 * import aa from 'foo'
                 * import aa as b from 'foo'
                 * 报错
                 */
                const hasDefaultSpec = specs.some(p => type.isImportDefaultSpecifier(p) || type.isImportNamespaceSpecifier(p))
                if(hasDefaultSpec){
                    throw path.buildCodeFrameError("不能使用默认导入或命名空间导入")
                }
                const newImport = [];
                // import { a, b } from 'foo'
                specs.forEach(spec => {
                    const named = name + '/' + spec.imported.name
                    const local = spec.local
                    newImport.push(type.importDeclaration([type.importDefaultSpecifier(local)], type.stringLiteral(named)));
                    newImport.push(type.importDeclaration([], type.stringLiteral(named+'/style.less')));
                })
                // 替换原有的导入语句
                path.replaceWithMultiple(newImport)
            }
        }
    }
}