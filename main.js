#!/usr/bin/env node

let fs=require("fs");
let path=require("path");
let nik=process.argv.slice(2);
console.log(nik);
let comand=nik[0];
let types={
    media:["mp4","mkv"],
    archives:['zip','7z','tar','gz','iso',"xz"],
    documents:['docz','doc','ods','odg','txt','pdf'],
    app:['exe','js','css','pkg','java']
}
switch(comand){
    case "tree":
        treefn(nik[1]);
        break;
    case "organize":
        organizefn(nik[1]);
        break;
    case "help":
        helpfn(nik[1]);
        break;
    default:
        console.log("kjcbvkjbjbkkcv");
        break;

}
function  treefn(dirPath){

    if(dirPath==undefined){

       treeHelper(process.cwd(),"")
    }
    else{
        let doesExist=fs.existsSync(dirPath);
        if(doesExist){
            treeHelper(dirPath,"");
           



        }
        else{
            console.log("pls enter  thr coreect path");
            return ;
        }
    }
  
    
}

function  helpfn(dirpath){
    console.log("kjvbhkdffblavhkf",dirpath);
}
 function organizefn(dirPath){
    let nikhil;
    if(dirPath==undefined){

        nikhil=process.cwd();
    }
    else{
        let doesExist=fs.existsSync(dirPath);
        if(doesExist){
            nikhil=path.join(dirPath,"nnn");
            if(fs.existsSync(nikhil)==false){
            fs.mkdirSync(nikhil);
            }



        }
        else{
            console.log("pls enter  thr coreect path");
            return ;
        }
    }
    organizeHelper(dirPath,nikhil);
    
}
function treeHelper(disPath,intent){
   let isFile= fs.lstatSync(disPath).isFile();
   if(isFile==true){
    let fileName=path.basename(disPath);
    console.log(intent+"└───"+fileName)
   }
   else{
    let dirName=path.basename(disPath);
    console.log(intent+"└───"+dirName);
   let childrens= fs.readdirSync(disPath);
   for(let i=0;i<childrens.length;i++){
    let childPath=path.join(disPath,childrens[i]);
    treeHelper(childPath,intent+"\t");


   }

   }

}
function organizeHelper(src,dest){
  let childName=  fs.readdirSync(src);
  for(let i=0;i<childName.length;i++){
    let childAddress=path.join(src,childName[i]);
    let isFile=fs.lstatSync(childAddress).isFile();
    if(isFile){
        let category=getCategory(childName[i])
        console.log(childName[i],"belongs to this category",category);
        sendFiles(childAddress,dest,category);
    }
  }
  

}
function sendFiles(srcFile,dest,category){
    let categoryPath=path.join(dest,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);

    }
    let fileName=path.basename(srcFile);
    let destFilePath=path.join(categoryPath,fileName);
    fs.copyFileSync(srcFile,destFilePath);
    fs.unlinkSync(srcFile);
    console.log(fileName,"copied to",category);

}
function getCategory(name){
    let ext=path.extname(name);
    ext=ext.slice(1);
    for(let type in types){
        let cTypeArray=types[type];
        for(let i=0;i<cTypeArray.length;i++){
            if(ext==cTypeArray[i]){
                return type;
            }
        }
      
    }
    return "others";
}
let n1=path.extname("main.js");
console.log(n1);
